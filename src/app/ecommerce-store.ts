import { Product } from './models/products';
import { signalMethod, signalStore, withComputed, withMethods, withState } from '@ngrx/signals';
import { computed, inject } from '@angular/core';
import { patchState } from '@ngrx/signals';
import { produce } from 'immer';
import { Toaster } from './service/toaster';
import { CartItem } from './models/carts';
import { MatDialog } from '@angular/material/dialog';
import { SignInDialog } from './components/sign-in-dialog/sign-in-dialog';
import { User, SignInParams, SignUpParams, mapApiUser } from './models/user';
import { Router } from '@angular/router';
import { withStorageSync } from '@angular-architects/ngrx-toolkit';
import { AddReviewParams, UserReview } from './models/user-review';
import { firstValueFrom } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthService } from './service/auth-service';
import { CartService } from './service/cart-service';
import { WishlistService } from './service/wishlist-service';
import { ProductService } from './service/product-service';
import { ReviewService } from './service/review-service';
import { ShippingService } from './service/shipping-service';
import { OrderService } from './service/order-service';
import { CheckoutService } from './service/checkout-service';

export type EcommerceState = {
  products: Product[];
  category: string;
  wishlistItems: Product[];
  cartItems: CartItem[];
  user: User | undefined;
  selectedProduct: Product | undefined;
  productReviews: UserReview[];
  loading: boolean;
  writeReview: boolean;
};

function apiMessage(error: unknown, fallback: string): string {
  if (error instanceof HttpErrorResponse) {
    const detail = error.error?.detail;
    if (typeof detail === 'string') {
      return detail;
    }
  }
  return fallback;
}

export const EcommerceStore = signalStore(
  {
    providedIn: 'root',
  },
  withState({
    products: [],
    category: 'all',
    wishlistItems: [],
    cartItems: [],
    user: undefined,
    loading: false,
    selectedProduct: undefined,
    productReviews: [],
    writeReview: false,
  } as EcommerceState),

  withStorageSync({
    key: 'modern-store',
    select: ({ wishlistItems, cartItems, user }) => ({ wishlistItems, cartItems, user }),
  }),

  withComputed(({ wishlistItems, cartItems, productReviews }) => ({
    wishlistCount: computed(() => wishlistItems().length),

    cartCount: computed(() => cartItems().reduce((acc, item) => acc + item.quantity, 0)),

    averageRating: computed(() => {
      const reviews = productReviews();
      if (!reviews.length) {
        return 0;
      }
      return (
        Math.round(
          (reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length) * 10,
        ) / 10
      );
    }),
  })),

  withMethods((
    store,
    toaster = inject(Toaster),
    matDialog = inject(MatDialog),
    router = inject(Router),
    authService = inject(AuthService),
    cartService = inject(CartService),
    wishlistService = inject(WishlistService),
    productService = inject(ProductService),
    reviewService = inject(ReviewService),
    shippingService = inject(ShippingService),
    orderService = inject(OrderService),
    checkoutService = inject(CheckoutService),
  ) => {
    const refreshCart = async () => {
      const items = await firstValueFrom(cartService.getItems());
      patchState(store, {
        cartItems: items.map((item) => ({
          product: item.product,
          quantity: item.quantity,
        })),
      });
    };

    const refreshWishlist = async () => {
      const products: Product[] = [];
      let skip = 0;
      const limit = 10;

      while (true) {
        const page = await firstValueFrom(wishlistService.getItems(skip, limit));
        products.push(...page.products);
        if (!page.has_more) {
          break;
        }
        skip += limit;
      }

      patchState(store, { wishlistItems: products });
    };

    const addToCart = async (product: Product, quantity = 1) => {
      const existingItemIndex = store.cartItems().findIndex((item) => item.product.id === product.id);
      const nextQuantity =
        existingItemIndex !== -1
          ? store.cartItems()[existingItemIndex].quantity + quantity
          : quantity;

      const updatedCartItems = produce(store.cartItems(), (draft) => {
        if (existingItemIndex !== -1) {
          draft[existingItemIndex].quantity += quantity;
          return;
        }
        draft.push({ product, quantity });
      });

      patchState(store, { cartItems: updatedCartItems });

      if (store.user()) {
        try {
          if (existingItemIndex !== -1) {
            await firstValueFrom(cartService.update(product.id, nextQuantity));
          } else {
            await firstValueFrom(cartService.add(product.id, quantity));
          }
        } catch (error) {
          toaster.error(apiMessage(error, 'Unable to update cart'));
          await refreshCart();
          return;
        }
      }

      toaster.success(existingItemIndex !== -1 ? 'Product added again' : 'Product added to cart');
    };

    const addToWishList = async (product: Product) => {
      const updatedWishlistItems = produce(store.wishlistItems(), (draft) => {
        if (!draft.find((item) => item.id === product.id)) {
          draft.push(product);
        }
      });
      patchState(store, { wishlistItems: updatedWishlistItems });

      if (store.user()) {
        try {
          await firstValueFrom(wishlistService.add(product.id));
        } catch (error) {
          toaster.error(apiMessage(error, 'Unable to update wishlist'));
          await refreshWishlist();
          return;
        }
      }

      toaster.success('Product added to wishlist');
    };

    const removeFromCart = async (product: Product) => {
      patchState(store, {
        cartItems: store.cartItems().filter((item) => item.product.id !== product.id),
      });

      if (store.user()) {
        try {
          await firstValueFrom(cartService.remove(product.id));
        } catch (error) {
          toaster.error(apiMessage(error, 'Unable to update cart'));
          await refreshCart();
        }
      }
    };

    const clearWishlist = async () => {
      const items = [...store.wishlistItems()];
      patchState(store, { wishlistItems: [] });

      if (store.user()) {
        await Promise.all(
          items.map((item) => firstValueFrom(wishlistService.remove(item.id)).catch(() => undefined)),
        );
      }
    };

    const loadReviews = async (productId: number) => {
      const reviews: UserReview[] = [];
      let skip = 0;
      const limit = 10;

      while (true) {
        const page = await firstValueFrom(productService.getProductReviews(productId, limit, skip));

        const pageReviews = await Promise.all(page.reviews.map(async (review) => {
          const mappedReview: UserReview = {
            id: review.id,
            productId: review.product_id,
            userId: review.user_id,
            userName: 'Customer',
            userImageUrl: 'https://i.pravatar.cc/150?img=1',
            rating: review.rating,
            title: review.title,
            comment: review.comment,
            reviewDate: new Date(review.created_at),
          };

          try {
            const user = await firstValueFrom(authService.getPublicUser(review.user_id));
            return { ...mappedReview, userName: user.username, userImageUrl: user.image_url };
          } catch {
            return mappedReview;
          }
        }));

        reviews.push(...pageReviews);

        if (!page.has_more) {
          break;
        }
        skip += limit;
      }

      patchState(store, { productReviews: reviews });
    };

    return {
      setCategory: signalMethod<string>((category: string) => {
        patchState(store, { category });
      }),

      async restoreSession() {
        if (!authService.getToken()) {
          patchState(store, { user: undefined });
          return;
        }

        try {
          const user = await firstValueFrom(authService.getMe());
          patchState(store, { user: mapApiUser(user) });
          await Promise.all([refreshCart(), refreshWishlist()]);
        } catch {
          authService.clearToken();
          patchState(store, { user: undefined });
        }
      },

      async loadSelectedProduct(productId: number) {
        patchState(store, { loading: true, productReviews: [] });
        try {
          let product = await firstValueFrom(productService.getProduct(productId));

          try {
            const status = await firstValueFrom(productService.getProductStatus(productId));
            product = { ...product, inStock: status.inStock };
          } catch {
            product = { ...product, inStock: product.quantity > 0 };
          }

          patchState(store, { selectedProduct: product, loading: false });

          try {
            await loadReviews(productId);
          } catch {
            patchState(store, { productReviews: [] });
          }
        } catch (error) {
          patchState(store, { selectedProduct: undefined, loading: false });
          toaster.error(apiMessage(error, 'Unable to load product'));
        }
      },

      addToWishList,

      async removeFromWishlist(product: Product) {
        patchState(store, {
          wishlistItems: store.wishlistItems().filter((item) => item.id !== product.id),
        });

        if (store.user()) {
          try {
            await firstValueFrom(wishlistService.remove(product.id));
          } catch (error) {
            toaster.error(apiMessage(error, 'Unable to update wishlist'));
            await refreshWishlist();
            return;
          }
        }

        toaster.success('Product removed from wishlist');
      },

      clearWishlist,

      addToCart,

      async setItemQuantity(params: { productId: number; quantity: number }) {
        const index = store.cartItems().findIndex((item) => item.product.id === params.productId);
        if (index === -1) {
          return;
        }

        const updated = produce(store.cartItems(), (draft) => {
          draft[index].quantity = params.quantity;
        });
        patchState(store, { cartItems: updated });

        if (store.user()) {
          try {
            await firstValueFrom(cartService.update(params.productId, params.quantity));
          } catch (error) {
            toaster.error(apiMessage(error, 'Unable to update quantity'));
            await refreshCart();
          }
        }
      },

      async addAllWishlistToCart() {
        const wishlist = [...store.wishlistItems()];
        for (const product of wishlist) {
          await addToCart(product, 1);
        }
        await clearWishlist();
      },

      async moveToWishlist(product: Product) {
        await removeFromCart(product);
        await addToWishList(product);
      },

      removeFromCart,

      proceedToCheckout() {
        if (!store.user()) {
          matDialog.open(SignInDialog, {
            disableClose: true,
            data: { checkout: true },
          });
          return;
        }
        router.navigate(['/checkout']);
      },

      async placeOrder() {
        const user = store.user();
        if (!user) {
          toaster.error('Please login before placing an order');
          return;
        }

        if (!store.cartItems().length) {
          toaster.error('Your cart is empty');
          return;
        }

        if (checkoutService.shippingForm.invalid) {
          checkoutService.shippingForm.markAllAsTouched();
          toaster.error('Please complete shipping information');
          return;
        }

        patchState(store, { loading: true });

        try {
          const shipping = await firstValueFrom(
            shippingService.create(checkoutService.shippingForm.getRawValue()),
          );
          const itemCount = store.cartItems().reduce((acc, item) => acc + item.quantity, 0);
          const total = store.cartItems().reduce(
            (acc, item) => acc + item.quantity * item.product.price,
            0,
          );

          const orderManage = await firstValueFrom(
            orderService.createOrderManage({
              items: itemCount,
              total_price: Math.round(total * 100) / 100,
              payment_status: true,
              payment_mode: checkoutService.paymentMode(),
              shipping_id: shipping.id,
            }),
          );

          for (const item of store.cartItems()) {
            await firstValueFrom(
              orderService.createOrderLine(orderManage.id, item.product.id, item.quantity),
            );
          }

          await Promise.all(
            store.cartItems().map((item) =>
              firstValueFrom(cartService.remove(item.product.id)).catch(() => undefined),
            ),
          );

          patchState(store, { loading: false, cartItems: [] });
          checkoutService.shippingForm.reset();
          toaster.success('Order placed');
          router.navigate(['order-success']);
        } catch (error) {
          patchState(store, { loading: false });
          toaster.error(apiMessage(error, 'Unable to place order'));
        }
      },

      async signIn({ email, password, checkout, dialogId }: SignInParams) {
        patchState(store, { loading: true });
        try {
          await firstValueFrom(authService.signIn(email, password));
          const user = await firstValueFrom(authService.getMe());
          patchState(store, { user: mapApiUser(user), loading: false });
          await Promise.all([refreshCart(), refreshWishlist()]);
          matDialog.getDialogById(dialogId)?.close();
          if (checkout) {
            router.navigate(['/checkout']);
          }
        } catch (error) {
          patchState(store, { loading: false });
          toaster.error(apiMessage(error, 'Unable to sign in'));
        }
      },

      signOut() {
        authService.clearToken();
        patchState(store, { user: undefined, cartItems: [], wishlistItems: [] });
      },

      async signUp({ email, password, name, checkout, dialogId }: SignUpParams) {
        patchState(store, { loading: true });
        try {
          await firstValueFrom(authService.signUp(name, email, password));
          await firstValueFrom(authService.signIn(email, password));
          const user = await firstValueFrom(authService.getMe());
          patchState(store, { user: mapApiUser(user), loading: false });
          matDialog.getDialogById(dialogId)?.close();
          if (checkout) {
            router.navigate(['/checkout']);
          }
        } catch (error) {
          patchState(store, { loading: false });
          toaster.error(apiMessage(error, 'Unable to create account'));
        }
      },

      showWriteReview() {
        patchState(store, { writeReview: true });
      },

      hideWriteReview() {
        patchState(store, { writeReview: false });
      },

      async addReview({ title, comment, rating }: AddReviewParams) {
        const product = store.selectedProduct();
        if (!product) {
          return;
        }
        if (!store.user()) {
          toaster.error('Please sign in to write a review');
          return;
        }

        patchState(store, { loading: true });
        try {
          await firstValueFrom(reviewService.create(product.id, title, rating, comment));
          await loadReviews(product.id);
          patchState(store, { loading: false, writeReview: false });
          toaster.success('Review submitted');
        } catch (error) {
          patchState(store, { loading: false });
          toaster.error(apiMessage(error, 'Unable to submit review'));
        }
      },
    };
  }),
);

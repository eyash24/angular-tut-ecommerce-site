import { Product } from './models/products';
import { signalMethod, signalStore, withComputed, withMethods, withState } from '@ngrx/signals';
import { computed, inject } from '@angular/core';
import { patchState } from '@ngrx/signals';
import { produce } from 'immer';
import { Toaster } from './service/toaster';
import { CartItem } from './models/carts';
import { MatDialog } from '@angular/material/dialog';
import { SignInDialog } from './components/sign-in-dialog/sign-in-dialog';
import { User, SignInParams, SignUpParams } from './models/user';
import { Router } from '@angular/router';
import { Order } from './models/order';
import { withStorageSync } from '@angular-architects/ngrx-toolkit';
import { AddReviewParams, UserReview } from './models/user-review';
import { productList } from './products';



export type EcommerceState = {
  products: Product[];
  category: string;
  wishlistItems: Product[];
  cartItems: CartItem[];
  user: User | undefined;
  selectedProductId: string | undefined;
  loading: boolean;
  writeReview: boolean;
};

export const EcommerceStore = signalStore(
  {
    providedIn: 'root',
  },
  withState({
    products: productList,
    category: 'all',
    wishlistItems: [],
    cartItems: [],
    user: undefined,
    loading: false,
    selectedProductId: undefined,
    writeReview: false,

  } as EcommerceState),

  withStorageSync({
    key: 'modern-store',
    select: ({ wishlistItems, cartItems, user }) => ({ wishlistItems, cartItems, user})
  }),

  withComputed(({ category, products, wishlistItems, cartItems, selectedProductId }) => ({
    filteredProducts: computed(() => {
      if (category() === 'all') return products();

      return products().filter((p) => p.category.toLowerCase() == category().toLowerCase());
    }),

    wishlistCount: computed(() => wishlistItems().length),

    cartCount: computed(() => cartItems().reduce((acc, item) => acc + item.quantity, 0)),

    selectedProduct: computed(() => products().find((p) => p.id === selectedProductId()))
  })),

  withMethods((store, toaster=inject(Toaster), matDialog=inject(MatDialog), router=inject(Router)) => ({
    setCategory: signalMethod<string>((category: string) => {
      patchState(store, { category });
    }),

    setProductId: signalMethod<string>((productId: string) => {
      patchState(store, { selectedProductId: productId });
    }),

    addToWishList: (product: Product) => {
      const updatedWishlistItems = produce(store.wishlistItems(), (draft) => {
        if (!draft.find(p => p.id === product.id)){
          draft.push(product)
        }
      });

      patchState(store, { wishlistItems: updatedWishlistItems });
      toaster.success('Product added to wishlist')
    },

    removeFromWishlist: (product: Product) => {
      patchState(store, {
        wishlistItems: store.wishlistItems().filter((p) => p.id !== product.id)
      })
      toaster.success('Product removed from wishlist')
    },

    clearWishlist: () => {
      patchState(store, { wishlistItems: []})
    },

    addToCart: (product: Product, quantity = 1) => {
      const existingItemIndex = store.cartItems().findIndex(i => i.product.id === product.id)

      const updatedCartItems = produce(store.cartItems(), (draft) => {
         if (existingItemIndex !== -1){
          draft[existingItemIndex].quantity += quantity;
          return;
         }

         draft.push({
          product, quantity
         })

      })

      patchState(store, { cartItems: updatedCartItems })
      toaster.success(existingItemIndex !== -1 ? 'Product added again' : 'Product added to cart')
    },

    setItemQuantity(params: {productId: string, quantity: number}) {
      const index = store.cartItems().findIndex(c => c.product.id === params.productId);
      const updated = produce(store.cartItems(), (draft) => {
        draft[index].quantity = params.quantity
      });

      patchState(store, { cartItems: updated });
    },

    addAllWishlistToCart: () => {
      const updatedCartItems = produce(store.cartItems(), (draft) => {
        store.wishlistItems().forEach(p => {
          if (!draft.find(c => c.product.id === p.id)) {
            draft.push({ product: p, quantity: 1});
          }
        })
      })

      patchState(store, { cartItems: updatedCartItems, wishlistItems: [] })
    },

    moveToWishlist: (product: Product) => {
      const updatedCartItems = store.cartItems().filter((p => p.product.id !== product.id))
      const updatedWishlistItems = produce(store.wishlistItems(), (draft) => {
        if (!draft.find(p => p.id === product.id)){
          draft.push(product)
        }
      });

      patchState(store, {cartItems: updatedCartItems, wishlistItems: updatedWishlistItems});
    },

    removeFromCart: (product: Product) => {
      patchState(store, { cartItems: store.cartItems().filter((c) => c.product.id !== product.id)})
    },

    proceedToCheckout: () => {
      if (!store.user()){
        matDialog.open(SignInDialog, {
          disableClose: true,
          data: {
            checkout: true
          }
        });
        return;
      }
      router.navigate(['/checkout'])
    },

    placeOrder: async () => {
      patchState(store, {loading: true})

      const user = store.user()

      if (!user) {
        toaster.error('Please login before placing an order');
        patchState(store, { loading: false})

        return;
      }

      const order: Order = {
        id: crypto.randomUUID(),
        userId: user.id,
        total: Math.round(store
          .cartItems()
          .reduce((acc, item) => acc + item.quantity * item.product.price, 0)),
        items: store.cartItems(),
        paymentStatus: 'success'

      }

      await new Promise((resolve) => setTimeout(resolve, 1000));

      patchState(store, {loading: false, cartItems: []})
      router.navigate(['order-success'])

    },

    signIn: ({email, password, checkout, dialogId}: SignInParams) => {
      patchState(store, {
        user: {
          id: '1',
          email,
          name: 'John Doe',
          imageUrl: 'https://images.pexels.com/photos/19453607/pexels-photo-19453607.jpeg',
        }
      })

      matDialog.getDialogById(dialogId)?.close();

      if (checkout) {
        router.navigate(['/checkout'])
      }

    },

    signOut: () => {
      patchState(store, { user: undefined })
    },

    signUp: ({email, password, name, checkout, dialogId}: SignUpParams) => {
      patchState(store, {
       user: {
        id: '1',
        email,
        name: name,
        imageUrl: 'https://images.pexels.com/photos/19453607/pexels-photo-19453607.jpeg',
       }
      });

      matDialog.getDialogById(dialogId)?.close();

      if (checkout) {
        router.navigate(['/checkout'])
      }
    },

    showWriteReview: () => {
      patchState(store, { writeReview: true })
    },

    hideWriteReview: () => {
      patchState(store, {writeReview: false})
    },

    addReview: async ({title, comment, rating}: AddReviewParams) => {
      patchState(store, { loading: true });
      const product = store.products().find((p) => p.id === store.selectedProductId());

      if (!product) {
        patchState(store, {loading: false})
        return;
      }

      const review: UserReview = {
        id: crypto.randomUUID(),
        title,
        comment,
        rating,
        productId: product.id,
        userName: store.user()?.name || '',
        userImageUrl: store.user()?.imageUrl || '',
        reviewDate: new Date()
      };

      const updatedProducts = produce(store.products(), (draft) => {
        const index = draft.findIndex((p) => p.id === product.id);
        draft[index].reviews.push(review);
        draft[index].rating =
          Math.round(
            (
              draft[index].reviews.reduce((acc, r) => acc + r.rating, 0) /
              draft[index].reviews.length
            ) * 10,
          ) / 10;
        draft[index].reviewCount = draft[index].reviews.length;
      });

      await new Promise((resolve) => setTimeout(resolve, 1000));

      patchState(store, {loading: false, products: updatedProducts, writeReview: false})

    },

  })),
);

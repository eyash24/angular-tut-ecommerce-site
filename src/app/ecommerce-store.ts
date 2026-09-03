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
import { withStorageSync } from '@angular-architects/ngrx-toolkit'

export type EcommerceState = {
  products: Product[];
  category: string;
  wishlistItems: Product[];
  cartItems: CartItem[];
  user: User | undefined;
  selectedProductId: string | undefined;

  loading: boolean;
};

export const EcommerceStore = signalStore(
  {
    providedIn: 'root',
  },
  withState({
    products: [
      // Electronics
      {
        id: '1',
        name: 'Wireless Headphones',
        description: 'Over-ear wireless headphones with active noise cancellation.',
        price: 7999,
        imageUrl: 'https://images.pexels.com/photos/6446680/pexels-photo-6446680.jpeg',
        rating: 4.5,
        reviewCount: 324,
        inStock: true,
        category: 'Electronics',
      },
      {
        id: '2',
        name: 'Smart Watch Pro',
        description: 'Smartwatch with fitness tracking, GPS and heart-rate monitoring.',
        price: 5999,
        imageUrl: 'https://images.pexels.com/photos/6446680/pexels-photo-6446680.jpeg',
        rating: 4.3,
        reviewCount: 218,
        inStock: true,
        category: 'Electronics',
      },
      {
        id: '3',
        name: 'Bluetooth Speaker',
        description: 'Portable Bluetooth speaker with powerful stereo sound.',
        price: 3499,
        imageUrl: 'https://images.pexels.com/photos/6446680/pexels-photo-6446680.jpeg',
        rating: 4.4,
        reviewCount: 187,
        inStock: true,
        category: 'Electronics',
      },
      {
        id: '4',
        name: 'Mechanical Keyboard',
        description: 'RGB mechanical keyboard with tactile switches.',
        price: 4299,
        imageUrl: 'https://images.pexels.com/photos/6446680/pexels-photo-6446680.jpeg',
        rating: 4.6,
        reviewCount: 452,
        inStock: true,
        category: 'Electronics',
      },
      {
        id: '5',
        name: 'Wireless Mouse',
        description: 'Ergonomic wireless mouse with adjustable DPI.',
        price: 1899,
        imageUrl: 'https://images.pexels.com/photos/6446680/pexels-photo-6446680.jpeg',
        rating: 4.2,
        reviewCount: 163,
        inStock: true,
        category: 'Electronics',
      },
      {
        id: '6',
        name: 'USB-C Hub',
        description: '7-in-1 USB-C hub with HDMI, USB and SD card ports.',
        price: 2499,
        imageUrl: 'https://images.pexels.com/photos/6446680/pexels-photo-6446680.jpeg',
        rating: 4.4,
        reviewCount: 291,
        inStock: true,
        category: 'Electronics',
      },
      {
        id: '7',
        name: '4K Monitor',
        description: '27-inch 4K UHD monitor suitable for work and entertainment.',
        price: 28999,
        imageUrl: 'https://images.pexels.com/photos/6446680/pexels-photo-6446680.jpeg',
        rating: 4.7,
        reviewCount: 139,
        inStock: false,
        category: 'Electronics',
      },
      {
        id: '8',
        name: 'Power Bank 20000mAh',
        description: 'High-capacity power bank with fast charging support.',
        price: 2199,
        imageUrl: 'https://images.pexels.com/photos/6446680/pexels-photo-6446680.jpeg',
        rating: 4.3,
        reviewCount: 378,
        inStock: true,
        category: 'Electronics',
      },

      // Clothing
      {
        id: '9',
        name: 'Classic Cotton T-Shirt',
        description: 'Soft premium cotton t-shirt for everyday wear.',
        price: 799,
        imageUrl: 'https://images.pexels.com/photos/32963961/pexels-photo-32963961.jpeg',
        rating: 4.4,
        reviewCount: 532,
        inStock: true,
        category: 'Clothing',
      },
      {
        id: '10',
        name: 'Slim Fit Jeans',
        description: 'Comfortable stretch denim jeans with a modern slim fit.',
        price: 1999,
        imageUrl: 'https://images.pexels.com/photos/32963961/pexels-photo-32963961.jpeg',
        rating: 4.5,
        reviewCount: 421,
        inStock: true,
        category: 'Clothing',
      },
      {
        id: '11',
        name: 'Hooded Sweatshirt',
        description: 'Warm fleece-lined hoodie for casual everyday outfits.',
        price: 1599,
        imageUrl: 'https://images.pexels.com/photos/32963961/pexels-photo-32963961.jpeg',
        rating: 4.6,
        reviewCount: 287,
        inStock: true,
        category: 'Clothing',
      },
      {
        id: '12',
        name: 'Casual Polo Shirt',
        description: 'Classic polo shirt made from breathable cotton fabric.',
        price: 1299,
        imageUrl: 'https://images.pexels.com/photos/32963961/pexels-photo-32963961.jpeg',
        rating: 4.2,
        reviewCount: 196,
        inStock: true,
        category: 'Clothing',
      },
      {
        id: '13',
        name: 'Running Shorts',
        description: 'Lightweight quick-dry shorts designed for running.',
        price: 999,
        imageUrl: 'https://images.pexels.com/photos/32963961/pexels-photo-32963961.jpeg',
        rating: 4.3,
        reviewCount: 145,
        inStock: true,
        category: 'Clothing',
      },
      {
        id: '14',
        name: 'Winter Jacket',
        description: 'Insulated winter jacket with water-resistant outer fabric.',
        price: 4499,
        imageUrl: 'https://images.pexels.com/photos/32963961/pexels-photo-32963961.jpeg',
        rating: 4.7,
        reviewCount: 178,
        inStock: false,
        category: 'Clothing',
      },
      {
        id: '15',
        name: 'Formal Shirt',
        description: 'Slim-fit formal shirt suitable for office and occasions.',
        price: 1799,
        imageUrl: 'https://images.pexels.com/photos/32963961/pexels-photo-32963961.jpeg',
        rating: 4.4,
        reviewCount: 264,
        inStock: true,
        category: 'Clothing',
      },
      {
        id: '16',
        name: 'Chino Trousers',
        description: 'Versatile cotton chinos with a comfortable tapered fit.',
        price: 2299,
        imageUrl: 'https://images.pexels.com/photos/32963961/pexels-photo-32963961.jpeg',
        rating: 4.5,
        reviewCount: 203,
        inStock: true,
        category: 'Clothing',
      },

      // Home & Kitchen
      {
        id: '17',
        name: 'Non-Stick Cookware Set',
        description: 'Five-piece non-stick cookware set for everyday cooking.',
        price: 3499,
        imageUrl: 'https://images.pexels.com/photos/7670689/pexels-photo-7670689.jpeg',
        rating: 4.5,
        reviewCount: 312,
        inStock: true,
        category: 'Home & Kitchen',
      },
      {
        id: '18',
        name: 'Electric Kettle',
        description: '1.5L stainless steel electric kettle with auto shut-off.',
        price: 1299,
        imageUrl: 'https://images.pexels.com/photos/7670689/pexels-photo-7670689.jpeg',
        rating: 4.4,
        reviewCount: 521,
        inStock: true,
        category: 'Home & Kitchen',
      },
      {
        id: '19',
        name: 'Coffee Maker',
        description: 'Automatic drip coffee maker with reusable filter.',
        price: 2999,
        imageUrl: 'https://images.pexels.com/photos/7670689/pexels-photo-7670689.jpeg',
        rating: 4.3,
        reviewCount: 187,
        inStock: true,
        category: 'Home & Kitchen',
      },
      {
        id: '20',
        name: 'Air Fryer',
        description: 'Digital air fryer with multiple cooking presets.',
        price: 4999,
        imageUrl: 'https://images.pexels.com/photos/7670689/pexels-photo-7670689.jpeg',
        rating: 4.6,
        reviewCount: 648,
        inStock: true,
        category: 'Home & Kitchen',
      },
      {
        id: '21',
        name: 'Ceramic Dinner Set',
        description: 'Elegant 18-piece ceramic dinner set for six people.',
        price: 2799,
        imageUrl: 'https://images.pexels.com/photos/7670689/pexels-photo-7670689.jpeg',
        rating: 4.5,
        reviewCount: 156,
        inStock: true,
        category: 'Home & Kitchen',
      },
      {
        id: '22',
        name: 'Stainless Steel Water Bottle',
        description: 'Insulated water bottle that keeps drinks cold or hot.',
        price: 899,
        imageUrl: 'https://images.pexels.com/photos/7670689/pexels-photo-7670689.jpeg',
        rating: 4.4,
        reviewCount: 734,
        inStock: true,
        category: 'Home & Kitchen',
      },
      {
        id: '23',
        name: 'Vacuum Cleaner',
        description: 'Powerful bagless vacuum cleaner for home cleaning.',
        price: 6999,
        imageUrl: 'https://images.pexels.com/photos/7670689/pexels-photo-7670689.jpeg',
        rating: 4.2,
        reviewCount: 219,
        inStock: false,
        category: 'Home & Kitchen',
      },
      {
        id: '24',
        name: 'LED Desk Lamp',
        description: 'Adjustable LED desk lamp with multiple brightness levels.',
        price: 1199,
        imageUrl: 'https://images.pexels.com/photos/7670689/pexels-photo-7670689.jpeg',
        rating: 4.6,
        reviewCount: 342,
        inStock: true,
        category: 'Home & Kitchen',
      },

      // Books
      {
        id: '25',
        name: 'The Art of Programming',
        description: 'A practical guide to writing clean and maintainable code.',
        price: 899,
        imageUrl: 'https://images.pexels.com/photos/28530072/pexels-photo-28530072.jpeg',
        rating: 4.8,
        reviewCount: 824,
        inStock: true,
        category: 'Books',
      },
      {
        id: '26',
        name: 'Modern JavaScript',
        description: 'Learn modern JavaScript concepts from fundamentals to advanced topics.',
        price: 749,
        imageUrl: 'https://images.pexels.com/photos/28530072/pexels-photo-28530072.jpeg',
        rating: 4.6,
        reviewCount: 451,
        inStock: true,
        category: 'Books',
      },
      {
        id: '27',
        name: 'Python for Developers',
        description: 'Comprehensive Python programming guide for developers.',
        price: 999,
        imageUrl: 'https://images.pexels.com/photos/28530072/pexels-photo-28530072.jpeg',
        rating: 4.7,
        reviewCount: 673,
        inStock: true,
        category: 'Books',
      },
      {
        id: '28',
        name: 'Design Patterns',
        description: 'A practical introduction to reusable software design patterns.',
        price: 1199,
        imageUrl: 'https://images.pexels.com/photos/28530072/pexels-photo-28530072.jpeg',
        rating: 4.8,
        reviewCount: 389,
        inStock: true,
        category: 'Books',
      },
      {
        id: '29',
        name: 'Database Fundamentals',
        description: 'Learn SQL, database design and relational database concepts.',
        price: 849,
        imageUrl: 'https://images.pexels.com/photos/28530072/pexels-photo-28530072.jpeg',
        rating: 4.5,
        reviewCount: 234,
        inStock: true,
        category: 'Books',
      },
      {
        id: '30',
        name: 'Clean Architecture',
        description: 'Practical principles for building maintainable software systems.',
        price: 1099,
        imageUrl: 'https://images.pexels.com/photos/28530072/pexels-photo-28530072.jpeg',
        rating: 4.7,
        reviewCount: 512,
        inStock: false,
        category: 'Books',
      },
      {
        id: '31',
        name: 'Algorithms Made Easy',
        description: 'An approachable guide to algorithms and problem solving.',
        price: 799,
        imageUrl: 'https://images.pexels.com/photos/28530072/pexels-photo-28530072.jpeg',
        rating: 4.4,
        reviewCount: 327,
        inStock: true,
        category: 'Books',
      },
      {
        id: '32',
        name: 'System Design Handbook',
        description: 'Learn how to design scalable and reliable distributed systems.',
        price: 1299,
        imageUrl: 'https://images.pexels.com/photos/28530072/pexels-photo-28530072.jpeg',
        rating: 4.9,
        reviewCount: 743,
        inStock: true,
        category: 'Books',
      },

      // Sports & Fitness
      {
        id: '33',
        name: 'Yoga Mat',
        description: 'Non-slip cushioned yoga mat suitable for home workouts.',
        price: 999,
        imageUrl: 'https://images.pexels.com/photos/7543640/pexels-photo-7543640.jpeg',
        rating: 4.5,
        reviewCount: 621,
        inStock: true,
        category: 'Sports & Fitness',
      },
      {
        id: '34',
        name: 'Adjustable Dumbbells',
        description: 'Space-saving adjustable dumbbells for strength training.',
        price: 4999,
        imageUrl: 'https://images.pexels.com/photos/7543640/pexels-photo-7543640.jpeg',
        rating: 4.6,
        reviewCount: 284,
        inStock: true,
        category: 'Sports & Fitness',
      },
      {
        id: '35',
        name: 'Running Shoes',
        description: 'Lightweight running shoes with responsive cushioning.',
        price: 3999,
        imageUrl: 'https://images.pexels.com/photos/7543640/pexels-photo-7543640.jpeg',
        rating: 4.7,
        reviewCount: 834,
        inStock: true,
        category: 'Sports & Fitness',
      },
      {
        id: '36',
        name: 'Resistance Bands',
        description: 'Set of five resistance bands with different resistance levels.',
        price: 699,
        imageUrl: 'https://images.pexels.com/photos/7543640/pexels-photo-7543640.jpeg',
        rating: 4.4,
        reviewCount: 412,
        inStock: true,
        category: 'Sports & Fitness',
      },
      {
        id: '37',
        name: 'Fitness Tracker',
        description: 'Activity tracker with step counting, sleep tracking and workouts.',
        price: 2499,
        imageUrl: 'https://images.pexels.com/photos/7543640/pexels-photo-7543640.jpeg',
        rating: 4.3,
        reviewCount: 367,
        inStock: true,
        category: 'Sports & Fitness',
      },
      {
        id: '38',
        name: 'Football',
        description: 'Durable size 5 football designed for training and matches.',
        price: 1299,
        imageUrl: 'https://images.pexels.com/photos/7543640/pexels-photo-7543640.jpeg',
        rating: 4.5,
        reviewCount: 198,
        inStock: true,
        category: 'Sports & Fitness',
      },
      {
        id: '39',
        name: 'Gym Gloves',
        description: 'Breathable training gloves with padded palm protection.',
        price: 599,
        imageUrl: 'https://images.pexels.com/photos/7543640/pexels-photo-7543640.jpeg',
        rating: 4.2,
        reviewCount: 256,
        inStock: false,
        category: 'Sports & Fitness',
      },
      {
        id: '40',
        name: 'Skipping Rope',
        description: 'Adjustable speed skipping rope with comfortable handles.',
        price: 499,
        imageUrl: 'https://images.pexels.com/photos/7543640/pexels-photo-7543640.jpeg',
        rating: 4.4,
        reviewCount: 389,
        inStock: true,
        category: 'Sports & Fitness',
      },
    ],
    category: 'all',
    wishlistItems: [],
    cartItems: [],
    user: undefined,
    loading: false,
    selectedProductId: undefined,
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



  })),
);

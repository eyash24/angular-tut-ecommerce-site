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
    products: [
{
    id: 'elec-001',
    name: 'Wireless Noise Cancelling Headphones',
    description: 'Premium over-ear headphones with active noise cancellation and up to 30 hours of battery life.',
    price: 7999,
    imageUrl: 'https://picsum.photos/seed/headphones/600/600',
    rating: 4.5,
    reviewCount: 5,
    inStock: true,
    category: 'electronics',
    reviews: [
      {
        id: 'review-001',
        productId: 'elec-001',
        userName: 'Rahul Sharma',
        userImageUrl: 'https://i.pravatar.cc/150?img=11',
        rating: 5,
        title: 'Excellent sound quality',
        comment: 'The sound is crisp and the noise cancellation works really well.',
        reviewDate: new Date('2026-08-20')
      },
      {
        id: 'review-002',
        productId: 'elec-001',
        userName: 'Priya Mehta',
        userImageUrl: 'https://i.pravatar.cc/150?img=12',
        rating: 4,
        title: 'Very comfortable',
        comment: 'Comfortable enough to wear for several hours. Battery life is great.',
        reviewDate: new Date('2026-08-18')
      },
      {
        id: 'review-003',
        productId: 'elec-001',
        userName: 'Arjun Kapoor',
        userImageUrl: 'https://i.pravatar.cc/150?img=13',
        rating: 5,
        title: 'Great for travel',
        comment: 'Used these on a long flight and the noise cancellation was impressive.',
        reviewDate: new Date('2026-08-12')
      },
      {
        id: 'review-004',
        productId: 'elec-001',
        userName: 'Sneha Rao',
        userImageUrl: 'https://i.pravatar.cc/150?img=14',
        rating: 4,
        title: 'Good headphones',
        comment: 'Overall very good. The only issue is that they are slightly bulky.',
        reviewDate: new Date('2026-08-05')
      },
      {
        id: 'review-005',
        productId: 'elec-001',
        userName: 'Vikram Singh',
        userImageUrl: 'https://i.pravatar.cc/150?img=15',
        rating: 5,
        title: 'Worth the money',
        comment: 'Excellent build quality and sound. Would definitely recommend.',
        reviewDate: new Date('2026-07-28')
      }
    ]
  },

  {
    id: 'elec-002',
    name: 'Smart Fitness Watch',
    description: 'Feature-packed smartwatch with heart rate monitoring, GPS, sleep tracking and customizable watch faces.',
    price: 5499,
    imageUrl: 'https://picsum.photos/seed/smartwatch/600/600',
    rating: 4.3,
    reviewCount: 4,
    inStock: true,
    category: 'electronics',
    reviews: [
      {
        id: 'review-006',
        productId: 'elec-002',
        userName: 'Amit Verma',
        userImageUrl: 'https://i.pravatar.cc/150?img=16',
        rating: 5,
        title: 'Great fitness companion',
        comment: 'The activity tracking is accurate and the battery easily lasts several days.',
        reviewDate: new Date('2026-08-22')
      },
      {
        id: 'review-007',
        productId: 'elec-002',
        userName: 'Neha Gupta',
        userImageUrl: 'https://i.pravatar.cc/150?img=17',
        rating: 4,
        title: 'Good smartwatch',
        comment: 'Lots of useful features and the display is bright.',
        reviewDate: new Date('2026-08-14')
      },
      {
        id: 'review-008',
        productId: 'elec-002',
        userName: 'Karan Joshi',
        userImageUrl: 'https://i.pravatar.cc/150?img=18',
        rating: 4,
        title: 'Good value',
        comment: 'Works well for daily fitness tracking and notifications.',
        reviewDate: new Date('2026-08-03')
      },
      {
        id: 'review-009',
        productId: 'elec-002',
        userName: 'Pooja Shah',
        userImageUrl: 'https://i.pravatar.cc/150?img=19',
        rating: 4,
        title: 'Nice design',
        comment: 'Looks premium and feels comfortable on the wrist.',
        reviewDate: new Date('2026-07-25')
      }
    ]
  },

  {
    id: 'elec-003',
    name: 'Portable Bluetooth Speaker',
    description: 'Compact waterproof Bluetooth speaker with powerful stereo sound and 12-hour battery life.',
    price: 2999,
    imageUrl: 'https://picsum.photos/seed/speaker/600/600',
    rating: 4.4,
    reviewCount: 3,
    inStock: true,
    category: 'electronics',
    reviews: [
      {
        id: 'review-010',
        productId: 'elec-003',
        userName: 'Rohan Malhotra',
        userImageUrl: 'https://i.pravatar.cc/150?img=20',
        rating: 5,
        title: 'Amazing sound',
        comment: 'Very loud for its size and the bass is surprisingly good.',
        reviewDate: new Date('2026-08-19')
      },
      {
        id: 'review-011',
        productId: 'elec-003',
        userName: 'Ananya Bose',
        userImageUrl: 'https://i.pravatar.cc/150?img=21',
        rating: 4,
        title: 'Perfect for small parties',
        comment: 'Easy to connect and has plenty of volume.',
        reviewDate: new Date('2026-08-10')
      },
      {
        id: 'review-012',
        productId: 'elec-003',
        userName: 'Dev Patel',
        userImageUrl: 'https://i.pravatar.cc/150?img=22',
        rating: 4,
        title: 'Good speaker',
        comment: 'Portable and durable. Battery performance is as advertised.',
        reviewDate: new Date('2026-07-30')
      }
    ]
  },

  {
    id: 'elec-004',
    name: 'Mechanical Gaming Keyboard',
    description: 'RGB mechanical keyboard with tactile switches, anti-ghosting and programmable keys.',
    price: 4299,
    imageUrl: 'https://picsum.photos/seed/keyboard/600/600',
    rating: 4.6,
    reviewCount: 6,
    inStock: true,
    category: 'electronics',
    reviews: [
      {
        id: 'review-013',
        productId: 'elec-004',
        userName: 'Aditya Kumar',
        userImageUrl: 'https://i.pravatar.cc/150?img=23',
        rating: 5,
        title: 'Fantastic keyboard',
        comment: 'The switches feel amazing and typing is extremely satisfying.',
        reviewDate: new Date('2026-08-24')
      },
      {
        id: 'review-014',
        productId: 'elec-004',
        userName: 'Ishita Jain',
        userImageUrl: 'https://i.pravatar.cc/150?img=24',
        rating: 5,
        title: 'Love the RGB',
        comment: 'Great keyboard for both gaming and work.',
        reviewDate: new Date('2026-08-17')
      },
      {
        id: 'review-015',
        productId: 'elec-004',
        userName: 'Manish Yadav',
        userImageUrl: 'https://i.pravatar.cc/150?img=25',
        rating: 4,
        title: 'Solid build',
        comment: 'Feels very sturdy and the keys have a nice tactile response.',
        reviewDate: new Date('2026-08-11')
      },
      {
        id: 'review-016',
        productId: 'elec-004',
        userName: 'Simran Kaur',
        userImageUrl: 'https://i.pravatar.cc/150?img=26',
        rating: 5,
        title: 'Excellent for gaming',
        comment: 'Fast response and comfortable for long gaming sessions.',
        reviewDate: new Date('2026-08-02')
      },
      {
        id: 'review-017',
        productId: 'elec-004',
        userName: 'Nikhil Sethi',
        userImageUrl: 'https://i.pravatar.cc/150?img=27',
        rating: 4,
        title: 'Very good',
        comment: 'Only wish the software was a little easier to use.',
        reviewDate: new Date('2026-07-27')
      },
      {
        id: 'review-018',
        productId: 'elec-004',
        userName: 'Tanya Roy',
        userImageUrl: 'https://i.pravatar.cc/150?img=28',
        rating: 5,
        title: 'Highly recommended',
        comment: 'Excellent keyboard at this price point.',
        reviewDate: new Date('2026-07-20')
      }
    ]
  },

  {
    id: 'elec-005',
    name: '4K Smart LED TV',
    description: '55-inch 4K Ultra HD smart television with HDR support and built-in streaming apps.',
    price: 38999,
    imageUrl: 'https://picsum.photos/seed/smarttv/600/600',
    rating: 4.2,
    reviewCount: 4,
    inStock: false,
    category: 'electronics',
    reviews: [
      {
        id: 'review-019',
        productId: 'elec-005',
        userName: 'Saurabh Mishra',
        userImageUrl: 'https://i.pravatar.cc/150?img=29',
        rating: 5,
        title: 'Beautiful picture',
        comment: 'The 4K picture quality is excellent and colors look natural.',
        reviewDate: new Date('2026-08-15')
      },
      {
        id: 'review-020',
        productId: 'elec-005',
        userName: 'Meera Nair',
        userImageUrl: 'https://i.pravatar.cc/150?img=30',
        rating: 4,
        title: 'Great TV',
        comment: 'Very good display and the smart features work smoothly.',
        reviewDate: new Date('2026-08-08')
      },
      {
        id: 'review-021',
        productId: 'elec-005',
        userName: 'Ravi Deshmukh',
        userImageUrl: 'https://i.pravatar.cc/150?img=31',
        rating: 4,
        title: 'Good value',
        comment: 'Good TV for movies and casual gaming.',
        reviewDate: new Date('2026-07-31')
      },
      {
        id: 'review-022',
        productId: 'elec-005',
        userName: 'Ayesha Khan',
        userImageUrl: 'https://i.pravatar.cc/150?img=32',
        rating: 4,
        title: 'Happy with purchase',
        comment: 'Setup was easy and streaming apps work without issues.',
        reviewDate: new Date('2026-07-22')
      }
    ]
  },

  // ============================================================
  // CLOTHING
  // ============================================================

  {
    id: 'cloth-001',
    name: 'Classic Cotton T-Shirt',
    description: 'Soft 100% cotton crew-neck t-shirt suitable for everyday casual wear.',
    price: 799,
    imageUrl: 'https://picsum.photos/seed/tshirt/600/600',
    rating: 4.4,
    reviewCount: 4,
    inStock: true,
    category: 'clothing',
    reviews: [
      {
        id: 'review-023',
        productId: 'cloth-001',
        userName: 'Rahul Sharma',
        userImageUrl: 'https://i.pravatar.cc/150?img=11',
        rating: 5,
        title: 'Very comfortable',
        comment: 'The fabric is soft and breathable. Fits perfectly.',
        reviewDate: new Date('2026-08-21')
      },
      {
        id: 'review-024',
        productId: 'cloth-001',
        userName: 'Vivek Arora',
        userImageUrl: 'https://i.pravatar.cc/150?img=33',
        rating: 4,
        title: 'Good quality',
        comment: 'Nice material and stitching. Good everyday t-shirt.',
        reviewDate: new Date('2026-08-13')
      },
      {
        id: 'review-025',
        productId: 'cloth-001',
        userName: 'Riya Sen',
        userImageUrl: 'https://i.pravatar.cc/150?img=34',
        rating: 4,
        title: 'Nice fit',
        comment: 'Fits well and looks exactly like the pictures.',
        reviewDate: new Date('2026-08-01')
      },
      {
        id: 'review-026',
        productId: 'cloth-001',
        userName: 'Mohit Bansal',
        userImageUrl: 'https://i.pravatar.cc/150?img=35',
        rating: 5,
        title: 'Excellent value',
        comment: 'Great quality for the price.',
        reviewDate: new Date('2026-07-23')
      }
    ]
  },

  {
    id: 'cloth-002',
    name: 'Slim Fit Denim Jeans',
    description: 'Stretch denim jeans with a modern slim fit and durable construction.',
    price: 1999,
    imageUrl: 'https://picsum.photos/seed/jeans/600/600',
    rating: 4.3,
    reviewCount: 3,
    inStock: true,
    category: 'clothing',
    reviews: [
      {
        id: 'review-027',
        productId: 'cloth-002',
        userName: 'Kunal Mehra',
        userImageUrl: 'https://i.pravatar.cc/150?img=36',
        rating: 4,
        title: 'Good fit',
        comment: 'The stretch makes these jeans very comfortable.',
        reviewDate: new Date('2026-08-16')
      },
      {
        id: 'review-028',
        productId: 'cloth-002',
        userName: 'Varun Kapoor',
        userImageUrl: 'https://i.pravatar.cc/150?img=37',
        rating: 5,
        title: 'Exactly what I wanted',
        comment: 'Perfect slim fit and good quality denim.',
        reviewDate: new Date('2026-08-07')
      },
      {
        id: 'review-029',
        productId: 'cloth-002',
        userName: 'Nisha Agarwal',
        userImageUrl: 'https://i.pravatar.cc/150?img=38',
        rating: 4,
        title: 'Nice jeans',
        comment: 'Comfortable and looks great with casual outfits.',
        reviewDate: new Date('2026-07-29')
      }
    ]
  },

  {
    id: 'cloth-003',
    name: 'Lightweight Hoodie',
    description: 'Warm and lightweight fleece hoodie with an adjustable drawstring hood.',
    price: 1499,
    imageUrl: 'https://picsum.photos/seed/hoodie/600/600',
    rating: 4.5,
    reviewCount: 5,
    inStock: true,
    category: 'clothing',
    reviews: [
      {
        id: 'review-030',
        productId: 'cloth-003',
        userName: 'Aman Tiwari',
        userImageUrl: 'https://i.pravatar.cc/150?img=39',
        rating: 5,
        title: 'Super comfortable',
        comment: 'Soft inside and perfect for cool evenings.',
        reviewDate: new Date('2026-08-23')
      },
      {
        id: 'review-031',
        productId: 'cloth-003',
        userName: 'Kavya Reddy',
        userImageUrl: 'https://i.pravatar.cc/150?img=40',
        rating: 4,
        title: 'Good hoodie',
        comment: 'Nice material and the fit is accurate.',
        reviewDate: new Date('2026-08-09')
      },
      {
        id: 'review-032',
        productId: 'cloth-003',
        userName: 'Harsh Vardhan',
        userImageUrl: 'https://i.pravatar.cc/150?img=41',
        rating: 5,
        title: 'Very warm',
        comment: 'Keeps me warm without feeling too heavy.',
        reviewDate: new Date('2026-07-26')
      },
      {
        id: 'review-033',
        productId: 'cloth-003',
        userName: 'Divya Iyer',
        userImageUrl: 'https://i.pravatar.cc/150?img=42',
        rating: 4,
        title: 'Good purchase',
        comment: 'The color and quality are both great.',
        reviewDate: new Date('2026-07-18')
      },
      {
        id: 'review-034',
        productId: 'cloth-003',
        userName: 'Siddharth Jain',
        userImageUrl: 'https://i.pravatar.cc/150?img=43',
        rating: 5,
        title: 'Would buy again',
        comment: 'Comfortable hoodie with excellent stitching.',
        reviewDate: new Date('2026-07-10')
      }
    ]
  },

  {
    id: 'cloth-004',
    name: 'Casual Linen Shirt',
    description: 'Breathable linen-blend shirt designed for a relaxed and stylish casual look.',
    price: 1799,
    imageUrl: 'https://picsum.photos/seed/linenshirt/600/600',
    rating: 4.2,
    reviewCount: 4,
    inStock: true,
    category: 'clothing',
    reviews: [
      {
        id: 'review-035',
        productId: 'cloth-004',
        userName: 'Ritesh Kumar',
        userImageUrl: 'https://i.pravatar.cc/150?img=44',
        rating: 4,
        title: 'Great summer shirt',
        comment: 'Very breathable and lightweight.',
        reviewDate: new Date('2026-08-18')
      },
      {
        id: 'review-036',
        productId: 'cloth-004',
        userName: 'Shreya Das',
        userImageUrl: 'https://i.pravatar.cc/150?img=45',
        rating: 4,
        title: 'Looks stylish',
        comment: 'The relaxed fit looks really good.',
        reviewDate: new Date('2026-08-06')
      },
      {
        id: 'review-037',
        productId: 'cloth-004',
        userName: 'Akash Gupta',
        userImageUrl: 'https://i.pravatar.cc/150?img=46',
        rating: 5,
        title: 'Excellent quality',
        comment: 'Fabric feels premium and the stitching is neat.',
        reviewDate: new Date('2026-07-24')
      },
      {
        id: 'review-038',
        productId: 'cloth-004',
        userName: 'Tanvi Malhotra',
        userImageUrl: 'https://i.pravatar.cc/150?img=47',
        rating: 4,
        title: 'Happy with it',
        comment: 'Nice shirt for casual occasions.',
        reviewDate: new Date('2026-07-16')
      }
    ]
  },

  {
    id: 'cloth-005',
    name: 'Running Sports Shorts',
    description: 'Lightweight quick-dry running shorts with an elastic waistband and zip pocket.',
    price: 999,
    imageUrl: 'https://picsum.photos/seed/sportshorts/600/600',
    rating: 4.5,
    reviewCount: 3,
    inStock: false,
    category: 'clothing',
    reviews: [
      {
        id: 'review-039',
        productId: 'cloth-005',
        userName: 'Yash Verma',
        userImageUrl: 'https://i.pravatar.cc/150?img=48',
        rating: 5,
        title: 'Perfect for running',
        comment: 'Very lightweight and dries quickly.',
        reviewDate: new Date('2026-08-20')
      },
      {
        id: 'review-040',
        productId: 'cloth-005',
        userName: 'Sonia Patel',
        userImageUrl: 'https://i.pravatar.cc/150?img=49',
        rating: 4,
        title: 'Comfortable shorts',
        comment: 'Good fit and the pocket is useful.',
        reviewDate: new Date('2026-08-04')
      },
      {
        id: 'review-041',
        productId: 'cloth-005',
        userName: 'Deepak Soni',
        userImageUrl: 'https://i.pravatar.cc/150?img=50',
        rating: 5,
        title: 'Great for workouts',
        comment: 'Does not restrict movement during exercise.',
        reviewDate: new Date('2026-07-19')
      }
    ]
  },

  // ============================================================
  // HOME & KITCHEN
  // ============================================================

  {
    id: 'home-001',
    name: 'Stainless Steel Cookware Set',
    description: 'Seven-piece stainless steel cookware set suitable for everyday cooking.',
    price: 5499,
    imageUrl: 'https://picsum.photos/seed/cookware/600/600',
    rating: 4.6,
    reviewCount: 5,
    inStock: true,
    category: 'home & kitchen',
    reviews: [
      {
        id: 'review-042',
        productId: 'home-001',
        userName: 'Anil Sharma',
        userImageUrl: 'https://i.pravatar.cc/150?img=51',
        rating: 5,
        title: 'Excellent cookware',
        comment: 'Very sturdy and heats evenly.',
        reviewDate: new Date('2026-08-22')
      },
      {
        id: 'review-043',
        productId: 'home-001',
        userName: 'Monika Jain',
        userImageUrl: 'https://i.pravatar.cc/150?img=52',
        rating: 5,
        title: 'Great quality',
        comment: 'The stainless steel feels premium and durable.',
        reviewDate: new Date('2026-08-15')
      },
      {
        id: 'review-044',
        productId: 'home-001',
        userName: 'Rajiv Nair',
        userImageUrl: 'https://i.pravatar.cc/150?img=53',
        rating: 4,
        title: 'Good set',
        comment: 'Good collection of pots and pans for a small kitchen.',
        reviewDate: new Date('2026-08-07')
      },
      {
        id: 'review-045',
        productId: 'home-001',
        userName: 'Pallavi Rao',
        userImageUrl: 'https://i.pravatar.cc/150?img=54',
        rating: 5,
        title: 'Worth buying',
        comment: 'Easy to clean and looks great in the kitchen.',
        reviewDate: new Date('2026-07-30')
      },
      {
        id: 'review-046',
        productId: 'home-001',
        userName: 'Naveen Kumar',
        userImageUrl: 'https://i.pravatar.cc/150?img=55',
        rating: 4,
        title: 'Solid cookware',
        comment: 'Very happy with the quality so far.',
        reviewDate: new Date('2026-07-21')
      }
    ]
  },

  {
    id: 'home-002',
    name: 'Digital Kitchen Scale',
    description: 'Precise digital kitchen scale with a large LCD display and tare function.',
    price: 899,
    imageUrl: 'https://picsum.photos/seed/kitchenscale/600/600',
    rating: 4.4,
    reviewCount: 4,
    inStock: true,
    category: 'home & kitchen',
    reviews: [
      {
        id: 'review-047',
        productId: 'home-002',
        userName: 'Shalini Gupta',
        userImageUrl: 'https://i.pravatar.cc/150?img=56',
        rating: 5,
        title: 'Very accurate',
        comment: 'The measurements are accurate and the display is easy to read.',
        reviewDate: new Date('2026-08-19')
      },
      {
        id: 'review-048',
        productId: 'home-002',
        userName: 'Aarav Shah',
        userImageUrl: 'https://i.pravatar.cc/150?img=57',
        rating: 4,
        title: 'Useful kitchen tool',
        comment: 'Small, compact and easy to store.',
        reviewDate: new Date('2026-08-11')
      },
      {
        id: 'review-049',
        productId: 'home-002',
        userName: 'Preeti Singh',
        userImageUrl: 'https://i.pravatar.cc/150?img=58',
        rating: 4,
        title: 'Good for baking',
        comment: 'Makes measuring ingredients much easier.',
        reviewDate: new Date('2026-08-01')
      },
      {
        id: 'review-050',
        productId: 'home-002',
        userName: 'Nitin Arora',
        userImageUrl: 'https://i.pravatar.cc/150?img=59',
        rating: 5,
        title: 'Simple and reliable',
        comment: 'Works exactly as expected.',
        reviewDate: new Date('2026-07-23')
      }
    ]
  },

  {
    id: 'home-003',
    name: 'Ceramic Dinner Set',
    description: 'Elegant 16-piece ceramic dinner set including plates, bowls and mugs.',
    price: 3299,
    imageUrl: 'https://picsum.photos/seed/dinnerset/600/600',
    rating: 4.3,
    reviewCount: 3,
    inStock: true,
    category: 'home & kitchen',
    reviews: [
      {
        id: 'review-051',
        productId: 'home-003',
        userName: 'Neelam Kapoor',
        userImageUrl: 'https://i.pravatar.cc/150?img=60',
        rating: 5,
        title: 'Beautiful set',
        comment: 'Looks elegant on the dining table.',
        reviewDate: new Date('2026-08-16')
      },
      {
        id: 'review-052',
        productId: 'home-003',
        userName: 'Vishal Agarwal',
        userImageUrl: 'https://i.pravatar.cc/150?img=61',
        rating: 4,
        title: 'Good quality',
        comment: 'The ceramic feels sturdy and the finish is nice.',
        reviewDate: new Date('2026-08-05')
      },
      {
        id: 'review-053',
        productId: 'home-003',
        userName: 'Radhika Joshi',
        userImageUrl: 'https://i.pravatar.cc/150?img=62',
        rating: 4,
        title: 'Nice dinnerware',
        comment: 'Good looking set for everyday use.',
        reviewDate: new Date('2026-07-20')
      }
    ]
  },

  {
    id: 'home-004',
    name: 'Memory Foam Pillow',
    description: 'Ergonomic memory foam pillow designed to provide comfortable neck support.',
    price: 1299,
    imageUrl: 'https://picsum.photos/seed/pillow/600/600',
    rating: 4.5,
    reviewCount: 5,
    inStock: true,
    category: 'home & kitchen',
    reviews: [
      {
        id: 'review-054',
        productId: 'home-004',
        userName: 'Sanjay Verma',
        userImageUrl: 'https://i.pravatar.cc/150?img=63',
        rating: 5,
        title: 'Very comfortable',
        comment: 'The memory foam provides excellent support.',
        reviewDate: new Date('2026-08-23')
      },
      {
        id: 'review-055',
        productId: 'home-004',
        userName: 'Komal Sharma',
        userImageUrl: 'https://i.pravatar.cc/150?img=64',
        rating: 4,
        title: 'Good pillow',
        comment: 'Took a couple of nights to get used to but now I like it.',
        reviewDate: new Date('2026-08-14')
      },
      {
        id: 'review-056',
        productId: 'home-004',
        userName: 'Tarun Bhatia',
        userImageUrl: 'https://i.pravatar.cc/150?img=65',
        rating: 5,
        title: 'Great support',
        comment: 'Feels supportive without being too hard.',
        reviewDate: new Date('2026-08-06')
      },
      {
        id: 'review-057',
        productId: 'home-004',
        userName: 'Swati Mehra',
        userImageUrl: 'https://i.pravatar.cc/150?img=66',
        rating: 4,
        title: 'Comfortable',
        comment: 'Good quality pillow and cover.',
        reviewDate: new Date('2026-07-27')
      },
      {
        id: 'review-058',
        productId: 'home-004',
        userName: 'Rakesh Kumar',
        userImageUrl: 'https://i.pravatar.cc/150?img=67',
        rating: 5,
        title: 'Worth the price',
        comment: 'Much better than the regular pillows I have used.',
        reviewDate: new Date('2026-07-18')
      }
    ]
  },

  {
    id: 'home-005',
    name: 'Electric Coffee Maker',
    description: 'Programmable coffee maker with a reusable filter and 1.5-liter water reservoir.',
    price: 2799,
    imageUrl: 'https://picsum.photos/seed/coffeemaker/600/600',
    rating: 4.2,
    reviewCount: 4,
    inStock: false,
    category: 'home & kitchen',
    reviews: [
      {
        id: 'review-059',
        productId: 'home-005',
        userName: 'Akshay Jain',
        userImageUrl: 'https://i.pravatar.cc/150?img=68',
        rating: 4,
        title: 'Easy to use',
        comment: 'Makes good coffee and is very simple to operate.',
        reviewDate: new Date('2026-08-17')
      },
      {
        id: 'review-060',
        productId: 'home-005',
        userName: 'Madhuri Rao',
        userImageUrl: 'https://i.pravatar.cc/150?img=69',
        rating: 5,
        title: 'Great morning coffee',
        comment: 'The programmable timer is extremely convenient.',
        reviewDate: new Date('2026-08-09')
      },
      {
        id: 'review-061',
        productId: 'home-005',
        userName: 'Rohit Sinha',
        userImageUrl: 'https://i.pravatar.cc/150?img=70',
        rating: 4,
        title: 'Good coffee maker',
        comment: 'Good performance and easy to clean.',
        reviewDate: new Date('2026-07-29')
      },
      {
        id: 'review-062',
        productId: 'home-005',
        userName: 'Lakshmi Menon',
        userImageUrl: 'https://i.pravatar.cc/150?img=71',
        rating: 4,
        title: 'Happy with it',
        comment: 'Good machine for everyday coffee.',
        reviewDate: new Date('2026-07-15')
      }
    ]
  },

  // ============================================================
  // BOOKS
  // ============================================================

  {
    id: 'book-001',
    name: 'The Art of Programming',
    description: 'A practical introduction to programming concepts, problem solving and software development.',
    price: 699,
    imageUrl: 'https://picsum.photos/seed/programmingbook/600/600',
    rating: 4.7,
    reviewCount: 5,
    inStock: true,
    category: 'books',
    reviews: [
      {
        id: 'review-063',
        productId: 'book-001',
        userName: 'Ankit Raj',
        userImageUrl: 'https://i.pravatar.cc/150?img=72',
        rating: 5,
        title: 'Excellent beginner book',
        comment: 'Explains programming concepts clearly with practical examples.',
        reviewDate: new Date('2026-08-21')
      },
      {
        id: 'review-064',
        productId: 'book-001',
        userName: 'Pankaj Gupta',
        userImageUrl: 'https://i.pravatar.cc/150?img=73',
        rating: 5,
        title: 'Very informative',
        comment: 'A great resource for someone starting programming.',
        reviewDate: new Date('2026-08-13')
      },
      {
        id: 'review-065',
        productId: 'book-001',
        userName: 'Isha Verma',
        userImageUrl: 'https://i.pravatar.cc/150?img=74',
        rating: 4,
        title: 'Good explanations',
        comment: 'Easy to understand and well organized.',
        reviewDate: new Date('2026-08-04')
      },
      {
        id: 'review-066',
        productId: 'book-001',
        userName: 'Naman Arora',
        userImageUrl: 'https://i.pravatar.cc/150?img=75',
        rating: 5,
        title: 'Recommended',
        comment: 'Very useful for building a strong programming foundation.',
        reviewDate: new Date('2026-07-25')
      },
      {
        id: 'review-067',
        productId: 'book-001',
        userName: 'Snehal Patil',
        userImageUrl: 'https://i.pravatar.cc/150?img=76',
        rating: 4,
        title: 'Useful book',
        comment: 'Good mix of theory and examples.',
        reviewDate: new Date('2026-07-17')
      }
    ]
  },

  {
    id: 'book-002',
    name: 'Atomic Habits',
    description: 'A practical guide to building good habits, breaking bad ones and making lasting improvements.',
    price: 599,
    imageUrl: 'https://picsum.photos/seed/habitsbook/600/600',
    rating: 4.8,
    reviewCount: 6,
    inStock: true,
    category: 'books',
    reviews: [
      {
        id: 'review-068',
        productId: 'book-002',
        userName: 'Rohan Sharma',
        userImageUrl: 'https://i.pravatar.cc/150?img=77',
        rating: 5,
        title: 'Life changing',
        comment: 'Simple ideas that are easy to apply in everyday life.',
        reviewDate: new Date('2026-08-24')
      },
      {
        id: 'review-069',
        productId: 'book-002',
        userName: 'Aditi Kapoor',
        userImageUrl: 'https://i.pravatar.cc/150?img=78',
        rating: 5,
        title: 'Very practical',
        comment: 'The examples make the concepts easy to understand.',
        reviewDate: new Date('2026-08-18')
      },
      {
        id: 'review-070',
        productId: 'book-002',
        userName: 'Kartik Singh',
        userImageUrl: 'https://i.pravatar.cc/150?img=79',
        rating: 5,
        title: 'Highly recommended',
        comment: 'One of the best books I have read about habits.',
        reviewDate: new Date('2026-08-11')
      },
      {
        id: 'review-071',
        productId: 'book-002',
        userName: 'Mansi Shah',
        userImageUrl: 'https://i.pravatar.cc/150?img=80',
        rating: 4,
        title: 'Good read',
        comment: 'Some ideas are repetitive but overall very useful.',
        reviewDate: new Date('2026-08-02')
      },
      {
        id: 'review-072',
        productId: 'book-002',
        userName: 'Sahil Jain',
        userImageUrl: 'https://i.pravatar.cc/150?img=81',
        rating: 5,
        title: 'Excellent book',
        comment: 'The small habits approach is very motivating.',
        reviewDate: new Date('2026-07-24')
      },
      {
        id: 'review-073',
        productId: 'book-002',
        userName: 'Nidhi Rao',
        userImageUrl: 'https://i.pravatar.cc/150?img=82',
        rating: 5,
        title: 'Worth reading',
        comment: 'A book I will definitely revisit.',
        reviewDate: new Date('2026-07-14')
      }
    ]
  },

  {
    id: 'book-003',
    name: 'Clean Code',
    description: 'A guide to writing readable, maintainable and professional software code.',
    price: 899,
    imageUrl: 'https://picsum.photos/seed/cleancode/600/600',
    rating: 4.6,
    reviewCount: 4,
    inStock: true,
    category: 'books',
    reviews: [
      {
        id: 'review-074',
        productId: 'book-003',
        userName: 'Vivek Sharma',
        userImageUrl: 'https://i.pravatar.cc/150?img=83',
        rating: 5,
        title: 'Essential for developers',
        comment: 'Great principles for writing maintainable software.',
        reviewDate: new Date('2026-08-20')
      },
      {
        id: 'review-075',
        productId: 'book-003',
        userName: 'Neeraj Gupta',
        userImageUrl: 'https://i.pravatar.cc/150?img=84',
        rating: 4,
        title: 'Very useful',
        comment: 'Some examples feel dated, but the principles remain valuable.',
        reviewDate: new Date('2026-08-08')
      },
      {
        id: 'review-076',
        productId: 'book-003',
        userName: 'Ritika Sen',
        userImageUrl: 'https://i.pravatar.cc/150?img=85',
        rating: 5,
        title: 'Excellent resource',
        comment: 'Helped me rethink how I structure my code.',
        reviewDate: new Date('2026-07-28')
      },
      {
        id: 'review-077',
        productId: 'book-003',
        userName: 'Harshit Agarwal',
        userImageUrl: 'https://i.pravatar.cc/150?img=86',
        rating: 4,
        title: 'Good technical book',
        comment: 'A useful addition to any developer library.',
        reviewDate: new Date('2026-07-19')
      }
    ]
  },

  {
    id: 'book-004',
    name: 'The Psychology of Money',
    description: 'An engaging exploration of how emotions and behavior influence financial decisions.',
    price: 549,
    imageUrl: 'https://picsum.photos/seed/moneybook/600/600',
    rating: 4.7,
    reviewCount: 3,
    inStock: true,
    category: 'books',
    reviews: [
      {
        id: 'review-078',
        productId: 'book-004',
        userName: 'Varun Sharma',
        userImageUrl: 'https://i.pravatar.cc/150?img=87',
        rating: 5,
        title: 'Great perspective',
        comment: 'Makes you think differently about money and wealth.',
        reviewDate: new Date('2026-08-16')
      },
      {
        id: 'review-079',
        productId: 'book-004',
        userName: 'Sakshi Mehta',
        userImageUrl: 'https://i.pravatar.cc/150?img=88',
        rating: 5,
        title: 'Easy to read',
        comment: 'The stories make the financial concepts very accessible.',
        reviewDate: new Date('2026-08-03')
      },
      {
        id: 'review-080',
        productId: 'book-004',
        userName: 'Abhishek Jain',
        userImageUrl: 'https://i.pravatar.cc/150?img=89',
        rating: 4,
        title: 'Very insightful',
        comment: 'Short chapters with plenty of useful insights.',
        reviewDate: new Date('2026-07-22')
      }
    ]
  },

  {
    id: 'book-005',
    name: 'Introduction to Data Structures',
    description: 'A beginner-friendly guide to arrays, linked lists, trees, graphs, stacks and queues.',
    price: 749,
    imageUrl: 'https://picsum.photos/seed/datastructures/600/600',
    rating: 4.4,
    reviewCount: 4,
    inStock: false,
    category: 'books',
    reviews: [
      {
        id: 'review-081',
        productId: 'book-005',
        userName: 'Aakash Verma',
        userImageUrl: 'https://i.pravatar.cc/150?img=90',
        rating: 5,
        title: 'Great for beginners',
        comment: 'Explains data structures in a very straightforward way.',
        reviewDate: new Date('2026-08-14')
      },
      {
        id: 'review-082',
        productId: 'book-005',
        userName: 'Priyanka Das',
        userImageUrl: 'https://i.pravatar.cc/150?img=91',
        rating: 4,
        title: 'Good explanations',
        comment: 'The diagrams make difficult concepts easier to understand.',
        reviewDate: new Date('2026-08-05')
      },
      {
        id: 'review-083',
        productId: 'book-005',
        userName: 'Rishabh Kumar',
        userImageUrl: 'https://i.pravatar.cc/150?img=92',
        rating: 4,
        title: 'Useful for interviews',
        comment: 'Good introduction before moving on to more advanced material.',
        reviewDate: new Date('2026-07-26')
      },
      {
        id: 'review-084',
        productId: 'book-005',
        userName: 'Sweta Singh',
        userImageUrl: 'https://i.pravatar.cc/150?img=93',
        rating: 5,
        title: 'Well structured',
        comment: 'The chapters are arranged logically and are easy to follow.',
        reviewDate: new Date('2026-07-15')
      }
    ]
  },

  // ============================================================
  // SPORTS & FITNESS
  // ============================================================

  {
    id: 'sport-001',
    name: 'Adjustable Dumbbell Set',
    description: 'Space-saving adjustable dumbbells with multiple weight settings for home workouts.',
    price: 4999,
    imageUrl: 'https://picsum.photos/seed/dumbbells/600/600',
    rating: 4.6,
    reviewCount: 5,
    inStock: true,
    category: 'sports & fitness',
    reviews: [
      {
        id: 'review-085',
        productId: 'sport-001',
        userName: 'Ravi Kumar',
        userImageUrl: 'https://i.pravatar.cc/150?img=94',
        rating: 5,
        title: 'Perfect for home workouts',
        comment: 'Saves a lot of space compared with buying multiple dumbbells.',
        reviewDate: new Date('2026-08-22')
      },
      {
        id: 'review-086',
        productId: 'sport-001',
        userName: 'Aman Gupta',
        userImageUrl: 'https://i.pravatar.cc/150?img=95',
        rating: 5,
        title: 'Excellent build',
        comment: 'Feels sturdy and the weight adjustment is simple.',
        reviewDate: new Date('2026-08-15')
      },
      {
        id: 'review-087',
        productId: 'sport-001',
        userName: 'Riya Sharma',
        userImageUrl: 'https://i.pravatar.cc/150?img=96',
        rating: 4,
        title: 'Good equipment',
        comment: 'Great for beginners and intermediate workouts.',
        reviewDate: new Date('2026-08-07')
      },
      {
        id: 'review-088',
        productId: 'sport-001',
        userName: 'Suresh Patel',
        userImageUrl: 'https://i.pravatar.cc/150?img=97',
        rating: 5,
        title: 'Very convenient',
        comment: 'Easy to change weights between exercises.',
        reviewDate: new Date('2026-07-29')
      },
      {
        id: 'review-089',
        productId: 'sport-001',
        userName: 'Kriti Jain',
        userImageUrl: 'https://i.pravatar.cc/150?img=98',
        rating: 4,
        title: 'Worth buying',
        comment: 'Good quality and much more convenient than a full dumbbell rack.',
        reviewDate: new Date('2026-07-18')
      }
    ]
  },

  {
    id: 'sport-002',
    name: 'Yoga Mat',
    description: 'Non-slip 6mm exercise mat with cushioned support for yoga, stretching and workouts.',
    price: 899,
    imageUrl: 'https://picsum.photos/seed/yogamat/600/600',
    rating: 4.5,
    reviewCount: 4,
    inStock: true,
    category: 'sports & fitness',
    reviews: [
      {
        id: 'review-090',
        productId: 'sport-002',
        userName: 'Megha Singh',
        userImageUrl: 'https://i.pravatar.cc/150?img=99',
        rating: 5,
        title: 'Great yoga mat',
        comment: 'Good grip and enough cushioning for daily yoga.',
        reviewDate: new Date('2026-08-19')
      },
      {
        id: 'review-091',
        productId: 'sport-002',
        userName: 'Pooja Verma',
        userImageUrl: 'https://i.pravatar.cc/150?img=1',
        rating: 4,
        title: 'Good quality',
        comment: 'Comfortable and does not slide around easily.',
        reviewDate: new Date('2026-08-10')
      },
      {
        id: 'review-092',
        productId: 'sport-002',
        userName: 'Nisha Gupta',
        userImageUrl: 'https://i.pravatar.cc/150?img=2',
        rating: 5,
        title: 'Very comfortable',
        comment: 'Perfect thickness for stretching and floor exercises.',
        reviewDate: new Date('2026-08-01')
      },
      {
        id: 'review-093',
        productId: 'sport-002',
        userName: 'Karan Singh',
        userImageUrl: 'https://i.pravatar.cc/150?img=3',
        rating: 4,
        title: 'Nice mat',
        comment: 'Good value for money.',
        reviewDate: new Date('2026-07-21')
      }
    ]
  },

  {
    id: 'sport-003',
    name: 'Insulated Water Bottle',
    description: 'Stainless steel insulated bottle that keeps drinks cold for up to 24 hours.',
    price: 1299,
    imageUrl: 'https://picsum.photos/seed/waterbottle/600/600',
    rating: 4.4,
    reviewCount: 3,
    inStock: true,
    category: 'sports & fitness',
    reviews: [
      {
        id: 'review-094',
        productId: 'sport-003',
        userName: 'Rohan Mehta',
        userImageUrl: 'https://i.pravatar.cc/150?img=4',
        rating: 5,
        title: 'Keeps water cold',
        comment: 'The insulation works really well even during long workouts.',
        reviewDate: new Date('2026-08-18')
      },
      {
        id: 'review-095',
        productId: 'sport-003',
        userName: 'Simran Kaur',
        userImageUrl: 'https://i.pravatar.cc/150?img=5',
        rating: 4,
        title: 'Good bottle',
        comment: 'Looks good and does not leak.',
        reviewDate: new Date('2026-08-06')
      },
      {
        id: 'review-096',
        productId: 'sport-003',
        userName: 'Vikas Sharma',
        userImageUrl: 'https://i.pravatar.cc/150?img=6',
        rating: 4,
        title: 'Useful for gym',
        comment: 'Good size and keeps drinks cool for a long time.',
        reviewDate: new Date('2026-07-25')
      }
    ]
  },

  {
    id: 'sport-004',
    name: 'Resistance Band Set',
    description: 'Five resistance bands with different resistance levels for strength and mobility training.',
    price: 699,
    imageUrl: 'https://picsum.photos/seed/resistancebands/600/600',
    rating: 4.3,
    reviewCount: 4,
    inStock: true,
    category: 'sports & fitness',
    reviews: [
      {
        id: 'review-097',
        productId: 'sport-004',
        userName: 'Arjun Rao',
        userImageUrl: 'https://i.pravatar.cc/150?img=7',
        rating: 5,
        title: 'Great workout equipment',
        comment: 'Multiple resistance levels make this set very versatile.',
        reviewDate: new Date('2026-08-20')
      },
      {
        id: 'review-098',
        productId: 'sport-004',
        userName: 'Shweta Sharma',
        userImageUrl: 'https://i.pravatar.cc/150?img=8',
        rating: 4,
        title: 'Good bands',
        comment: 'Perfect for home workouts and easy to carry around.',
        reviewDate: new Date('2026-08-12')
      },
      {
        id: 'review-099',
        productId: 'sport-004',
        userName: 'Naveen Gupta',
        userImageUrl: 'https://i.pravatar.cc/150?img=9',
        rating: 4,
        title: 'Useful set',
        comment: 'The bands feel durable and provide good resistance.',
        reviewDate: new Date('2026-08-02')
      },
      {
        id: 'review-100',
        productId: 'sport-004',
        userName: 'Isha Kapoor',
        userImageUrl: 'https://i.pravatar.cc/150?img=10',
        rating: 4,
        title: 'Good for beginners',
        comment: 'A nice inexpensive way to start resistance training.',
        reviewDate: new Date('2026-07-17')
      }
    ]
  },

  {
    id: 'sport-005',
    name: 'Running Shoes',
    description: 'Lightweight running shoes with responsive cushioning and breathable mesh upper.',
    price: 3499,
    imageUrl: 'https://picsum.photos/seed/runningshoes/600/600',
    rating: 4.6,
    reviewCount: 6,
    inStock: false,
    category: 'sports & fitness',
    reviews: [
      {
        id: 'review-101',
        productId: 'sport-005',
        userName: 'Vivek Kumar',
        userImageUrl: 'https://i.pravatar.cc/150?img=11',
        rating: 5,
        title: 'Very comfortable',
        comment: 'Excellent cushioning and comfortable even on long runs.',
        reviewDate: new Date('2026-08-23')
      },
      {
        id: 'review-102',
        productId: 'sport-005',
        userName: 'Rahul Verma',
        userImageUrl: 'https://i.pravatar.cc/150?img=12',
        rating: 5,
        title: 'Great running shoes',
        comment: 'Lightweight and provides good support.',
        reviewDate: new Date('2026-08-16')
      },
      {
        id: 'review-103',
        productId: 'sport-005',
        userName: 'Ananya Singh',
        userImageUrl: 'https://i.pravatar.cc/150?img=13',
        rating: 4,
        title: 'Good shoes',
        comment: 'Comfortable and looks stylish too.',
        reviewDate: new Date('2026-08-09')
      },
      {
        id: 'review-104',
        productId: 'sport-005',
        userName: 'Mohit Sharma',
        userImageUrl: 'https://i.pravatar.cc/150?img=14',
        rating: 5,
        title: 'Excellent for running',
        comment: 'Used them for several runs and they feel great.',
        reviewDate: new Date('2026-08-01')
      },
      {
        id: 'review-105',
        productId: 'sport-005',
        userName: 'Priya Nair',
        userImageUrl: 'https://i.pravatar.cc/150?img=15',
        rating: 4,
        title: 'Nice shoes',
        comment: 'Good cushioning and breathable material.',
        reviewDate: new Date('2026-07-24')
      },
      {
        id: 'review-106',
        productId: 'sport-005',
        userName: 'Sahil Kumar',
        userImageUrl: 'https://i.pravatar.cc/150?img=16',
        rating: 5,
        title: 'Worth the price',
        comment: 'Excellent shoes for daily jogging and running.',
        reviewDate: new Date('2026-07-13')
      }
    ]
  }


    ],
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

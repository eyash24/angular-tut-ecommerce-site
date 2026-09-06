export type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  image_url: string;
  rating?: number;
  reviewCount?: number;
  inStock: boolean;
  quantity: number;
  category: string;
  created_at: string;
  user_id: number;
};

export type ProductCategoryListResponse = {
  categories: string[];
};

export type PaginatedProductResponse = {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
  has_more: boolean;
};

export type ProductStatus = {
  inStock: boolean;
};

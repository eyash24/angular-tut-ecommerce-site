export type UserReview = {
  id: number;
  productId: number;
  userId: number;
  userName: string;
  userImageUrl: string;
  rating: number;
  title: string;
  comment: string;
  reviewDate: Date;
};

export type AddReviewParams = Pick<UserReview, 'title' | 'comment' | 'rating'>;

export type ApiReview = {
  id: number;
  title: string;
  rating: number;
  comment: string;
  product_id: number;
  user_id: number;
  created_at: string;
};

export type PaginatedReviewResponse = {
  reviews: ApiReview[];
  total: number;
  skip: number;
  limit: number;
  has_more: boolean;
};

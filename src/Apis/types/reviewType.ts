export interface User {
  _id: string;
  name: string;
}

export interface ReviewItem {
  _id: string;
  review: string;
  rating: number;
  product: string;
  user: User;
  createdAt: string;
  updatedAt: string;
}

export interface Metadata {
  currentPage: number;
  numberOfPages: number;
  limit: number;
}

export interface ReviewsResponse {
  results: number;
  metadata: Metadata;
  data: ReviewItem[];
}

export interface CreateReviewPayload {
  review: string;
  rating: number;
  product: string;
}

export interface MutationResponse {
  status?: string;
  message?: string;
  data?: ReviewItem;
}
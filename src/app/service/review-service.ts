import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { API_BASE_URL } from '../api';
import { ApiReview } from '../models/user-review';

@Injectable({
  providedIn: 'root',
})
export class ReviewService {
  private http = inject(HttpClient);
  private reviewsUrl = `${API_BASE_URL}/api/reviews`;

  create(productId: number, title: string, rating: number, comment: string) {
    return this.http.post<ApiReview>(this.reviewsUrl, {
      product_id: productId,
      title,
      rating,
      comment,
    });
  }
}

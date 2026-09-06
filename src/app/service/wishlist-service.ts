import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { API_BASE_URL } from '../api';
import { PaginatedProductResponse } from '../models/products';

@Injectable({
  providedIn: 'root',
})
export class WishlistService {
  private http = inject(HttpClient);
  private wishlistUrl = `${API_BASE_URL}/api/wishlist`;

  getItems(skip = 0, limit = 10) {
    return this.http.get<PaginatedProductResponse>(`${this.wishlistUrl}/items`, {
      params: { skip, limit },
    });
  }

  add(productId: number) {
    return this.http.post(`${this.wishlistUrl}`, { product_id: productId });
  }

  remove(productId: number) {
    return this.http.delete(`${this.wishlistUrl}/${productId}`);
  }
}

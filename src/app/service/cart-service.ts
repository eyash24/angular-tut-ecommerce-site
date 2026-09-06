import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { API_BASE_URL } from '../api';
import { ApiCartItem } from '../models/carts';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private http = inject(HttpClient);
  private cartUrl = `${API_BASE_URL}/api/cart`;

  getItems() {
    return this.http.get<ApiCartItem[]>(`${this.cartUrl}/items`);
  }

  add(productId: number, quantity: number) {
    return this.http.post(`${this.cartUrl}`, {
      product_id: productId,
      quantity,
    });
  }

  update(productId: number, quantity: number) {
    return this.http.patch(`${this.cartUrl}/${productId}`, { quantity });
  }

  remove(productId: number) {
    return this.http.delete(`${this.cartUrl}/${productId}`, {
      body: { quantity: 1 },
    });
  }
}

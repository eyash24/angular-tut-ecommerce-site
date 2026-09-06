import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { API_BASE_URL } from '../api';
import { OrderManageResponse } from '../models/order';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private http = inject(HttpClient);

  createOrderManage(payload: {
    items: number;
    total_price: number;
    payment_status: boolean;
    payment_mode: string;
    shipping_id: number;
  }) {
    return this.http.post<OrderManageResponse>(
      `${API_BASE_URL}/api/orderManage`,
      payload,
    );
  }

  createOrderLine(orderManageId: number, productId: number, quantity: number) {
    return this.http.post(`${API_BASE_URL}/api/orders/${orderManageId}`, {
      product_id: productId,
      quantity,
    });
  }
}

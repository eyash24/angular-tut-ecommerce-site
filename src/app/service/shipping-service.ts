import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { API_BASE_URL } from '../api';
import {
  ShippingInformation,
  ShippingInformationResponse,
} from '../models/order';

@Injectable({
  providedIn: 'root',
})
export class ShippingService {
  private http = inject(HttpClient);
  private shippingUrl = `${API_BASE_URL}/api/shippingInformation`;

  create(shipping: ShippingInformation) {
    return this.http.post<ShippingInformationResponse>(this.shippingUrl, shipping);
  }
}

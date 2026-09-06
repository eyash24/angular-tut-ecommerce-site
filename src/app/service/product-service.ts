import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { API_BASE_URL } from '../api';
import {
  PaginatedProductResponse,
  Product,
  ProductCategoryListResponse,
  ProductStatus,
} from '../models/products';
import { PaginatedReviewResponse } from '../models/user-review';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private http = inject(HttpClient);
  private productsUrl = `${API_BASE_URL}/api/products`;

  getCategoryList() {
    return this.http.get<ProductCategoryListResponse>(
      `${this.productsUrl}/all/categories`,
    );
  }

  getProductCategory(cat: string, limit = 25, skip = 0) {
    return this.http.get<PaginatedProductResponse>(
      `${this.productsUrl}/category/${cat}`,
      { params: { skip, limit } },
    );
  }

  getAllProduct(limit = 25, skip = 0) {
    return this.http.get<PaginatedProductResponse>(
      `${this.productsUrl}/all/proc`,
      { params: { skip, limit } },
    );
  }

  getProduct(productId: number) {
    return this.http.get<Product>(`${this.productsUrl}/${productId}`);
  }

  getProductStatus(productId: number) {
    return this.http.get<ProductStatus>(
      `${this.productsUrl}/instock/${productId}`,
    );
  }

  getProductReviews(productId: number, limit = 10, skip = 0) {
    return this.http.get<PaginatedReviewResponse>(
      `${this.productsUrl}/reviews/${productId}`,
      { params: { skip, limit } },
    );
  }

  search(searchTerm: string, limit = 10, skip = 0) {
    return this.http.get<PaginatedProductResponse>(
      `${API_BASE_URL}/search/${searchTerm}`,
      { params: { skip, limit } },
    );
  }
}

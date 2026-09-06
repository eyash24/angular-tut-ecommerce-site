import { Component, input, inject, computed, numberAttribute, effect, untracked } from '@angular/core';
import { EcommerceStore } from '../../ecommerce-store';
import { BackButton } from '../../components/back-button/back-button';
import { ProductInfo } from './product-info/product-info';
import { ViewReview } from './view-review/view-review';

@Component({
  selector: 'app-view-product-detail',
  imports: [BackButton, ProductInfo, ViewReview],
  templateUrl: './view-product-detail.html',
  styleUrl: './view-product-detail.scss',
})
export default class ViewProductDetail {
  productId = input.required<number, string | number>({
    transform: numberAttribute
  });

  store = inject(EcommerceStore);

  constructor() {
    effect(() => {
      const productId = this.productId();

      untracked(() => {
        this.store.loadSelectedProduct(productId);
      });
    });
  }

  backRoute = computed(() => `/products/${this.store.category()}`);
}

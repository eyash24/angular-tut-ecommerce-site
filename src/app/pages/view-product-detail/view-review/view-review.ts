import { EcommerceStore } from '../../../ecommerce-store';
import { RatingSummary } from '../rating-summary/rating-summary';
import { ViewReviewItem } from '../view-review-item/view-review-item';
import { Product } from './../../../models/products';
import { Component, input, computed, inject } from '@angular/core';
import { MatButton } from "@angular/material/button";
import { WriteReview } from '../write-review/write-review';

@Component({
  selector: 'app-view-review',
  imports: [RatingSummary, ViewReviewItem, MatButton, WriteReview],
  templateUrl: './view-review.html',
  styleUrl: './view-review.scss',
})
export class ViewReview {
  product = input.required<Product>();
  store = inject(EcommerceStore)

  sortedReviews = computed(() => {
    return [...this.product().reviews].sort((a,b) => b.reviewDate.getTime() - a.reviewDate.getTime())
  })
}

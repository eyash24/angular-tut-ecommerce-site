import { EcommerceStore } from '../../../ecommerce-store';
import { RatingSummary } from '../rating-summary/rating-summary';
import { ViewReviewItem } from '../view-review-item/view-review-item';
import { Component, inject } from '@angular/core';
import { MatButton } from "@angular/material/button";
import { WriteReview } from '../write-review/write-review';
import { ViewPanel } from '../../../directives/view-panel';

@Component({
  selector: 'app-view-review',
  imports: [RatingSummary, ViewReviewItem, MatButton, WriteReview, ViewPanel],
  templateUrl: './view-review.html',
  styleUrl: './view-review.scss',
})
export class ViewReview {
  store = inject(EcommerceStore)
}

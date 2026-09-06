import { StarRating } from '../../../components/star-rating/star-rating';
import { Component, computed, inject } from '@angular/core';
import { EcommerceStore } from '../../../ecommerce-store';

@Component({
  selector: 'app-rating-summary',
  imports: [StarRating],
  templateUrl: './rating-summary.html',
  styleUrl: './rating-summary.scss',
})
export class RatingSummary {
  store = inject(EcommerceStore);

  totalReviews = computed(() => this.store.productReviews().length);

  ratingBreakdown = computed(() => {
    const reviews = this.store.productReviews();
    const total = reviews.length;

    if (total === 0)
      return [5,4,3,2,1].map((stars)=> ({
        stars,
        count: 0,
        percentage:0,
      }))

    return [5,4,3,2,1].map((stars) => {
      const count = reviews.filter((review) => review.rating === stars).length;
      return {
        stars,
        count,
        percentage: (count / total) *100,
      }
    });
  })
}

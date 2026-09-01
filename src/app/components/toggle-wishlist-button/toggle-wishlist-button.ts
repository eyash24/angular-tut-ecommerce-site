import { EcommerceStore } from './../../ecommerce-store';
import { Component, inject, computed, input } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { Product } from '../../models/products';
import { MatIconButton } from '@angular/material/button';

@Component({
  selector: 'app-toggle-wishlist-button',
  imports: [MatIcon, MatIconButton],
  templateUrl: './toggle-wishlist-button.html',
  styleUrl: './toggle-wishlist-button.scss',
})
export class ToggleWishlistButton {

  product = input.required<Product>();

  store = inject(EcommerceStore);

  isInWishlist = computed(() => this.store.wishlistItems().find(p => p.id === this.product().id))

  toggleWishlist(product: Product) {
    if (this.isInWishlist()){
      this.store.removeFromWishlist(product)
    } else {
      this.store.addToWishList(product);
    }
  }
}

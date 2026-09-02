import { MatIconButton } from '@angular/material/button';
import { QtySelector } from '../../components/qty-selector/qty-selector';
import { EcommerceStore } from '../../ecommerce-store';
import { CartItem } from './../../models/carts';
import { Component, input, inject, computed } from '@angular/core';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-show-cart-item',
  imports: [QtySelector, MatIconButton, MatIcon],
  templateUrl: './show-cart-item.html',
  styleUrl: './show-cart-item.scss',
})
export class ShowCartItem {
  store = inject(EcommerceStore)
  item = input.required<CartItem>();
  total = computed(() => (this.item().product.price * this.item().quantity).toFixed(2))
}

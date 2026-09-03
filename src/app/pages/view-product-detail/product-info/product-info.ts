import { TitleCasePipe } from '@angular/common';
import { Product } from './../../../models/products';
import { Component, input, signal, inject } from '@angular/core';
import { StockStatus } from '../stock-status/stock-status';
import { QtySelector } from '../../../components/qty-selector/qty-selector';
import { EcommerceStore } from '../../../ecommerce-store';
import { MatIcon } from '@angular/material/icon';
import { ToggleWishlistButton } from '../../../components/toggle-wishlist-button/toggle-wishlist-button';
import { MatIconButton, MatAnchor } from "@angular/material/button";

@Component({
  selector: 'app-product-info',
  imports: [
    TitleCasePipe,
    StockStatus,
    QtySelector,
    MatIcon,
    ToggleWishlistButton,
    MatIconButton,
    MatAnchor
],
  templateUrl: './product-info.html',
  styleUrl: './product-info.scss',
})
export class ProductInfo {
  product = input.required<Product>();
  quantity = signal(1);
  store = inject(EcommerceStore)
}

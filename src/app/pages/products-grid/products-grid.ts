import { Product } from './../../models/products';
import { Component, input, signal, inject } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { ProductCard } from "../../components/product-card/product-card";
import { MatSidenavContainer, MatSidenavContent, MatSidenav } from '@angular/material/sidenav';
import { MatNavList, MatListItem, MatListItemTitle } from '@angular/material/list';
import { TitleCasePipe } from '@angular/common';
import { EcommerceStore } from '../../ecommerce-store';

@Component({
  selector: 'app-products-grid',
  imports: [
    RouterOutlet,
    ProductCard,
    MatSidenav,
    MatSidenavContainer,
    MatSidenavContent,
    MatNavList,
    MatListItem,
    MatListItemTitle,
    RouterLink,
    TitleCasePipe
  ],
  templateUrl: './products-grid.html',
  styleUrl: './products-grid.scss',
})
export default class ProductsGrid {
  category = input<string>('all');

  store = inject(EcommerceStore);


  categories = signal<string[]>(['all', 'electronics', 'clothing', 'home & kitchen', 'books', 'sports & fitness'])

  constructor() {
    this.store.setCategory(this.category);
  }
}

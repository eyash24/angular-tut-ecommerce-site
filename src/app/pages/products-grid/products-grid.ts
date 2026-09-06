import { Component, input, signal, inject, OnInit, effect } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { ProductCard } from "../../components/product-card/product-card";
import { MatSidenavContainer, MatSidenavContent, MatSidenav } from '@angular/material/sidenav';
import { MatNavList, MatListItem, MatListItemTitle } from '@angular/material/list';
import { TitleCasePipe } from '@angular/common';
import { EcommerceStore } from '../../ecommerce-store';
import { ToggleWishlistButton } from '../../components/toggle-wishlist-button/toggle-wishlist-button';
import { ProductService } from '../../service/product-service';
import { ProductCategoryListResponse, Product, PaginatedProductResponse } from '../../models/products';
import { SearchBarService } from '../../service/search-bar-service';

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
    TitleCasePipe,
    ToggleWishlistButton
  ],
  templateUrl: './products-grid.html',
  styleUrl: './products-grid.scss',
})
export default class ProductsGrid implements OnInit {

  category = input<string>('all');

  store = inject(EcommerceStore);
  productService = inject(ProductService);
  searchBarService = inject(SearchBarService);

  categories = signal<string[]>([]);
  productList = signal<Product[]>([]);

  constructor() {
    effect(() => {
      const category = this.category();
      const searchTerm = this.searchBarService.searchTerm();

      this.store.setCategory(category);

      if (searchTerm) {
        this.searchProducts(searchTerm);
        return;
      }

      this.getProduct(category);
    });
  }

  ngOnInit(): void {

    this.productService.getCategoryList()
      .subscribe({
        next: (response: ProductCategoryListResponse) => {
          this.categories.set([
            'all',
            ...response.categories
          ]);
        },
        error: (err) => {
          console.error(err);
        }
      });
  }

  getProduct(
    cat: string,
    limit: number = 25,
    skip: number = 0
  ): void {

    const request$ =
      cat.toLowerCase() === 'all'
        ? this.productService.getAllProduct(limit, skip)
        : this.productService.getProductCategory(cat, limit, skip);

    request$.subscribe({
      next: (response: PaginatedProductResponse) => {
        this.productList.set(response.products);
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  searchProducts(searchTerm: string, limit = 10, skip = 0): void {
    this.productService.search(searchTerm, limit, skip).subscribe({
      next: (response: PaginatedProductResponse) => {
        this.productList.set(response.products);
      },
      error: (err) => {
        console.error(err);
      }
    });
  }
}

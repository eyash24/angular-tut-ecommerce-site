import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BackButton } from '../../components/back-button/back-button';
import { EcommerceStore } from '../../ecommerce-store';
import { ProductCard } from '../../components/product-card/product-card';
import { MatIcon } from '@angular/material/icon';
import { MatIconButton } from '@angular/material/button';


@Component({
  selector: 'app-my-wishlist',
  imports: [RouterOutlet, BackButton, ProductCard, MatIcon, MatIconButton],
  templateUrl: './my-wishlist.html',
  styleUrl: './my-wishlist.scss',
})
export default class MyWishlist {
  store = inject(EcommerceStore)
}

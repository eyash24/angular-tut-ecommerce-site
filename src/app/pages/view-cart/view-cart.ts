import { ListCartItems } from './list-cart-items/list-cart-items';
import { Component } from '@angular/core';
import { BackButton } from '../../components/back-button/back-button';

@Component({
  selector: 'app-view-cart',
  imports: [BackButton, ListCartItems],
  templateUrl: './view-cart.html',
  styleUrl: './view-cart.scss',
})
export default class ViewCart {

}

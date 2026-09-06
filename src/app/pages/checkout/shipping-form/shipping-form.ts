import { Component, inject } from '@angular/core';
import { ViewPanel } from '../../../directives/view-panel';
import { MatIcon } from '@angular/material/icon';
import { MatInput } from '@angular/material/input';
import { MatFormField } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { CheckoutService } from '../../../service/checkout-service';

@Component({
  selector: 'app-shipping-form',
  imports: [ViewPanel, MatIcon, MatInput, MatFormField, ReactiveFormsModule],
  templateUrl: './shipping-form.html',
  styleUrl: './shipping-form.scss',
})
export class ShippingForm {
  checkoutService = inject(CheckoutService);
  shippingForm = this.checkoutService.shippingForm;
}

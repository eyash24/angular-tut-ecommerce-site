import { Injectable, inject, signal } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class CheckoutService {
  private fb = inject(NonNullableFormBuilder);

  paymentMode = signal('stripe');

  shippingForm = this.fb.group({
    first_name: ['', [Validators.required, Validators.minLength(1)]],
    last_name: [''],
    address: ['', [Validators.required, Validators.minLength(10)]],
    city: ['', Validators.required],
    state: ['', Validators.required],
    zip: ['', Validators.required],
  });
}

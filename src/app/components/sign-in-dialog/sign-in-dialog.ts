import { Component, inject, signal } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MAT_DIALOG_DATA, MatDialog, MatDialogClose, MatDialogRef } from '@angular/material/dialog';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormField, MatPrefix, MatSuffix } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatButton, MatIconButton } from '@angular/material/button';
import { SignInParams } from '../../models/user';
import { EcommerceStore } from '../../ecommerce-store';
import { SignUpDialog } from '../sign-up-dialog/sign-up-dialog';

@Component({
  selector: 'app-sign-in-dialog',
  imports: [
    MatIcon,
    MatDialogClose,
    MatFormField,
    MatPrefix,
    MatSuffix,
    MatInput,
    MatButton,
    MatIconButton,
    ReactiveFormsModule
  ],
  templateUrl: './sign-in-dialog.html',
  styleUrl: './sign-in-dialog.scss',
})
export class SignInDialog {

  fb = inject(NonNullableFormBuilder);
  store = inject(EcommerceStore);

  data = inject<{checkout: boolean}>(MAT_DIALOG_DATA);

  dialogRef = inject(MatDialogRef);
  matDialog = inject(MatDialog);

  passwordVisible = signal(false)

  signInForm = this.fb.group({
    email: ['TestEmail2@test.com', [Validators.required, Validators.email]],
    password: ['TestPassword2!', [Validators.required, Validators.minLength(8)]]
  });

  signIn() {
    if (!this.signInForm.valid) {
      this.signInForm.markAllAsTouched()
      return;
    }

    const { email, password } = this.signInForm.value;

    this.store.signIn({ email, password, checkout: this.data?.checkout, dialogId: this.dialogRef.id } as SignInParams);

  }

  openSignUpDialog() {
    this.dialogRef.close();
    this.matDialog.open(SignUpDialog, {
      disableClose: true,
      data: {
        checkout: this.data?.checkout
      }
    })
  }
}

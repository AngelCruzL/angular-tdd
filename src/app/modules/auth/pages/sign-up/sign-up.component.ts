import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';

import { UserService } from '../../../../core/services/user.service';
import { passwordMatchValidator } from '../../../auth/validators';
import { SignUpFormBody } from 'src/app/modules/auth/types';
import { UniqueEmailValidator } from '../../validators/unique-email.validator';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent implements OnInit {
  signUpForm!: FormGroup;
  isSendingHttpRequest = false;
  isSignUpSuccessful = false;

  #userService = inject(UserService);
  #formBuilder = inject(FormBuilder);
  #uniqueEmailValidator = inject(UniqueEmailValidator);

  get usernameError(): string | void {
    const field = this.signUpForm.get('username');
    if (field?.errors && (field?.touched || field?.dirty)) {
      if (field?.errors?.['required']) return 'Username is required';
      else return 'Username must be at least 4 characters long';
    }

    return;
  }

  get emailError(): string | void {
    const field = this.signUpForm.get('email');
    if (field?.errors && (field?.touched || field?.dirty)) {
      if (field?.errors?.['required']) return 'Email is required';
      else if (field?.errors?.['email'])
        return 'Invalid email format, please use a valid email address';
      else if (field?.errors?.['uniqueEmail'])
        return 'This email is already taken, please use a different email';
      else if (field?.errors?.['backendError'])
        return field?.errors?.['backendError'];
    }

    return;
  }

  get passwordError(): string | void {
    const field = this.signUpForm.get('password');
    if (field?.errors && (field?.touched || field?.dirty)) {
      if (field?.errors?.['required']) return 'Password is required';
      else if (field?.errors?.['pattern'])
        return 'Password must have at least 8 characters, one lowercase, one uppercase and one number';
    }

    return;
  }

  get confirmPasswordError(): string | void {
    if (
      this.signUpForm?.errors &&
      (this.signUpForm?.touched || this.signUpForm?.dirty)
    ) {
      if (this.signUpForm?.errors?.['passwordMatch'])
        return 'Password mismatch, please make sure the password and confirm password fields have the same value';
    }

    return;
  }

  ngOnInit(): void {
    this.signUpForm = this.#formBuilder.group(
      {
        username: ['', [Validators.required, Validators.minLength(4)]],
        email: [
          '',
          {
            validators: [Validators.required, Validators.email],
            asyncValidators: [
              this.#uniqueEmailValidator.validate.bind(
                this.#uniqueEmailValidator
              ),
            ],
            updateOn: 'blur',
          },
        ],
        password: [
          '',
          [
            Validators.required,
            Validators.pattern(
              /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/
            ),
          ],
        ],
        confirmPassword: [''],
      },
      { validators: passwordMatchValidator }
    );
  }

  onSubmit(): void {
    const { username, email, password } = this.signUpForm
      .value as SignUpFormBody;

    this.isSendingHttpRequest = true;
    this.#userService.signUp({ username, email, password }).subscribe({
      next: () => {
        this.isSendingHttpRequest = false;
        this.isSignUpSuccessful = true;
      },
      error: (httpError: HttpErrorResponse) => {
        this.isSendingHttpRequest = false;
        const emailValidationErrorMsg =
          httpError.error?.validationErrors?.email;
        this.signUpForm
          .get('email')
          ?.setErrors({ backendError: emailValidationErrorMsg });
      },
    });
  }

  isDisabled(): boolean {
    const formFilled =
      this.signUpForm.get('username')?.value &&
      this.signUpForm.get('email')?.value &&
      this.signUpForm.get('password')?.value &&
      this.signUpForm.get('confirmPassword')?.value;

    const validationError =
      this.usernameError ||
      this.emailError ||
      this.passwordError ||
      this.confirmPasswordError;

    // return !formFilled || validationError ? true : false;
    return !!(!formFilled || validationError);
  }
}

import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { UserService } from '../core/services/user.service';
import { passwordMatchValidator } from '../core/validators';
import { SignUpFormBody } from '../core/types';
import { UniqueEmailValidator } from '../core/validators/unique-email.validator';

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
    this.#userService.signUp({ username, email, password }).subscribe(() => {
      this.isSendingHttpRequest = false;
      this.isSignUpSuccessful = true;
    });
  }

  isDisabled(): boolean {
    return this.signUpForm.get('password')?.value
      ? this.signUpForm.get('password')?.value !==
          this.signUpForm.get('confirmPassword')?.value
      : true;
  }
}

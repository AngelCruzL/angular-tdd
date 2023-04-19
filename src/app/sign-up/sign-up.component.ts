import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { UserService } from '../core/services/user.service';

type SignUpFormBody = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
};

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
      else return 'Invalid email format, please use a valid email address';
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

  ngOnInit(): void {
    this.signUpForm = this.#formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(4)]],
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/),
        ],
      ],
      confirmPassword: [''],
    });
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

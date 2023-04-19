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

  ngOnInit(): void {
    this.signUpForm = this.#formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(4)]],
      email: [''],
      password: [''],
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

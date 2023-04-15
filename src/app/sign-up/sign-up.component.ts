import { Component, inject } from '@angular/core';
import { UserService } from '../core/services/user.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent {
  username = '';
  email = '';
  password = '';
  confirmPassword = '';
  isSendingHttpRequest = false;
  isSignUpSuccessful = false;

  #userService = inject(UserService);

  onChangeUsername(event: Event): void {
    this.username = (event.target as HTMLInputElement).value;
  }

  onChangeEmail(event: Event): void {
    this.email = (event.target as HTMLInputElement).value;
  }

  onChangePassword(event: Event): void {
    this.password = (event.target as HTMLInputElement).value;
  }

  onChangeConfirmPassword(event: Event): void {
    this.confirmPassword = (event.target as HTMLInputElement).value;
  }

  onSubmit(): void {
    this.isSendingHttpRequest = true;
    this.#userService
      .signUp({
        username: this.username,
        email: this.email,
        password: this.password,
      })
      .subscribe(() => {
        this.isSendingHttpRequest = false;
        this.isSignUpSuccessful = true;
      });
  }

  isDisabled(): boolean {
    return this.password ? this.password !== this.confirmPassword : true;
  }
}

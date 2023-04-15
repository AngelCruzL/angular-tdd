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

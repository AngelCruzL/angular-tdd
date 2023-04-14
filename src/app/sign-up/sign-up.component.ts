import { Component, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

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

  #httpClient = inject(HttpClient);

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
    this.#httpClient
      .post('/api/1.0/users', {
        username: this.username,
        email: this.email,
        password: this.password,
      })
      .subscribe(() => {});
  }

  isDisabled(): boolean {
    return this.password ? this.password !== this.confirmPassword : true;
  }
}

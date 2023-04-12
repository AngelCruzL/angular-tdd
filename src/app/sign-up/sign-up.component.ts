import { Component } from '@angular/core';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent {
  password = '';
  confirmPassword = '';

  onChangePassword(event: Event): void {
    this.password = (event.target as HTMLInputElement).value;
  }

  onChangeConfirmPassword(event: Event): void {
    this.confirmPassword = (event.target as HTMLInputElement).value;
  }

  isDisabled(): boolean {
    return this.password ? this.password !== this.confirmPassword : true;
  }
}

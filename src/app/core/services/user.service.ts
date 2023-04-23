import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

type SignUpFormBody = {
  email: string;
  password: string;
  username: string;
};

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private httpClient: HttpClient) {}

  signUp(body: SignUpFormBody) {
    return this.httpClient.post('/api/1.0/users', body);
  }

  isEmailTaken(email: string) {
    return this.httpClient.post('/api/1.0/user/email', { email });
  }

  activate(token: string) {
    return this.httpClient.post(`/api/1.0/users/token/${token}`, {});
  }
}

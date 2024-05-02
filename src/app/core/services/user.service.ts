import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserPage } from '@core/types/user';
import { Observable } from 'rxjs';

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

  loadUsers(page: number = 0): Observable<UserPage> {
    return this.httpClient.get<UserPage>('/api/1.0/users', {
      params: { size: '3', page },
    });
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable()
export class AuthService {
  readonly baseUrl = 'http://localhost:8080/api/v1';

  constructor(private http: HttpClient) { }

  loginOrRegister({ username }: { username: string }) {
    return this.http.post(`${this.baseUrl}/login-register`, { username },
      { reportProgress: false, observe: 'body' });
  }

  getUserId() {
    const user = JSON.parse(localStorage.getItem('auth') || 'null');
    if (!user) {
      return null;
    }
    return user._id;
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../shared/models';


@Injectable()
export class AuthService {
  readonly baseUrl = 'http://localhost:8080/api/v1';

  constructor(private http: HttpClient) { }

  loginOrRegister({ username }: { username: string }) {
    return this.http.post<User>(`${this.baseUrl}/login-register`, { username },
      { reportProgress: false, observe: 'body' });
  }
}

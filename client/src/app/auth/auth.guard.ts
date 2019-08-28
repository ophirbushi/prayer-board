import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AuthService } from '../shared/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService) { }

  canActivate() {
    const { isAuthenticated } = this.authService;

    if (!isAuthenticated) {
      this.authService.signout();
    }

    return isAuthenticated;
  }
}

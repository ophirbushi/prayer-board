import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) { }

  canActivate() {
    const isAuth = !!localStorage.getItem('auth');

    if (!isAuth) {
      this.router.navigate(['/auth']);
    }

    return isAuth;
  }
}

import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AppState } from '../app-state';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private state: AppState) { }

  canActivate() {
    const user = this.state.get('user');

    if (!user) {
      this.router.navigate(['/auth']);
    }

    return !!user;
  }
}

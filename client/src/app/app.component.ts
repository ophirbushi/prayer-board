import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { UserMetadata } from './shared/models';
import { AuthService } from './shared/auth.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'client';
  user$: Observable<UserMetadata>;
  private destroy = new Subject();

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.user$ = this.authService.isAuthenticated$.pipe(map(() => this.authService.userMetadata));
  }

  ngOnDestroy() {
    this.destroy.next();
    this.destroy.complete();
  }

  logout() {
    this.authService.signout();
  }
}

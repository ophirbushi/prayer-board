import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { UserMetadata } from './shared/models';
import { AuthService } from './shared/auth.service';
import { map, takeUntil } from 'rxjs/operators';
import { Router, NavigationStart, NavigationEnd, NavigationError, NavigationCancel } from '@angular/router';
import { LoaderService } from './shared/loader.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'client';
  user$: Observable<UserMetadata>;
  loading$: Observable<boolean>; // block screen from user actions
  displayLoader$: Observable<boolean>; // display loader
  displaySpinner$: Observable<boolean>; // display spinner
  private destroy = new Subject();

  constructor(private authService: AuthService,
    private router: Router,
    private loaderService: LoaderService) { }

  ngOnInit() {
    this.user$ = this.authService.isAuthenticated$.pipe(map(() => this.authService.userMetadata));
    this.loading$ = this.loaderService.loading$;
    this.displayLoader$ = this.loaderService.displayLoader$;
    this.displaySpinner$ = this.loaderService.displaySpinner$;
    this.setupRouterEventListeners(this.router);
  }

  ngOnDestroy() {
    this.destroy.next();
    this.destroy.complete();
  }

  logout() {
    this.authService.signout();
  }

  private setupRouterEventListeners(router: Router) {
    router.events.pipe(takeUntil(this.destroy))
      .subscribe((event) => {
        switch (true) {
          case event instanceof NavigationStart:
            this.loaderService.setLoader(true);
            break;
          case event instanceof NavigationEnd:
          case event instanceof NavigationError:
          case event instanceof NavigationCancel:
            this.loaderService.setLoader(false);
            break;
          default:
            break;
        }
      });
  }

}

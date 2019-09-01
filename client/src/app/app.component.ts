import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject, Observable, of } from 'rxjs';
import { UserMetadata, UserMailbox } from './shared/models';
import { AuthService } from './shared/auth.service';
import { takeUntil, switchMap, filter, catchError, take } from 'rxjs/operators';
import { Router, NavigationStart, NavigationEnd, NavigationError, NavigationCancel } from '@angular/router';
import { LoaderService } from './shared/loader.service';
import { UserNotificationsService } from './shared/user-notifications.service';
import { AppState } from './app-state';

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
  mailbox$: Observable<UserMailbox>;
  private destroy = new Subject();

  constructor(private authService: AuthService,
    private router: Router,
    private loaderService: LoaderService,
    private userNotificationsService: UserNotificationsService,
    private state: AppState
  ) { }

  ngOnInit() {
    this.setupRouterEventListeners(this.router);

    this.loading$ = this.loaderService.loading$;
    this.displayLoader$ = this.loaderService.displayLoader$;
    this.displaySpinner$ = this.loaderService.displaySpinner$;

    this.mailbox$ = this.state.select('mailbox');
    
    const user$ = this.user$ = this.authService.userMetadata$;

    user$.pipe(
      takeUntil(this.destroy),
      filter(user => !!user),
      switchMap(user => {
        return this.userNotificationsService.getMailbox({ userId: user._id }).pipe(
          take(1),
          catchError(() => of(null))
        );
      }),
    ).subscribe(mailbox => {
      this.state.set('mailbox', mailbox);
    });
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

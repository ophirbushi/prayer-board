import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { UserNotification } from '../shared/models';
import { UserNotificationsService } from '../shared/user-notifications.service';
import { AuthService } from '../shared/auth.service';
import { map, tap, take, timeout } from 'rxjs/operators';
import { AppState } from '../app-state';

@Injectable()
export class UserNotificationsResolve implements Resolve<UserNotification[]> {

  constructor(private userNotificationsService: UserNotificationsService, private authService: AuthService, private state: AppState) { }

  resolve() {
    return this.userNotificationsService.getMailbox({ userId: this.authService.userMetadata._id }, true).pipe(
      tap(mailbox => {
        this.userNotificationsService.markUserNotificationsAsRead({ mailboxId: mailbox._id }).pipe(
          take(1),
          timeout(10 * 1000)
        )
          .subscribe(mailbox => {
            this.state.set('mailbox', mailbox);
          });
      }),
      map(mailbox => mailbox.userNotifications)
    );
  }

}

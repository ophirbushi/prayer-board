import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { UserNotification } from '../shared/models';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-user-notifications',
  templateUrl: './user-notifications.component.html',
  styleUrls: ['./user-notifications.component.scss']
})
export class UserNotificationsComponent implements OnInit {
  notifications$: Observable<UserNotification[]>;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.notifications$ = this.route.data.pipe(
      map(data=> data.notifications)
    );
  }

}

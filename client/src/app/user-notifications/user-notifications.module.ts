import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserNotificationsComponent } from './user-notifications.component';
import { UserNotificationsRoutingModule } from './user-notifications-routing.module';
import { MatExpansionModule } from '@angular/material';



@NgModule({
  declarations: [UserNotificationsComponent],
  imports: [
    CommonModule,
    UserNotificationsRoutingModule,
    MatExpansionModule
  ]
})
export class UserNotificationsModule { }

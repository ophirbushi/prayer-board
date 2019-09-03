import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { UserNotificationsComponent } from './user-notifications.component';
import { UserNotificationsResolve } from './user-notifications.resolve';

const routes: Routes = [
  { path: '', component: UserNotificationsComponent, resolve: { notifications: UserNotificationsResolve } }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  providers: [UserNotificationsResolve]
})
export class UserNotificationsRoutingModule { }

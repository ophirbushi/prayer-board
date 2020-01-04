import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { UserMailbox } from './models';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class UserNotificationsService {
    readonly baseUrl = `${environment.apiBaseUrl}/user-notifications`;

    constructor(private http: HttpClient) { }

    getMailbox({ userId }, fetchNotifications: boolean = false) {
        let params = new HttpParams();
        if (fetchNotifications) {
            params = params.append('fetchNotifications', '1');
        }
        return this.http.get<UserMailbox>(`${this.baseUrl}/${userId}/mailbox`, { params });
    }

    markUserNotificationsAsRead(payload: { mailboxId: string }) {
        return this.http.put<UserMailbox>(`${this.baseUrl}/mark-as-read`, payload);
    }
}

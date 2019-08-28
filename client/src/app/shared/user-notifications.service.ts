import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserMailbox } from './models';

@Injectable({
    providedIn: 'root'
})
export class UserNotificationsService {

    readonly baseUrl = 'http://localhost:8080/api/v1/user-notifications';

    constructor(private http: HttpClient) { }

    getMailbox({ userId }) {
        return this.http.get<UserMailbox>(`${this.baseUrl}/${userId}/mailbox`);
    }
}

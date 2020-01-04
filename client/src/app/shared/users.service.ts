import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from '@angular/common/http';
import { User } from './models';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class UsersService {
    readonly baseUrl = `${environment.apiBaseUrl}/users`;

    constructor(private http: HttpClient) { }

    getUser({ userId }: { userId: string }, populate: Array<keyof User> = []) {
        const params = new HttpParams().set('populate', populate.toString());
        return this.http.get<User>(`${this.baseUrl} /${userId}`, { params });
    }
}
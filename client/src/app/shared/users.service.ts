import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from '@angular/common/http';
import { User } from './models';

@Injectable({
    providedIn: 'root'
})
export class UsersService {
    readonly baseUrl = 'http://localhost:8080/api/v1/users';

    constructor(private http: HttpClient) { }

    getUser({ userId }: { userId: string }, populate: Array<keyof User> = []) {
        const params = new HttpParams().set('populate', populate.toString());
        return this.http.get<User>(`${this.baseUrl}/${userId}`, { params });
    }
}
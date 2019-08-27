import { Injectable } from "@angular/core";
import { HttpClient, HttpResponse } from '@angular/common/http';
import { User } from './models';
import { tap, map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    readonly baseUrl = 'http://localhost:8080/api/v1/auth';

    constructor(private http: HttpClient) { }

    signup({ username, password }) {
        return this.http.post<User>(`${this.baseUrl}/signup`, { username, password }, { observe: 'response' })
            .pipe(
                tap(this.setAuthorizationInLocalStorage.bind(this)),
                tap(this.setVisitedMarkerInLocalStorage.bind(this)),
                map(response => response.body)
            );
    }

    signin({ username, password }) {
        return this.http.post<User>(`${this.baseUrl}/signin`, { username, password }, { observe: 'response' })
            .pipe(
                tap(this.setAuthorizationInLocalStorage.bind(this)),
                tap(this.setVisitedMarkerInLocalStorage.bind(this)),
                map(response => response.body)
            );
    }

    private setAuthorizationInLocalStorage(response: HttpResponse<any>) {
        const header = response.headers.get('Authorization');
        localStorage.setItem('Authorization', header);
    }

    private setVisitedMarkerInLocalStorage() {
        localStorage.setItem('visited', '1');
    }
}
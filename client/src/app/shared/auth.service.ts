import { Injectable } from "@angular/core";
import { HttpClient, HttpResponse } from '@angular/common/http';
import { User, UserMetadata } from './models';
import { tap, map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Observable, BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    readonly baseUrl = `${environment.apiBaseUrl}/auth`;
    private readonly USER_METADATA = 'user-metadata';
    private readonly AUTHORIZATION = 'Authorization';
    private readonly VISITED = 'visited';
    get userMetadata(): UserMetadata { return JSON.parse(localStorage.getItem(this.USER_METADATA) || 'null'); }
    get authorizationHeader(): string { return localStorage.getItem(this.AUTHORIZATION); }
    get visited(): boolean { return !!localStorage.getItem(this.VISITED); }
    get isAuthenticated(): boolean { return this._isAuthenticated$.value; }
    private _isAuthenticated$ = new BehaviorSubject<boolean>(!!this.userMetadata && !!this.authorizationHeader);
    private _userMetadata$ = new BehaviorSubject<UserMetadata>(this.userMetadata);
    isAuthenticated$: Observable<boolean> = this._isAuthenticated$.asObservable();
    userMetadata$: Observable<UserMetadata> = this._userMetadata$.asObservable();

    constructor(
        private http: HttpClient,
        private router: Router
    ) { }

    signup({ username, password }) {
        return this.http.post<User>(`${this.baseUrl}/signup`, { username, password }, { observe: 'response' })
            .pipe(
                tap((response) => {
                    this.setLocalStorageValues(response);
                    this.setIsAuth(true);
                    this.setUsermetadata(response.body);
                }),
                map(response => response.body)
            );
    }

    signin({ username, password }) {
        return this.http.post<User>(`${this.baseUrl}/signin`, { username, password }, { observe: 'response' })
            .pipe(
                tap((response) => {
                    this.setLocalStorageValues(response);
                    this.setIsAuth(true);
                    this.setUsermetadata(response.body);
                }),
                map(response => response.body)
            );
    }

    signout() {
        localStorage.removeItem(this.AUTHORIZATION);
        localStorage.removeItem(this.USER_METADATA);
        this.setIsAuth(false);
        this.setUsermetadata(null);
        this.router.navigate(['/auth']);
    }

    private setLocalStorageValues(response: HttpResponse<User>) {
        const header = response.headers.get('Authorization');
        localStorage.setItem(this.VISITED, '1');
        localStorage.setItem(this.AUTHORIZATION, header);

        const { _id, username, mailbox } = response.body;
        const userMetadata: UserMetadata = { _id, username, mailbox } as any;
        localStorage.setItem(this.USER_METADATA, JSON.stringify(userMetadata));
    }

    private setIsAuth(value: boolean) {
        this._isAuthenticated$.next(value);
    }

    private setUsermetadata(userMetadata: UserMetadata) {
        this._userMetadata$.next(userMetadata);
    }
}
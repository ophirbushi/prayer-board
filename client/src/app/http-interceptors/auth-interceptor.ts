import { Injectable } from '@angular/core';
import {
    HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse
} from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from '../shared/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private authService: AuthService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const authorizationHeader = localStorage.getItem('Authorization') || '';

        const authReq = req.clone({
            headers: req.headers.set('Authorization', authorizationHeader)
        });

        return next.handle(authReq).pipe(
            catchError((err) => {
                if (err instanceof HttpErrorResponse && err.status === 440) {
                    alert('session expired');
                    this.authService.signout();
                }
                return throwError(err);
            })
        );
    }
}
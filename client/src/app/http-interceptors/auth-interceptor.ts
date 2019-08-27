import { Injectable } from '@angular/core';
import {
    HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse
} from '@angular/common/http';

import { Observable, of, EMPTY, throwError } from 'rxjs';
import { tap, filter, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private router: Router) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const authorizationHeader = localStorage.getItem('Authorization') || '';

        const authReq = req.clone({
            headers: req.headers.set('Authorization', authorizationHeader)
        });

        return next.handle(authReq).pipe(
            catchError((err) => {
                if (err instanceof HttpErrorResponse && err.status === 440) {
                    localStorage.removeItem('user');
                    localStorage.removeItem('Authorization');
                    alert('session expired');
                    this.router.navigate(['/auth']);
                }
                return throwError(err);
            })
        );
    }
}
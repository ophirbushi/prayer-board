import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class UsersService {
    readonly baseUrl = 'http://localhost:8080/api/v1/users';

    constructor(private http: HttpClient) { }
    

    getBoards({ userId }) {
        return this.http.get(`${this.baseUrl}/${userId}/boards`, { reportProgress: false });
    }
}
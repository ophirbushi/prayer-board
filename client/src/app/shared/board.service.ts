import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class BoardService {
    readonly baseUrl = 'http://localhost:8080/api/v1/boards';

    constructor(private http: HttpClient) { }

    createBoard(payload: { userId, boardName }) {
        return this.http.post(`${this.baseUrl}/create`, payload,
            { observe: 'body', reportProgress: false });
    }
}
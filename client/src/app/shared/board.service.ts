import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from '@angular/common/http';
import { Board } from './models';

@Injectable({
    providedIn: 'root'
})
export class BoardService {
    readonly baseUrl = 'http://localhost:8080/api/v1/boards';

    constructor(private http: HttpClient) { }

    createBoard(payload: { userId, boardName }) {
        return this.http.post<Board>(`${this.baseUrl}/create`, payload);
    }

    getBoard({ boardId }: { boardId: string }, deep = false) {
        let params = new HttpParams();

        if (deep) {
            params = params.set('deep', '1');
        }

        return this.http.get<Board>(`${this.baseUrl}/${boardId}`, { params });
    }

    addUserToBoard({ boardId, username }) {
        return this.http.put(`${this.baseUrl}/${boardId}/add-user`, { username });
    }

    removeUserFromBoard({ boardId, username }) {
        return this.http.put(`${this.baseUrl}/${boardId}/remove-user`, { username });
    }
}
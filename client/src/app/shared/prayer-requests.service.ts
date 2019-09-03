import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class PrayerRequestService {

    readonly baseUrl = 'http://localhost:8080/api/v1/prayer-requests';

    constructor(private http: HttpClient) { }

    create(data: { boardId, title, description }) {
        return this.http.post(`${this.baseUrl}/create`, data);
    }

    delete(id: string) {
        return this.http.delete(`${this.baseUrl}/${id}`);
    }

    notifyPraying({ prayingUserId, prayerRequestId }) {
        return this.http.post(`${this.baseUrl}/${prayerRequestId}/notify-praying`, { prayingUserId });
    }
}

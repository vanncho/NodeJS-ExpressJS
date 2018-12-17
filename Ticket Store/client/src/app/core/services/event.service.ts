import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { HttpClientService } from './http-client.service';
import { AuthenticationUtility } from '../utils/authentication.util';

@Injectable()
export class EventService {

    constructor(private authUtil: AuthenticationUtility,
                private httpClientService: HttpClientService) {
    }

    getAllEvents(): Observable<Object> {

        return this.httpClientService.get('/api/allEvents', this.authUtil.headersBasic());
    }

    addEvent(event): Observable<Object> {

        return this.httpClientService.post('/api/addEvent', JSON.stringify(event), this.authUtil.headersBasic());
    }

    deleteEvent(eventId): Observable<Object> {

        return this.httpClientService.delete('/api/deleteEvent/' + eventId, this.authUtil.headersBasic());
    }

    getEventById(eventId): Observable<Object> {

        return this.httpClientService.get('/api/getEvent/' + eventId, this.authUtil.headersBasic());
    }

    editEvent(event): Observable<Object> {

        return this.httpClientService.post('/api/editEvent', JSON.stringify(event), this.authUtil.headersBasic());
    }

    searchEventWithTitleLike(title): Observable<Object> {

        return this.httpClientService.post('/api/searchEvent', JSON.stringify({ eventTitle: title }), this.authUtil.headersBasic());
    }
}

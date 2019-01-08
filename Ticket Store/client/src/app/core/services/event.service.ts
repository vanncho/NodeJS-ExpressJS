import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { EventList } from '../models/view/event-list.model';
import { EventEdit } from '../models/binding/event-edit.model';
import { AuthenticationUtility } from '../utils/authentication.util';

@Injectable()
export class EventService {

    constructor(private authUtil: AuthenticationUtility,
                private httpClient: HttpClient) {
    }

    getAllEvents(): Observable<EventList[]> {

        return this.httpClient.get<EventList[]>('/api/allEvents');
    }

    addEvent(event): Observable<Object> {

        return this.httpClient.post<Object>('/api/addEvent', JSON.stringify(event), this.authUtil.headersBasic());
    }

    deleteEvent(eventId): Observable<Object> {

        return this.httpClient.delete<Object>('/api/deleteEvent/' + eventId, this.authUtil.headersBasic());
    }

    getEventById(eventId): Observable<EventEdit> {

        return this.httpClient.get<EventEdit>('/api/getEvent/' + eventId);
    }

    editEvent(event): Observable<Object> {

        return this.httpClient.post<Object>('/api/editEvent', JSON.stringify(event), this.authUtil.headersBasic());
    }

    searchEventWithTitleLike(title): Observable<EventList[]> {

        return this.httpClient.post<EventList[]>('/api/searchEvent', JSON.stringify({ eventTitle: title }), this.authUtil.headersBasic());
    }
}

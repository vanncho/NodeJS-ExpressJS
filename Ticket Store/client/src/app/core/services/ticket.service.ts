import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { TicketList } from '../models/view/ticket-list.model';
import { TicketEdit } from '../models/binding/ticket-edit.model';
import { AuthenticationUtility } from '../utils/authentication.util';

@Injectable()
export class TicketService {

    constructor(private authUtil: AuthenticationUtility,
                private httpClient: HttpClient) {
    }

    addTicket(ticket): Observable<Object> {

        return this.httpClient.post<Object>('/api/addTicket', JSON.stringify(ticket), this.authUtil.headersBasic());
    }

    getAllTickets(eventId): Observable<TicketList[]> {

        return this.httpClient.get<TicketList[]>('/api/getAllTickets/' + eventId);
    }

    getTicketById(ticketId): Observable<TicketEdit> {

        return this.httpClient.get<TicketEdit>('/api/getTicket/' + ticketId);
    }

    editTicket(ticket): Observable<Object> {

        return this.httpClient.post<Object>('/api/editTicket', JSON.stringify(ticket), this.authUtil.headersBasic());
    }

    deleteTicket(ticketId): Observable<Object> {

        return this.httpClient.delete<Object>('/api/deleteTicket/' + ticketId, this.authUtil.headersBasic());
    }

}

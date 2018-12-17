import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { HttpClientService } from './http-client.service';
import { AuthenticationUtility } from '../utils/authentication.util';

@Injectable()
export class TicketService {

    constructor(private authUtil: AuthenticationUtility,
                private httpClientService: HttpClientService) {
    }

    addTicket(ticket): Observable<Object> {

        return this.httpClientService.post('/api/addTicket', JSON.stringify(ticket), this.authUtil.headersBasic());
    }

    getAllTickets(eventId): Observable<Object> {

        return this.httpClientService.get('/api/getAllTickets/' + eventId, this.authUtil.headersBasic());
    }

    getTicketById(ticketId): Observable<Object> {

        return this.httpClientService.get('/api/getTicket/' + ticketId, this.authUtil.headersBasic());
    }

    editTicket(ticket): Observable<Object> {

        return this.httpClientService.post('/api/editTicket', JSON.stringify(ticket), this.authUtil.headersBasic());
    }

    deleteTicket(ticketId): Observable<Object> {

        return this.httpClientService.delete('/api/deleteTicket/' + ticketId, this.authUtil.headersBasic());
    }

}

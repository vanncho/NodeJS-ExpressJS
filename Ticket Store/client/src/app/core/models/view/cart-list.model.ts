import { TicketList } from './ticket-list.model';
import { EventList } from './event-list.model';

export interface CartList {

    id: number;
    event: EventList;
    ticket: TicketList;
    ticketsCount: number;
}

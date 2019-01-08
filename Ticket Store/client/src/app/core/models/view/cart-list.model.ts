import { Deserializable } from '../deserialize';
import { TicketListModel } from './ticket-list.model';
import { EventListModel } from './event-list.model';

export class CartList implements Deserializable {

    id: number;
    event: EventListModel;
    ticket: TicketListModel;
    ticketsCount: number;

    deserialize(input: any): this {

        Object.assign(this, input);
        this.ticket = new TicketListModel().deserialize(input.ticket);
        this.event = new EventListModel().deserialize(input.event);

        return this;
    }
}

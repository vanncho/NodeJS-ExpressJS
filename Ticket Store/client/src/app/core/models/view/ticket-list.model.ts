import { Deserializable } from '../deserialize';

export class TicketListModel implements Deserializable {

    id: number;
    count: number;
    price: number;
    priceCategory: string;
    eventId: number;
    // constructor(
    //     public id: number,
    //     public ticketsCount: number,
    //     public price: number,
    //     public priceCategory: string,
    //     public eventId: number
    // ) {}

    deserialize(input: any): this {
        Object.assign(this, input);
        return this;
    }
}

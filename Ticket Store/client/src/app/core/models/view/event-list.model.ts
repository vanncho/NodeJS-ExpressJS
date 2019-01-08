import { Category } from './category.model';
import { TicketListModel } from './ticket-list.model';
import { Deserializable } from '../deserialize';

export class EventListModel implements Deserializable {

    id: number;
    title: string;
    location: string;
    details: string;
    category: Category;

    deserialize(input: any): this {

        Object.assign(this, input);
        return this;
    }
}

import { Category } from './category.model';
import { TicketListModel } from './ticket-list.model';

export class EventListModel {

    constructor(
        public id: number,
        public title: string,
        public location: string,
        public details: string,
        public category: Category,
        public tickets: Array<TicketListModel>
    ) {}
}

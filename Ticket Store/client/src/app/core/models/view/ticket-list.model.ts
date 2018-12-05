export class TicketListModel {

    constructor(
        public id: number,
        public ticketsCount: number,
        public price: number,
        public priceCategory: string,
        public eventId: number
    ) {}
}

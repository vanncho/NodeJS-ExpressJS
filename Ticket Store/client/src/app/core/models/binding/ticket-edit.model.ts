export class TicketEditModel {

    constructor(
        public id: number,
        public ticketsCount: number,
        public price: number,
        public priceCategory: string
    ) {}
}

export class TicketAddModel {

    constructor(
        private ticketsCount: number,
        private price: number,
        private priceCategory: string,
        private eventId: number
    ) {}
}

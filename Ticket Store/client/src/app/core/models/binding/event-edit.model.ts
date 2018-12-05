export class EventEditModel {

    constructor(
        private id: number,
        private title: string,
        private url: string,
        private location: string,
        private date: string,
        private time: string,
        private town: string,
        private description: string,
        private categoryId: number
    ) {}
}

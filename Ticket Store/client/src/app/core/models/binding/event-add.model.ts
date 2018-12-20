export class EventAddModel {

    constructor(
        public title: string,
        public url: string,
        public location: string,
        public date: string,
        public time: string,
        public town: string,
        public description: string,
        public categoryId: number
    ) {}
}

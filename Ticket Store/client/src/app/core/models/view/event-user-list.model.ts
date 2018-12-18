import { Category } from './category.model';

export class EventUserListModel {

    public id: number;
    public date: Date;
    public title: string;
    public location: string;
    public time: string;
    public town: string;
    public url: string;
    public category: Category;

    constructor({id, date, title, location, time, town, url, category}: {
        id?: number,
        date?: Date,
        title?: string,
        location?: string,
        time?: string,
        town?: string,
        url?: string,
        category?: Category
    }) {
        this.id = id;
        this.date = date;
        this.title = title;
        this.location = location;
        this.time = time;
        this.town = town;
        this.url = url;
        this.category = category;
    }
}

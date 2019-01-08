import { Category } from './category.model';

export interface EventList {

    id: number;
    title: string;
    location: string;
    description: string;
    category: Category;
}

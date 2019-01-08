import { Category } from '../view/category.model';

export interface EventEdit {

    id: number;
    title: string;
    url: string;
    location: string;
    date: string;
    time: string;
    town: string;
    description: string;
    category: Category;
}

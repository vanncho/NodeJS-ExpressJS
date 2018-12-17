import { Injectable } from '@angular/core';

@Injectable()
export class DateUtility {

    formatDateToYYYYMMdd(dateStr: string): string {

        const date: Date = new Date(dateStr);

        const month: number | string = (date.getMonth() + 1) < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1);
        const day: number | string = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();

        return date.getFullYear() + '-' + month + '-' + day;
    }
}

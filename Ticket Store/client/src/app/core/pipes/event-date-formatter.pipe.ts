import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'eventDateFormatter'
})
export class EventDateFormatterPipe implements PipeTransform {

  transform(value: string, args?: any): string {

    if (value) {
      return value.substring(0, 10);
    }

    return null;
  }

}

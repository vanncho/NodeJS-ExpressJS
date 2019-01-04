import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'eventTimeFormatter'
})
export class EventTimeFormatterPipe implements PipeTransform {

  transform(value: string, args?: any): string {

    if (value) {
      return value.substr(0, 5);
    }

    return null;
  }

}

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'convertUtctoLocal'
})
export class ConvertUtctoLocalPipe implements PipeTransform {

  transform(value: any, offset: any): any {
    // create Date object for current location
     let d = new Date(value);

    // convert to msec
    // add local time zone offset 
    // get UTC time in msec
    let utc = d.getTime() + (d.getTimezoneOffset() * 60000);

    // create new Date object for different city
    // using supplied offset
    let nd = new Date(utc + (60000*offset));

    return nd;
  }

}

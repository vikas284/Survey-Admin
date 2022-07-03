import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'dateDiff'
})
export class DateDiffPipe implements PipeTransform {

	transform(value: any, createDate: any): any {
		let d1 = new Date(value);
		let d2 = new Date(createDate);
		let diffc = d1.getTime() - d2.getTime();

		let days = Math.round(Math.abs(diffc/(1000*60*60*24)));

		return (days > 1) ? (days + ' Days') : (days + ' Day');
	}

}

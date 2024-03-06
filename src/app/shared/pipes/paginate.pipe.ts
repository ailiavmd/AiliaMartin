import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'paginate',
	standalone: true
})
export class PaginatePipe implements PipeTransform {

	transform(arr: any[], current: number, pageLength: number): any[] {
		const start = (current - 1) * pageLength;
		const end = start + pageLength;
		return arr.slice(start, end);
	}
}

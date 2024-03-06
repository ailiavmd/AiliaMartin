import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'tableFilter',
	standalone: true
})
export class TableFilterPipe implements PipeTransform {

	transform(arr: any[], query: string): any[] {

		if (!arr || !arr.length) { return arr; }
		if (!query || query === '') { return arr; }
	
		const keys = Object.keys(arr[0]);
		const texts = query.split(' ').filter(t => !!t.trim());
		let copy = [...arr];
	
		texts.forEach(t => {
		  copy = copy.filter(el => {
			for (const key of keys) {
			  if (String(el[key]).toLowerCase().includes(t.toLowerCase())) return true;
			}
			return false;
		  });
		});
	
		return copy;
	  }
}

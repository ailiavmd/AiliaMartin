import { Component, ElementRef, Input, TemplateRef, ViewEncapsulation } from '@angular/core';
import { TableFilterPipe } from '../../pipes/table-filter.pipe';
import { PaginatePipe } from '../../pipes/paginate.pipe';
import { CommonModule } from '@angular/common';

@Component({
	selector: 'app-table',
	standalone: true,
	imports: [
		CommonModule,
		TableFilterPipe,
		PaginatePipe
	],
	templateUrl: './table.component.html',
	styleUrl: './table.component.scss',
	encapsulation: ViewEncapsulation.None
})
export class TableComponent {

	_source!: any;

	currentPage = 1;

	pageLength = 5;

	totalColumns!: number;

	@Input() set source(source: any[]) {
		this._source = [ ...source ];
		const ths = this.host.nativeElement.querySelectorAll('thead th');
		this.totalColumns = ths.length;
	}

	@Input() query = '';

	@Input() rowTemplate!: TemplateRef<any>;

	@Input() trackBy = 'id';

	constructor(
		private host: ElementRef
	) { }
}

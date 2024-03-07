import { Component, ElementRef, Input, TemplateRef, ViewEncapsulation } from '@angular/core';
import { TableFilterPipe } from '../../pipes/table-filter.pipe';
import { PaginatePipe } from '../../pipes/paginate.pipe';
import { CommonModule } from '@angular/common';
import { PaginationComponent } from '../pagination/pagination.component';
import { FormsModule } from '@angular/forms';

@Component({
	selector: 'app-table',
	standalone: true,
	imports: [
		CommonModule,
		FormsModule,
		PaginationComponent,
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

	@Input() totalColumns!: number;

	@Input() source: any;

	@Input() query = '';

	@Input() rowTemplate!: TemplateRef<any>;

	@Input() trackBy = 'id';

	constructor(
		private host: ElementRef
	) { }
}

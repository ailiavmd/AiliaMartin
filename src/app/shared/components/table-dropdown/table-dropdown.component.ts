import { Component, HostListener } from '@angular/core';

@Component({
	selector: 'app-table-dropdown',
	standalone: true,
	imports: [],
	templateUrl: './table-dropdown.component.html',
	styleUrl: './table-dropdown.component.scss'
})
export class TableDropdownComponent {

	expanded = false;

	@HostListener('document:click', []) clickout() {
		this.expanded = false;
	}

	handleClick(event: Event) {
		event.stopPropagation();
		this.expanded = true;
	}
}

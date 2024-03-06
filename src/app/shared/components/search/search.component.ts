import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
	selector: 'app-search',
	standalone: true,
	imports: [FormsModule],
	templateUrl: './search.component.html',
	styleUrl: './search.component.scss'
})
export class SearchComponent {

	query!: string;

  	@Output() changed = new EventEmitter<string>();

    handleKeyup() {
		this.changed.emit(this.query);
    }
}

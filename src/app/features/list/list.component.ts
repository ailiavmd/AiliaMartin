import { Component, OnInit } from '@angular/core';
import { ListService } from './list.service';
import { SearchComponent } from '../../shared/components/search/search.component';
import { TableComponent } from '../../shared/components/table/table.component';
import { Product } from '../../shared/models';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TableDropdownComponent } from '../../shared/components/table-dropdown/table-dropdown.component';
import { ModalService } from '../../shared/services/modal.service';
import { DeleteModalComponent } from './delete-modal/delete-modal.component';

@Component({
	selector: 'app-list',
	standalone: true,
	imports: [
		CommonModule,
		RouterModule,
		SearchComponent,
		TableComponent,
		TableDropdownComponent
	],
	templateUrl: './list.component.html',
	styleUrl: './list.component.scss'
})
export class ListComponent implements OnInit {

	query!: string;

	products!: Product[];

	constructor(
		private service: ListService,
		private modal: ModalService
	) { }

	ngOnInit(): void {
		this.getProducts();
	}

	getProducts() {
		this.service.getProducts()
		.subscribe(data => this.products = data);
	}

	deleteProduct(product: Product) {
		const ref = this.modal.open(DeleteModalComponent, { product });
		ref.then(res => {
			if (res) this.getProducts();
		})
	}
}

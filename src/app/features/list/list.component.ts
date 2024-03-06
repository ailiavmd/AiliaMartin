import { Component, OnInit } from '@angular/core';
import { ListService } from './list.service';
import { SearchComponent } from '../../shared/components/search/search.component';
import { TableComponent } from '../../shared/components/table/table.component';
import { Product } from '../../shared/models';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
	selector: 'app-list',
	standalone: true,
	imports: [
		CommonModule,
		RouterModule,
		SearchComponent,
		TableComponent
	],
	templateUrl: './list.component.html',
	styleUrl: './list.component.scss'
})
export class ListComponent implements OnInit {

	query!: string;

	products!: Product[];

	constructor(
		private service: ListService
	) { }

	ngOnInit(): void {
		// this.service.getProducts()
		// .subscribe(data => this.products = data);

		this.products = [
			{
				id: 'trj-crd',
				name: 'Tarjeta de Credito',
				description: 'Tarjeta de consumo bajo la modalidad de credito',
				logo: 'https://www.visa.com.ec/dam/VCOM/regional/lac/SPA/Default/Pay%20With%20Visa/Tarjetas/visa-signature-400x225.jpg',
				date_release: new Date(),
				date_revision: new Date()
			},
			{
				id: 'trj-crd2',
				name: 'Tarjeta de Credito 2',
				description: 'Tarjeta de consumo bajo la modalidad de credito',
				logo: 'https://www.visa.com.ec/dam/VCOM/regional/lac/SPA/Default/Pay%20With%20Visa/Tarjetas/visa-signature-400x225.jpg',
				date_release: new Date(),
				date_revision: new Date()
			}
		];
	}
}

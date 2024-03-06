import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Product } from '../../shared/models';

@Injectable({
  	providedIn: 'root'
})
export class ListService {

	private readonly url = `${environment.api}/bp/products`;

	constructor(
		private http: HttpClient
	) { }

	getProducts() {
		return this.http.get<Product[]>(`${this.url}`);
	}
}

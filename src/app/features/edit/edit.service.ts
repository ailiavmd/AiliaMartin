import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Product } from '../../shared/models';

@Injectable({
  providedIn: 'root'
})
export class EditService {

  private readonly url = `${environment.api}/bp/products`;

  constructor(
    private http: HttpClient
  ) { }

  edit(payload: Product) {
    return this.http.put(this.url, payload);
  }
}

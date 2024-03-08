import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Product } from '../../shared/models';

@Injectable({
  providedIn: 'root'
})
export class CreateService {

  private readonly url = `${environment.api}/bp/products`;

  constructor(
    private http: HttpClient
  ) { }

  create(payload: Product) {
    return this.http.post(this.url, payload);
  }

  verify(id: string) {
    return this.http.get<boolean>(`${this.url}/verification?id=${id}`);
  }
}

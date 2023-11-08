import { Injectable } from '@angular/core';
import { Facturas } from './facturas';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FacturasService {
  private url: string = "http://localhost:8080/facturador/facturas"

  constructor(private http: HttpClient) { }

  getAll():Observable<Facturas[]>{
    return this.http.get<Facturas[]>(this.url);
  }
}

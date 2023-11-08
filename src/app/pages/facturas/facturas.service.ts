import { Injectable } from '@angular/core';
import { Facturas } from './facturas';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, tap } from 'rxjs';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class FacturasService {
  private url: string = "http://localhost:8080/facturador/facturas"

  constructor(private http: HttpClient) { }

  getAll():Observable<Facturas[]>{
    return this.http.get<Facturas[]>(this.url);
  }

  insertarFactura(factura:Facturas ): Observable<Facturas> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    return this.http.post<Facturas>(this.url, factura, httpOptions).pipe(
      tap((data) => {
        // Imprime la respuesta en la consola
        console.log('Respuesta del servicio insertarFactura', data);
      }),
      catchError((error) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'No se pudo agregar el producto, si el problema persiste contacte con el Administrador'
        })
        throw error;
      })
    );
  }
  
}

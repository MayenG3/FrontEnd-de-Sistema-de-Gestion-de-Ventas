import { Injectable } from '@angular/core';
import { Facturas } from './facturas';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, tap } from 'rxjs';
import Swal from 'sweetalert2';
import { DetalleFacturas } from './detalle-facturas';

@Injectable({
  providedIn: 'root'
})
export class FacturasService {
  private url: string = "http://localhost:8080/facturador/facturas"
  private urlDetalle: string = "http://localhost:8080/facturador/detalleFactura"
  private urlDId: string = "http://localhost:8080/facturador/detalle"
  constructor(private http: HttpClient) { }

  getAll():Observable<Facturas[]>{
    return this.http.get<Facturas[]>(this.url);
  }

  getAllDetalle():Observable<DetalleFacturas[]>{
    return this.http.get<DetalleFacturas[]>(this.url);
  }

  getFacturaById(id: string): Observable<Facturas> {
    return this.http.get<Facturas>(`${this.url}/${id}`);
  }

  getDetalleFacturaById(id: string): Observable<DetalleFacturas[]> {
    return this.http.get<DetalleFacturas[]>(`${this.urlDId}/${id}`);
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
          text: 'Porfavor, seleccione el cliente al que se le va a facturar'
        })
        throw error;
      })
    );
  }
  
  insertarDetalleFactura(detalleFactura:DetalleFacturas ): Observable<DetalleFacturas> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    return this.http.post<DetalleFacturas>(this.urlDetalle, detalleFactura, httpOptions).pipe(
      tap((data) => {
        console.log('Respuesta del servicio insertarDetalle', data);
      }),
      catchError((error) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'No se pudo agregar el detalle, si el problema persiste contacte con el Administrador'
        })
        throw error;
      })
    );
  }

  updateFactura(factura: Facturas): Observable<Facturas> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    return this.http.put< Facturas>(`${this.url}`, factura, httpOptions).pipe(
      tap((data) => {
        // Imprime la respuesta en la consola
        console.log('Respuesta del servicio updateProducto', data);
      }),
      catchError((error) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'No se pudo Anular la Factura, si el problema persiste contacte con el Administrador'
        })
        throw error;
      })
    );
  }
}

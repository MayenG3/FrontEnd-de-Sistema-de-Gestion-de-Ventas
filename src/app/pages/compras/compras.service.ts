import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Compras} from './compra';
import { Observable, catchError, tap } from 'rxjs';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class ComprasService {
  private apiUrl = 'http://localhost:8080/facturador/compras';

  constructor(private http: HttpClient, private router: Router) { }

  //metodo para listar las compras
  getListadoCompras(): Observable<Compras[]> {
    return this.http.get<Compras[]>(this.apiUrl).pipe(
      tap((data) => {
        // Imprime la respuesta en la consola
        console.log('Respuesta del servicio getListadoCompras:', data);
      }),
      catchError((error) => {
        // Manejo de errores
        console.error('Error en getListadoCompras:', error);
        throw error;
      })
    );
  }

  //metodo para actualizar un cliente
  updateCompra(compra: Compras): Observable<Compras> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    return this.http.put<Compras>(`${this.apiUrl}`, compra, httpOptions).pipe(
      tap((data) => {
        // Imprime la respuesta en la consola
        console.log('Respuesta del servicio updateCompra', data);
      }),
      catchError((error) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'No se pudo eliminar la compra, si el problema persiste contacte con el Administrador'
        })
        throw error;
      })
    );
  }

  // Método para insertar un cliente
  insertarCompra(compra: Compras): Observable<Compras> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    return this.http.post<Compras>(this.apiUrl, compra, httpOptions).pipe(
      tap((data) => {
        // Imprime la respuesta en la consola
        console.log('Respuesta del servicio insertarCompra', data);
      }),
      catchError((error) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'No se pudo registrar la compra, si el problema persiste contacte con el Administrador'
        })
        throw error;
      })
    );
  }

}

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, tap } from 'rxjs';
import { Clientes } from './cliente';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class clientesService {
  private apiUrl = 'http://localhost:8080/facturador/clientes';

  constructor(private http: HttpClient, private router: Router) {}

  //metodo para listar los clientes
  getListadoClientes(): Observable<Clientes[]> {
    return this.http.get<Clientes[]>(this.apiUrl).pipe(
      tap((data) => {
        // Imprime la respuesta en la consola
        console.log('Respuesta del servicio getListadoClientes:', data);
      }),
      catchError((error) => {
        // Manejo de errores
        console.error('Error en getListadoClientes:', error);
        throw error;
      })
    );
  }

   // Método para insertar un cliente
   insertarCliente(cliente: Clientes): Observable<Clientes> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    return this.http.post<Clientes>(this.apiUrl, cliente, httpOptions).pipe(
      tap((data) => {
        // Imprime la respuesta en la consola
        console.log('Respuesta del servicio insertarCliente', data);
      }),
      catchError((error) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'No se pudo agregar el cliente, si el problema persiste contacte con el Administrador'
        })
        throw error;
      })
    );
  }

  //metodo para actualizar un cliente
  updateCliente(cliente: Clientes): Observable<Clientes> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    return this.http.put<Clientes>(`${this.apiUrl}`, cliente, httpOptions).pipe(
      tap((data) => {
        // Imprime la respuesta en la consola
        console.log('Respuesta del servicio updateCliente', data);
      }),
      catchError((error) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'No se pudo actualizar el cliente, si el problema persiste contacte con el Administrador'
        })
        throw error;
      })
    );
  }
}

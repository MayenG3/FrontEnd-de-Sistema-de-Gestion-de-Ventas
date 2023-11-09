import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, tap } from 'rxjs';
import { Producto } from './producto';

import Swal from 'sweetalert2';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  private url: string = "http://localhost:8080/facturador/productos"
  private urlC: string = "http://localhost:8080/facturador/categorias"

  constructor(private http: HttpClient, private router: Router) { }

  //obtener todos los productos
getAll():Observable<Producto[]>{
  return this.http.get<Producto[]>(this.url);
}

insertarProducto(producto: Producto): Observable<Producto> {
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };
  return this.http.post<Producto>(this.url, producto, httpOptions).pipe(
    tap((data) => {
      // Imprime la respuesta en la consola
      console.log('Respuesta del servicio insertarProducto', data);
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

updateProducto(producto: Producto): Observable<Producto> {
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };
  return this.http.put< Producto>(`${this.url}`, producto, httpOptions).pipe(
    tap((data) => {
      // Imprime la respuesta en la consola
      console.log('Respuesta del servicio updateProducto', data);
    }),
    catchError((error) => {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'No se pudo actualizar el Producto, si el problema persiste contacte con el Administrador'
      })
      throw error;
    })
  );
}


}

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, tap } from 'rxjs';
import { Proveedor } from './proveedores';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';



@Injectable({
  providedIn: 'root',
})
export class proveedorervice {
  private url = 'http://localhost:8080/facturador/proveedores';

  constructor(private http: HttpClient, private router: Router) {}

  getproveedor(): Observable<Proveedor[]> {
    return this.http.get<Proveedor[]>(this.url);
  }

  getListadoproveedor():Observable<Proveedor[]>{
    return this.http.get<Proveedor[]>(this.url);
  }
  
  insertarproveedor(proveedor:Proveedor):Observable<Proveedor>{
    return this.http.post<Proveedor>(this.url, proveedor);
  }
  
  get(id:number):Observable<Proveedor>{
    return this.http.get<Proveedor>(this.url+'/'+id);
  }
  
  
  actualizarproveedor(proveedor: Proveedor): Observable<Proveedor> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    return this.http.put<Proveedor>(`${this.url}`, proveedor, httpOptions).pipe(
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

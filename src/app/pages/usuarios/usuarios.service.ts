import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, tap } from 'rxjs';
import { Usuarios } from './usuarios';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';



@Injectable({
  providedIn: 'root',
})
export class usuarioservice {
  private url = 'http://localhost:8080/facturador/usuarios';

  constructor(private http: HttpClient, private router: Router) {}

  getusuarios(): Observable<Usuarios[]> {
    return this.http.get<Usuarios[]>(this.url);
  }

  getListadoUsuarios():Observable<Usuarios[]>{
    return this.http.get<Usuarios[]>(this.url);
  }
  
  insertarUsuario(usuarios:Usuarios):Observable<Usuarios>{
    return this.http.post<Usuarios>(this.url, usuarios);
  }
  
  get(id:number):Observable<Usuarios>{
    return this.http.get<Usuarios>(this.url+'/'+id);
  }
  
  
  actualizarUsuario(usuario: Usuarios): Observable<Usuarios> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    return this.http.put<Usuarios>(`${this.url}`, usuario, httpOptions).pipe(
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

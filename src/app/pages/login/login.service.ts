import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError,tap } from 'rxjs';
import { Usuario } from './login';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private apiUrl = 'http://localhost:8080/facturador/usuarios';

  constructor(private http: HttpClient) { }
  getUsuarioByNombre(nombreUsuario: string): Observable<Usuario> {
    const url = `${this.apiUrl}/${nombreUsuario}`;
    return this.http.get<Usuario>(url)
    .pipe(
      tap(data => {
        // Imprime la respuesta en la consola
        console.log('usuario encontrado: ', data);
      }),
      catchError(error => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Usuario no encontrado, si el problema persiste contacte con el Administrador'
        })
        throw error;
      })
    );
  }
}

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, tap, catchError } from 'rxjs';
import Swal from 'sweetalert2';
import { Customer } from './customer';


@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  private url: string = 'http://localhost:8081/customers';
  constructor(private http: HttpClient, private router: Router) {}

  //obtener todos los customers
  getAll(): Observable<Customer[]> {
    return this.http.get<Customer[]>(this.url);
  }

  insertCustomer(customer: Customer): Observable<Customer> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    return this.http.post<Customer>(this.url, customer, httpOptions).pipe(
      tap((data) => {
        // Imprime la respuesta en la consola
        console.log('Respuesta del servicio insertarCustomer', data);
      }),
      catchError((error) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'No se pudo agregar el cliente, si el problema persiste contacte con el Administrador',
        });
        throw error;
      })
    );
  }

  updateCustomer(customer: Customer): Observable<Customer> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    return this.http.put<Customer>(`${this.url}`, customer, httpOptions).pipe(
      tap((data) => {
        // Imprime la respuesta en la consola
        console.log('Respuesta del servicio updateCustomer', data);
      }),
      catchError((error) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'No se pudo actualizar el Cliente, si el problema persiste contacte con el Administrador',
        });
        throw error;
      })
    );
  }
}

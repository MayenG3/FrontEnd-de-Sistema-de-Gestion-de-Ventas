import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { Producto } from './producto';
@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  private url: string = "http://localhost:8083/facturador/productos"


  constructor(private http: HttpClient) { }

  //obtener todos los productos
getAll():Observable<Producto[]>{
  return this.http.get<Producto[]>(this.url);
}

create(producto:Producto):Observable<Producto>{
  return this.http.post<Producto>(this.url, producto);
}

get(id:number):Observable<Producto>{
  return this.http.get<Producto>(this.url+'/'+id);
}

update(producto:Producto):Observable<Producto>{
  return this.http.put<Producto>(this.url, producto);
}

}

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Categorias } from './categorias';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class CategoriasService {

    private urlC: string = "http://localhost:8080/facturador/categorias"

    constructor(private http: HttpClient) { }

getAll():Observable<Categorias[]>{
  return this.http.get<Categorias[]>(this.urlC);
}
}
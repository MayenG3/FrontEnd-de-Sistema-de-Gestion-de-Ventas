import { Component } from '@angular/core';
import { ProveedoresComponent } from '../proveedores.component';
import { proveedorervice } from '../proveedores.service';

import { Proveedor } from '../proveedores';
import { Router } from '@angular/router';



@Component({
  selector: 'app-creaproveedores',
  templateUrl: './creaproveedores.component.html',
  styleUrls: ['./creaproveedores.component.css']
})
export class CreaproveedoresComponent {


  proveedor: Proveedor = {
    id_proveedor: '',
    nombre: '',
    nit: '',
    direccion: '',
    telefono: '',
    fecha_crear: null,
    usuario_crear: '',
    fecha_mod: null,
    usuario_mod: '',
    estado: 'Activo',
  }

  constructor(private proveedorervice: proveedorervice, private router: Router) {}


  crearProveedor(proveedor: string, NIT: string, direccion: string, Telefono:string) {
    this.proveedor.nombre = proveedor;

    this.proveedor.nit = NIT;

    this.proveedor.direccion = direccion; 


    this.proveedor.telefono = Telefono; 

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    this.proveedor.fecha_crear = today;
    this.proveedor.usuario_crear = '1';
    this.proveedor.estado = 'Activo';

    this.proveedorervice.insertarproveedor(this.proveedor).subscribe((proveedor) => {
      console.log('proveedor actualizado con éxito:', proveedor);
      this.router.navigate(['/proveedores']);

    });
  }
}

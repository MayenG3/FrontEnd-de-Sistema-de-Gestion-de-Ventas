import { Component } from '@angular/core';
import { clientesService } from './clientes.service';
import { Router } from '@angular/router';
import { Clientes } from './cliente';

@Component({
  selector: 'app-crearCliente',
  templateUrl: './createCliente.component.html',
  styleUrls: ['./createCliente.component.css'],
})
export class CreateClienteComponent {
  cliente: Clientes = {
    id: '',
    nombre: '',
    direccion: '',
    telefono: '',
    nit: '',
    fecha_crear: null,
    usuario_crear: '',
    fecha_mod: null,
    usuario_mod: '',
    estado: '',
  };

  constructor(private service: clientesService, private router: Router) {}

  crearCliente(
    nombre: string,
    nit: string,
    direccion: string,
    telefono: string
  ) {
    this.cliente.nombre = nombre;
    this.cliente.nit = nit;
    this.cliente.direccion = direccion;
    this.cliente.telefono = telefono;

    const today = new Date();
    today.setHours(0,0,0,0);

    this.cliente.fecha_crear = today;
    this.cliente.usuario_crear = '1';
    this.cliente.estado = 'Activo';
    this.service.insertarCliente(this.cliente).subscribe((cliente) => {
    console.log('Cliente actualizado con éxito:', cliente);
    this.router.navigate(['/clientes']);
    //Realiza cualquier acción adicional después de la actualización
    });
  }
}

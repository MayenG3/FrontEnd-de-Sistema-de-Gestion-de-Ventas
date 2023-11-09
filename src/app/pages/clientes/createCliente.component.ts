import { Component } from '@angular/core';
import { clientesService } from './clientes.service';
import { Router } from '@angular/router';
import { Clientes } from './cliente';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-crearCliente',
  templateUrl: './createCliente.component.html',
  styleUrls: ['./createCliente.component.css'],
})
export class CreateClienteComponent {
  usuario: any;
  cliente: Clientes = {
    id_cliente: '',
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

  constructor(private service: clientesService, private router: Router, private authService: AuthService) {}

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
    this.cliente.estado = 'Activo';

    //recuperar el usuario que incio sesion
    this.usuario = this.authService.getLoggedInUser();

    //asignar el id del usuario que lo creo
    this.cliente.usuario_crear = this.usuario.id_rol;

    this.service.insertarCliente(this.cliente).subscribe((cliente) => {
    console.log('Cliente creado con éxito:', cliente);
    this.router.navigate(['/clientes']);
    //Realiza cualquier acción adicional después de la actualización
    });
  }
}

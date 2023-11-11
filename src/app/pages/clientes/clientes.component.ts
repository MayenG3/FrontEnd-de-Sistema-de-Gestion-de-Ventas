import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Clientes } from './cliente';
import { clientesService } from './clientes.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';
import { Usuario } from '../login/login';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css'],
})
export class ClientesComponent implements OnInit {
  usuario: any;
  clientes: Clientes[] = [];
  editarCliente: Clientes = {
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

  constructor(private service: clientesService, private authService: AuthService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.service.getListadoClientes().subscribe((data) => {
      // Filtra la lista para mostrar solo clientes con estado "Activo"
      this.clientes = data.filter((cliente) => cliente.estado === 'Activo');
    });
  }

  update() {
    //agregar un dia a la fecha de creacion para evitar conflicto en la base de datos
    const fecha_crear = new Date(
      this.editarCliente.fecha_crear ? this.editarCliente.fecha_crear : ''
    );
    fecha_crear.setDate(fecha_crear.getDate() + 1);

    // Obtener la fecha actual en formato 'yyyy-MM-dd'
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Asignar la fecha actual al objeto editarCliente
    this.editarCliente.fecha_mod = today;
    this.editarCliente.fecha_crear = fecha_crear;

    //recuperar el usuario que incio sesion
    this.usuario = this.authService.getLoggedInUser();
    console.log(this.usuario);
    //asignar el id del usuario que lo modifico
    this.editarCliente.usuario_mod = this.usuario.id_rol;

    this.service.updateCliente(this.editarCliente).subscribe((cliente) => {
      console.log('Cliente actualizado con éxito:', cliente);
      // Realiza cualquier acción adicional después de la actualización
    });
  }

  borrar(clienteEliminado: Clientes) {
    Swal.fire({
      title: 'Estas seguro?',
      text: 'No podrás revertir esto!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, borralo!',
    }).then((result) => {
      if (result.isConfirmed) {
        //agregar un dia a la fecha de creacion para evitar conflicto en la base de datos
        const fecha_crear = new Date(
          clienteEliminado.fecha_crear ? clienteEliminado.fecha_crear : ''
        );
        fecha_crear.setDate(fecha_crear.getDate() + 1);
        // Obtener la fecha actual en formato 'yyyy-MM-dd'
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        //recuperar el usuario que incio sesion
        this.usuario = this.authService.getLoggedInUser();

        //asignar el id del usuario que lo modifico
        clienteEliminado.usuario_mod = this.usuario.id_rol;

        // Asignar la fecha actual al objeto editarCliente
        clienteEliminado.fecha_mod = today;
        clienteEliminado.fecha_crear = fecha_crear;
        clienteEliminado.estado = 'Inactivo';
        this.service.updateCliente(clienteEliminado).subscribe((cliente) => {
          console.log("cliente eliminado exitosamente",cliente);
          //this.ngOnInit()
          // Realiza cualquier acción adicional después de la actualización
          Swal.fire('¡Eliminado!', 'El Cliente ha sido eliminado.', 'success');
              this.clientes = this.clientes.filter((cliente: Clientes) => cliente.id_cliente !== clienteEliminado.id_cliente);
        });
      }
    });
  }
}

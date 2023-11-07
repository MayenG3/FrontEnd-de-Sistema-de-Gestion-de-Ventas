import { Component, OnInit } from '@angular/core';
import { Usuarios } from './usuarios';
import { usuarioservice } from './usuarios.service';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {
  usuarios: Usuarios[] = [];
  editarUsuario: Usuarios = {
    id_usuario: '',
    usuario: '',
    id_persona: '',
    id_rol: '',
    clave: '',
    fecha_crear: null,
    usuario_crear: '',
    fecha_mod: null,
    usuario_mod: '',
    estado: '',
  };


  constructor(private service: usuarioservice){}

  ngOnInit(): void {
    this.service.getListadoUsuarios().subscribe((data) => {
      this.usuarios = data.filter((usuarios) => usuarios.estado === 'Activo');
    });
  }
  actualizarUsuario() {
    const fecha_crear = new Date(
      this.editarUsuario.fecha_crear ? this.editarUsuario.fecha_crear : ''
    );
    fecha_crear.setDate(fecha_crear.getDate() + 1);

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    this.editarUsuario.fecha_mod = today;
    this.editarUsuario.fecha_crear = fecha_crear;

    this.service.actualizarUsuario(this.editarUsuario).subscribe((usuario) => {
      console.log('Usuario actualizado con éxito:', usuario);
    });
  }


  borrar(usuarioEliminado: Usuarios) {
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
          usuarioEliminado.fecha_crear ? usuarioEliminado.fecha_crear : ''
        );
        fecha_crear.setDate(fecha_crear.getDate() + 1);
        // Obtener la fecha actual en formato 'yyyy-MM-dd'
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        // Asignar la fecha actual al objeto editarUsuario
        usuarioEliminado.fecha_mod = today;
        usuarioEliminado.fecha_crear = fecha_crear;
        usuarioEliminado.estado = 'Inactivo';
        this.service.actualizarUsuario(usuarioEliminado).subscribe((usuario) => {
          console.log('Usuario eliminado con éxito:', usuario);
          Swal.fire('Eliminado!', 'El Usuario ha sido eliminado.', 'success');
          // Realiza cualquier acción adicional después de la actualización
        });
      }
    });
  }
  }




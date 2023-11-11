import { Component,OnInit } from '@angular/core';
import { Proveedor } from './proveedores';
import { proveedorervice } from './proveedores.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-proveedores',
  templateUrl: './proveedores.component.html',
  styleUrls: ['./proveedores.component.css']
})
export class ProveedoresComponent implements OnInit {
  proveedor: Proveedor[] = [];

  editarProveedor: Proveedor = {
    id_proveedor: '',
    nombre: '',
    nit: '',
    direccion: '',
    telefono: '',
    fecha_crear: null,
    usuario_crear: '',
    fecha_mod: null,
    usuario_mod: '',
    estado: '',
  };


  constructor(private service: proveedorervice){}

  ngOnInit(): void {
    this.service.getListadoproveedor().subscribe((data) => {
      this.proveedor = data.filter((proveedor) => proveedor.estado === 'Activo');
    });
  }
  actualizarProveedor() {
    const fecha_crear = new Date(
      this.editarProveedor.fecha_crear ? this.editarProveedor.fecha_crear : ''
    );
    fecha_crear.setDate(fecha_crear.getDate() + 1);

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    this.editarProveedor.fecha_mod = today;
    this.editarProveedor.fecha_crear = fecha_crear;

    this.service.actualizarproveedor(this.editarProveedor).subscribe((proveedor) => {
      console.log('Proveedor actualizado con éxito:', proveedor);
    });
  }


  borrar(proveedorEliminado: Proveedor) {
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
          proveedorEliminado.fecha_crear ? proveedorEliminado.fecha_crear : ''
        );
        fecha_crear.setDate(fecha_crear.getDate() + 1);
        // Obtener la fecha actual en formato 'yyyy-MM-dd'
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        // Asignar la fecha actual al objeto editarProveedor
        proveedorEliminado.fecha_mod = today;
        proveedorEliminado.fecha_crear = fecha_crear;
        proveedorEliminado.estado = 'Inactivo';
        this.service.actualizarproveedor(proveedorEliminado).subscribe((proveedor) => {
          console.log('Proveedor eliminado con éxito:', proveedor);
          Swal.fire('Eliminado!', 'El Proveedor ha sido eliminado.', 'success');
          this.proveedor = this.proveedor.filter(
            (p) => p.id_proveedor !== proveedorEliminado.id_proveedor
          );
          // Realiza cualquier acción adicional después de la actualización
        });
      }
    });
  }

}

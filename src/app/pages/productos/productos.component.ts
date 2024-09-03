import { Component, OnInit } from '@angular/core';
import { Producto } from './producto';
import { ProductoService } from './producto.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})

export class ProductosComponent implements OnInit {

  productos: Producto[] = [];

  editarProducto: Producto = {
    id: 0,
    name: '',
    description: '',
    price: 0,
    stock: 0,
    status: 'Active',
    createdAt: new Date(),  
    updatedAt: new Date()   
  };

  constructor(private productoService: ProductoService, private router: Router) {}

  ngOnInit(): void {
    this.productoService.getAll().subscribe((data) => {
      this.productos = data.filter((producto) => producto.status === 'Active');
    });
  }

  update() {
    // Obtener la fecha actual en formato 'yyyy-MM-dd'
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Asignar la fecha actual al objeto editarProducto
    this.editarProducto.updatedAt = today;

    // Enviar la solicitud de actualización al backend
    this.productoService.updateProducto(this.editarProducto).subscribe((producto) => {
      console.log('Producto actualizado con éxito:', producto);
      // Realiza cualquier acción adicional después de la actualización
    });
  }

  borrar(productoEliminado: Producto) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'No podrás revertir esto.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, bórralo',
    }).then((result) => {
      if (result.isConfirmed) {
        // Obtener la fecha actual en formato 'yyyy-MM-dd'
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        // Marcar el producto como inactivo
        productoEliminado.status = 'Inactive';
        productoEliminado.updatedAt = today;

        // Enviar la solicitud de actualización al backend
        this.productoService.updateProducto(productoEliminado).subscribe(
          (producto) => {
            console.log('Producto eliminado con éxito:', producto);
            Swal.fire('¡Eliminado!', 'El Producto ha sido eliminado.', 'success');
            this.productos = this.productos.filter((p) => p.id !== productoEliminado.id);
          },
          (error) => {
            console.error('Error al eliminar el producto', error);
          }
        );
      }
    });
  }

}

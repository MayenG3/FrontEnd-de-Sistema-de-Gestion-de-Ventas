import { Component, OnInit } from '@angular/core';
import { ComprasService } from './compras.service';
import { Compras } from './compra';
import { ProductoService } from '../productos/producto.service';
import { Producto } from '../productos/producto';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-compras',
  templateUrl: './compras.component.html',
  styleUrls: ['./compras.component.css'],
})
export class ComprasComponent implements OnInit {
  compras: Compras[] = [];
  productos: Producto[] = [];

  constructor(
    private service: ComprasService,
    private serviceProduct: ProductoService
  ) {}

  ngOnInit(): void {
    this.service.getListadoCompras().subscribe((data) => {
      // Filtra la lista para mostrar solo clientes con estado "Activo"
      this.compras = data.filter((compra) => compra.estado === 'Activo');
    });

    this.serviceProduct.getAll().subscribe((product) => {
      console.log(product);
      this.productos = product.filter(
        (producto) => producto.estado === 'Activo'
      );
    });
  }

  getProductName(id_producto: Number): string {
    const product = this.productos.find(
      (producto) => producto.id_producto === id_producto
    );
    return product ? product.producto : 'Producto no encontrado';
  }

  //metodo para anular la compra
  deleteCompra(compra: Compras) {
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
          compra.fecha_crear ? compra.fecha_crear : ''
        );
        fecha_crear.setDate(fecha_crear.getDate() + 1);
        // Obtener la fecha actual en formato 'yyyy-MM-dd'
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        // Asignar la fecha actual al objeto editarCliente
        compra.fecha_mod = today;
        compra.fecha_crear = fecha_crear;
        compra.estado = 'Inactivo';

        //restar la cantidad de compra en la existencia del producto
        const product = this.productos.find(
          (producto) => producto.id_producto === compra.id_producto
        );

        if (product) {
          product.existencia = String(
            Number(product.existencia) - Number(compra.cantidad)
          );
          console.log(product);
          this.serviceProduct.updateProducto(product).subscribe((producto) => {
            console.log(producto);
          });
        } else {
          console.log('----no se encontro coincidencia con productos---');
        }

        this.service.updateCompra(compra).subscribe((compra) => {
          console.log(compra);
          //window.location.reload();
          // Realiza cualquier acción adicional después de la actualización
          Swal.fire('¡Eliminado!', 'La compra ha sido eliminado.', 'success');
          this.compras = this.compras.filter(
            (comp) => comp.id_compra !== compra.id_compra
          );
        });
      }
    });
  }
}

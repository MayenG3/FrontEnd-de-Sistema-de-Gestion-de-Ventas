import { Component, OnInit } from '@angular/core';
import { Producto } from './producto';
import { ProductoService } from './producto.service';
import { Categorias } from '../categorias/categorias';
import { CategoriasService } from '../categorias/categorias.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})

export class ProductosComponent implements OnInit {

  productos: Producto[] = [];
  categorias: Categorias[] = [];

  editarProducto: Producto = {
    id_producto: 0,
    id_categoria: '',
    producto: '',
    existencia: '',
    fecha_crear: null,
    usuario_crear: '',
    fecha_mod: null,
    usuario_mod: '',
    estado: ''
  };
  

  constructor(private productoService: ProductoService, private categoriaService: CategoriasService,private router: Router,){}

  ngOnInit(): void {
    this.productoService.getAll().subscribe((data)=>{
      this.productos = data.filter((producto) => producto.estado === 'Activo'); 
    })

    this.categoriaService.getAll().subscribe(
      c => this.categorias = c
    )
      
  }

  getCategoriesName(
    id_categoria: string,
    ){
      const categoria = this.categorias.find((cat) => cat.id_categoria == id_categoria);
      console.log(categoria)
      return categoria ? categoria.categoria:"Categoria no encontrada";
    }

    
    update() {
      //agregar un dia a la fecha de creacion para evitar conflicto en la base de datos
      const fecha_crear = new Date(
        this.editarProducto.fecha_crear ? this.editarProducto.fecha_crear : ''
      );
      fecha_crear.setDate(fecha_crear.getDate() + 1);
  
      // Obtener la fecha actual en formato 'yyyy-MM-dd'
      const today = new Date();
      today.setHours(0, 0, 0, 0);
  
      // Asignar la fecha actual al objeto editarCliente
      this.editarProducto.fecha_mod = today;
      this.editarProducto.fecha_crear = fecha_crear;
  
      this.productoService.updateProducto(this.editarProducto).subscribe((producto) => {
        console.log('Cliente actualizado con éxito:', producto);
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
          const fecha_crear = new Date(
            productoEliminado.fecha_crear ? productoEliminado.fecha_crear : ''
          );
          fecha_crear.setDate(fecha_crear.getDate() + 1);
          const today = new Date();
          today.setHours(0, 0, 0, 0);
    
          productoEliminado.fecha_mod = today;
          productoEliminado.fecha_crear = fecha_crear;
    
          productoEliminado.estado = 'Inactivo';
    
          this.productoService.updateProducto(productoEliminado).subscribe(
            (producto) => {
              console.log('Producto eliminado con éxito:', producto);
              Swal.fire('¡Eliminado!', 'El Producto ha sido eliminado.', 'success');
              this.productos = this.productos.filter((p) => p.id_producto !== productoEliminado.id_producto);
            },
            (error) => {
              console.error('Error al eliminar el producto', error);
            }
          );
        }
      });
    }

}

import { Component } from '@angular/core';
import { ProductoService } from './producto.service';
import { Router } from '@angular/router';
import { Categorias } from '../categorias/categorias';
import { Producto } from './producto';
import { CategoriasService } from '../categorias/categorias.service';

@Component({
  selector: 'app-create-producto',
  templateUrl: './create-producto.component.html',
  styleUrls: ['./create-producto.component.css']
})
export class CreateProductoComponent  {

  categorias: Categorias[] = [];
  categoria: Categorias = {
    id_categoria: '',
    categoria: ''
  }

  producto: Producto = {
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
  

  constructor(private productoService: ProductoService,private router: Router, private categoriasService: CategoriasService ){}

  ngOnInit(): void {
    this.categoriasService.getAll().subscribe(
      c => this.categorias = c
    )
      
  }

  IngresarProducto(
    producto: string,
    existencia: string,
    categoria: string
  ) {
    console.log(producto, existencia,categoria);
    this.producto.producto = producto;
    this.producto.existencia = existencia;
    this.producto.id_categoria = categoria;

    const today = new Date();
    today.setHours(0,0,0,0);
    this.producto.fecha_crear = today;
    this.producto.usuario_crear = '1';
    this.producto.estado = 'Activo';
    this.productoService.insertarProducto(this.producto).subscribe((producto) => {
    console.log('Producto actualizado con éxito:', producto);
    this.router.navigate(['/productos']);
    //Realiza cualquier acción adicional después de la actualización
    });
  }

  getCategoriesName(
    id_categoria: string,
    ){
      const categoria = this.categorias.find((cat) => cat.id_categoria == id_categoria);
      return categoria?categoria:"Categoria no encontrada";
    }

  }




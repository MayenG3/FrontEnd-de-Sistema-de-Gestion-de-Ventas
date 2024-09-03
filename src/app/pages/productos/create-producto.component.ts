import { Component, OnInit } from '@angular/core';
import { ProductoService } from './producto.service';
import { Router } from '@angular/router';
import { Producto } from './producto';

@Component({
  selector: 'app-create-producto',
  templateUrl: './create-producto.component.html',
  styleUrls: ['./create-producto.component.css']
})
export class CreateProductoComponent implements OnInit {

  producto: Producto = {
    id: 0,
    name: '',
    description: '',
    price: 0,
    stock: 0,
    status: 'Active',
  };

  constructor(
    private productoService: ProductoService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Puedes inicializar otras cosas si es necesario
  }

  IngresarProducto() {
    this.productoService.insertarProducto(this.producto).subscribe(
      (producto) => {
        console.log('Producto creado con éxito:', producto);
        this.router.navigate(['/productos']);
      },
      (error) => {
        console.error('Error al crear el producto:', error);
      }
    );
  }
}

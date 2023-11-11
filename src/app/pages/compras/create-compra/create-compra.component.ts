import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Proveedor } from '../../proveedores/proveedores';
import { proveedorervice } from '../../proveedores/proveedores.service';
import { Producto } from '../../productos/producto';
import { ProductoService } from '../../productos/producto.service';
import { Compras } from '../compra';
import { AuthService } from 'src/app/auth.service';
import { ComprasService } from '../compras.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-create-compra',
  templateUrl: './create-compra.component.html',
  styleUrls: ['./create-compra.component.css']
})
export class CreateCompraComponent implements OnInit{
  proveedores: Proveedor[] = [];
  productos: Producto[] = [];
  selectedProduct: any;

  compra: Compras = {
    id_compra:0,
    id_producto: 0,
    id_proveedor: 0,
    cantidad: 0,
    precio_compra: 0,
    fecha_crear: null,
    usuario_crear: '',
    fecha_mod: null,
    usuario_mod: '',
    estado: ''
  }

  usuario: any;

  constructor(private service: ComprasService, private proveedorService: proveedorervice, private productoService: ProductoService, private authService: AuthService, private router: Router){}

  ngOnInit(): void {
    this.proveedorService.getListadoproveedor().subscribe((data) => {
      this.proveedores = data.filter((proveedores) => proveedores.estado === 'Activo');
    });

    this.productoService.getAll().subscribe((data)=>{
      this.productos = data.filter((producto) => producto.estado === 'Activo'); 
    })
  }

  crearCompra(
    id_producto: string,
    id_proveedor: string,
    cantidad: string,
    precio_compra: string
  ) {
    this.compra.id_producto = Number(id_producto);
    this.compra.id_proveedor = Number(id_proveedor);
    this.compra.cantidad = Number(cantidad);
    this.compra.precio_compra = Number(precio_compra);

    const today = new Date();
    today.setHours(0,0,0,0);

    this.compra.fecha_crear = today;
    this.compra.estado = 'Activo';

    //recuperar el usuario que incio sesion
    this.usuario = this.authService.getLoggedInUser();

    //asignar el id del usuario que lo creo
    this.compra.usuario_crear = this.usuario.id_rol;

    //asignarle la nueva cantidad al producto
    //restar la cantidad de compra en la existencia del producto
    const product = this.productos.find(
      (producto) => producto.id_producto === Number(id_producto)
    );

    if (product) {
      product.existencia = String(
        Number(product.existencia) + Number(cantidad)
      );
      console.log(product);
      this.productoService.updateProducto(product).subscribe((producto) => {
        console.log(producto);
      });
    } else {
      console.log('----no se encontro coincidencia con productos---');
    }

    console.log(this.compra);
    this.service.insertarCompra(this.compra).subscribe((compra) => {
    console.log('Compra creado con éxito:', compra);
    this.router.navigate(['/compras']);
    //Realiza cualquier acción adicional después de la actualización
    });
  }

}

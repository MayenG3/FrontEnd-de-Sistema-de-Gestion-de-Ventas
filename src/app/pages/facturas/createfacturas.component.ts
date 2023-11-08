import { Component } from '@angular/core';
import { Clientes } from '../clientes/cliente';
import { clientesService } from '../clientes/clientes.service';
import { Router } from '@angular/router';
import { Producto } from '../productos/producto';
import { ProductoService } from '../productos/producto.service';
import { Facturas } from './facturas';
import { FacturasService } from './facturas.service';


@Component({
  selector: 'app-createfacturas',
  templateUrl: './createfacturas.component.html',
  styleUrls: ['./createfacturas.component.css']
})
export class CreatefacturasComponent {
  fechaActual: string;
 clientes: Clientes[] = [];
 productos: Producto[] = [];

 facturas:Facturas[] = [];
 factura: Facturas={
   id_factura: '',
   referencia: '',
   id_cliente: '',
   fecha: '',
   serie: '',
   numero: '',
   authorization: '',
   fecha_crear: null,
   usuario_crear: '',
   fecha_mod: null,
   usuario_mod: '',
   estado: ''
 }

  constructor(private clienteService: clientesService,
    private productoService: ProductoService, 
    private router: Router, 
    private facturaService:FacturasService){
      this.fechaActual = new Date().toISOString().slice(0, 10);
    }

  ngOnInit(): void {
    this.clienteService.getAll().subscribe((data)=>{
      this.clientes = data.filter((cliente) => cliente.estado === 'Activo'); 
    })
    this.productoService.getAll().subscribe((data)=>{
      this.productos = data.filter((producto) => producto.estado === 'Activo'); 
    })
      
  }

  crearFactura(
    cliente: string,

  ) {
    const today = new Date();
    today.setHours(0,0,0,0);
    const serieAleatoria = Array.from(crypto.getRandomValues(new Uint8Array(4))).map(byte => ('0' + byte.toString(16))
    .slice(-2)).join('').toUpperCase();
    const numeroAleatorio = (Math.floor(Math.random() * 9000000000) + 1000000000).toString();
    const autorizacionAleatoria = Array.from(crypto.getRandomValues(new Uint8Array(16))).map(byte => ('0' + byte.toString(16)).slice(-2))
    .join('')
    .replace(/(\w{4})(\w{4})(\w{4})(\w{4})/, '$1-$2-$3-$4-')
    .toUpperCase();
  
    
    console.log(serieAleatoria);


    this.factura.id_cliente = cliente;
    this.factura.serie = serieAleatoria;
    this.factura.numero = numeroAleatorio;
    this.factura.authorization = autorizacionAleatoria;
    this.factura.fecha_crear = today;
    this.factura.referencia= ''
    this.factura.usuario_crear = '1';
    this.factura.estado = 'Emitida';
    this.facturaService.insertarFactura(this.factura).subscribe((factura) => {
    console.log('Producto actualizado con éxito:', factura);
    this.router.navigate(['/facturas']);
    //Realiza cualquier acción adicional después de la actualización
    });
  }

}

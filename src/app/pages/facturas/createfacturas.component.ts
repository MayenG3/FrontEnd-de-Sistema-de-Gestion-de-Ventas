import { Component } from '@angular/core';
import { Clientes } from '../clientes/cliente';
import { clientesService } from '../clientes/clientes.service';
import { Router } from '@angular/router';
import { Producto } from '../productos/producto';
import { ProductoService } from '../productos/producto.service';
import { Facturas } from './facturas';
import { FacturasService } from './facturas.service';
import { DetalleFacturas } from './detalle-facturas';

@Component({
  selector: 'app-createfacturas',
  templateUrl: './createfacturas.component.html',
  styleUrls: ['./createfacturas.component.css'],
})
export class CreatefacturasComponent {
  fechaActual: string;
  facturaCreadaId: string;
  productosAgregados: { producto: string, cantidad: string, precio: string, monto_total: string }[] = [];
  totalSubtotales: number = 0;
  clientes: Clientes[] = [];
  productos: Producto[] = [];

  facturas: Facturas[] = [];
  factura: Facturas = {
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
    estado: '',
  };
  
  detalleFacturas: DetalleFacturas[] = [];
  detalleFactura: DetalleFacturas = {
    id_factura: '',
    id_producto: '',
    cantidad: '',
    precio: ''
  };

  constructor(
    private clienteService: clientesService,
    private productoService: ProductoService,
    private router: Router,
    private facturaService: FacturasService
  ) {
    this.fechaActual = new Date().toISOString().slice(0, 10);
    this.facturaCreadaId = '';
  }

  ngOnInit(): void {
    this.clienteService.getAll().subscribe((data) => {
      this.clientes = data.filter((cliente) => cliente.estado === 'Activo');
    });
    this.productoService.getAll().subscribe((data) => {
      this.productos = data.filter((producto) => producto.estado === 'Activo');
    });

    this.agregarFila();
  }

  verFactura(id: string) {
    
  }

  crearFactura(cliente: string) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const serieAleatoria = Array.from(crypto.getRandomValues(new Uint8Array(4)))
      .map((byte) => ('0' + byte.toString(16)).slice(-2))
      .join('')
      .toUpperCase();
    const numeroAleatorio = (
      Math.floor(Math.random() * 9000000000) + 1000000000
    ).toString();
    const autorizacionAleatoria = Array.from(
      crypto.getRandomValues(new Uint8Array(16))
    )
      .map((byte) => ('0' + byte.toString(16)).slice(-2))
      .join('')
      .replace(/(\w{4})(\w{4})(\w{4})(\w{4})/, '$1-$2-$3-$4-')
      .toUpperCase();

    this.factura.id_cliente = cliente;
    this.factura.serie = serieAleatoria;
    this.factura.numero = numeroAleatorio;
    this.factura.authorization = autorizacionAleatoria;
    this.factura.fecha_crear = today;
    this.factura.usuario_crear = '1';
    this.factura.estado = 'Emitida';
    this.factura.referencia = 'A00';

    this.facturaService.insertarFactura(this.factura).subscribe((factura) => {
      this.facturaCreadaId = factura.id_factura;
      
      
      // Ahora, procesa las filas de productos agregadas dinámicamente
      for (const productoAgregado of this.productosAgregados) {
        this.detalleFactura.id_factura = this.facturaCreadaId;
        this.detalleFactura.id_producto = productoAgregado.producto;
        this.detalleFactura.cantidad = productoAgregado.cantidad;
        this.detalleFactura.precio = productoAgregado.precio;
        // Luego, envía los detalles de cada producto al servidor
        this.facturaService.insertarDetalleFactura(this.detalleFactura).subscribe((_detalleFactura) => {
          //this.router.navigate(['/facturas']);
          this.router.navigate(['/facturas', this.facturaCreadaId]);
        });
      }
    });
  }

  agregarFila() {
    // Al agregar una nueva fila, primero verifica que los datos de la fila actual sean válidos
    const nuevaFila = {
      producto: '',
      cantidad: '',
      precio: '',
      monto_total: ''
    };
  
      this.productosAgregados.push(nuevaFila);
   
  }


  eliminarFila(index: number) {
    this.productosAgregados.splice(index, 1);
  }

  calcularMontoTotal(index: number) {
  const productoAgregado = this.productosAgregados[index];
  const cantidad = parseFloat(productoAgregado.cantidad);
  const precio = parseFloat(productoAgregado.precio);
  productoAgregado.monto_total = (cantidad * precio).toFixed(2);

  // Recalcula el totalSubtotales
  this.totalSubtotales = this.productosAgregados.reduce((total, producto) => {
    return total + (parseFloat(producto.monto_total) || 0);
  }, 0);
}

}

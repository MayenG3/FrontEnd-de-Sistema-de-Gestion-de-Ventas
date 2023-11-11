import { Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import jsPDF from 'jspdf';
import { FacturasService } from '../facturas.service';
import { Facturas } from '../facturas';
import { Clientes } from '../../clientes/cliente';
import { clientesService } from '../../clientes/clientes.service';
import { DetalleFacturas } from '../detalle-facturas';
import { Producto } from '../../productos/producto';
import { ProductoService } from '../../productos/producto.service';
import { Usuario } from '../../login/login';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-vista-factura',
  templateUrl: './vista-factura.component.html',
  styleUrls: ['./vista-factura.component.css'],
})
export class VistaFacturaComponent {
  @ViewChild('content', { static: false }) el!: ElementRef;
  factura: Facturas | undefined;
  clientes: Clientes[] = [];
  detalleFacturas: DetalleFacturas[] = [];
  productos: Producto[] = [];
  usuario: any;

    downloadPDF() {
      const pdf = new jsPDF('p', 'pt', 'letter');

      const content = this.el.nativeElement;
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
  
      // Ajusta la altura del contenedor para que se ajuste al tamaño de una página
      content.style.height = pdfHeight + 'px';
  
      pdf.html(content, {
        callback: (pdf) => {
          // Genera un Blob a partir de los datos del PDF
          const blob = pdf.output('blob');
  
          // Crea un objeto de URL a partir del Blob
          const url = URL.createObjectURL(blob);
  
          // Abre una nueva ventana del navegador con la URL del Blob
          window.open(url, '_blank');
  
          // Libera el objeto de URL después de un tiempo
          setTimeout(() => {
            URL.revokeObjectURL(url);
          }, 1000);
        },
      });
    }


  constructor(
    private route: ActivatedRoute,
    private facturaService: FacturasService,
    private clienteService: clientesService,
    private productoService: ProductoService,
    private authService: AuthService,
  ) {}

  ngOnInit(): void {
    //recuperar el usuario que incio sesion
    this.usuario = this.authService.getLoggedInUser();

    //recuperando el id de la factura
    const facturaId = this.route.snapshot.paramMap.get('id');

    if (facturaId) {
      this.facturaService.getFacturaById(facturaId).subscribe(
        (factura) => {
          this.factura = factura;
          // Puedes realizar cualquier lógica adicional aquí
        },
        (error) => {
          console.error('Error al obtener la factura:', error);
        }
      );
    }

    this.clienteService.getAll().subscribe(
      (c) => {
        console.log('Clientes cargados:', c);
        this.clientes = c;
      },
      (error) => {
        console.error('Error al cargar clientes:', error);
      }
    );

    this.productoService.getAll().subscribe(
      (c) => {
        console.log('cargados:', c);
        this.productos = c;
      },
      (error) => {
        console.error('Error al cargar:', error);
      }
    );

    if (facturaId) {
      this.facturaService.getDetalleFacturaById(facturaId).subscribe(
        (detalle) => {
          this.detalleFacturas = detalle;
        },
        (error) => {
          console.error('Error al obtener la factura:', error);
        }
      );
    }
    
  }

  getClientsInfo(id: string) {
    const cliente = this.clientes.find((cl) => cl.id_cliente == id);
    console.log(id);
    return cliente
      ? {
          nombre: cliente.nombre,
          direccion: cliente.direccion,
          nit: cliente.nit,
          telefono: cliente.telefono,
          // Agrega otras propiedades según sea necesario
        }
      : { mensaje: 'Cliente no encontrado' };
  }

  getSubtotales(unit:string, cost:string){
    const subtotal = Number(unit) * Number(cost);

    return subtotal.toFixed(2)
  }

  getProductName(id: string){
    const producto = this.productos.find((product)=> product.id_producto == Number(id))

    return producto ? producto.producto : "Producto no Econtrado";
  }

  getTotal(){
    let total = 0;

    for(let i = 0;i < this.detalleFacturas.length;i++){
      const detalle = this.detalleFacturas[i];

      total += parseFloat(detalle.cantidad) * parseFloat(detalle.precio)
    }

    return total.toFixed(2)
  }

}

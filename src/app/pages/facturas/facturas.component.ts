import { Component } from '@angular/core';
import { Facturas } from './facturas';
import { FacturasService } from './facturas.service';
import { Clientes } from '../clientes/cliente';
import { clientesService } from '../clientes/clientes.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-facturas',
  templateUrl: './facturas.component.html',
  styleUrls: ['./facturas.component.css']
})
export class FacturasComponent {
  facturas: Facturas[] = [];
  clientes: Clientes[] = [];
  

  constructor(private facturaService: FacturasService, private clienteService: clientesService, private router: Router){}
  verFactura(id: string) {
    this.router.navigate(['/facturas', id]);
  }
  
  ngOnInit(): void {
    this.facturaService.getAll().subscribe( f=>{ this.facturas =  f; })

    this.clienteService.getAll().subscribe(
      c => {
        console.log('Clientes cargados:', c);
        this.clientes = c;
      },
      error => {
        console.error('Error al cargar clientes:', error);
      }
    );
}

getClientsName(
  id: string,
  ){
    const cliente = this.clientes.find((cl) => cl.id_cliente == id);
    console.log(id);
    return cliente ? cliente.nombre:"Cliente no encontrado"

  }


  anular(facturaAnulada: Facturas) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'No podrás revertir esto.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, realiza la Anulación',
    }).then((result) => {
      if (result.isConfirmed) {
        const fecha_crear = new Date(
          facturaAnulada.fecha_crear ? facturaAnulada.fecha_crear : ''
        );
        fecha_crear.setDate(fecha_crear.getDate() + 1);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
  
       facturaAnulada.fecha_mod = today;
       facturaAnulada.fecha_crear = fecha_crear;
  
        facturaAnulada.estado = 'Anulada';
  
        this.facturaService.updateFactura(facturaAnulada).subscribe(
          (factura) => {
            console.log('Factura Anulada con éxito:', factura);
            Swal.fire('¡Anulada!', 'Factura Anulada con éxito', 'success');
            this.facturaService.getAll().subscribe( f=>{ this.facturas =  f; })
          },
          (error) => {
            console.error('Error al anular la Factura', error);
          }
        );
      }
    });
  }
}

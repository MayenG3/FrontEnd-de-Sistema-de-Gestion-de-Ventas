import { Component } from '@angular/core';
import { Facturas } from './facturas';
import { FacturasService } from './facturas.service';
import { Clientes } from '../clientes/cliente';
import { clientesService } from '../clientes/clientes.service';

@Component({
  selector: 'app-facturas',
  templateUrl: './facturas.component.html',
  styleUrls: ['./facturas.component.css']
})
export class FacturasComponent {
  facturas: Facturas[] = [];
  clientes: Clientes[] = [];
  

  constructor(private facturaService: FacturasService, private clienteService: clientesService){}

  ngOnInit(): void {
    this.facturaService.getAll().subscribe((data)=>{
      this.facturas = data.filter((factura) => factura.estado === 'Emitida'); 
    })

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
}

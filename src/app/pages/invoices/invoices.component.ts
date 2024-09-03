import { Component, OnInit } from '@angular/core';
import { InvoiceService } from '../invoices/invoice.service';
import Swal from 'sweetalert2';
import * as bootstrap from 'bootstrap';
import { Producto } from '../productos/producto';

@Component({
  selector: 'app-invoices',
  templateUrl: './invoices.component.html',
  styleUrls: ['./invoices.component.css']
})
export class InvoicesComponent implements OnInit {
  facturas: any[] = []; 
  invoiceDetails: any[] = []; 
  selectedInvoice: any; 
  selectedCustomer: any; 

  constructor(private invoiceService: InvoiceService) {}

  ngOnInit(): void {
    this.loadInvoices();
  }

  loadInvoices() {
    this.invoiceService.getInvoicesWithCustomer().subscribe(invoices => {
      this.facturas = invoices;
    });
  }

  viewInvoice(invoiceId: number) {
    this.invoiceService.getInvoiceFullDetails(invoiceId).subscribe(invoice => {
      console.log('Invoice:', invoice); 
      this.selectedInvoice = invoice;
      this.selectedCustomer = invoice.customer;
      this.invoiceDetails = invoice.details;
  
      // Mostrar el modal
      const modalElement = document.getElementById('invoiceDetailsModal');
      if (modalElement) {
        const modal = new bootstrap.Modal(modalElement);
        modal.show();
      }
    });
  }

  cancelInvoice(invoiceId: number) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Una vez que la factura sea anulada, no podrás revertir esta acción.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, anular',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.invoiceService.cancelInvoice(invoiceId).subscribe(
          response => {
            console.log('Factura cancelada:', response);
            this.loadInvoices();
            Swal.fire(
              'Anulada!',
              'La factura ha sido anulada.',
              'success'
            );
          },
          error => {
            console.error('Error al cancelar la factura:', error);
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'No se pudo cancelar la factura, si el problema persiste contacte con el Administrador',
            });
          }
        );
      } else {
        Swal.fire(
          'Cancelado',
          'La factura no ha sido anulada.',
          'info'
        );
      }
    });
  }

  getProductName(productId: number): string {
    if (this.selectedInvoice && this.selectedInvoice.products) {
      const product = this.selectedInvoice.products.find((p: Producto) => p.id.toString() === productId.toString());
      return product ? product.name : 'Desconocido';
    }
    return 'Desconocido';
  }
  
  
  
}

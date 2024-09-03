import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { switchMap, map } from 'rxjs/operators'; // Importar operadores de RxJS
import { CustomerService } from '../customers/customer.service'; // Asegúrate de tener la ruta correcta para CustomerService
import { Producto } from '../productos/producto';

export interface InvoiceDetailRequest {
  product_id: number;
  quantity: number;
}
export interface Invoice {
  id: number;
  customer_id: number;
  total: number;
  status: string;
  customerName?: string; 
  products?: Producto[]; 
}


export interface InvoiceRequest {
  customer_id: number;
  invoiceDetails: InvoiceDetailRequest[];
}

export interface Invoice {
  id: number;
  customer_id: number;
  total: number;
  status: string;
  customerName?: string; // Añadido para el nombre del cliente
}

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {
  private apiUrl = 'http://localhost:8083/invoices'; 
  private productApiUrl = 'http://localhost:8082/products';

  constructor(private http: HttpClient, private customerService: CustomerService) {} // Inyectar CustomerService

  createInvoice(invoiceRequest: InvoiceRequest): Observable<any> {
    return this.http.post<any>(this.apiUrl, invoiceRequest);
  }

  getCustomers(): Observable<any[]> {
    return this.http.get<any[]>('http://localhost:8081/customers');
  }

  getProducts(): Observable<any[]> {
    return this.http.get<any[]>(this.productApiUrl);
  }

  updateProductStock(productId: number, quantity: number): Observable<any> {
    return this.http.put<any>(`${this.productApiUrl}/${productId}/reduce-stock`, { quantity });
  }

  getInvoices(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getInvoicesWithCustomer(): Observable<Invoice[]> {
    return this.getInvoices().pipe(
      switchMap(invoices => {
        // Obtén todos los clientes
        return this.customerService.getAll().pipe(
          map(customers => {
            // Crea un mapa de ID de clientes a nombres
            const customerMap = new Map<number, string>(customers.map(customer => [customer.id, customer.name]));
            
            // Añade el nombre del cliente a cada factura
            return invoices.map((invoice: any) => ({
              ...invoice,
              customerName: customerMap.get(invoice.customer_id) || 'Desconocido'
            }));
          })
        );
      })
    );
  }

  cancelInvoice(invoiceId: number): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${invoiceId}/status`, { status: 'Anulada' });
  }

  getInvoiceFullDetails(invoiceId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${invoiceId}/full`);
  }
  
  
}

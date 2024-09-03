import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { InvoiceService, InvoiceRequest } from './invoice.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-invoice',
  templateUrl: './create-invoice.component.html',
  styleUrls: ['./create-invoice.component.css']
})
export class CreateInvoiceComponent implements OnInit {
  invoiceForm: FormGroup;
  customers: any[] = [];
  products: any[] = [];

  constructor(private fb: FormBuilder, private invoiceService: InvoiceService, private router: Router) {
    this.invoiceForm = this.fb.group({
      customer_id: ['', Validators.required],
      invoiceDetails: this.fb.array([])
    });
  }

  ngOnInit(): void {
    this.invoiceService.getCustomers().subscribe(data => {
      this.customers = data;
    });

    this.invoiceService.getProducts().subscribe(data => {
      this.products = data;
    });
  }

  get invoiceDetails(): FormArray {
    return this.invoiceForm.get('invoiceDetails') as FormArray;
  }

  addInvoiceDetail() {
    this.invoiceDetails.push(this.fb.group({
      product_id: ['', Validators.required],
      quantity: [1, [Validators.required, Validators.min(1)]],
      price: [{value: '', disabled: true}],
      subtotal: [{value: 0, disabled: true}]  
    }));
  }

  removeInvoiceDetail(index: number) {
    this.invoiceDetails.removeAt(index);
  }

  onProductChange(index: number) {
    const detail = this.invoiceDetails.at(index);
    const selectedProductId = Number(detail.get('product_id')?.value);
    const selectedProduct = this.products.find(product => product.id === selectedProductId);
    
    if (selectedProduct) {
      const quantity = detail.get('quantity')?.value || 1;
      const price = selectedProduct.price;
  
      detail.patchValue({
        price: price,
        subtotal: quantity * price  // Recalcula el subtotal
      });
    }
  }

  calculateTotal() {
    return this.invoiceDetails.controls
      .map(detail => detail.get('subtotal')?.value || 0)
      .reduce((acc, value) => acc + value, 0)
      .toFixed(2);
  }

  onSubmit() {
    if (this.invoiceForm.valid) {
      const invoiceRequest: InvoiceRequest = this.invoiceForm.value;
      this.invoiceService.createInvoice(invoiceRequest).subscribe(response => {
        console.log('Invoice created successfully:', response);
  
        // Itera sobre los detalles de la factura y reduce el stock
        invoiceRequest.invoiceDetails.forEach((detail: any) => {
          this.invoiceService.updateProductStock(detail.product_id, detail.quantity).subscribe(
            response => console.log('Stock updated for product:', detail.product_id),
            error => console.error('Error updating stock:', error)
          );
        });
  
        // Redirige a /invoices
        this.router.navigate(['/invoices']);
      }, error => {
        console.error('Error creating invoice:', error);
      });
    }
  }
}

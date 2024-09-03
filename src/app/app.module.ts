import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductosComponent } from './pages/productos/productos.component';
import { CreateProductoComponent } from './pages/productos/create-producto.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SidebarComponent } from './pages/sidebar/sidebar.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { CustomersComponent } from './pages/customers/customers.component';
import { CreateCustomerComponent } from './pages/customers/create-customer.component';
import { InvoicesComponent } from './pages/invoices/invoices.component';
import { CreateInvoiceComponent } from './pages/invoices/create-invoice.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductosComponent,
    CreateProductoComponent,
    SidebarComponent,
    DashboardComponent,
    CustomersComponent,
    CreateCustomerComponent,
    InvoicesComponent,
    CreateInvoiceComponent,


  ],
  imports: [
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgSelectModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

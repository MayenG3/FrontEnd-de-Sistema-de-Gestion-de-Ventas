import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductosComponent } from './pages/productos/productos.component';
import { CreateProductoComponent } from './pages/productos/create-producto.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { CustomersComponent } from './pages/customers/customers.component';
import { CreateCustomerComponent } from './pages/customers/create-customer.component';
import { CreateInvoiceComponent } from './pages/invoices/create-invoice.component';
import { InvoicesComponent } from './pages/invoices/invoices.component';


const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'productos',component: ProductosComponent},
  { path: 'productos/create', component: CreateProductoComponent},
  { path: 'dashboard', component: DashboardComponent},
  { path: 'customers',component: CustomersComponent},
  { path: 'customers/create', component: CreateCustomerComponent},
  { path: 'invoices/create', component: CreateInvoiceComponent},
  { path: 'invoices', component: InvoicesComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
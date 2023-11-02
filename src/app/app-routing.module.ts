import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { ProductosComponent } from './pages/productos/productos.component';
import { CreateProductoComponent } from './pages/productos/create-producto.component';
import { ClientesComponent } from './pages/clientes/clientes.component';
import { CreateClienteComponent } from './pages/clientes/createCliente.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {path: 'login',component: LoginComponent},
  {path: 'productos',component: ProductosComponent},
  { path: 'productos/create', component: CreateProductoComponent },
  {path: 'clientes',component: ClientesComponent},
  {path:'clientes/crear',component:CreateClienteComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
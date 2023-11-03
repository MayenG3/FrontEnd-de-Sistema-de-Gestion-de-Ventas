import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { ProductosComponent } from './pages/productos/productos.component';
import { CreateProductoComponent } from './pages/productos/create-producto.component';
import { ClientesComponent } from './pages/clientes/clientes.component';
import { CreateClienteComponent } from './pages/clientes/createCliente.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {path: 'login',component: LoginComponent},
  {path: 'productos',component: ProductosComponent, canActivate: [AuthGuard]},
  { path: 'productos/create', component: CreateProductoComponent, canActivate: [AuthGuard] },
  {path: 'clientes',component: ClientesComponent, canActivate: [AuthGuard]},
  {path:'clientes/crear',component:CreateClienteComponent, canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
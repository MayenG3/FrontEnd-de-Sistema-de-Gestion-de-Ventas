import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { ProductosComponent } from './pages/productos/productos.component';
import { CreateProductoComponent } from './pages/productos/create-producto.component';
import { ClientesComponent } from './pages/clientes/clientes.component';
import { CreateClienteComponent } from './pages/clientes/createCliente.component';
import { AuthGuard } from './auth.guard';
import { UsuariosComponent } from './pages/usuarios/usuarios.component';
import { CrearUsuarioComponent } from './pages/usuarios/crearusuario/crearusuario.component';
import { ProveedoresComponent } from './pages/proveedores/proveedores.component';
import { CreaproveedoresComponent } from './pages/proveedores/creaproveedores/creaproveedores.component';


const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {path: 'login',component: LoginComponent},
  {path: 'productos',component: ProductosComponent, canActivate: [AuthGuard]},
  { path: 'productos/create', component: CreateProductoComponent, canActivate: [AuthGuard] },
  {path: 'clientes',component: ClientesComponent, canActivate: [AuthGuard]},
  {path:'clientes/crear',component:CreateClienteComponent, canActivate: [AuthGuard]},
  { path: 'clientes', component: ClientesComponent },

  { path: 'usuarios', component: UsuariosComponent },
  { path: 'usuarios/crear', component: CrearUsuarioComponent },
  { path: 'proveedores', component: ProveedoresComponent },
  { path: 'proveedores/crear', component: CreaproveedoresComponent },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
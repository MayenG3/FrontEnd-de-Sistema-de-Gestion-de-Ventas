import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { ProductosComponent } from './pages/productos/productos.component';
import { CreateProductoComponent } from './pages/productos/create-producto.component';
import { FormsModule } from '@angular/forms';
import { SidebarComponent } from './pages/sidebar/sidebar.component';
import { ClientesComponent } from './pages/clientes/clientes.component';
import { CreateClienteComponent } from './pages/clientes/createCliente.component';
import { UsuariosComponent } from './pages/usuarios/usuarios.component';
import { CrearUsuarioComponent } from './pages/usuarios/crearusuario/crearusuario.component';
import { ProveedoresComponent } from './pages/proveedores/proveedores.component';
import { CreaproveedoresComponent } from './pages/proveedores/creaproveedores/creaproveedores.component';
import { FacturasComponent } from './pages/facturas/facturas.component';
import { CreatefacturasComponent } from './pages/facturas/createfacturas.component';
import { ComprasComponent } from './pages/compras/compras.component';
import { VistaFacturaComponent } from './pages/facturas/vista-factura/vista-factura.component';
import { CreateCompraComponent } from './pages/compras/create-compra/create-compra.component';
import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ProductosComponent,
    CreateProductoComponent,
    SidebarComponent,
    ClientesComponent,
    CreateClienteComponent,
     UsuariosComponent,
    CrearUsuarioComponent,
    ProveedoresComponent,
    CreaproveedoresComponent,
    FacturasComponent,
    CreatefacturasComponent,
    ComprasComponent,
    VistaFacturaComponent,
    CreateCompraComponent,
  ],
  imports: [
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

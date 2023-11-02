import { Component} from '@angular/core';
import { LoginService } from './login.service';
import * as crypto from 'crypto-js';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';


@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
    
})
export class LoginComponent {
  nombreUsuario: string ="";
  claveUsuario: string = "";

  constructor(private loginService: LoginService, private router: Router) {}

  onSubmit() {
    this.loginService.getUsuarioByNombre(this.nombreUsuario).subscribe(usuario => {
      if (usuario) {
        // Cifra la contraseña ingresada con SHA-1
        const claveCifrada = crypto.SHA1(this.claveUsuario).toString();

        if (usuario.usuario === this.nombreUsuario && usuario.clave === claveCifrada) {
          // Las credenciales son correctas, redirige al componente de inicio
          this.router.navigate(['clientes']);
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Las credenciales son incorrectas'
          })
        }
      }
    });
  }
}

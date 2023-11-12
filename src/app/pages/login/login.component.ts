import { Component, OnInit } from '@angular/core';
import { LoginService } from './login.service';
import * as crypto from 'crypto-js';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit{
  nombreUsuario: string = '';
  claveUsuario: string = '';

  constructor(
    private loginService: LoginService,
    private router: Router,
    private cookieService: CookieService,
  ) {}

  ngOnInit() {
    // Verificar si hay una sesión abierta
    if (this.cookieService.check('usuario')) {
      // Redirigir al componente de clientes
      this.router.navigate(['dashboard']);
    }
  }

  onSubmit() {
    this.loginService
      .getUsuarioByNombre(this.nombreUsuario)
      .subscribe((usuario) => {
        if (usuario) {
          // Cifra la contraseña ingresada con SHA-1
          
          const claveCifrada = crypto.SHA1(this.claveUsuario).toString();

          if (
            usuario.usuario === this.nombreUsuario &&
            usuario.clave === claveCifrada
          ) {
            // Calcula la fecha de expiración (8 horas desde el momento actual)
            const expirationDate = new Date();
            expirationDate.setTime(
              expirationDate.getTime() + 8 * 60 * 60 * 1000
            ); // 8 horas en milisegundos

            // Guarda el usuario en una cookie con fecha de expiración
            this.cookieService.set(
              'usuario',
              JSON.stringify(usuario),
              expirationDate
            );

            // Las credenciales son correctas, redirige al componente de inicio
            this.router.navigate(['dashboard']);
          } else {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Las credenciales son incorrectas',
            });
          }
        }
      });
  }
}

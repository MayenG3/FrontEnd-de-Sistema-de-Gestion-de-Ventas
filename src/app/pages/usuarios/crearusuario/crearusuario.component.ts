import { Component } from '@angular/core';
import { usuarioservice } from '../usuarios.service';
import { Usuarios } from '../usuarios';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import * as crypto from 'crypto-js';



@Component({
  selector: 'app-crearusuario',
  templateUrl: './crearusuario.component.html',
  styleUrls: ['./crearusuario.component.css']
})
export class CrearUsuarioComponent {
  usuario: Usuarios = {
    id_usuario: '',
    usuario: '',
    id_persona: '1',
    id_rol: 0,
    clave: '',
    fecha_crear: null,
    usuario_crear: '',
    fecha_mod: null,
    usuario_mod: '',
    estado: 'Activo',
  };

  constructor(private usuariosService: usuarioservice, private router: Router) {}

  
  parseRole(value: string): number {
    return parseInt(value, 10); // o Number(value)
  }
  
  crearCliente(username: string, password: string, role: number) {
    this.usuario.usuario = username;
  
    // Utilizar SHA-1 para cifrar la contraseña
    const encryptedPassword = crypto.SHA1(password).toString();

    this.usuario.clave = encryptedPassword;
  
    this.usuario.id_rol = role;
  
    const today = new Date();
    today.setHours(0, 0, 0, 0);
  
    this.usuario.fecha_crear = today;
    this.usuario.usuario_crear = '1';
    this.usuario.estado = 'Activo';
  
    this.usuariosService.insertarUsuario(this.usuario).subscribe((usuario) => {
      console.log('Usuario actualizado con éxito:', usuario);
      this.router.navigate(['/usuarios']);
    });
  }
  }
  


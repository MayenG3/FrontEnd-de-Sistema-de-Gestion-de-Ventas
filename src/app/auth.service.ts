import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Usuario } from './pages/login/login';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private cookieService: CookieService, private router: Router) {}

  getLoggedInUser(): Usuario | null {
    const userString = this.cookieService.get('usuario');
    if (userString) {
      return JSON.parse(userString);
    }
    return null;
  }

  isAuthenticated(){
    if(this.cookieService.check('usuario')){
      return true;
    }else{
      return false;
    }
  }

  logout() {
    this.cookieService.delete('usuario'); // Elimina la cookie de usuario.
    this.router.navigate(['/login']);
  }
}

import { Component} from '@angular/core';
import { navbarData } from './nav-data';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  navbarData = navbarData;
  isSidebarHidden = true;

  constructor(private authService: AuthService) {}

  toggleSidebar() {
    this.isSidebarHidden = !this.isSidebarHidden;
  }

  onLogout() {
    this.authService.logout(); // Llama al método de cierre de sesión
  }
}
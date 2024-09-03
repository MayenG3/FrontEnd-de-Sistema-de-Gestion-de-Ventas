import { Component, Input} from '@angular/core';
import { navbarData } from './nav-data';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  navbarData = navbarData;
  @Input() isSidebarHidden = true;


  toggleSidebar() {
    this.isSidebarHidden = !this.isSidebarHidden;
  }


}
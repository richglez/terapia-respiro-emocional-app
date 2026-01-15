import { Component, Output, EventEmitter } from '@angular/core';

interface SideNavToggle {
  screenWidth: number;
  collapsed: boolean;
}

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
})
export class SidenavComponent {
  @Output() onToggleSideNav: EventEmitter<SideNavToggle> = new EventEmitter();
  collapsed = false;
  collapsed2 = false;
  screenWidth = 0;
  isSubMenuOpen: boolean = false; // sub-menu
  isSubMenuOpen2: boolean = false; // sub-menu
  activeItem: number = -1; // seleccion Inicialmente se establece en -1 para indicar que ningún elemento está activo.

  openSubMenuPacientes() {
    this.isSubMenuOpen = !this.isSubMenuOpen;
    if (this.isSubMenuOpen) {
      this.collapsed = true; // Abre el menú si el submenú se abre
    }
  }

  openSubMenuCuidadores() {
    if (!this.isSubMenuOpen2) {
      this.isSubMenuOpen2 = true;
      this.collapsed2 = true;
      this.collapsed = true; // Colapsar el menú principal
    } else {
      this.isSubMenuOpen2 = false;
      this.collapsed2 = false;
      this.collapsed = false; // Expandir el menú principal
    }
  }
  

  toggleCollapse(): void {
    this.collapsed = !this.collapsed;
    this.collapsed2 = !this.collapsed2;
    if (!this.collapsed && !this.isSubMenuOpen) {
      this.isSubMenuOpen = false; // Cierra el submenú si el menú se cierra
    }
    this.onToggleSideNav.emit({
      collapsed: this.collapsed,
      screenWidth: this.screenWidth,
    });
  }
  

  closeSidenav(): void {
    this.collapsed = false;
    this.isSubMenuOpen = false; // Cierra el submenú al cerrar el menú
    this.onToggleSideNav.emit({
      collapsed: this.collapsed,
      screenWidth: this.screenWidth,
    });
  }
}

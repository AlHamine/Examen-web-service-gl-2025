import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
   standalone: true,
  imports: [CommonModule, RouterModule],
})
export class NavbarComponent {
  mobileMenuOpen = false;
  userMenuOpen = false;

  toggleMobileMenu(): void {
    this.mobileMenuOpen = !this.mobileMenuOpen;
    // Fermer le menu utilisateur si ouvert
    if (this.userMenuOpen) {
      this.userMenuOpen = false;
    }
  }

  closeMobileMenu(): void {
    this.mobileMenuOpen = false;
  }

  toggleUserMenu(): void {
    this.userMenuOpen = !this.userMenuOpen;
    // Fermer le menu mobile si ouvert
    if (this.mobileMenuOpen) {
      this.mobileMenuOpen = false;
    }
  }

  // Fermer les menus quand on clique ailleurs
  onClickOutside(): void {
    this.mobileMenuOpen = false;
    this.userMenuOpen = false;
  }
}
import { Component } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sidebar',
  imports: [
    RouterModule,
    CommonModule
  ],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css'
})
export class Sidebar {

  constructor(private router: Router) {}

  logout() {
    // Clear all session data
    sessionStorage.clear();
    
    // Clear any other storage if needed
    localStorage.removeItem('authUser');
    
    // Redirect to login page
    this.router.navigate(['/login']);
  }
}

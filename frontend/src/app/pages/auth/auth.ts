import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { UserService } from '../../services/user';
import { User } from '../../models/user';

@Component({
  selector: 'app-auth',
  imports: [
    CommonModule,
    FormsModule,
    RouterModule
  ],
  templateUrl: './auth.html',
  styleUrl: './auth.css'
})

export class Auth {
  login: string = '';
  password: string = '';

  constructor(private router: Router, private userService: UserService) {}

  onLogin() {
    this.userService.getUsers().subscribe({
      next: (users: any[]) => {
        const user = users.find(u => u.login === this.login && u.modeDePass === this.password);
        if (user) {
          sessionStorage.setItem('authUser', JSON.stringify(user));
          if (user.role === 'RESPO') {
            this.router.navigate(['/courrier/board']);
          } else if (user.role === 'AGENT') {
            this.router.navigate(['/courrier/board']);
          } else {
            alert('Unknown user role');
          }
        } else {
          alert('Invalid credentials');
        }
      },
      error: () => {
        alert('Failed to fetch users. Please try again later.');
      }
    });
  }
}

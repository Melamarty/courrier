import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { UserService } from '../services/user';
import { User } from '../models/user';
import { HttpClient } from '@angular/common/http';
import { log } from 'console';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './users.html',
  styleUrls: ['./users.css']
})

export class Users  {
  constructor(private http: HttpClient, private cdr: ChangeDetectorRef) {}
  userList: any[] = [];
  loading = true;
  error = '';

  ngOnInit() {
    this.getUsers();
  }
  getUsers() {
    this.http.get<any[]>('http://localhost:9090/api/users').subscribe({
        next: users => {
          this.userList = users;
          this.loading  = false;
          console.log('Users loaded:', this.userList);
          console.log("users length:", this.userList.length);
          this.cdr.markForCheck();
        },
        error: () => {
          this.error   = 'Failed to load users';
          this.loading = false;
        }
      });
  }
}

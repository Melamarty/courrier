import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

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

}

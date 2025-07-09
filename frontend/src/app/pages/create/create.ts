import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { Topbar } from '../../components/topbar/topbar';
import { Sidebar } from '../../components/sidebar/sidebar';

@Component({
  selector: 'app-create',
  //standalone: true,              // ←— REQUIRED when you use the `imports` field
  templateUrl: './create.html',
  styleUrls: ['./create.css'],    // plural!
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    Topbar,
    Sidebar
  ]
})
export class Create implements OnInit {
  courrier = {
    internalRef: '',
    numeroCourrier: '',
    date: '',
    destinateur: '',
    interne: false,
    externe: false,
    diffusionInterne: false,
    referenceExterne: '',
    user: { id: 1 }
  };

  ngOnInit() {
    // Initialize any data or state here if needed
    console.log('Create component initialized');
  }

  constructor(private http: HttpClient, private router: Router) {}

  onSubmit() {
    console.log('Sending:', this.courrier);

    this.http.post('http://localhost:9090/api/courriers', this.courrier)
      .subscribe({
        next: res => {
          console.log('Courrier created', res);
          alert('Courrier created successfully!');
          //this.router.navigate(['/courriers']);   // adjust route if needed
        },
        error: err => console.error('Error creating courrier', err)
      });
  }
}

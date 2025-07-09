import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-courrier-list',
  standalone: true,
  template: `<button (click)="hello()">Test</button>`,
  styleUrls: ['./courrier-list.css'],
  imports: [CommonModule, RouterModule]
})
export class CourrierListComponent implements OnInit {
  ngOnInit() {
    console.log('Component initialized');
  }

  hello() {
    console.log("hello() called");
    alert('Hello from CourrierListComponent');
  }
}

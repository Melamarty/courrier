import { Component, OnInit } from '@angular/core';
import { CourrierService } from '../../services/courrier';
import { Courrier } from '../../models/courrier';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-courrier-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './courrier-list.html',
  styleUrls: ['./courrier-list.css']
})
export class CourrierListComponent implements OnInit {
  courriers: Courrier[] = [];
  loading = true;
  error = '';

  constructor(private courrierService: CourrierService) {}

  ngOnInit(): void {
    this.courrierService.getAll().subscribe({
      next: data => {
        this.courriers = data;
        this.loading = false;
      },
      error: err => {
        this.error = 'Failed to load';
        this.loading = false;
      }
    });
  }
}

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef } from '@angular/core';


interface CourrierRow {
  expediteur:   string;
  destinataire: string;
  date:         string;
  status:       'Envoyée' | 'Brouillon';
}

@Component({
  selector: 'app-entrants',
  imports: [CommonModule, FormsModule],
  templateUrl: './entrants.html',
  styleUrl: './entrants.css'
})

export class Entrants {


  /** colour helper stays the same */
  statusClass(st: CourrierRow['status']) {
    return st === 'Envoyée' ? 'status-envoyee' : 'status-brouillon';
  }

  constructor(private http: HttpClient, private cdr: ChangeDetectorRef) {}

  courrierList: any = [];
  loading = true;
  error = '';
  ngOnInit() {
    this.getCourriers();
  }
  getCourriers() {
    this.http.get<any[]>('http://localhost:9090/api/courriers').subscribe({
        next: courriers => {
          this.courrierList = courriers;
          this.loading  = false;
          console.log('courriers loaded:', this.courrierList);
          console.log("courriers length:", this.courrierList.length);
          this.cdr.markForCheck();
        },
        error: () => {
          this.error   = 'Failed to load courriers';
          this.loading = false;
        }
      });
  }

}
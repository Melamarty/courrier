import { Component } from '@angular/core';
import { HospitalTable } from '../../components/hospital-table/hospital-table';
import { StatCards } from '../../components/stat-cards/stat-cards';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
  imports: [
    HospitalTable,
    StatCards,
    RouterModule
  ]
})
export class Dashboard {

}

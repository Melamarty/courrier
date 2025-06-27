import { Component } from '@angular/core';
import { Topbar } from '../../components/topbar/topbar';
import { Sidebar } from '../../components/sidebar/sidebar';
import { HospitalTable } from '../../components/hospital-table/hospital-table';
import { StatCards } from '../../components/stat-cards/stat-cards';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
  imports: [
    Topbar,
    Sidebar,
    HospitalTable,
    StatCards,
    RouterModule
  ]
})
export class Dashboard {

}

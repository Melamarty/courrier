import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-hospital-table',
  imports: [
    CommonModule,
    RouterModule
  ],
  templateUrl: './hospital-table.html',
  styleUrl: './hospital-table.css'
})
export class HospitalTable {
  hospitals = [
  { name: 'Oncologie', entrants: 12, sortants: 7, enAttente: 3 },
  { name: 'Mere enfants', entrants: 4, sortants: 5, enAttente: 1 },
  { name: 'Traumatologie', entrants: 10, sortants: 17, enAttente: 2 },
  { name: 'Cardiologie', entrants: 5, sortants: 2, enAttente: 1 },
  { name: 'Neurologie', entrants: 1, sortants: 3, enAttente: 5 }
];

}

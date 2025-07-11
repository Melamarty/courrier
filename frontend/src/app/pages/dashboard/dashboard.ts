import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { HospitalTable } from '../../components/hospital-table/hospital-table';
import { StatCards } from '../../components/stat-cards/stat-cards';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-board',
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css'],
  imports: [
    HospitalTable,
    StatCards,
    RouterModule
  ]
})
export class Dashboard implements OnInit {
  constructor(
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      const user = sessionStorage.getItem('authUser');
      if (!user) {
        this.router.navigate(['/login']);
      }
    }
  }
}

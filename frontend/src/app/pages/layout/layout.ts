import { Component } from '@angular/core';
import { Topbar } from '../../components/topbar/topbar';
import { Sidebar } from '../../components/sidebar/sidebar';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-layout',
  imports: [
    Topbar,
    Sidebar,
    RouterModule
  ],
  templateUrl: './layout.html',
  styleUrl: './layout.css'
})
export class Layout {

}

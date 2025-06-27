import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';


@Component({
  selector: 'app-topbar',
  imports: [
    MatIconModule, // Import Material Icon Module
  ],
  templateUrl: './topbar.html',
  styleUrl: './topbar.css',
})
export class Topbar {

}

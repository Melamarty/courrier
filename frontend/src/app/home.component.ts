// home.component.ts
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  template: `
    <a routerLink="/users">Users</a>
	<a routerLink="/courriers">Courriers</a>
    <p><router-outlet></router-outlet></p>
  `,
  standalone: true,
  imports: [RouterModule]
})
export class HomeComponent {}

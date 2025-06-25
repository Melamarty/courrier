import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Users } from './users/users';
import { Courriers } from './courriers/courriers';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected title = 'frontend';
}

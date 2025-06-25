import { Routes } from '@angular/router';
import { Users } from './users/users';
import { Courriers } from './courriers/courriers';
import { HomeComponent } from './home.component';  // import it

export const routes: Routes = [
  { path: '', component: HomeComponent },      // Show buttons on root
  { path: 'users', component: Users },
  { path: 'courriers', component: Courriers },
];

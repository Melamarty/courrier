import { Routes } from '@angular/router';
import { Users } from './users/users';
import { Courriers } from './courriers/courriers';
import { HomeComponent } from './home.component';  // import it
import { Dashboard } from './pages/dashboard/dashboard';
import { Layout } from './pages/layout/layout';
import { Entrants } from './components/entrants/entrants';
import { Sortants } from './components/sortants/sortants';
import { Create } from './pages/create/create';
import { CourrierListComponent } from './pages/courrier-list/courrier-list';

export const routes: Routes = [
  { path: '', component: HomeComponent }, 
  {
    path: 'courrier',
    component: Layout,          // shell
    children: [
      { path: 'courrier/sortants', component: Sortants },
      { path: 'entrants', component: Entrants },
      {path: 'board', component: Dashboard},
      {path: 'create', component:Create },
    ]
  },
  {path: 'dashboard', component: Dashboard},
  { path: 'users', component: Users },
  { path: 'courriers', component: Courriers },
  {path: 'tests', loadComponent: () =>
      import('./pages/courrier-list/courrier-list')
        .then(m => m.CourrierListComponent)
  }
];

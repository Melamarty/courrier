import { Routes } from '@angular/router';
import { HomeComponent } from './home.component';  // import it
import { Dashboard } from './pages/dashboard/dashboard';
import { Layout } from './pages/layout/layout';
import { Entrants } from './components/entrants/entrants';
import { Sortants } from './components/sortants/sortants';
import { Create } from './pages/create/create';
import { Auth } from './pages/auth/auth';
import { AuthGuard } from './auth-guard';
import { Model } from './pages/model/model';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  {path: 'login', component:Auth},
  {
    path: 'courrier',
    component: Layout,  
    children: [
      { path: 'courrier/sortants', component: Sortants },
      { path: 'entrants', component: Entrants },
      {path: 'board', component: Dashboard},
      {path: 'create', component:Create },
      { path: 'analyze', component: Model }
    ]
  },
  {path: 'dashboard', component: Dashboard, canActivate: [AuthGuard]},
  {path: 'tests', loadComponent: () =>
      import('./pages/courrier-list/courrier-list')
        .then(m => m.CourrierListComponent)
  }
];

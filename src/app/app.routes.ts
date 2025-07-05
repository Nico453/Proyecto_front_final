import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { ProyectsListComponent } from './pages/proyects-list/proyects-list.component';
import { RegisterComponent } from './pages/register/register.component';
import { DashboardComponent } from './layout/dashboard/dashboard.component';
import { authGuard } from './guards/auth.guard';
import { noAuthGuard } from './guards/no-auth.guard';

export const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
    canActivate: [noAuthGuard]
  },
  {
    path: 'registro',
    component: RegisterComponent,
    canActivate: [noAuthGuard]
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [authGuard],
    children: [
      {
        path: 'proyectos',
        component: ProyectsListComponent
      },
      {
        path: '',
        redirectTo: 'proyectos',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '**',
    redirectTo: ''
  }
];

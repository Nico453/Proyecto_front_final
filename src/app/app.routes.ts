import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { ProyectsListComponent } from './pages/proyects-list/proyects-list.component';
import { DashboardComponent } from './layout/dashboard/dashboard.component';
import { authGuard } from './guards/auth.guard';
import { noAuthGuard } from './guards/no-auth.guard';

export const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
    canActivate: [noAuthGuard],
  },
  {
    path: 'registro',
    component: RegisterComponent,
    canActivate: [noAuthGuard],
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [authGuard],
    children: [
      {
        path: 'proyectos',
        component: ProyectsListComponent,
      },
      {
        path: 'proyectos/:id',
        loadComponent: () =>
          import('./pages/proyecto-detalle/proyecto-detalle.component').then(
            (m) => m.ProyectoDetalleComponent
          ),
      },
      {
        path: 'historias',
        loadComponent: () =>
          import('./pages/historias-list/historias-list.component').then(
            (m) => m.HistoriasListComponent
          ),
      },
      {
        path: 'historias/:id/tareas',
        loadComponent: () =>
          import('./pages/tareas-list/tareas-list.component').then(
            (m) => m.TareasListComponent
          ),
      },

      {
        path: '',
        redirectTo: 'proyectos',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '**',
    redirectTo: '',
  },
];

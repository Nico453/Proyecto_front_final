import { Component, OnInit } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NotificacionService } from '../../services/notification.service';
import { NotificacionesComponent } from '../../componet/notification/notification.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule, NotificacionesComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {
  userName = '';
  userId!: number;
  mostrarNotificaciones = false;
  notificaciones: any[] = [];

  constructor(
    private router: Router,
    private notiService: NotificacionService
  ) {}

  ngOnInit(): void {
    const user = localStorage.getItem('user');
    if (user) {
      const parsed = JSON.parse(user);
      this.userName = parsed.nombre;
      this.userId = parsed.id;
    }

    this.cargarNotificaciones();

    // 🔁 Recargar cada 10 segundos
    setInterval(() => this.cargarNotificaciones(), 10000);
  }

  cargarNotificaciones(): void {
    this.notiService.obtenerNotificaciones().subscribe((data: any) => {
      this.notificaciones = (Array.isArray(data) ? data : []).filter(
        (n) => !n.leida
      );
    });
  }

  toggleNotificaciones(): void {
    this.mostrarNotificaciones = !this.mostrarNotificaciones;
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.router.navigate(['/']);
  }
}

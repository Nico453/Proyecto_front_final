import { Component, OnInit } from '@angular/core';
import { NotificacionService } from '../../services/notification.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-notification',
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.css'
})
export class NotificacionesComponent implements OnInit {
  notificaciones: any[] = [];
  userName = '';
  userId!: number;


  constructor(private notiService: NotificacionService) {}

  ngOnInit(): void {
  const user = localStorage.getItem('user');
  if (user) {
    const parsed = JSON.parse(user);
    this.userName = parsed.nombre;
    this.userId = parsed.id;

    this.notiService.obtenerNotificaciones().subscribe((data: any) => {
      // 👇 Solo dejar las que no están leídas
      this.notificaciones = (Array.isArray(data) ? data : []).filter(n => !n.leida);
    });
  }
}

  aceptar(noti: any): void {
  const invitacionId = noti.invitacion;
  if (!invitacionId) {
    alert('Esta notificación no tiene una invitación asociada.');
    return;
  }

  this.notiService.aceptarInvitacion(invitacionId).subscribe(() => {
    this.marcarYEliminar(noti.id);
    alert('Invitación aceptada');
  });
}

rechazar(noti: any): void {
  const invitacionId = noti.invitacion;
  if (!invitacionId) {
    alert('Esta notificación no tiene una invitación asociada.');
    return;
  }

  this.notiService.rechazarInvitacion(invitacionId).subscribe(() => {
    this.marcarYEliminar(noti.id);
    alert('Invitación rechazada');
  });
}

marcarYEliminar(notiId: number): void {
  this.notiService.marcarLeida(notiId).subscribe(() => {
    this.notificaciones = this.notificaciones.filter((n) => n.id !== notiId);
  });
}
descartar(notiId: number): void {
  this.notiService.marcarLeida(notiId).subscribe(() => {
    this.notificaciones = this.notificaciones.filter((n) => n.id !== notiId);
  });
}


}
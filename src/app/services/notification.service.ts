import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class NotificacionService {
  private apiUrl = 'http://127.0.0.1:8000/api'; // Ajusta si usas proxy

  constructor(private http: HttpClient) {}

  // 📨 Cargar notificaciones del usuario autenticado (token)
  obtenerNotificaciones(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/proyectos/notificaciones/`);
  }

  aceptarInvitacion(invitacionId: number): Observable<any> {
    return this.http.post(
      `${this.apiUrl}/proyectos/invitacion/${invitacionId}/aceptar/`,
      {}
    );
  }

  rechazarInvitacion(invitacionId: number): Observable<any> {
    return this.http.post(
      `${this.apiUrl}/proyectos/invitacion/${invitacionId}/rechazar/`,
      {}
    );
  }

  eliminarNotificacion(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/notificaciones/${id}/`);
  }
  marcarLeida(notificacionId: number): Observable<any> {
    return this.http.post(
      `${this.apiUrl}/proyectos/notificaciones/${notificacionId}/marcar_leida/`,
      {}
    );
  }
}

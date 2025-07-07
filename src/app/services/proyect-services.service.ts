import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Proyecto } from '../interfaces/proyecto';

@Injectable({
  providedIn: 'root',
})
export class ProyectServicesService {
  private apiUrl = 'http://127.0.0.1:8000/api/';

  constructor(private http: HttpClient) {}

  obtenerAsignaciones(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}proyectos/usuario-proyectos/`);
  }

  obtenerProyectos(): Observable<Proyecto[]> {
    return this.http.get<Proyecto[]>(`${this.apiUrl}proyectos/proyecto/`);
  }

  obtenerProyectoPorId(id: number): Observable<Proyecto> {
    return this.http.get<Proyecto>(`${this.apiUrl}proyectos/proyecto/${id}/`);
  }
  crearProyecto(data: any): Observable<Proyecto> {
    return this.http.post<Proyecto>(`${this.apiUrl}proyectos/proyecto/`, data);
  }
  obtenerUsuarioPorId(
    id: number
  ): Observable<{ id: number; nombre: string; correo: string }> {
    return this.http.get<{ id: number; nombre: string; correo: string }>(
      `${this.apiUrl}usuarios_app/usuarios/${id}/`
    );
  }
  obtenerTodosLosUsuarios(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}usuarios_app/usuarios/`);
  }

  invitarUsuario(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}proyectos/invitacion/`, data);
  }

  // PATCH para actualizar el rol o estado del miembro
  actualizarMiembro(id: number, data: any) {
    return this.http.patch(
      `${this.apiUrl}proyectos/usuario-proyectos/${id}/`,
      data
    );
  }

  // DELETE para eliminar la asignación
  eliminarMiembro(id: number) {
    return this.http.delete(`${this.apiUrl}proyectos/usuario-proyectos/${id}/`);
  }

  crearHistoria(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}proyectos/historias/`, data);
  }

  
}

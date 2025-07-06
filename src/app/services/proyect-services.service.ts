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
 obtenerUsuarioPorId(id: number): Observable<{ id: number, nombre: string, correo: string }> {
  return this.http.get<{ id: number, nombre: string, correo: string }>(`${this.apiUrl}usuarios_app/usuarios/${id}/`);
}
obtenerTodosLosUsuarios(): Observable<any[]> {
  return this.http.get<any[]>(`${this.apiUrl}usuarios_app/usuarios/`);
}

invitarUsuario(data: any): Observable<any> {
  return this.http.post(`${this.apiUrl}proyectos/invitacion/`, data);
}

}


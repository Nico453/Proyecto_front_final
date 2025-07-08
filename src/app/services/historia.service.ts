import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HistoriaUsuario } from '../interfaces/historias-usuario';

@Injectable({ providedIn: 'root' })
export class HistoriaService {
  private apiUrl = 'http://127.0.0.1:8000/api/proyectos/historias/';

  constructor(private http: HttpClient) {}

  obtenerHistorias(): Observable<HistoriaUsuario[]> {
    return this.http.get<HistoriaUsuario[]>(this.apiUrl);
  }
  obtenerUsuarioProyectos(): Observable<any[]> {
    return this.http.get<any[]>(
      'http://127.0.0.1:8000/api/proyectos/usuario-proyectos/'
    );
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Tarea } from '../interfaces/tareas';

@Injectable({
  providedIn: 'root',
})
export class TareaService {
  private apiUrl = 'http://127.0.0.1:8000/api/proyectos/tareas/';

  constructor(private http: HttpClient) {}

  obtenerTodasLasTareas(): Observable<Tarea[]> {
    return this.http.get<Tarea[]>(this.apiUrl);
  }
}

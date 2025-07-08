import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Tarea } from '../interfaces/tareas';

@Injectable({
  providedIn: 'root',
})
export class TareaService {
  private readonly apiUrl = 'http://127.0.0.1:8000/api/proyectos/tareas/';

  constructor(private http: HttpClient) {}

  /**
   * Obtiene todas las tareas desde el backend.
   */
  obtenerTodasLasTareas(): Observable<Tarea[]> {
    return this.http.get<Tarea[]>(this.apiUrl);
  }

  /**
   * Crea una nueva tarea.
   * @param tarea Datos de la tarea a crear
   */
  crearTarea(tarea: Tarea): Observable<Tarea> {
    return this.http.post<Tarea>(this.apiUrl, tarea);
  }

  /**
   * Actualiza una tarea parcialmente (por ejemplo, su estado).
   * @param id ID de la tarea
   * @param data Campos a actualizar
   */
  actualizarTarea(id: number, data: Partial<Tarea>): Observable<Tarea> {
    return this.http.patch<Tarea>(`${this.apiUrl}${id}/`, data);
  }
}

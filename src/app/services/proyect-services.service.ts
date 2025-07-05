import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Proyecto } from '../interfaces/proyecto';

@Injectable({
  providedIn: 'root'
})
export class ProyectServicesService {
  private apiUrl = 'http://127.0.0.1:8000/api/';

  constructor(private http: HttpClient) { }
  obtenerProyectos(): Observable<Proyecto[]> {
    return this.http.get<Proyecto[]>(`${this.apiUrl}proyectos/proyecto/`);

  }

}

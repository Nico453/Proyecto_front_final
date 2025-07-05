import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';  
import { Auth } from '../interfaces/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthServicesService {
  private apiUrl = 'http://localhost:8000/api/auth/';
  private loginUrl = `${this.apiUrl}login/`;
  private registerUrl = `${this.apiUrl}register/`;

  constructor( private readonly Http: HttpClient) { }

  login(email: string, password: string): Observable<Auth> {
    const body = { correo: email, password: password };
    return this.Http.post<Auth>(this.loginUrl, body);
  }
  register(data: { nombre: string; correo: string; password: string }): Observable<Auth> {
    return this.Http.post<Auth>(this.registerUrl, data);
  }


}

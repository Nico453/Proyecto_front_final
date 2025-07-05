import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthServicesService } from '../../services/auth-services.service';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [FormsModule, CommonModule, RouterModule],
  
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  nombre: string = '';
  correo: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthServicesService, private router: Router) {}

  onRegister() {
    const emailRegex = /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/;

    if (!emailRegex.test(this.correo)) {
      this.errorMessage = 'Correo electrónico no válido.';
      return;
    }

    if (!this.nombre || !this.correo || !this.password) {
      this.errorMessage = 'Todos los campos son obligatorios.';
      return;
    }

    this.errorMessage = '';

    const registerData = {
      nombre: this.nombre,
      correo: this.correo,
      password: this.password
    };

    this.authService.register(registerData).subscribe({
      next: (response) => {
        const token = response.token;
        const user = response.user;
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
        console.log('Registro exitoso:', response.mensaje);
        this.router.navigate(['/proyectos']); // o redirigir a login si prefieres
      },
      error: (err) => {
        this.errorMessage = err.error?.error || 'Ocurrió un error al registrar.';
      }
    });
  }
}

import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthServicesService } from '../../services/auth-services.service';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthServicesService, private router: Router) { }

  

  onLogin() {
    const emailRegex = /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/;

    if (!emailRegex.test(this.email)) {
      this.errorMessage = 'Correo electrónico no válido.';
      return;
    }

    if (!this.email  || !this.password) {
      this.errorMessage = 'Correo y contraseña son obligatorios.';
      return;
    }
    this.errorMessage = ''; 

    console.log(`Email: ${this.email}, Password: ${this.password}`);
    this.authService.login(this.email, this.password).subscribe({
      next: (response) => {
        const token = response.token;
        const user = response.user;
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
        console.log('Login successful:', JSON.stringify(response.mensaje));
        this.router.navigate(['/dashboard/proyectos']);

      },
      error: (err) => {
        
        this.errorMessage = err.error.error || 'Ocurrió un error inesperado.';
        
        
      }
    })
  }
}

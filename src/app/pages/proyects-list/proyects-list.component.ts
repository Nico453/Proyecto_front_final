import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ProyectServicesService } from '../../services/proyect-services.service';
import { Proyecto } from '../../interfaces/proyecto';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-proyects-list',
  imports: [FormsModule, CommonModule],
  templateUrl: './proyects-list.component.html',
  styleUrl: './proyects-list.component.css',
})
export class ProyectsListComponent implements OnInit {
  proyectos: Proyecto[] = [];

  constructor(private proyectoService: ProyectServicesService) {}

  ngOnInit(): void {
  this.proyectoService.obtenerProyectos().subscribe({
    next: (data: Proyecto[]) => {
      console.log('Respuesta del backend:', data);
      this.proyectos = data;

    },
    error: (err: HttpErrorResponse) => {
  console.error('Error al cargar proyectos:', err.message);
}
  });
}
}

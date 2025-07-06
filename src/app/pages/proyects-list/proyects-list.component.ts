import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ProyectServicesService } from '../../services/proyect-services.service';
import { Proyecto } from '../../interfaces/proyecto';
import { HttpErrorResponse } from '@angular/common/http';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-proyects-list',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './proyects-list.component.html',
  styleUrl: './proyects-list.component.css',
})
export class ProyectsListComponent implements OnInit {
  proyectos: Proyecto[] = [];
  modalAbierto = false;
  nuevoProyecto = { nombre: '' };

  constructor(
    private proyectoService: ProyectServicesService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const user = localStorage.getItem('user');
    const userId = user ? JSON.parse(user).id : null;

    if (!userId) {
      console.error('🚫 No hay usuario en localStorage');
      return;
    }

    console.log('✅ Usuario autenticado:', userId);

    this.proyectoService.obtenerAsignaciones().subscribe({
      next: (asignaciones: any[]) => {
        console.log('📦 Asignaciones completas:', asignaciones);

        const asignacionesUsuario = asignaciones.filter(
          (a) => a.usuario === userId
        );
        console.log('📌 Asignaciones del usuario:', asignacionesUsuario);

        const proyectosUnicos = Array.from(
          new Set(asignacionesUsuario.map((a) => a.proyecto))
        );
        console.log('🧩 IDs únicos de proyectos:', proyectosUnicos);

        const peticiones = proyectosUnicos.map((id: number) =>
          this.proyectoService.obtenerProyectoPorId(id)
        );

        forkJoin(peticiones).subscribe({
          next: (proyectos: Proyecto[]) => {
            this.proyectos = proyectos;
            console.log('✅ Proyectos donde participa el usuario:', proyectos);
          },
          error: (err: HttpErrorResponse) => {
            console.error('❌ Error al traer proyectos:', err.message);
          },
        });
      },
      error: (err: HttpErrorResponse) => {
        console.error('❌ Error al cargar asignaciones:', err.message);
      },
    });
  }

  abrirModal() {
    this.modalAbierto = true;
  }

  cerrarModal() {
    this.modalAbierto = false;
    this.nuevoProyecto.nombre = '';
  }

  crearProyecto() {
    const payload = {
      nombre: this.nuevoProyecto.nombre,
      estado: 'Activado',
    };

    this.proyectoService.crearProyecto(payload).subscribe({
      next: (proyectoCreado) => {
        this.proyectos.push(proyectoCreado);
        console.log('✅ Proyecto creado:', proyectoCreado);
        this.cerrarModal();
      },
      error: (err) => {
        console.error('❌ Error al crear el proyecto:', err);
      },
    });
  }

  irADetalle(id: number) {
    console.log('🔍 Proyecto ID clickeado:', id); 
    this.router.navigate(['/dashboard/proyectos', id]);

  }
}

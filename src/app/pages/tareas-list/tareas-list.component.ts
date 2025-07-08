import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Tarea } from '../../interfaces/tareas';
import { TareaService } from '../../services/tarea.service';

@Component({
  selector: 'app-tareas-list',
  imports: [CommonModule, RouterModule],
  templateUrl: './tareas-list.component.html',
  styleUrls: ['./tareas-list.component.css'],
})
export class TareasListComponent implements OnInit {
  historiaId!: number;
  tareas: Tarea[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private tareaService: TareaService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this.historiaId = +id;
        this.cargarTareasDeHistoria();
      }
    });
  }

  cargarTareasDeHistoria(): void {
    this.tareaService.obtenerTodasLasTareas().subscribe({
      next: (todas) => {
        this.tareas = todas.filter(
          (t) => t.historia_usuario === this.historiaId
        );
        console.log('[✅ Tareas filtradas por historia]', this.tareas);
      },
      error: (err) => {
        console.error('[❌ Error al obtener tareas]', err);
      },
    });
  }

  crearTarea(): void {
    alert(`Crear tarea para historia ID ${this.historiaId}`);
  }
}

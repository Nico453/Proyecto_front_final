import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tarea } from '../../interfaces/tareas';
import { TareaService } from '../../services/tarea.service';
import { HistoriaUsuario } from '../../interfaces/historias-usuario';
import { HistoriaService } from '../../services/historia.service';

@Component({
  selector: 'app-tareas-list',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './tareas-list.component.html',
  styleUrls: ['./tareas-list.component.css'],
})
export class TareasListComponent implements OnInit {
  historiaId!: number;
  historiaTitulo: string = '';
  tareas: Tarea[] = [];
  desarrolladorId!: number;

  modalAbierto = false;
  modalEditarAbierto = false;

  nuevaTarea: Partial<Tarea> = {
    titulo: '',
    descripcion: '',
    estado: 'Por Hacer',
  };

  tareaEditando!: Tarea;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private tareaService: TareaService,
    private historiaService: HistoriaService
  ) {}

  ngOnInit(): void {
    const userData = localStorage.getItem('user');
    if (userData) {
      const user = JSON.parse(userData);
      this.desarrolladorId = user.id;
    }

    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this.historiaId = +id;
        this.obtenerTituloHistoria();
        this.cargarTareasDeHistoria();
      }
    });
  }

  obtenerTituloHistoria(): void {
    this.historiaService.obtenerHistorias().subscribe({
      next: (historias) => {
        const historia = historias.find((h) => h.id === this.historiaId);
        this.historiaTitulo = historia ? historia.titulo : 'Desconocida';
      },
      error: (err) => {
        console.error('[❌ Error al obtener historia]', err);
        this.historiaTitulo = 'Desconocida';
      },
    });
  }

  cargarTareasDeHistoria(): void {
    this.tareaService.obtenerTodasLasTareas().subscribe({
      next: (todas) => {
        this.tareas = todas.filter(
          (t) => t.historia_usuario === this.historiaId
        );
      },
      error: (err) => {
        console.error('[❌ Error al obtener tareas]', err);
      },
    });
  }

  abrirModal(): void {
    this.nuevaTarea = {
      titulo: '',
      descripcion: '',
      estado: 'Por Hacer',
    };
    this.modalAbierto = true;
  }

  cerrarModal(): void {
    this.modalAbierto = false;
  }

  guardarTarea(): void {
    const tareaAEnviar: Tarea = {
      id: 0,
      archivos: null,
      fecha_creacion: new Date().toISOString().split('T')[0],
      historia_usuario: this.historiaId,
      desarrollador: this.desarrolladorId,
      ...this.nuevaTarea,
    } as Tarea;

    this.tareaService.crearTarea(tareaAEnviar).subscribe({
      next: (nueva) => {
        this.tareas.push(nueva);
        this.cerrarModal();
      },
      error: (err) => {
        console.error('❌ Error al crear tarea', err);
      },
    });
  }

  abrirModalEdicion(tarea: Tarea): void {
    this.tareaEditando = { ...tarea };
    this.modalEditarAbierto = true;
  }

  cerrarModalEdicion(): void {
    this.modalEditarAbierto = false;
  }

  guardarCambioEstado(): void {
    this.tareaService
      .actualizarTarea(this.tareaEditando.id, {
        estado: this.tareaEditando.estado,
      })
      .subscribe({
        next: (actualizada) => {
          const index = this.tareas.findIndex((t) => t.id === actualizada.id);
          if (index !== -1) {
            this.tareas[index].estado = actualizada.estado;
          }
          this.cerrarModalEdicion();
        },
        error: (err) => {
          console.error('❌ Error al actualizar tarea', err);
        },
      });
  }
}

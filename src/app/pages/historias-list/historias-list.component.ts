import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HistoriaService } from '../../services/historia.service';
import { UsuarioProyectoService } from '../../services/usuario-proyecto.service';
import { HistoriaUsuario } from '../../interfaces/historias-usuario';

@Component({
  selector: 'app-historias-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './historias-list.component.html',
  styleUrls: ['./historias-list.component.css'], // ✅ Corregido styleUrls
})
export class HistoriasListComponent implements OnInit {
  historias: HistoriaUsuario[] = [];
  userId!: number;

  modalEditarAbierto = false;
  historiaEditando!: HistoriaUsuario;

  constructor(
    private historiaService: HistoriaService,
    private usuarioProyectoService: UsuarioProyectoService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const user = localStorage.getItem('user');
    if (!user) return;

    const parsed = JSON.parse(user);
    this.userId = parsed.id;

    this.historiaService.obtenerUsuarioProyectos().subscribe((usuarioProyectos) => {
      const activos = usuarioProyectos.filter(
        (up) => up.usuario === this.userId && up.estado === 'Activo'
      );
      const idsRelacionUsuarioProyecto = activos.map((up) => up.id);

      console.log('[🧠 ID usuario]', this.userId);
      console.log('[🧠 Relación usuario-proyecto activa]', idsRelacionUsuarioProyecto);

      this.historiaService.obtenerHistorias().subscribe((historias) => {
        console.log('[📋 Todas las historias]', historias);

        this.historias = historias.filter((h) =>
          idsRelacionUsuarioProyecto.includes(h.asignado_a)
        );

        console.log('[✅ Historias que se mostrarán]', this.historias);
      });
    });
  }

  abrirTareas(id: number): void {
    this.router.navigate(['/dashboard/historias', id, 'tareas']);
  }

  abrirModalEdicion(historia: HistoriaUsuario): void {
    this.historiaEditando = { ...historia };
    this.modalEditarAbierto = true;
  }

  cerrarModalEdicion(): void {
    this.modalEditarAbierto = false;
  }

  guardarCambioEstado(): void {
  this.historiaService.actualizarHistoria(this.historiaEditando.id, {
    estado: this.historiaEditando.estado,
  }).subscribe({
    next: (actualizada) => {
      const index = this.historias.findIndex((h) => h.id === actualizada.id);
      if (index !== -1) {
        this.historias[index].estado = actualizada.estado;
      }
      this.cerrarModalEdicion();
    },
    error: (err) => {
      console.error('❌ Error al actualizar historia', err);
    },
  });
}

}

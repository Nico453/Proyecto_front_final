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
  styleUrl: './historias-list.component.css',
})
export class HistoriasListComponent implements OnInit {
  historias: HistoriaUsuario[] = [];
  userId!: number;

  constructor(
    private historiaService: HistoriaService,
    private usuarioProyectoService: UsuarioProyectoService,
    private router: Router
  ) {}

  abrirTareas(id: number) {
    this.router.navigate(['/dashboard/historias', id, 'tareas']);
  }
  ngOnInit(): void {
    const user = localStorage.getItem('user');
    if (!user) return;

    const parsed = JSON.parse(user);
    const userId = parsed.id;

    this.historiaService
      .obtenerUsuarioProyectos()
      .subscribe((usuarioProyectos) => {
        const activos = usuarioProyectos.filter(
          (up) => up.usuario === userId && up.estado === 'Activo'
        );
        const idsRelacionUsuarioProyecto = activos.map((up) => up.id); // [12] en tu caso

        console.log('[🧠 ID usuario]', userId);
        console.log(
          '[🧠 Relación usuario-proyecto activa]',
          idsRelacionUsuarioProyecto
        );

        this.historiaService.obtenerHistorias().subscribe((historias) => {
          console.log('[📋 Todas las historias]', historias);

          this.historias = historias.filter((h) =>
            idsRelacionUsuarioProyecto.includes(h.asignado_a)
          );

          console.log('[✅ Historias que se mostrarán]', this.historias);
        });
      });
  }
}

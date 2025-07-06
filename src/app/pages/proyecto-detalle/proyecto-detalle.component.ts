import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProyectServicesService } from '../../services/proyect-services.service';
import { forkJoin } from 'rxjs';
import { FormsModule } from '@angular/forms';

// Interfaz combinada para mostrar el usuario con su asignación
interface MiembroConUsuario {
  id: number;
  estado: string;
  rol: number;
  usuario: {
    id: number;
    nombre: string;
    correo: string;
  };
}

@Component({
  selector: 'app-proyecto-detalle',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './proyecto-detalle.component.html',
  styleUrl: './proyecto-detalle.component.css',
})
export class ProyectoDetalleComponent implements OnInit {
  proyectoId!: number;
  miembros: MiembroConUsuario[] = [];
  esPMO = false;
  esSCRUM = false;
  nombreProyecto = '';

  // Estados para el modal de invitación
  modalInvitacionAbierto = false;
  correoInvitado = '';
  rolInvitado: number | null = null;

  constructor(
    private route: ActivatedRoute,
    private proyectoService: ProyectServicesService
  ) {}

  ngOnInit(): void {
    this.proyectoId = Number(this.route.snapshot.paramMap.get('id'));
    const usuario = JSON.parse(localStorage.getItem('user')!);
    const userId = usuario.id;

    this.proyectoService.obtenerAsignaciones().subscribe((asignaciones) => {
      const miembro = asignaciones.find(
        (a) => a.usuario === userId && a.proyecto === this.proyectoId
      );

      if (miembro?.rol === 1) this.esPMO = true;
      if (miembro?.rol === 2) this.esSCRUM = true;

      const miembrosProyecto = asignaciones.filter(
        (a) => a.proyecto === this.proyectoId
      );

      const peticionesUsuarios = miembrosProyecto.map((m) =>
        this.proyectoService.obtenerUsuarioPorId(m.usuario)
      );

      forkJoin(peticionesUsuarios).subscribe((usuarios) => {
        this.miembros = miembrosProyecto.map((m, index) => ({
          id: m.id,
          estado: m.estado,
          rol: m.rol,
          usuario: usuarios[index],
        }));
      });
    });

    this.proyectoService
      .obtenerProyectoPorId(this.proyectoId)
      .subscribe((p) => {
        this.nombreProyecto = p.nombre;
      });
  }

  // Abrir y cerrar modal
  abrirModalInvitacion() {
    this.modalInvitacionAbierto = true;
  }

  cerrarModalInvitacion() {
    this.modalInvitacionAbierto = false;
    this.correoInvitado = '';
    this.rolInvitado = null;
  }

  // Enviar invitación
  invitarColaborador() {
    if (!this.correoInvitado || !this.rolInvitado) {
      alert('Completa todos los campos');
      return;
    }

    this.proyectoService.obtenerTodosLosUsuarios().subscribe((usuarios) => {
      const usuarioEncontrado = usuarios.find(
        (u) => u.correo === this.correoInvitado
      );

      if (!usuarioEncontrado) {
        alert('Usuario no encontrado');
        return;
      }

      const payload = {
        usuario: usuarioEncontrado.id,
        proyecto: this.proyectoId,
        rol: this.rolInvitado,
      };

      this.proyectoService.invitarUsuario(payload).subscribe(
        () => {
          alert('Invitación enviada correctamente');
          this.cerrarModalInvitacion();
        },
        (error) => {
          console.error('Error al invitar:', error);
          alert('Hubo un error al enviar la invitación');
        }
      );
    });
  }
}

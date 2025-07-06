import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProyectServicesService } from '../../services/proyect-services.service';
import { forkJoin } from 'rxjs';
import { FormsModule } from '@angular/forms';

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

  // Estado modal de invitación
  modalInvitacionAbierto = false;
  correoInvitado = '';
  rolInvitado: number | null = null;

  // Estado modal editar y eliminar
  modalEditarAbierto = false;
  modalEliminarAbierto = false;
  miembroSeleccionado: any = null;

  // Estado modal historia de usuario
  modalCrearHUAbierto = false;
  nuevaHU = {
  titulo: '',
  descripcion: '',
  prioridad: 2,
  puntos_historia: 0,
  tiempo_estimado: 0,
  asignado_a: null
};
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

  // Invitación
  abrirModalInvitacion() {
    this.modalInvitacionAbierto = true;
  }

  cerrarModalInvitacion() {
    this.modalInvitacionAbierto = false;
    this.correoInvitado = '';
    this.rolInvitado = null;
  }


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

  // Modales edición/eliminación de miembros
  abrirModalEditar(miembro: any) {
    this.miembroSeleccionado = { ...miembro };
    this.modalEditarAbierto = true;
  }

  cerrarModalEditar() {
    this.modalEditarAbierto = false;
    this.miembroSeleccionado = null;
  }

  guardarRolEditado() {
    const data = {
      rol: this.miembroSeleccionado.rol,
      estado: this.miembroSeleccionado.estado,
    };

    this.proyectoService
      .actualizarMiembro(this.miembroSeleccionado.id, data)
      .subscribe(
        () => {
          alert('Miembro actualizado correctamente');
          const index = this.miembros.findIndex(
            (m) => m.id === this.miembroSeleccionado.id
          );
          if (index !== -1) {
            this.miembros[index].rol = this.miembroSeleccionado.rol;
            this.miembros[index].estado = this.miembroSeleccionado.estado;
          }
          this.cerrarModalEditar();
        },
        (error) => {
          console.error('Error al actualizar miembro:', error);
          alert('Hubo un error al guardar los cambios');
        }
      );
  }

  abrirModalEliminar(miembro: any) {
    this.miembroSeleccionado = miembro;
    this.modalEliminarAbierto = true;
  }

  cerrarModalEliminar() {
    this.modalEliminarAbierto = false;
    this.miembroSeleccionado = null;
  }

  confirmarEliminacion() {
    this.proyectoService
      .eliminarMiembro(this.miembroSeleccionado.id)
      .subscribe(() => {
        alert('Miembro eliminado');
        this.miembros = this.miembros.filter(
          (m) => m.id !== this.miembroSeleccionado.id
        );
        this.cerrarModalEliminar();
      });
  }

  // Historias de Usuario
  abrirModalCrearHU() {
    console.log('Abriendo modal HU');
    this.modalCrearHUAbierto = true;
  }

  cerrarModalHistoria() {
  this.modalCrearHUAbierto = false;
  this.nuevaHU = {
    titulo: '',
    descripcion: '',
    prioridad: 2,
    puntos_historia: 0,
    tiempo_estimado: 0,
    asignado_a: null
  };
}

  obtenerUsuarioProyectoId(): number | null {
    const usuario = JSON.parse(localStorage.getItem('user')!);
    const asignacion = this.miembros.find(
      (m) => m.usuario.id === usuario.id
    );
    return asignacion ? asignacion.id : null;
  }

  crearHistoria() {
    if (!this.nuevaHU.titulo || !this.nuevaHU.descripcion) {
      alert('Completa todos los campos obligatorios');
      return;
    }

    const usuarioProyectoId = this.obtenerUsuarioProyectoId();

    if (!usuarioProyectoId) {
      alert('No se encontró tu asignación en el proyecto');
      return;
    }

    const historiaPayload = {
      ...this.nuevaHU,
      estado: 'Por Hacer',
      usuario_proyecto: usuarioProyectoId,
    };

    this.proyectoService.crearHistoria(historiaPayload).subscribe(
      () => {
        alert('Historia creada correctamente');
        this.cerrarModalHistoria();
      },
      (error) => {
        console.error('Error al crear historia:', error);
        alert('Error al crear historia');
      }
    );
  }
}

// src/app/interfaces/historia-usuario.ts
export interface HistoriaUsuario {
  id: number;                   // ← nuevo
  titulo: string;
  descripcion: string;
  puntos_historia: number;
  tiempo_estimado: number;
  estado: string;
  usuario_proyecto: number;
  asignado_a: number | null;
  fecha_creacion: string;       // ← nuevo
}
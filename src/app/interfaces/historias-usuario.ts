export interface HistoriaUsuario {
  titulo: string;
  descripcion: string;
  puntos_historia: number;
  tiempo_estimado: number;
  usuario_proyecto: number; // ID de la asignación usuario-proyecto
  asignado_a: number | null; // ID de la asignación del asignado
  estado: string;
}
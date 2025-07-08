
export interface HistoriaUsuario {
  id: number;                   
  titulo: string;
  descripcion: string;
  puntos_historia: number;
  tiempo_estimado: number;
  estado: string;
  usuario_proyecto: number;
  asignado_a: number | null;
  fecha_creacion: string;       
}
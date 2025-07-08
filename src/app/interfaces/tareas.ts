import { HistoriaUsuario } from "./historias-usuario";

export interface Tarea {
  id: number;
  titulo: string;
  descripcion: string;
  estado: string;
  archivos: any | null;
  fecha_creacion: string;
  historia_usuario: number;
  desarrollador: number;
}
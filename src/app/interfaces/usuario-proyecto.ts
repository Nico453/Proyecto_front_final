export interface UsuarioProyecto {
  id: number;
  usuario: number;
  proyecto: number;
  rol: number;

  // Estas propiedades se agregan dinámicamente
  usuario_nombre?: string;
  usuario_correo?: string;
}
export interface Auth {
    mensaje: string;
    status:  number;
    refresh: string;
    token:   string;
    user:    User;
}

export interface User {
    id:             number;
    nombre:         string;
    correo:         string;
    fecha_creacion: string;
    ultimo_acceso:  string;
    estado:         string;
    is_active:      boolean;
}


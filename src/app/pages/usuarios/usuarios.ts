export interface Usuarios {
    id_usuario: string;
    id_rol: number;
    //rol: Rol; 
    id_persona: string;
    usuario: string;
    clave: string;
    fecha_crear: Date | null;
    usuario_crear: string;
    fecha_mod: Date | null;
    usuario_mod: string;
    estado: string;
}
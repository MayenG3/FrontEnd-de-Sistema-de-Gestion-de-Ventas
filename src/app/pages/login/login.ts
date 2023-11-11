export interface Usuario {
    id: number;
    id_rol: number;
    id_persona: number;
    usuario: string;
    clave: string;
    fecha_crear: string;
    usuario_crear: string;
    fecha_mod: string;
    usuario_mod: string;
    estado: string;
}

export interface vauleUser{
    usuario: string | null;
    clave: string | null; 
}
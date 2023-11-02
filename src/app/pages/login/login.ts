export interface Login {
    id: number;
    id_rol: number;
    rol: Rol;
    id_persona: number;
    usuario: string;
    clave: string;
    fecha_crear: string;
    usuario_crear: string;
    fecha_mod: string;
    usuario_mod: string;
    estado: string;
}

type Rol = {
    id: number;
    rol: string;
}

export interface vauleUser{
    usuario: string | null;
    clave: string | null; 
}
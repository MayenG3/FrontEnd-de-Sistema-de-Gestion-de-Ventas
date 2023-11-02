export interface Clientes {
    id: string;
    nombre: string;
    direccion: string;
    telefono: string;
    nit: string;
    fecha_crear: Date | null;
    usuario_crear: string;
    fecha_mod: Date | null;
    usuario_mod: string;
    estado: string;  
}
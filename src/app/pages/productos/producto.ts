export interface Producto {
    id_producto: number;
    id_categoria:string;
    producto: string;
    existencia:string;
    fecha_crear: Date | null;
    usuario_crear: string;
    fecha_mod: Date | null;
    usuario_mod: string;
    estado: string;
}


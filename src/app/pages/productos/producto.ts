export interface Producto {
    id_producto: number;
    id_categoria:number;
    categoria: {  id_categoria: number,
        categoria:string};
    producto: string;
    existencia:number;
    fecha_crear: string;
    usuario_crear: string;
    fecha_mod: string;
    usuario_mod: string;
    estado: string;
}


export interface Compras{
    id_compra:Number;
    id_producto: Number;
    id_proveedor: Number;
    cantidad: Number;
    precio_compra: Number;
    fecha_crear: Date | null;
    usuario_crear: string;
    fecha_mod: Date | null;
    usuario_mod: string;
    estado: string;
}
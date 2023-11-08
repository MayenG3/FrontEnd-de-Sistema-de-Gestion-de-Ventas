export interface Facturas {
  id_factura: string;
  referencia:string;
  id_cliente:string;
  fecha: string;
  serie: string;
  numero: string;
  authorization: string;
  fecha_crear: Date | null;
  usuario_crear: string;
  fecha_mod: Date | null;
  usuario_mod: string;
  estado: string;
}

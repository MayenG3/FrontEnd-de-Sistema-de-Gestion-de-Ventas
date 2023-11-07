export interface Proveedor {
    id_proveedor: String;
    nombre: string;
    nit: string;
    direccion: string;
    telefono: string;
    fecha_crear: Date | null;
    usuario_crear: string;
    fecha_mod: Date | null;
    usuario_mod: string | null;
    estado: string;
  }
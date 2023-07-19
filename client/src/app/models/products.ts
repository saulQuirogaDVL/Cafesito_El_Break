export interface Product {
    id: number,
    nombre_producto?: string,
    id_categoria?: number,
    precio: number,
    id_usuario?: number,
    detalles_producto?: string,
    imagen?: string,
    habilitado?: boolean,
    fecha_creacion?: Date,
    cantidad:number
}
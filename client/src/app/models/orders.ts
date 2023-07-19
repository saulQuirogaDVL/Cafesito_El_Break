export interface Order {
    id?: number,
    orden_actual?: number,
    orden_dia?: number,
    total_pedido?: number,
    total_pagado?: number,
    fecha_venta?: Date,
    anotacion?: String,
    id_usuario?: number,
    id_observacion?: number,
    id_pago?: number
}
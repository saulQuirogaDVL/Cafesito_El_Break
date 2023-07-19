import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/models/orders';
import { Details } from 'src/app/models/details';
import { Product } from 'src/app/models/products';
import { Transaction } from 'src/app/models/transaction';
import { CategoriesService } from 'src/app/services/categories.service';
import { DetailsService } from 'src/app/services/details.service';
import { OrdersService } from 'src/app/services/orders.service';

@Component({
  selector: 'app-orders-form',
  templateUrl: './orders-form.component.html',
  styleUrls: ['./orders-form.component.css']
})
export class OrdersFormComponent implements OnInit {

  order: Order = {
    orden_actual: 666,
    orden_dia: 666,
    id_observacion: 1,
    id_pago: 1
  };

  listProductsPicked: Product[] = [];

  transaction: Transaction = {
    total: 0,
    paid: 0,
    change: 0,
  }

  details: Details = {}

  constructor(private CategoriesService: CategoriesService,
    private OrdersService: OrdersService, private DetailsService: DetailsService) { }

  ngOnInit(): void {
    this.getLast();

    this.OrdersService.triggerOrderList.subscribe(data => {
      if (!this.listProductsPicked.find(product => product.id === data.data.id)) {
        this.listProductsPicked.push({ ...data.data, "cantidad": 1 })
        this.calculateTotal()
        this.calculateChangeCatcher();
      }
    });
  }

  getLast() {
    this.OrdersService.getLast().subscribe(
      {
        next: (res: Order) => {
          this.order.orden_actual = res.orden_actual;
          this.order.orden_dia = res.orden_dia;
        },
        error: (err) => alert(err.error.Text)
      }
    )
  }

  calculateTotal() {
    this.transaction.total = this.listProductsPicked.reduce((total, product) => total += (product.cantidad * product.precio), 0)
  }

  openModal() {
    this.CategoriesService.triggerModal.emit({ open: true });
  }

  calculateChangeCatcher() {
    this.transaction.change = this.transaction.paid - this.transaction.total;
  }

  sendOptionsCatcher(data: Order) {
    this.order.id_observacion = data.id_observacion;
    this.order.id_pago = data.id_pago;
  }

  async confirmOrderCatcher() {

    this.order.total_pedido = this.transaction.total;
    this.order.total_pagado = this.transaction.paid;
    this.order.fecha_venta = new Date();
    this.order.id_usuario = 1;

    await this.OrdersService.saveOrder(this.order).subscribe(
      {
        next: (res: any) => {
          this.listProductsPicked.forEach(product => {
            this.details.id_producto = product.id,
              this.details.id_pedido = res.id,
              this.details.cantidad = product.cantidad,
              this.details.precio_producto = product.precio

            this.DetailsService.saveDetail(this.details).subscribe({
              next: (data) => console.log(data),
              error: (err) => console.error(err)
            });
          })
          window.location.reload();
        },
        error: (err) => console.error(err)
      }
    )
  }

  deleteFromOrdersCatcher(data: number) {
    this.listProductsPicked = this.listProductsPicked.filter(product => product.id != data);
    this.calculateTotal();
    this.calculateChangeCatcher();
  }

  changeAmountCatcher(data: any) {
    this.listProductsPicked.find(
      product => product.id === data.idOrder && (product.cantidad + data.amount) > 0 ? product.cantidad += data.amount : false);
    this.calculateTotal();
    this.calculateChangeCatcher();
  }

  sendDescriptionCatcher(data: string) {
    this.order.anotacion = data;
  }
}

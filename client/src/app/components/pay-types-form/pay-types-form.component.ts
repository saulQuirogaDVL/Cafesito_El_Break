import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Order } from 'src/app/models/orders';
import { OrdersService } from 'src/app/services/orders.service';

@Component({
  selector: 'app-pay-types-form',
  templateUrl: './pay-types-form.component.html',
  styleUrls: ['./pay-types-form.component.css']
})
export class PayTypesFormComponent {
  @Input() orderNumber!: Order;
  @Output() sendOptionsEvent = new EventEmitter();

  order: Order = {
    id_pago: 1,
    id_observacion: 1
  };

  constructor(private OrdersService: OrdersService) { }

  deliverySelected(idDelivery: number) {
    this.order.id_observacion = idDelivery;
    this.sendOptionsEvent.emit(this.order);
  }

  paySelected(idPayment: number) {
    this.order.id_pago = idPayment;
    this.sendOptionsEvent.emit(this.order);
  }

}

import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from 'src/app/models/products';
import { Transaction } from 'src/app/models/transaction';

@Component({
  selector: 'app-products-picked-form',
  templateUrl: './products-picked-form.component.html',
  styleUrls: ['./products-picked-form.component.css']
})
export class ProductsPickedFormComponent {

  description!: string;
  @Input() listProductsPicked: Product[] = [];
  @Input() transactionValues!: Transaction;
  @Output() deleteFromOrdersEvent = new EventEmitter();
  @Output() changeAmountEvent = new EventEmitter();
  @Output() calculateChangeEvent = new EventEmitter();
  @Output() sendDescriptionEvent = new EventEmitter();

  deleteFromOrders(idOrder?: number) {
    this.deleteFromOrdersEvent.emit(idOrder);
  }

  changeAmount(amount: number, idOrder?: number) {
    this.changeAmountEvent.emit({ amount, idOrder })
  }

  calculateChange() {
    this.calculateChangeEvent.emit()
  }

  sendDescription() {
    this.sendDescriptionEvent.emit(this.description)
  }

}

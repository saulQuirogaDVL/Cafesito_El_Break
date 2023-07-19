import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/models/products';
import { OrdersService } from 'src/app/services/orders.service';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css']
})
export class ProductItemComponent {
  @Input() productData!: Product;
  @Input() inOrder!: boolean;

  constructor(private OrdersService: OrdersService, private Router: Router) { }

  addListOrders() {
    this.OrdersService.triggerOrderList.emit({ data: this.productData });
  }

  editProduct(idProduct: number) {
    this.Router.navigate(['/products/edit', idProduct]);
  }
}

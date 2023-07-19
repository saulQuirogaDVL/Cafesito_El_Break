import { Component, ElementRef, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.css']
})
export class ListProductsComponent implements OnInit {

  productsList: any = [];
  productsListOriginal: any = [];
  public page!: number;
  @Input() productsPerPage!: number;
  @Output() confirmOrderEvent = new EventEmitter();


  constructor(private ProductsService: ProductsService) { }

  ngOnInit(): void {
    this.getProducts();
    this.ProductsService.TriggerProductsFiltered.subscribe(data => {
      this.productsList = this.productsListOriginal.filter((product: any) => data.data.includes(product.id_categoria))
    })
  }

  getProducts() {
    this.ProductsService.getAllProducts().subscribe(
      {
        next: (res) => {
          this.productsList = res;
          this.productsListOriginal = res;
        },
        error: (err) => alert(err.error.Text)
      }
    )
  }

  getProductRange(since: number): any {
    return this.productsList.slice(since, since + 25);
  }

  cancelOrder() {
    window.location.reload()
  }

  confirmOrder() {
    this.confirmOrderEvent.emit();
  }

}

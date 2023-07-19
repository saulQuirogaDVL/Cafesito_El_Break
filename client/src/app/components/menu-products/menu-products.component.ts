import { Component, OnInit } from '@angular/core';
import { CategoriesService } from 'src/app/services/categories.service';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-menu-products',
  templateUrl: './menu-products.component.html',
  styleUrls: ['./menu-products.component.css']
})
export class MenuProductsComponent implements OnInit {

  productsList: any = [];
  productsListOriginal: any = [];
  public page!: number;
  isModalOpen: boolean = false;

  ngOnInit(): void {
    this.getProducts();
    this.ProductsService.TriggerProductsFiltered.subscribe(data => {
      this.productsList = this.productsListOriginal.filter((product: any) => data.data.includes(product.id_categoria))
    })
  }

  constructor(private ProductsService: ProductsService, private CategoriesService: CategoriesService) { }

  getProducts() {
    this.ProductsService.getProducts().subscribe(
      {
        next: (res) => {
          this.productsList = res;
          this.productsListOriginal = res;
        },
        error: (err) => alert(err.error.Text)
      }
    )
  }

  openModal() {
    this.CategoriesService.triggerModal.emit({ open: true });
  }

}

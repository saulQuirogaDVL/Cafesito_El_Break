import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/products';
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
  inputSearch: string = '';
  isEnabledSelected: boolean = true;
  isDisabledSelected: boolean = true;

  ngOnInit(): void {
    this.getProducts();
    this.ProductsService.TriggerProductsFiltered.subscribe(data => {
      this.productsList = this.productsListOriginal.filter((product: any) => data.data.includes(product.id_categoria))
    })
  }

  constructor(private ProductsService: ProductsService, private CategoriesService: CategoriesService) { }

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

  openModal() {
    this.CategoriesService.triggerModal.emit({ open: true });
  }

  findProducts() {
    this.productsList = this.productsListOriginal.filter(
      (product: Product) =>
        product.nombre_producto.toUpperCase().includes(this.inputSearch.toUpperCase())
        || product.id.toString() === (this.inputSearch))
    console.log(this.inputSearch)
  }

  filterByEnabled() {
    if (this.isEnabledSelected && this.isDisabledSelected) return this.productsList = this.productsListOriginal;

    if (this.isEnabledSelected) return this.productsList = this.productsListOriginal.filter(
      (product: Product) => product.habilitado == true
    )


    if (this.isDisabledSelected) return this.productsList = this.productsListOriginal.filter(
      (product: Product) => product.habilitado == false
    )

    return this.productsList = [];
  }
}

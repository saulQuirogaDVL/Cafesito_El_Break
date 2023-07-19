import { Component, Input, Renderer2 } from '@angular/core';
import { CategoriesService } from 'src/app/services/categories.service';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-filter-products-modal',
  templateUrl: './filter-products-modal.component.html',
  styleUrls: ['./filter-products-modal.component.css']
})
export class FilterProductsModalComponent {

  categoriesList: any = [];
  categoriesFiltered: number[] = [];
  isModalOpen: boolean = false;

  constructor(private CategoriesService: CategoriesService, private ProductsService: ProductsService) { }

  ngOnInit(): void {
    this.getCategories();

    this.CategoriesService.triggerModal.subscribe(data => {
      this.isModalOpen = data.open;
    })
  }

  getCategories() {
    this.CategoriesService.getCategories().subscribe(
      {
        next: (res) => {
          this.categoriesList = res;
        },
        error: (err) => alert(err.error.Text)
      }
    )
  }

  closeModal() {
    this.isModalOpen = false;
  }

  filterSelected(event: any, idCategory: number) {
    if (event.target.checked && !this.categoriesFiltered.includes(idCategory)) {
      this.categoriesFiltered.push(idCategory);
    } else {
      this.categoriesFiltered = this.categoriesFiltered.filter(category => category != idCategory);
    }
  }

  filterProducts() {
    this.ProductsService.TriggerProductsFiltered.emit({ data: this.categoriesFiltered })
  }

}

import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from 'src/app/models/categories';
import { CategoriesService } from 'src/app/services/categories.service';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-products-form',
  templateUrl: './products-form.component.html',
  styleUrls: ['./products-form.component.css']
})
export class ProductsFormComponent implements OnInit {

  categoriesList!: any;
  categorySelected!: String;
  newCategory: boolean = false;
  nameNewCategory!: string;

  product: any = {
    nombre_producto: "",
    id_categoria: 1,
    precio: 0,
    id_usuario: 1,
    detalles_producto: "",
    imagen: "defaultComida.png",
    habilitado: true,
    fecha_creacion: new Date()
  }

  category: Category = {
    nombre_Categoria: ""
  }

  edit: boolean = false;
  photoSelected!: String | ArrayBuffer | null;
  fileCaptured!: any;

  constructor(private CategoriesService: CategoriesService, private ActivatedRoute: ActivatedRoute,
    private ProductsService: ProductsService, private Router: Router) { }

  ngOnInit(): void {
    this.getAllCategories();

    const params = this.ActivatedRoute.snapshot.params;
    if (params['id']) {
      this.ProductsService.getOne(params['id']).subscribe(
        {
          next: (res) => {
            this.product = res;
            this.categorySelected = this.product.id_categoria;
            this.edit = true;
          },
          error: (err) => { console.error(err) }
        }
      )
    }
  }

  getAllCategories() {
    this.CategoriesService.getCategories().subscribe(data => {
      this.categoriesList = data;
    })
  }

  captureNewImage($event: any) {
    this.fileCaptured = $event.target;
    const reader = new FileReader();
    reader.onload = e => this.photoSelected = reader.result;
    reader.readAsDataURL(this.fileCaptured.files[0]);
    this.product.imagen = $event.target.files[0].name;
  }

  saveProduct() {
    const inputElement = this.fileCaptured as HTMLInputElement;
    if (inputElement.files && inputElement.files.length > 0) {
      const file = inputElement.files[0];
      this.ProductsService.savePhoto(file).subscribe(
        responsePhoto => {
          console.log(responsePhoto);
        },
        error => {
          console.error('Error al subir la imagen:', error);
        }
      );
    }

    if (this.newCategory) {
      this.category.nombre_Categoria = this.nameNewCategory.toUpperCase();

      this.CategoriesService.saveCategory(this.category).subscribe(responseCategory => {
        console.log(responseCategory)
        this.product.id_categoria = this.categoriesList.length + 1;
        this.ProductsService.saveProduct(this.product).subscribe(responseProduct => { console.log(responseProduct) });
      })
    } else {
      this.product.id_categoria = this.categorySelected;
      this.ProductsService.saveProduct(this.product).subscribe(responseProduct => { console.log(responseProduct) });
    }

    this.Router.navigate(['/products'])

  }

  editProduct() {
    if (this.fileCaptured != undefined) {
      const inputElement = this.fileCaptured as HTMLInputElement;
      if (inputElement.files && inputElement.files.length > 0) {
        const file = inputElement.files[0];
        this.ProductsService.savePhoto(file).subscribe(
          responsePhoto => {
            console.log(responsePhoto);
          },
          error => {
            console.error('Error al subir la imagen:', error);
          }
        );
      }
    }

    if (this.newCategory) {
      this.category.nombre_Categoria = this.nameNewCategory.toUpperCase();
      this.CategoriesService.saveCategory(this.category).subscribe(responseCategory => {
        console.log(responseCategory)
        this.product.id_categoria = this.categoriesList.length + 1;
        this.ProductsService.editProduct(this.product).subscribe(responseProduct => { console.log(responseProduct) });
      })
    } else {
      this.product.id_categoria = this.categorySelected;
      this.ProductsService.editProduct(this.product).subscribe(responseProduct => { console.log(responseProduct) });
    }

    this.Router.navigate(['/products'])
  }
}

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { Product } from '../models/products';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  API_URI = "http://localhost:3000/products";
  @Output() TriggerProductsFiltered: EventEmitter<any> = new EventEmitter();

  constructor(private http: HttpClient) { }

  getProducts() {

    /* const headers = new HttpHeaders({
       'Authorization': "Bearer " + localStorage.getItem('token')
     })
    
     return this.http.get(`${this.API_URI}/`, { headers })
     */
    return this.http.get(`${this.API_URI}/`)
  }

  getAllProducts() {
    return this.http.get(`${this.API_URI}/getAll`)
  }

  getOne(idProduct: number) {
    return this.http.get(`${this.API_URI}/getOne/${idProduct}`,)
  }

  savePhoto(image: File) {
    const formData = new FormData();
    formData.append('imagen', image);

    return this.http.post(`${this.API_URI}/savePhoto`, formData);
  }

  saveProduct(product: Product) {
    return this.http.post(`${this.API_URI}/`, product);
  }

  editProduct(product: Product) {
    return this.http.put(`${this.API_URI}/${product.id}`, product);
  }

}

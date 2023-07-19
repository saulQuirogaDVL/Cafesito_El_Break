import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  API_URI = "http://localhost:3000/categories";
  @Output() triggerModal: EventEmitter<any> = new EventEmitter();

  constructor(private http: HttpClient) { }

  getCategories() {
    return this.http.get(`${this.API_URI}/`)
  }
}

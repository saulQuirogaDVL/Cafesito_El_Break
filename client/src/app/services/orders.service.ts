import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { Order } from '../models/orders';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  API_URI = "http://localhost:3000/orders";
  @Output() triggerOrderList: EventEmitter<any> = new EventEmitter();

  constructor(private http: HttpClient) { }

  getLast() {
    return this.http.get(`${this.API_URI}/getLast`)
  }

  saveOrder(order: Order) {
    return this.http.post(`${this.API_URI}`, order)
  }

}

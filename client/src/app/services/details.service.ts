import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Details } from '../models/details';

@Injectable({
  providedIn: 'root'
})
export class DetailsService {
  API_URI = "http://localhost:3000/details";

  constructor(private http: HttpClient) { }

  saveDetail(detail: Details) {
    return this.http.post(`${this.API_URI}`, detail)
  }
}

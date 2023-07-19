import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  API_URI = "http://localhost:3000/login";

  constructor(private http: HttpClient) { }

  singIn(user: User) {
    return this.http.post(`${this.API_URI}/`, user)
  }

  isAuth(): boolean {
    return localStorage.getItem('token') ? true : false;
  }
}

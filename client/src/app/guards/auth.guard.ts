import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { LoginService } from '../services/login.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private loginservice: LoginService, private router: Router) { }

  canActivate(): boolean {
    if (!this.loginservice.isAuth()) {
      console.log('token no es valido o ya expiro');
      this.router.navigate(['/login']);
      return false;
    }    
    return true;
  }

}

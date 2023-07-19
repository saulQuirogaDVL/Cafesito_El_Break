import { Component } from '@angular/core';
import { LoginService } from '../../services/login.service'
import { User } from 'src/app/models/user'
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent {

  user: User = {
    email: "",
    password: ""
  };

  constructor(private loginService: LoginService, private router: Router) { }

  singIn() {
    this.loginService.singIn(this.user).subscribe(
      {
        next: (res) => {  
          localStorage.setItem('token', res.toString());
          this.router.navigate(['/orders']); 
        },
        error: (err) => alert(err.error.Text)
      }
    )
  }
}

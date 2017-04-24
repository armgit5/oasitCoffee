import { Component, OnInit } from '@angular/core';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  newAccount:boolean = true;

  constructor(private loginService: LoginService) { }

  ngOnInit() {
  }

   loginAsGuest(name) {
        // this.customerName = name;
        // this.cartForm.value.customerName = name;
        // this.onSubmit();
    }

    toggleLogin() {
        if (this.newAccount == true) {
            this.newAccount = false;
        } else {
            this.newAccount = true;
        }
    }

    register() {
        
    }

    facebookLogin() {
       this.loginService.facebookLogin();
    }

    login() {
        
    }

    logout() {
        
    }

}

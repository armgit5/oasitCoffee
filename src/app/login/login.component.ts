import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  newAccount:boolean = true;

  @Output() 
  customerNameOutput = new EventEmitter<string>();

  constructor(private loginService: LoginService) { }

  ngOnInit() {
  }

   loginAsGuest(name) {
        // this.customerName = name;
        // this.cartForm.value.customerName = name;
        // this.onSubmit();
        this.customerNameOutput.emit(name);
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

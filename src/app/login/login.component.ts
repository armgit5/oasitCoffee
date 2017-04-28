import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { LoginService } from './login.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  newAccount:boolean = true;
  loginForm: FormGroup;
  registerForm: FormGroup;
  posted = false;

  @Output() 
  customerNameOutput = new EventEmitter<string>();

  @Output()
  modalOff = new EventEmitter<boolean>(); 

  constructor(private loginService: LoginService,
              private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.initLoginForm();
    this.initRegisterForm();
  }

  private initLoginForm() {
    let email = '';
    let password = '';

    this.loginForm = this.formBuilder.group({
      email: [email, Validators.required],
      password: [password, Validators.required]
    });
  }

  private initRegisterForm() {
    let email = '';
    let password = '';
    let confirm = '';

    this.registerForm = this.formBuilder.group({
      email: [email, Validators.required],
      password: [password, Validators.required],
      confirm: [confirm, Validators.required]
    });
  }

   loginAsGuest(name) {
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
        let email = this.registerForm.value.email;
        let password = this.registerForm.value.password;
        this.loginService.register(email, password);
        this.posted = true;
    }

    facebookLogin() {
       this.loginService.facebookLogin()
        .then(authState => {
            this.modalOff.emit(true);
          })
          .catch(error => console.log(error));
    }

    login() {
        let email = this.loginForm.value.email;
        let password = this.loginForm.value.password;
        this.loginService.login(email, password)
          .then(authState => {
            this.modalOff.emit(true);
          })
          .catch(error => console.log(error));
    }

    // logout() {
    //     this.loginService.logout();
    // }

}

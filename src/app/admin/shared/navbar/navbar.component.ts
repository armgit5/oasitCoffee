import { Component, OnInit } from '@angular/core';
import {Location, LocationStrategy, PathLocationStrategy} from '@angular/common';
import { LoginService } from '../../../login/login.service';
import { User } from '../../users/users';
import { Router } from '@angular/router';

@Component({
    moduleId: module.id,
    selector: 'navbar-cmp',
    templateUrl: 'navbar.component.html',
    styleUrls: ['../../admin.component.css',
                '../../animate.min.css',
                '../../demo.css',
                '../../light-bootstrap-dashboard.css',
                './navbar.component.css']
})

export class NavbarComponent implements OnInit {

    location: Location;
    email = '';
    loginStatus = false;

    constructor(location: Location,
                private loginService: LoginService,
                private router: Router) {
        this.location = location;

        this.loginService.isLoggedIn.subscribe(isLoggedIn => {
            if (isLoggedIn) {
                this.loginStatus = true;
            } else {
                this.loginStatus = false;
            }
        });

        if (this.loginService.user.email == null) {
          loginService.userOutput.subscribe(
            (user: User) => {
              this.email = user.email;
              this.loginStatus = true;
            }
          );
        } else {
          this.loginStatus = true;
          this.email = this.loginService.user.email;
        }
    }

    ngOnInit() {

    }

    logout() {
        this.loginService.logout();
    }

}

import { Injectable, EventEmitter } from '@angular/core';
import { AngularFire } from 'angularfire2';
import { AuthMethods, AuthProviders } from 'angularfire2/index';


@Injectable()
export class LoginService {

    isLoggedIn = new EventEmitter<boolean>();

    constructor(private af: AngularFire) {
        this.af.auth.subscribe(authState => {
            console.log(authState);
            if (authState) {
                this.isLoggedIn.emit(true);
            } else {
                this.isLoggedIn.emit(false);
            }
            
        });
    }

    login(email, password) {
        this.af.auth.login({
            email: email,
            password: password
        }, {
            method: AuthMethods.Password,
            provider: AuthProviders.Password
        })
        .then(authState => {
            console.log(authState);
            // this.isLoggedIn.emit(true);
        })
        .catch(error => console.log(error));
    }

    register(email, password) {
        this.af.auth.createUser({
            email: email,
            password: password
        })
        .then(authState => {
            console.log(authState);
            // this.isLoggedIn.emit(true);
        })
        .catch(error => console.log(error));
    }

    facebookLogin() {
        this.af.auth.login({
           provider: AuthProviders.Facebook,
           method: AuthMethods.Popup
        })
        .then(authState => {
            console.log(authState);
            // this.isLoggedIn.emit(true);
        })
        .catch(error => console.log(error));
    }

    logout() {
        this.af.auth.logout();
        // this.isLoggedIn.emit(false);
    }
}
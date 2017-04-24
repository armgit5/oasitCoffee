import { Injectable } from '@angular/core';
import { AngularFire } from 'angularfire2';
import { AuthMethods, AuthProviders } from 'angularfire2/index';


@Injectable()
export class LoginService {

    constructor(private af: AngularFire) {
        
    }

    login(email, password) {
        this.af.auth.login({
            email: email,
            password: password
        }, {
            method: AuthMethods.Password,
            provider: AuthProviders.Password
        })
        .then(authState => console.log(authState))
        .catch(error => console.log(error));
    }

    register(email, password) {
        this.af.auth.createUser({
            email: email,
            password: password
        })
        .then(authState => {
            console.log(authState);
        })
        .catch(error => console.log(error));
    }

    facebookLogin() {
        this.af.auth.login({
           provider: AuthProviders.Facebook,
           method: AuthMethods.Popup
        })
        .then(authState => console.log(authState))
        .catch(error => console.log(error));
    }

    logout() {
        this.af.auth.logout();
    }
}
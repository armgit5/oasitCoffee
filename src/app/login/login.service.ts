import { Injectable, EventEmitter } from '@angular/core';
import { AngularFire } from 'angularfire2';
import { AuthMethods, AuthProviders } from 'angularfire2/index';
import { User } from './user';


@Injectable()
export class LoginService {

    isLoggedIn = new EventEmitter<boolean>();
    user: User = new User(null, null, null, null);

    

    constructor(private af: AngularFire) {
        console.log('inside service');
        console.log(this.user);
        this.af.auth.subscribe(authState => {
            if (authState) {
                console.log("service login")
                console.log(authState);
                this.user.uid = authState.uid;
                this.user.email = authState.auth.email;
                this.user.imageUrl = authState.auth.photoURL;
                this.user.name = authState.auth.displayName;
                console.log(this.user);
                this.isLoggedIn.emit(true);
            } else {
                console.log("service logout")
                this.user.uid = null;
                this.user.email = null;
                this.user.imageUrl = null;
                this.user.name = null;
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
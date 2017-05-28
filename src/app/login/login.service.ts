import { Injectable, EventEmitter, ViewChild } from '@angular/core';
import { AngularFireAuthModule, AngularFireAuth } from 'angularfire2/auth';
import { User } from './user';
import * as firebase from 'firebase/app';

@Injectable()
export class LoginService {

    isLoggedIn = new EventEmitter<boolean>();
    user: User = new User(null, null, null, null);

    @ViewChild('staticModal') loginModal; 
    
    constructor(private afAuth: AngularFireAuth) {
        this.afAuth.authState.subscribe(authState => {
            if (authState) {
                // console.log("service login")
                // console.log(authState);
                this.user.uid = authState.uid;
                this.user.email = authState.email;
                this.user.imageUrl = authState.photoURL;
                this.user.name = authState.displayName;
                // console.log(this.user);
                this.isLoggedIn.emit(true);
            } else {
                // console.log("service logout")
                this.user.uid = null;
                this.user.email = null;
                this.user.imageUrl = null;
                this.user.name = null;
                this.isLoggedIn.emit(false);
            }
        });
    }

    login(email, password): Promise<any> {

        return new Promise((resolve, reject) => {

            this.afAuth.auth.signInWithEmailAndPassword(email, password)
            .then(authState => {
                resolve(authState);
            })
            .catch(error => resolve(error));

        });

       
    }

    register(email, password) {
        this.afAuth.auth.createUserWithEmailAndPassword(email, password)
        .then(authState => {   
        })
        .catch(error => console.log(error));
    }

    facebookLogin(): Promise<any> {

        return new Promise((resolve, reject) => {

            this.afAuth.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider())
            .then(authState => {
                resolve(authState)
            })
            .catch(error => resolve(error));

        });
    }

    logout() {
        this.afAuth.auth.signOut();
        // this.isLoggedIn.emit(false);
    }
}
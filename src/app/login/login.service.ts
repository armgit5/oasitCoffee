import { Injectable, EventEmitter, ViewChild } from '@angular/core';
import { AngularFireAuthModule, AngularFireAuth } from 'angularfire2/auth';
import { User } from './user';
import * as firebase from 'firebase/app';
import { AngularFireDatabase } from 'angularfire2/database';

@Injectable()
export class LoginService {

    isLoggedIn = new EventEmitter<boolean>();
    user: User = new User(null, null, null, null);

    @ViewChild('staticModal') loginModal;

    constructor(private afAuth: AngularFireAuth,
                private db: AngularFireDatabase) {
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

    registerCompanyWithUser(companyName, email) {
        this.db.list('/companies').push({
          companyName: companyName,
          users: {
              email: email,
              role: "admin"
            }
        })
        .catch(
          err => console.log(err)
        );
    }

    register(email, password, companyName) {

        if (companyName) {
          console.log("there is company");
          this.registerCompanyWithUser(companyName, email);
        } else {
          console.log("not a company user");
        }


        // this.afAuth.auth.createUserWithEmailAndPassword(email, password)
        // .then(authState => {
        //   if (companyName) {
        //     console.log("there is company");
        //   } else {
        //     console.log("not a company user");
        //   }
        // })
        // .catch(error => console.log(error));
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

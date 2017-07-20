import { Injectable, EventEmitter, ViewChild } from '@angular/core';
import { AngularFireAuthModule, AngularFireAuth } from 'angularfire2/auth';
import { User } from './user';
import * as firebase from 'firebase/app';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

@Injectable()
export class LoginService {

    isLoggedIn = new EventEmitter<boolean>();
    userOutput = new EventEmitter<User>();
    user: User = new User(null, null, null, null, null);


    @ViewChild('staticModal') loginModal;

    constructor(private afAuth: AngularFireAuth,
                private db: AngularFireDatabase) {
        this.afAuth.authState.subscribe(authState => {
            if (authState) {
                // console.log(authState);
                this.user.uid = authState.uid;
                this.user.email = authState.email;
                this.user.imageUrl = authState.photoURL;
                this.user.name = authState.displayName;
                this.queryCompanyName(this.user);
            } else {
                this.user.uid = null;
                this.user.email = null;
                this.user.imageUrl = null;
                this.user.name = null;
                this.isLoggedIn.emit(false);
                this.userOutput.emit(this.user);
            }
        });
    }

    // Query users to comapanies table
    // assign companyName to user.companyName
    private queryCompanyName(user: User) {
      this.db.list('/usersToCompanies', {
        query: {
          orderByChild: 'email',
          equalTo: user.email
        }
      }).subscribe(
        items => {
          // console.log(items);
          this.user.companyName = items[0].companyName;
          this.isLoggedIn.emit(true);
          this.userOutput.emit(this.user);
        }
      );
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

    private createUserToCompany(email, companyName) {
      this.db.list("/usersToCompanies").push({
        email: email,
        companyName: companyName
      });
    }

    private registerCompanyWithUser(companyName, email) {
        // this.db.list('/companies').push({
        //   companyName: companyName,
        //   users: {
        //       email: email,
        //       role: "admin"
        //     }
        // })
        // .catch(
        //   err => console.log(err)
        // );

        // Sign up a company.
        // Check to see if the company name exists or not.
        let myObject= this.db.object("/companies/"+companyName);
        myObject.subscribe(snapshot => {
          if (snapshot.$value === null) {
            myObject.set({
              users: [{
                email: email,
                role: "admin"
              }]
            });

            this.createUserToCompany(email, companyName);

          } else {
            console.log("company already exists");
          }
        });
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

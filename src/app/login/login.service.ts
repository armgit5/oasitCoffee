import { Injectable, EventEmitter, ViewChild } from '@angular/core';
import { AngularFireAuthModule, AngularFireAuth } from 'angularfire2/auth';

import * as firebase from 'firebase/app';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { Http, RequestOptions, Headers } from '@angular/http';
import { tokenNotExpired } from 'angular2-jwt';
import { xhrHeaders } from '../shared/xhr-headers';
import { User } from '../admin/users/users';
import { Router } from '@angular/router';

@Injectable()
export class LoginService {

    isLoggedIn = new EventEmitter<boolean>();
    userOutput = new EventEmitter<User>();
    user: User = new User(null, null, null, null, null, null, null);
    loginStatusOutput = new EventEmitter<string>();

    @ViewChild('staticModal') loginModal;

    constructor(private afAuth: AngularFireAuth,
                private db: AngularFireDatabase,
                private http: Http,
                private router: Router) {


        this.afAuth.authState.subscribe(authState => {
            if (authState) {
                this.user.email = authState.email;
                this.user.imageUrl = authState.photoURL;
                this.user.uid = authState.uid;
                this.isLoggedIn.emit(true);
                this.findUserByEmail(this.user.email);
            } else {
                this.user.email = null;
                this.user.uid = null;
                this.user.role = null;
                this.user.$key = null;
                this.user.imageUrl = null;
                this.user.username = null;
                this.isLoggedIn.emit(false);
                this.userOutput.emit(this.user);
            }
        });
    }

    private findUserByEmail(email: string) {
      this.db.list('/users', {
        query: {
          orderByChild: 'email',
          equalTo: email
        }
      }).subscribe(
        users => {
          let user = users[0];
          this.user.username = user.username;
          this.user.role = user.role;
          this.user.$key = user.$key;
          this.userOutput.emit(this.user);
        }
      );
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
          if (items.length > 0) {
            // this.user.companyName = items[0].companyName;
            this.isLoggedIn.emit(true);
            this.userOutput.emit(this.user);
          }
        }
      );
    }

    login(email, password): Promise<any> {

      // if (apiMethods.vWuth) {
      //       let path = `${apiUrl.url}/api/login`;
      //       let body = JSON.stringify({
      //           username: email,
      //           password: password
      //       });

      //     return new Promise((resolve, reject) => {  this.http.post(path, body, xhrHeaders()).map(res => res.json())
      //       .subscribe(authState => {
      //         // console.log(userInfo);
      //         // localStorage.setItem('access_token', authState.access_token);
      //         // localStorage.setItem('refresh_token', authState.refresh_token);
      //         localStorage.setItem('access_token', authState.access_token);
      //         localStorage.setItem('refresh_token', authState.refresh_token);
      //         localStorage.setItem('username', authState.username);
      //         console.log(localStorage.getItem('access_token'));
      //         resolve(authState);
      //         this.user.email = authState.username;
      //         this.user.name = authState.username;
      //         this.user.companyName = 'Super admin';
      //         this.userOutput.emit(this.user);
      //       });
      //     });
      // }

         return new Promise((resolve, reject) => {
            this.afAuth.auth.signInWithEmailAndPassword(email, password)
            .then(authState => {
                resolve(authState);
            })
            .catch(error => reject(error));
        });

    }

    private createUserToCompany(email, companyName) {
      this.db.list('/usersToCompanies').push({
        email: email,
        companyName: companyName
      });
    }

    private registerCompanyWithUser(companyName, email) {
        // Sign up a company.
        // Check to see if the company name exists or not.
        let myObject= this.db.object('/companies/' + companyName);
        myObject.subscribe(snapshot => {
          if (snapshot.$value === null) {
            myObject.set({
              users: [{
                email: email,
                role: 'admin'
              }]
            });

            this.createUserToCompany(email, companyName);

          } else {
            console.log('company already exists');
          }
        });
    }

    register(email, password, companyName) {



        if (companyName) {
          console.log('there is company');
          this.registerCompanyWithUser(companyName, email);
        } else {
          console.log('not a company user');
        }

        this.afAuth.auth.createUserWithEmailAndPassword(email, password)
        .then(authState => {
          console.log(authState);
          if (companyName) {
            console.log('there is company');
          } else {
            console.log('not a company user');
          }
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




      this.isLoggedIn.emit(false);
      this.userOutput.emit(new User(null, null, null, null, null, null, null));
      this.router.navigate(['/']);
    }
}

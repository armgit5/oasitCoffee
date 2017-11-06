import { Injectable, EventEmitter, ViewChild } from '@angular/core';
import { AngularFireAuthModule, AngularFireAuth } from 'angularfire2/auth';
import { User } from './user';
import * as firebase from 'firebase/app';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { apiMethods, apiUrl } from '../../environments/environment';
import { Http, RequestOptions, Headers } from '@angular/http';
import { tokenNotExpired } from 'angular2-jwt';
import { xhrHeaders } from '../shared/xhr-headers';

@Injectable()
export class LoginService {

    isLoggedIn = new EventEmitter<boolean>();
    userOutput = new EventEmitter<User>();
    user: User = new User(null, null, null, null, null);

    @ViewChild('staticModal') loginModal;

    constructor(private afAuth: AngularFireAuth,
                private db: AngularFireDatabase,
                private http: Http) {

        if (apiMethods.v1 || apiMethods.vCompanies) {
        this.afAuth.authState.subscribe(authState => {
            if (authState) {
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
        } else {
          if (tokenNotExpired) {
            this.isLoggedIn.emit(true);
          } else {
            this.isLoggedIn.emit(false);
          }
        }
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
            this.user.companyName = items[0].companyName;
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
      if (apiMethods.v1 || apiMethods.vCompanies) {
         return new Promise((resolve, reject) => {

            this.afAuth.auth.signInWithEmailAndPassword(email, password)
            .then(authState => {
                resolve(authState);
            })
            .catch(error => resolve(error));
        });
      }
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

      if (apiMethods.v1 || apiMethods.vCompanies) {

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
      if (apiMethods.v1 || apiMethods.vCompanies) {
        this.afAuth.auth.signOut();
      }

      if (apiMethods.vWuth) {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
      }

      this.isLoggedIn.emit(false);
    }
}

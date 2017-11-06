import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Subscription } from 'rxjs/Rx';
import { User } from './users';


@Injectable()
export class UsersService {

  constructor(private db: AngularFireDatabase,
    private afAuth: AngularFireAuth) {

  }

  loadAllUsers() {
    return this.db.list('/users');
  }

  createUser(username, email, password, role) {
    this.afAuth.auth.createUserWithEmailAndPassword(email, password)
      .then(authState => {
        if (authState) {
          this.addUserInfoToDB(username, email, role);
        }
      })
      .catch(error => console.log(error));
  }

  private addUserInfoToDB(username, email, role) {
    this.db.list('/users').push({
      username: username,
      email: email,
      role: role
    });
  }


}

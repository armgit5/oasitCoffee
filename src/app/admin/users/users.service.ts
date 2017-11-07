import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Subscription } from 'rxjs/Rx';
import { User } from './users';
import * as admin from 'firebase-admin';

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
          console.log(authState.uid);
          let uid = authState.uid;
          this.addUserInfoToDB(username, email, role, uid);
        }
      })
      .catch(error => console.log(error));
  }

  private addUserInfoToDB(username, email, role, uid) {
    this.db.list('/users').push({
      username: username,
      email: email,
      role: role,
      uid: uid
    });
  }

  deleteUser($key: string, uid: string) {
    this.db.object('/users/' + $key).remove()
    .then(() => {
      this.deleteUserInAuthentication(uid);
    })
    .catch(error => console.log('Delete User Error'));
  }

  private deleteUserInAuthentication(uid) {
    // needed to be implemented later
  }
}

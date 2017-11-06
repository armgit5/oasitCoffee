import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';


@Injectable()
export class UsersService {


  constructor(private db: AngularFireDatabase) {

  }

  loadAllUsers() {

  }

}

import { Injectable, Inject } from '@angular/core';
import { FirebaseRef, AngularFire, FirebaseApp } from 'angularfire2';

@Injectable()
export class CategoryService {

  constructor(@Inject(FirebaseRef) fb, 
                private af: AngularFire,
                @Inject(FirebaseApp) firebaseApp: any) {
  
  }

  loadCategories() {
    return this.af.database.list('categories');
  }

  loadTypes() {
    return this.af.database.list('types');
  }

}

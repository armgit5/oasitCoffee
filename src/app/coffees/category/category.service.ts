import { Injectable, Inject, EventEmitter } from '@angular/core';
import { FirebaseRef, AngularFire, FirebaseApp } from 'angularfire2';
import { Category } from './category';

@Injectable()
export class CategoryService {

  categoryChanged = new EventEmitter<Category>();

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

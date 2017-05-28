import { Injectable, Inject, EventEmitter } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Category } from './category';

@Injectable()
export class CategoryService {

  categoryChanged = new EventEmitter<Category>();

  constructor(private db: AngularFireDatabase) {
  
  }

  loadCategories() {
    return this.db.list('categories');
  }

  loadTypes() {
    return this.db.list('types');
  }

}

import { Component, Output, EventEmitter, OnInit, OnDestroy} from '@angular/core';
import { categoriesData } from './categoriesData';
import { Category } from './category';
import { CategoryService } from './category.service';
import { Subscription } from 'rxjs/Rx';
import { Type } from './type';


@Component({
    selector: 'category-selector',
    templateUrl: './category.component.html',
    styles: [`
       .active {
            font-weight: bold;
            font-size: 16px;
            text-decoration: underline;
            // background-color: yellow;
       }
    `]
})
export class CategoryComponent implements OnInit, OnDestroy {

    activeStatus = {};
    allStatus = true;
    categories: Category[];
    types: Type[];
    typesOuput: any[] = []; 
    category: Category = new Category(null, []);
    $category: Subscription;

    @Output("filter")
    filterOutput = new EventEmitter();

    constructor(private categoryService: CategoryService) {
        
    }

    ngOnInit() {

        this.categoryService.loadCategories().subscribe(categories => {
            this.categories = categories;
        });   
        this.$category = this.categoryService.loadTypes().subscribe(types => {
            this.types = types;
            this.loadAllTypes();
        });
    
    }
    
    private loadAllTypes() {
        this.typesOuput = [];
        this.types.forEach(type => {
            this.typesOuput.push(type.name);
            type.status = true;
        });
        this.category.types = this.typesOuput;
    }

    private emitCategory() {
        this.filterOutput.emit(this.category);
    }


    boxChanges($event, boxName) {

        // Filter types
        if ($event) {
            this.typesOuput.push(boxName);
        } else {
            this.typesOuput.splice(this.typesOuput.indexOf(boxName), 1);
        }

        this.category.types = this.typesOuput;
        this.emitCategory();
    }


    filter(category: Category) {
        this.allStatus = false;
        this.categories.forEach(element => {
            if (element.$key == category.$key) {
                this.activeStatus[element.$key] = true;
            } else {
                this.activeStatus[element.$key] = false;
            } 
        });

        // this.typesOuput = [];
        this.loadAllTypes();
        
        this.types.forEach(type => console.log(type.status));

        this.category.$key = category.$key;
        this.emitCategory();
    }

    filterAll() {
        this.allStatus = true;
        this.categories.forEach(element => {
            this.activeStatus[element.$key] = false;
        });
        // this.typesOuput = [];
        this.loadAllTypes();
        this.category.$key = null;
        this.emitCategory();
    }
   
    ngOnDestroy() {
        this.$category.unsubscribe();
    }
}
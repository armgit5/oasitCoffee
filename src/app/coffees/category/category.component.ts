import { Component, Output, EventEmitter, OnInit, OnDestroy} from '@angular/core';
import { categoriesData } from './categoriesData';
import { Category } from './category';
import { CategoryService } from './category.service';
import { Subscription } from 'rxjs/Rx';


@Component({
    selector: 'category-selector',
    templateUrl: './category.component.html',
    styles: [`
       
    `]
})
export class CategoryComponent implements OnInit, OnDestroy {

    activeStatus = {};
    allStatus = true;
    categories: Category[];
    types: any[];
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
            
            this.types.forEach(type => {
                this.typesOuput.push(type.name);
            });
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
        this.category.$key = category.$key;
        this.emitCategory();
    }

    filterAll() {
        this.allStatus = true;
        this.categories.forEach(element => {
            this.activeStatus[element.$key] = false;
        });
        this.category.$key = null;
        this.emitCategory();
    }
   
    ngOnDestroy() {
        this.$category.unsubscribe();
    }
}
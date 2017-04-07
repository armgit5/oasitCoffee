import { Component, Output, EventEmitter, OnInit} from '@angular/core';
import { categoriesData } from './categoriesData';
import { Category } from './category';
import { CategoryService } from './category.service';
import { element } from 'protractor/globals';


@Component({
    selector: 'category-selector',
    templateUrl: './category.component.html',
    styles: [`
       
    `]
})
export class CategoryComponent implements OnInit {

    // categories = categoriesData.categories;

    activeStatus = {};
    allStatus = true;
    categories: Category[];
    // types: any[];
    types: any[] = []; 
    category: Category;

    @Output("filter")
    filterOutput = new EventEmitter();

    constructor(private categoryService: CategoryService) {
    
    }



    ngOnInit() {
        this.categoryService.loadCategories().subscribe(categories => {
            this.categories = categories;
        });   

        this.categoryService.loadTypes().subscribe(types => {
            types.forEach(type => {
                this.types.push(type.name);
            });
            // console.log(this.typesOuput);
        });

        this.category = new Category(null, this.types);

    }

    boxChanges($event, boxName) {
        if ($event) {
            this.types.push(boxName);
        } else {
            // console.log(this.typesOuput.indexOf(boxName), boxName);
            this.types.splice(this.types.indexOf(boxName), 1);
        }
        // console.log(this.typesOuput);
        this.category.types = this.types;
        this.filterOutput.emit(this.category);
    }

   

    filter(category: Category) {
        // console.log("filtering");
        this.allStatus = false;
        this.categories.forEach(element => {
            if (element.$key == category.$key) {
                this.activeStatus[element.$key] = true;
            } else {
                this.activeStatus[element.$key] = false;
            } 
        });
        this.category.$key = category.$key;
        this.filterOutput.emit(this.category);
    }

    filterAll() {
        this.allStatus = true;
        this.categories.forEach(element => {
            this.activeStatus[element.$key] = false;
        });
        this.category.$key = null;
        this.filterOutput.emit(this.category);
    }
    
   
}
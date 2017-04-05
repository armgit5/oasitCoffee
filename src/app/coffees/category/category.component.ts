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

    constructor(private categoryService: CategoryService) {

    }

    ngOnInit() {
        this.categoryService.loadCategories().subscribe(categories => {
            this.categories = categories;
        });   
    }

    @Output("filter")
    filterOutput = new EventEmitter();

    filter(category: Category) {
        this.allStatus = false;
        this.categories.forEach(element => {
            if (element.$key == category.$key) {
                this.activeStatus[element.$key] = true;
            } else {
                this.activeStatus[element.$key] = false;
            } 
        });
        this.filterOutput.emit(category.$key);
    }

    filterAll() {
        this.allStatus = true;
        this.categories.forEach(element => {
            this.activeStatus[element.$key] = false;
        });
        this.filterOutput.emit();
    }
    
   
}
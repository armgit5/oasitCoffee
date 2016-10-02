import { Component, Output, EventEmitter, OnInit} from '@angular/core';
import { categoriesData } from './categoriesData';
import { Category } from './category';


@Component({
    selector: 'category-selector',
    template: `
        
        <div class="col-xs-6 col-sm-3 sidebar-offcanvas" id="sidebar">
            <div class="list-group" ShowOneContainer>

                <a class="list-group-item" [class.active]="allStatus" (click)=filterAll()>All</a>
                <a class="list-group-item" *ngFor="let category of categories" 
                     [class.active]="activeStatus[category.id]"  (click)=filter(category)>{{category.name}}</a>
                
              </div>
        </div><!--/span-->

    `,
    styles: [`
       
    `]
})
export class CategoryComponent implements OnInit {

    categories = categoriesData.categories;

    activeStatus = {};
    allStatus = true;

    ngOnInit() {
         this.categories.forEach(element => {
            this.activeStatus[element.id] = false;
        });
    }

    @Output("filter")
    filterOutput = new EventEmitter();

    filter(category: Category) {
        this.allStatus = false;
        this.categories.forEach(element => {
            this.activeStatus[element.id] = element.id == category.id;
        });
        this.filterOutput.emit(category.id);
    }

    filterAll() {
        this.allStatus = true;
        this.categories.forEach(element => {
            this.activeStatus[element.id] = false;
        });
        this.filterOutput.emit();
    }
    
   
}
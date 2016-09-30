import { Component, Output, EventEmitter} from '@angular/core';

@Component({
    selector: 'category-selector',
    template: `
        
        <div class="col-xs-6 col-sm-3 sidebar-offcanvas" id="sidebar">
            <div class="list-group">
                <a class="list-group-item" [class.active]="allActive" (click)="filterAll()">All Types</a>
                <a class="list-group-item" [class.active]="coffeeActive"  (click)="filterCoffee()">Coffee</a>
                <a class="list-group-item" [class.active]="menuActive" (click)="filterMenu()">Menu</a>
                <a class="list-group-item" [class.active]="specialActive" (click)="filterSpecialMenu()">Special Menu</a>
                <a class="list-group-item" [class.active]="frappeActive" (click)="filterFrappe()">Frappe</a>
            </div>
        </div><!--/span-->

    `,
    styles: [`
       
    `]
})
export class CategoryComponent {
    
    allActive = true;
    coffeeActive = false;
    menuActive = false;
    specialActive = false;
    frappeActive = false;
   
    @Output("filter")
    filterOutput = new EventEmitter();

    removeActive() {
        this.allActive = false;
        this.coffeeActive = false;
        this.menuActive = false;
        this.specialActive = false;
        this.frappeActive = false;
    }
    filterAll() {
        this.filterOutput.emit("");
        this.removeActive();
        this.allActive = true;
    }
    filterCoffee() {
        this.filterOutput.emit("coffee");
        this.removeActive();
        this.coffeeActive = true;   
    }
    filterMenu() {
        this.filterOutput.emit("menu");
        this.removeActive();
        this.menuActive = true;
    }
    filterSpecialMenu() {
        this.filterOutput.emit("special menu");
        this.removeActive();
        this.specialActive = true;
    }
    filterFrappe() {
        this.filterOutput.emit("frappe");
        this.removeActive();
        this.frappeActive = true;
    }
}
import { Component, OnInit } from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'sidebar-cmp',
    templateUrl: 'sidebar.component.html',
    styleUrls: ['../admin.component.css',
                '../animate.min.css',
                '../demo.css',
                '../light-bootstrap-dashboard.css']
})

export class SidebarComponent implements OnInit {
    public menuItems: any[];
    isCollapsed = true;

    constructor() {}
    ngOnInit() {

    }
}

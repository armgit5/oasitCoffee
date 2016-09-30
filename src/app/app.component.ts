import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
              <my-header></my-header>
              <router-outlet></router-outlet>
            `,
  styleUrls: ['./app.component.css']
})
export class AppComponent {

}

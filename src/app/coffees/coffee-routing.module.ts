import { NgModule } from '@angular/core';
import { Routes } from "@angular/router/router";
import { CoffeeEditComponent } from '../coffee-edit/coffee-edit.component';
import { RouterModule } from '@angular/router';

const coffeesRoutes: Routes = [
  { path: 'coffee', children: [
    {
      path: 'new',
      component: CoffeeEditComponent
    },
    {
      path: ':id/edit',
      component: CoffeeEditComponent
    }
  ]}
];

@NgModule({
  imports: [
    RouterModule.forChild(coffeesRoutes)
  ],
  exports: [RouterModule]
})
export class CoffeeRoutingModule {

}

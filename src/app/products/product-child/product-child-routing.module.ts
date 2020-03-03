import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ActiveProductComponent } from './active-product/active-product.component';
import { NewProductComponent } from './new-product/new-product.component';
import { ShowAllProductComponent } from './show-all-product/show-all-product.component';
import { InactiveProductComponent } from './inactive-product/inactive-product.component';

const routes: Routes = [
  {path: '',  redirectTo:'active', pathMatch: 'full'},
  {path: 'active',component: ActiveProductComponent},
  {path: 'inactive',component: InactiveProductComponent},
  {path: 'new',component: NewProductComponent},
  {path: 'all',component: ShowAllProductComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductChildRoutingModule { }

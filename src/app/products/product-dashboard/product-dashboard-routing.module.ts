import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductDashboardComponent } from './product-dashboard/product-dashboard.component';
import { ActiveProductComponent } from '../product-child/active-product/active-product.component';
import { ShowAllProductComponent } from '../product-child/show-all-product/show-all-product.component';
import { InactiveProductComponent } from '../product-child/inactive-product/inactive-product.component';
import { NewProductComponent } from '../product-child/new-product/new-product.component';
import { ActiveKitsComponent } from '../kits/active-kits/active-kits.component';
import { InactiveKitsComponent } from '../kits/inactive-kits/inactive-kits.component';
import { ShowAllKitsComponent } from '../kits/show-all-kits/show-all-kits.component';
import { NewKitsComponent } from '../kits/new-kits/new-kits.component';

const routes: Routes = [
  {path: '', component: ProductDashboardComponent,
  children: [
    {path: '', redirectTo: 'product', pathMatch: 'full'},
    {path: 'product',
    loadChildren: '../product-child/product-child.module#ProductChildModule'},
    {
      path: 'kit',
      loadChildren: '../kits/kits.module#KitsModule'
    }
    // {path: '',  redirectTo:'product/active', pathMatch: 'full'},
    // {path: 'product/active',component: ActiveProductComponent},
    // {path: 'product/inactive', component: InactiveProductComponent},
    // {path: 'product/all', component: ShowAllProductComponent},
    // {path: 'product/new', component: NewProductComponent},
    // {path: 'kit/all', component: ShowAllKitsComponent},
    // {path: 'kit/active', component: ActiveKitsComponent},
    // {path: 'kit/inactive', component: InactiveKitsComponent},
    // {path: 'kit/new', component: NewKitsComponent},
  ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductDashboardRoutingModule { }

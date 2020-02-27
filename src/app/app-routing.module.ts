import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { BaseComponent } from './base/base.component';

const routes: Routes = [
  {
    path: 'orders',
    loadChildren: './orders/orders.module#OrdersModule'
  },
  {
    path: 'products',
    loadChildren: './products/products.module#ProductsModule'
  },
  {
    path: 'settings',
    loadChildren: './settings/settings.module#SettingsModule'
  },
  {
    path: 'scan',
    loadChildren: './scan-pack-header/scan-pack-header.module#ScanPackHeaderModule'
  },
  {
    path: 'base',
    component: BaseComponent
  },
  {path: '', pathMatch: 'full', redirectTo: 'login'},
  {path: 'login', component: LoginComponent}
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{ useHash: false})],
  exports: [RouterModule]
})
export class AppRoutingModule { }

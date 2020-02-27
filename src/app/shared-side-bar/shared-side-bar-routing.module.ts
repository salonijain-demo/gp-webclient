import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InventoryKitProductComponent } from '../products/product-child/create-product/inventory-kit-product/inventory-kit-product.component';

const routes: Routes = [
  {path: 'kitsProduct', component: InventoryKitProductComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SharedSideBarRoutingModule { }
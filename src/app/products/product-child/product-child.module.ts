import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductChildRoutingModule } from './product-child-routing.module';
import { CreateProductComponent } from './create-product/create-product.component';
import { ShowAllProductComponent } from './show-all-product/show-all-product.component';
import { ActiveProductComponent } from './active-product/active-product.component';
import { InactiveProductComponent } from './inactive-product/inactive-product.component';
import { NewProductComponent } from './new-product/new-product.component';
import { ProductInfoCreateComponent } from './create-product/product-info-create/product-info-create.component';
import { ScanPackCreateProductComponent } from './create-product/scan-pack-create-product/scan-pack-create-product.component';
import { InventoryKitProductComponent } from './create-product/inventory-kit-product/inventory-kit-product.component';
import { ActivityLogProductComponent } from './create-product/activity-log-product/activity-log-product.component';

@NgModule({
  declarations: [CreateProductComponent, ShowAllProductComponent, ActiveProductComponent, InactiveProductComponent, NewProductComponent, ProductInfoCreateComponent, ScanPackCreateProductComponent, InventoryKitProductComponent, ActivityLogProductComponent],
  imports: [
    CommonModule,
    ProductChildRoutingModule
  ]
})
export class ProductChildModule { }

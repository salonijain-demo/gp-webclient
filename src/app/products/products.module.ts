import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsRoutingModule } from './products-routing.module';
import { MatTabsModule } from '@angular/material';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedSideBarModule } from '../shared-side-bar/shared-side-bar.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [],
  imports: [
    FormsModule,
    CommonModule,
    MatTabsModule,
    NgbModule,
    ProductsRoutingModule,
    SharedSideBarModule
  ]
})
export class ProductsModule { }

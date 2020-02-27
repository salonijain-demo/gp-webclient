import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductDashboardRoutingModule } from './product-dashboard-routing.module';
import { ProductDashboardComponent } from './product-dashboard/product-dashboard.component';
import { SharedSideBarModule } from 'src/app/shared-side-bar/shared-side-bar.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [ProductDashboardComponent],
  imports: [
    CommonModule,
    ProductDashboardRoutingModule,
    SharedSideBarModule,
    NgbModule
  ]
})
export class ProductDashboardModule { }

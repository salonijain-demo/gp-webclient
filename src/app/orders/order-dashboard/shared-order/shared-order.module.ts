import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedOrderRoutingModule } from './shared-order-routing.module';
import { ItemsOrderComponent } from '../create-order/items-order/items-order.component';
import { CreateOrderComponent } from '../create-order/create-order.component';

@NgModule({
  declarations: [
    ItemsOrderComponent,
    // CreateOrderComponent
  ],
  imports: [
    CommonModule,
    SharedOrderRoutingModule
  ],
  exports: [
    // ItemsOrderComponent
    // CreateOrderComponent
  ]
})
export class SharedOrderModule { }

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OrderDashboardComponent } from './order-dashboard/order-dashboard.component';
import { CreateOrderComponent } from './order-dashboard/create-order/create-order.component';

const routes: Routes = [
  {path: '', component: OrderDashboardComponent},
  {path: 'createOrder', component: CreateOrderComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrdersRoutingModule { }
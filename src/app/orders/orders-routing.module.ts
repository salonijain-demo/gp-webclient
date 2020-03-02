import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OrderDashboardComponent } from './order-dashboard/order-dashboard.component';
import { CreateOrderComponent } from './order-dashboard/create-order/create-order.component';
import { AwaitingOrderComponent } from './order-dashboard/awaiting-order/awaiting-order.component';
import { ActionRequiredOrderComponent } from './order-dashboard/action-required-order/action-required-order.component';
import { ShowAllOrderComponent } from './order-dashboard/show-all-order/show-all-order.component';
import { ServiceIssueOrderComponent } from './order-dashboard/service-issue-order/service-issue-order.component';
import { ScannedOrderComponent } from './order-dashboard/scanned-order/scanned-order.component';
import { CancelledOrderComponent } from './order-dashboard/cancelled-order/cancelled-order.component';

const routes: Routes = [
  {path: '', component: OrderDashboardComponent,
  children: [
    {path: '',  redirectTo:'awaiting', pathMatch: 'full'},
    {path: 'awaiting',component:AwaitingOrderComponent},
    {path: 'createOrder', component: CreateOrderComponent},
    {path: 'all', component: ShowAllOrderComponent},
    {path: 'onhold', component: ActionRequiredOrderComponent},
    {path: 'serviceissue', component: ServiceIssueOrderComponent},
    {path: 'cancelled', component: CancelledOrderComponent},
    {path: 'scanned', component: ScannedOrderComponent},
  ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
exports: [RouterModule]
})
export class OrdersRoutingModule { }
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrdersRoutingModule } from './orders-routing.module';
import { OrderDashboardComponent } from './order-dashboard/order-dashboard.component';
import { GridModule } from '@syncfusion/ej2-angular-grids';
import { ShowOrdersComponent } from './show-orders/show-orders.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DataGridTableModule } from '../data-grid-table/data-grid-table.module';
import { ShowAllOrderComponent } from './order-dashboard/show-all-order/show-all-order.component';
import { AwaitingOrderComponent } from './order-dashboard/awaiting-order/awaiting-order.component';
import { ActionRequiredOrderComponent } from './order-dashboard/action-required-order/action-required-order.component';
import { ServiceIssueOrderComponent } from './order-dashboard/service-issue-order/service-issue-order.component';
import { CancelledOrderComponent } from './order-dashboard/cancelled-order/cancelled-order.component';
import { ScannedOrderComponent } from './order-dashboard/scanned-order/scanned-order.component';
import { MatTabsModule } from '@angular/material';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { SharedSideBarModule } from '../shared-side-bar/shared-side-bar.module';
import { ItemsOrderComponent } from './order-dashboard/create-order/items-order/items-order.component';
import { NotesOrderComponent } from './order-dashboard/create-order/notes-order/notes-order.component';
import { ActivitiesOrderComponent } from './order-dashboard/create-order/activities-order/activities-order.component';
import { InformationOrderComponent } from './order-dashboard/create-order/information-order/information-order.component';
import { MultiBoxOrderComponent } from './order-dashboard/create-order/multi-box-order/multi-box-order.component';
import { FormsModule } from '@angular/forms';
import { SharedOrderModule } from './order-dashboard/shared-order/shared-order.module';
import { CreateOrderComponent } from './order-dashboard/create-order/create-order.component';

@NgModule({
  declarations: [
    ShowAllOrderComponent,
    AwaitingOrderComponent,
    ActionRequiredOrderComponent,
    ServiceIssueOrderComponent,
    CancelledOrderComponent,
    ScannedOrderComponent,
    OrderDashboardComponent,
    ShowOrdersComponent,
    // ItemsOrderComponent,
    // NotesOrderComponent,
    // ActivitiesOrderComponent,
    // InformationOrderComponent,
    // MultiBoxOrderComponent,
    // CreateOrderComponent
  ],
  imports: [
    FormsModule,
    CommonModule,
    OrdersRoutingModule,
    GridModule,
    NgbModule,
    // DataGridTableModule,
    MatTabsModule,
    AngularFontAwesomeModule,
    SharedSideBarModule
  ],
  exports: [
    OrderDashboardComponent,
    AwaitingOrderComponent,
    // ItemsOrderComponent,
    // NotesOrderComponent,
    // ActivitiesOrderComponent,
    // InformationOrderComponent,
    // MultiBoxOrderComponent
  ]
})
export class OrdersModule { }

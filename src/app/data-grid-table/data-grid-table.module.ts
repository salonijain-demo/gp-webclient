import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataGridTableRoutingModule } from './data-grid-table-routing.module';
import { DataGridComponent } from './data-grid/data-grid.component';
import { GridModule, SortService, ToolbarService, EditService, PageService, ReorderService, CommandColumnService, ColumnChooserService } from '@syncfusion/ej2-angular-grids';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { DialogModule } from '@syncfusion/ej2-angular-popups';
import { OrdersModule } from '../orders/orders.module';
import { SharedSideBarModule } from '../shared-side-bar/shared-side-bar.module';

@NgModule({
  declarations: [
    // DataGridComponent
  ],
  imports: [
    FormsModule,
    CommonModule,
    DataGridTableRoutingModule,
    GridModule,
    NgbModule,
    DialogModule,
    SharedSideBarModule
  ],
  exports: [
    // DataGridComponent
  ],
  providers: [
    EditService,
    ToolbarService,
    SortService,
    PageService,
    ReorderService,
    CommandColumnService,
    ColumnChooserService
  ]
})
export class DataGridTableModule { }

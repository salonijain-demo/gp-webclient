import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScanPackHeaderRoutingModule } from './scan-pack-header-routing.module';
import { ScanPackDashboardComponent } from './scan-pack-dashboard/scan-pack-dashboard.component';
import { SharedSideBarModule } from '../shared-side-bar/shared-side-bar.module';
import { ScanPackListComponent } from './scan-pack-list/scan-pack-list.component';
import { FormsModule } from '@angular/forms';
import { DataGridTableModule } from '../data-grid-table/data-grid-table.module';
import { ScanPackProductEditComponent } from './scan-pack-product-edit/scan-pack-product-edit.component';

@NgModule({
  declarations: [ScanPackDashboardComponent, ScanPackListComponent, ScanPackProductEditComponent],
  imports: [
    FormsModule,
    CommonModule,
    ScanPackHeaderRoutingModule,
    SharedSideBarModule,
    // DataGridTableModule
  ]
})
export class ScanPackHeaderModule { }

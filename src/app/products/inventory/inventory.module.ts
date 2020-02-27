import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InventoryRoutingModule } from './inventory-routing.module';
import { InventoryReportComponent } from './inventory-report/inventory-report.component';
import { ReceiveRecountInventoryComponent } from './receive-recount-inventory/receive-recount-inventory.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [InventoryReportComponent, ReceiveRecountInventoryComponent],
  imports: [
    CommonModule,
    InventoryRoutingModule,
    NgbModal
  ],
  entryComponents: [ReceiveRecountInventoryComponent]
})
export class InventoryModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BackupExportRoutingModule } from './backup-export-routing.module';
import { BackupRestoreComponent } from './backup-restore/backup-restore.component';
import { ExceptionsExportComponent } from './exceptions-export/exceptions-export.component';
import { OrderExportComponent } from './order-export/order-export.component';
import { DailyPackedReportComponent } from './daily-packed-report/daily-packed-report.component';
import { UserStatsExportComponent } from './user-stats-export/user-stats-export.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [BackupRestoreComponent, ExceptionsExportComponent, OrderExportComponent, DailyPackedReportComponent, UserStatsExportComponent],
  imports: [
    CommonModule,
    FormsModule,
    BackupExportRoutingModule
  ]
})
export class BackupExportModule { }

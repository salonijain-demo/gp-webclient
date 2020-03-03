import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BackupRestoreComponent } from './backup-restore/backup-restore.component';
import { ExceptionsExportComponent } from './exceptions-export/exceptions-export.component';
import { OrderExportComponent } from './order-export/order-export.component';
import { UserStatsExportComponent } from './user-stats-export/user-stats-export.component';
import { DailyPackedReportComponent } from './daily-packed-report/daily-packed-report.component';

const routes: Routes = [
  {path: '', redirectTo: 'backup_restore', pathMatch: 'full'},
  {path: 'backup_restore', component: BackupRestoreComponent},
  {path: 'order_exception', component: ExceptionsExportComponent},
  {path: 'order_export', component: OrderExportComponent},
  {path: 'stats_export', component: UserStatsExportComponent},
  {path: 'daily_packed', component: DailyPackedReportComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BackupExportRoutingModule { }

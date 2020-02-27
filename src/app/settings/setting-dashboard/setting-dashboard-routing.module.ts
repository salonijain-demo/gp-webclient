import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SettingDashboardComponent } from './setting-dashboard/setting-dashboard.component';

const routes: Routes = [
  {path: '', component: SettingDashboardComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingDashboardRoutingModule { }

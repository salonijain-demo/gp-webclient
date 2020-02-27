import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: './setting-dashboard/setting-dashboard.module#SettingDashboardModule'
  },
  // {path: 'system', loadChildren: './system-settings/system-settings.module#SystemSettingsModule'}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingsRoutingModule { }

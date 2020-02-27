import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingDashboardRoutingModule } from './setting-dashboard-routing.module';
import { SettingDashboardComponent } from './setting-dashboard/setting-dashboard.component';
import { SharedSideBarModule } from 'src/app/shared-side-bar/shared-side-bar.module';

@NgModule({
  declarations: [
    SettingDashboardComponent
  ],
  imports: [
    CommonModule,
    SettingDashboardRoutingModule,
    SharedSideBarModule
  ]
})
export class SettingDashboardModule { }

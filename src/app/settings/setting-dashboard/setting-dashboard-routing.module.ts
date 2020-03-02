import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SettingDashboardComponent } from './setting-dashboard/setting-dashboard.component';
import { ShowAllStoreSettingsComponent } from '../store-settings/show-all-store-settings/show-all-store-settings.component';
import { ShowAllUserPermissionComponent } from '../user-permission/show-all-user-permission/show-all-user-permission.component';

const routes: Routes = [
  {path: '', component: SettingDashboardComponent,
  children:[
    {path:'', redirectTo: 'stores', pathMatch: 'full'},
    {path: 'stores', component: ShowAllStoreSettingsComponent},
    {path: 'users', component: ShowAllUserPermissionComponent},
  ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingDashboardRoutingModule { }

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ShowAllStoreSettingsComponent } from './show-all-store-settings/show-all-store-settings.component';

const routes: Routes = [
  {path: '', component: ShowAllStoreSettingsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StoreSettingsRoutingModule { }

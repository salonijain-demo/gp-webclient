import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GeneralPreferenceComponent } from './general-preference/general-preference.component';
import { ScanPackOptionsComponent } from './scan-pack-options/scan-pack-options.component';
import { PaymentMethodComponent } from '../account-settings/payment-method/payment-method.component';

const routes: Routes = [
  {path: '', redirectTo: 'general', pathMatch: 'full'},
  {path: 'general', component: GeneralPreferenceComponent},
  {path: 'scan_pack', component: ScanPackOptionsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SystemSettingsRoutingModule { }

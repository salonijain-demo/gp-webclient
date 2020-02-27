import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PaymentMethodComponent } from './payment-method/payment-method.component';
import { ModifyPlanComponent } from './modify-plan/modify-plan.component';
import { CostCalculatorComponent } from './cost-calculator/cost-calculator.component';

const routes: Routes = [
  {path: '', redirectTo: 'card_details', pathMatch: 'full'},
  {path: 'card_details', component: PaymentMethodComponent},
  {path: 'modify_plan', component: ModifyPlanComponent},
  {path: 'cost_calculator', component: CostCalculatorComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountSettingsRoutingModule { }

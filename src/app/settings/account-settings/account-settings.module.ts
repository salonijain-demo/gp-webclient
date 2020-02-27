import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountSettingsRoutingModule } from './account-settings-routing.module';
import { PaymentMethodComponent } from './payment-method/payment-method.component';
import { ModifyPlanComponent } from './modify-plan/modify-plan.component';
import { CostCalculatorComponent } from './cost-calculator/cost-calculator.component';
import { FormsModule } from '@angular/forms';
import { SharedSideBarModule } from 'src/app/shared-side-bar/shared-side-bar.module';

@NgModule({
  declarations: [
    PaymentMethodComponent,
    ModifyPlanComponent,
    CostCalculatorComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    AccountSettingsRoutingModule,
    SharedSideBarModule
  ],
  exports: [PaymentMethodComponent]
})
export class AccountSettingsModule { }

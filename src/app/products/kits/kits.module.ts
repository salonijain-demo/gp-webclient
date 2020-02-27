import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { KitsRoutingModule } from './kits-routing.module';
import { ShowAllKitsComponent } from './show-all-kits/show-all-kits.component';
import { ActiveKitsComponent } from './active-kits/active-kits.component';
import { InactiveKitsComponent } from './inactive-kits/inactive-kits.component';
import { NewKitsComponent } from './new-kits/new-kits.component';

@NgModule({
  declarations: [ShowAllKitsComponent, ActiveKitsComponent, InactiveKitsComponent, NewKitsComponent],
  imports: [
    CommonModule,
    KitsRoutingModule
  ]
})
export class KitsModule { }

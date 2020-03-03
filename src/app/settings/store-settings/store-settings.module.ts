import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreSettingsRoutingModule } from './store-settings-routing.module';
import { SharedSideBarModule } from 'src/app/shared-side-bar/shared-side-bar.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    SharedSideBarModule,
    StoreSettingsRoutingModule
  ]
})
export class StoreSettingsModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SystemSettingsRoutingModule } from './system-settings-routing.module';
import { FormsModule } from '@angular/forms';
import { SharedSideBarModule } from 'src/app/shared-side-bar/shared-side-bar.module';

@NgModule({
  declarations: [],
  imports: [
    FormsModule,
    CommonModule,
    SystemSettingsRoutingModule,
    SharedSideBarModule
  ],
  exports: []
})
export class SystemSettingsModule { }

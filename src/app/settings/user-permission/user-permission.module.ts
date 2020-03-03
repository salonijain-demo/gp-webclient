import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserPermissionRoutingModule } from './user-permission-routing.module';
import { SharedSideBarModule } from 'src/app/shared-side-bar/shared-side-bar.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    UserPermissionRoutingModule,
    SharedSideBarModule
  ]
})
export class UserPermissionModule { }

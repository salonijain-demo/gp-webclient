import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserPermissionRoutingModule } from './user-permission-routing.module';
import { CreateUserPermissionComponent } from './create-user-permission/create-user-permission.component';
import { ShowAllUserPermissionComponent } from './show-all-user-permission/show-all-user-permission.component';
import { UserInfoSettingComponent } from './create-user-permission/user-info-setting/user-info-setting.component';
import { ProductUserSettingComponent } from './create-user-permission/product-user-setting/product-user-setting.component';
import { OrderUserSettingComponent } from './create-user-permission/order-user-setting/order-user-setting.component';
import { UserCreateSettingComponent } from './create-user-permission/user-create-setting/user-create-setting.component';
import { SystemUserSettingComponent } from './create-user-permission/system-user-setting/system-user-setting.component';

@NgModule({
  declarations: [
    CreateUserPermissionComponent,
    ShowAllUserPermissionComponent,
    UserInfoSettingComponent,
    ProductUserSettingComponent,
    OrderUserSettingComponent,
    UserCreateSettingComponent,
    SystemUserSettingComponent
  ],
  imports: [
    CommonModule,
    UserPermissionRoutingModule
  ]
})
export class UserPermissionModule { }

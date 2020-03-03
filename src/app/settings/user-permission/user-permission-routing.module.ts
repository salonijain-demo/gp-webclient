import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ShowAllUserPermissionComponent } from './show-all-user-permission/show-all-user-permission.component';

const routes: Routes = [
  {path: '', component: ShowAllUserPermissionComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserPermissionRoutingModule { }

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ActiveKitsComponent } from './active-kits/active-kits.component';
import { InactiveKitsComponent } from './inactive-kits/inactive-kits.component';
import { NewKitsComponent } from './new-kits/new-kits.component';
import { ShowAllKitsComponent } from './show-all-kits/show-all-kits.component';

const routes: Routes = [
  {path: '',redirectTo:'active',pathMatch: 'full'},
  // children: [
    {path: 'active', component: ActiveKitsComponent},
    {path: 'inactive', component: InactiveKitsComponent},
    {path: 'new', component: NewKitsComponent},
    {path: 'all', component: ShowAllKitsComponent}
  // ]
// }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class KitsRoutingModule { }

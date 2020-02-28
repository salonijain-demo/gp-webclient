import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ScanPackDashboardComponent } from './scan-pack-dashboard/scan-pack-dashboard.component';
import { ScanPackListComponent } from './scan-pack-list/scan-pack-list.component';
import { ScanPackProductEditComponent } from './scan-pack-product-edit/scan-pack-product-edit.component';

const routes: Routes = [
  {path: '', redirectTo: 'scanpack.rfo', pathMatch: 'full'},
  {path: 'scanpack.rfo', component: ScanPackDashboardComponent},
  // {path: 'scanpack.rfp', component: },
  {path: 'scanpack.rfp.default/:name', component: ScanPackListComponent},
  {path: 'scanpack.rfp.product_edit/:name', component: ScanPackProductEditComponent},
  // {path: 'scanpack.rfp.recording', component: },
  // {path: 'scanpack.rfp.verifying', component: },
  // {path: 'scanpack.rfp.no_tracking_info', component: },
  // {path: 'scanpack.rfp.no_match', component: },
  // {path: 'scanpack.rfp.product_edit', component: },
  // {path: 'scanpack.rfp.product_edit.single', component: },
  // {path: 'scanpack.rfp.confirmation', component: },
  // {path: 'scanpack.rfp.confirmation.order_edit', component: }
  // {path: 'scanpack.rfp.confirmation.product_edit', component: }
  // {path: 'scanpack.rfp.confirmation.cos', component: }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ScanPackHeaderRoutingModule { }


// .state('scanpack.rfo', {url: '', templateUrl: '/assets/views/scanpack/multi.html', controller: 'scanPackRfoCtrl'})
//     .state('scanpack.rfp', {
//       url: '/rfp/:order_num/:username/:store_order_id', templateUrl: "/assets/views/scanpack/rfpbase.html", controller: 'scanPackRfpCtrl',
//       abstract: true
//     })
//     .state('scanpack.rfp.default', {
//       url: '', controller: 'scanPackRfpDefaultCtrl',
//       templateUrl: '/assets/views/scanpack/rfpdefault.html'
//     })
//     .state('scanpack.rfp.recording', {
//       url: '/recording', templateUrl: '/assets/views/scanpack/multi.html',
//       controller: 'scanPackRecordingCtrl'
//     })
//     .state('scanpack.rfp.verifying', {
//       url: '/verifying', templateUrl: '/assets/views/scanpack/multi.html',
//       controller: 'scanPackRecordingCtrl'
//     })
//     .state('scanpack.rfp.no_tracking_info', {
//       url: '/no_tracking_info', templateUrl: '/assets/views/scanpack/multi.html',
//       controller: 'scanPackRecordingCtrl'
//     })
//     .state('scanpack.rfp.no_match', {
//       url: '/no_match', templateUrl: '/assets/views/scanpack/multi.html',
//       controller: 'scanPackRecordingCtrl'
//     })
//     .state('scanpack.rfp.product_edit', {
//       url: '/product_edit', templateUrl: '/assets/views/scanpack/productedit.html',
//       controller: 'scanPackProductEditCtrl'
//     })
//     .state('scanpack.rfp.product_edit.single', {
//       url: '/{product_id:[0-9]+}',
//       template: '',
//       controller: 'productsSingleCtrl'
//     })
//     .state('scanpack.rfp.confirmation', {
//       url: '/confirmation', controller: 'scanPackConfCtrl',
//       templateUrl: '/assets/views/scanpack/multi.html', abstract: true
//     })
//     .state('scanpack.rfp.confirmation.order_edit', {url: '/order_edit'})
//     .state('scanpack.rfp.confirmation.product_edit', {url: '/product_edit'})
//     .state('scanpack.rfp.confirmation.cos', {url: '/cos'})
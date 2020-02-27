import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GeneralPreferenceComponent } from '../settings/system-settings/general-preference/general-preference.component';
import { ScanPackOptionsComponent } from '../settings/system-settings/scan-pack-options/scan-pack-options.component';
import { NgbTimepickerModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { FormsModule } from '@angular/forms';
import { PaymentMethodComponent } from '../settings/account-settings/payment-method/payment-method.component';
import { ModifyPlanComponent } from '../settings/account-settings/modify-plan/modify-plan.component';
import { CostCalculatorComponent } from '../settings/account-settings/cost-calculator/cost-calculator.component';
import { BackupRestoreComponent } from '../settings/backup-export/backup-restore/backup-restore.component';
import { DailyPackedReportComponent } from '../settings/backup-export/daily-packed-report/daily-packed-report.component';
import { ExceptionsExportComponent } from '../settings/backup-export/exceptions-export/exceptions-export.component';
import { OrderExportComponent } from '../settings/backup-export/order-export/order-export.component';
import { UserStatsExportComponent } from '../settings/backup-export/user-stats-export/user-stats-export.component';
import { ShowAllStoreSettingsComponent } from '../settings/store-settings/show-all-store-settings/show-all-store-settings.component';
import { CreateStoreSettingsComponent } from '../settings/store-settings/create-store-settings/create-store-settings.component';
import { ShowAllUserPermissionComponent } from '../settings/user-permission/show-all-user-permission/show-all-user-permission.component';
import { CreateUserPermissionComponent } from '../settings/user-permission/create-user-permission/create-user-permission.component';
import { GridModule } from '@syncfusion/ej2-angular-grids';
import { DataGridTableModule } from '../data-grid-table/data-grid-table.module';
import { CreateProductComponent } from '../products/product-child/create-product/create-product.component';
import { ShowAllProductComponent } from '../products/product-child/show-all-product/show-all-product.component';
import { ActiveProductComponent } from '../products/product-child/active-product/active-product.component';
import { InactiveProductComponent } from '../products/product-child/inactive-product/inactive-product.component';
import { NewProductComponent } from '../products/product-child/new-product/new-product.component';
import { ShowAllKitsComponent } from '../products/kits/show-all-kits/show-all-kits.component';
import { ActiveKitsComponent } from '../products/kits/active-kits/active-kits.component';
import { InactiveKitsComponent } from '../products/kits/inactive-kits/inactive-kits.component';
import { NewKitsComponent } from '../products/kits/new-kits/new-kits.component';
import { InventoryReportComponent } from '../products/inventory/inventory-report/inventory-report.component';
import { MatTabsModule} from '@angular/material';
import { MatDatepickerModule} from '@angular/material/datepicker';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ReceiveRecountInventoryComponent } from '../products/inventory/receive-recount-inventory/receive-recount-inventory.component';
import { CKEditorModule } from 'ng2-ckeditor';
import { SliderModule } from '@syncfusion/ej2-angular-inputs';
import { Ng5SliderModule } from 'ng5-slider';
import { BaseComponent } from '../base/base.component';
import { UserInfoSettingComponent } from '../settings/user-permission/create-user-permission/user-info-setting/user-info-setting.component';
import { ProductUserSettingComponent } from '../settings/user-permission/create-user-permission/product-user-setting/product-user-setting.component';
import { OrderUserSettingComponent } from '../settings/user-permission/create-user-permission/order-user-setting/order-user-setting.component';
import { UserCreateSettingComponent } from '../settings/user-permission/create-user-permission/user-create-setting/user-create-setting.component';
import { SystemUserSettingComponent } from '../settings/user-permission/create-user-permission/system-user-setting/system-user-setting.component';
import { ActivityLogProductComponent } from '../products/product-child/create-product/activity-log-product/activity-log-product.component';
import { InventoryKitProductComponent } from '../products/product-child/create-product/inventory-kit-product/inventory-kit-product.component';
import { ScanPackCreateProductComponent } from '../products/product-child/create-product/scan-pack-create-product/scan-pack-create-product.component';
import { ProductInfoCreateComponent } from '../products/product-child/create-product/product-info-create/product-info-create.component';
import { AmazonSettingComponent } from '../settings/store-settings/create-store-settings/amazon-setting/amazon-setting.component';
import { MagentoSoapSettingComponent } from '../settings/store-settings/create-store-settings/magento-soap-setting/magento-soap-setting.component';
import { MagentoRestSettingComponent } from '../settings/store-settings/create-store-settings/magento-rest-setting/magento-rest-setting.component';
import { EbaySettingComponent } from '../settings/store-settings/create-store-settings/ebay-setting/ebay-setting.component';
import { CsvSettingComponent } from '../settings/store-settings/create-store-settings/csv-setting/csv-setting.component';
import { ShipstationApiSettingComponent } from '../settings/store-settings/create-store-settings/shipstation-api-setting/shipstation-api-setting.component';
import { ShipworkSettingComponent } from '../settings/store-settings/create-store-settings/shipwork-setting/shipwork-setting.component';
import { ShopifySettingComponent } from '../settings/store-settings/create-store-settings/shopify-setting/shopify-setting.component';
import { BigcommerceSettingComponent } from '../settings/store-settings/create-store-settings/bigcommerce-setting/bigcommerce-setting.component';
import { ShippingEasySettingComponent } from '../settings/store-settings/create-store-settings/shipping-easy-setting/shipping-easy-setting.component';
import { TeapplixSettingComponent } from '../settings/store-settings/create-store-settings/teapplix-setting/teapplix-setting.component';
import { ShowProductsComponent } from '../products/show-products/show-products.component';
import { NotifierModule } from "angular-notifier";
import { CreateOrderComponent } from '../orders/order-dashboard/create-order/create-order.component';
import { InformationOrderComponent } from '../orders/order-dashboard/create-order/information-order/information-order.component';
import { ActivitiesOrderComponent } from '../orders/order-dashboard/create-order/activities-order/activities-order.component';
import { NotesOrderComponent } from '../orders/order-dashboard/create-order/notes-order/notes-order.component';
import { ItemsOrderComponent } from '../orders/order-dashboard/create-order/items-order/items-order.component';
import { MultiBoxOrderComponent } from '../orders/order-dashboard/create-order/multi-box-order/multi-box-order.component';
import { AddItemComponent } from '../products/add-item/add-item.component';
import { DataGridComponent } from '../data-grid-table/data-grid/data-grid.component';

@NgModule({
  declarations: [
    ShowAllStoreSettingsComponent,
    CreateStoreSettingsComponent,
    ShowAllUserPermissionComponent,
    CreateUserPermissionComponent,
    GeneralPreferenceComponent,
    ScanPackOptionsComponent,
    BackupRestoreComponent,
    DailyPackedReportComponent,
    ExceptionsExportComponent,
    OrderExportComponent,
    UserStatsExportComponent,
    PaymentMethodComponent,
    ModifyPlanComponent,
    CostCalculatorComponent,
    CreateProductComponent,
    ShowAllProductComponent,
    ActiveProductComponent,
    InactiveProductComponent,
    NewProductComponent,
    ShowAllKitsComponent,
    ActiveKitsComponent,
    InactiveKitsComponent,
    NewKitsComponent,
    ReceiveRecountInventoryComponent,
    InventoryReportComponent,
    BaseComponent,
    UserInfoSettingComponent,
    ProductUserSettingComponent,
    OrderUserSettingComponent,
    UserCreateSettingComponent,
    SystemUserSettingComponent,
    ProductInfoCreateComponent,
    ScanPackCreateProductComponent,
    InventoryKitProductComponent,
    ActivityLogProductComponent,
    AmazonSettingComponent,
    MagentoSoapSettingComponent,
    MagentoRestSettingComponent,
    EbaySettingComponent,
    CsvSettingComponent,
    ShipstationApiSettingComponent,
    ShipworkSettingComponent,
    ShopifySettingComponent,
    BigcommerceSettingComponent,
    ShippingEasySettingComponent,
    TeapplixSettingComponent,
    ShowProductsComponent,
    CreateOrderComponent,
    ItemsOrderComponent,
    NotesOrderComponent,
    ActivitiesOrderComponent,
    InformationOrderComponent,
    MultiBoxOrderComponent,
    AddItemComponent,
    DataGridComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgxMaterialTimepickerModule,
    NgbModule,
    GridModule,
    MatTabsModule,
    NgbTimepickerModule,
    // DataGridTableModule,
    CKEditorModule,
    SliderModule,
    Ng5SliderModule,
    MatTooltipModule,
    MatDatepickerModule,
    NotifierModule
  ],
  exports: [
    ShowAllStoreSettingsComponent,
    CreateStoreSettingsComponent,
    ShowAllUserPermissionComponent,
    CreateUserPermissionComponent,
    GeneralPreferenceComponent,
    ScanPackOptionsComponent,
    BackupRestoreComponent,
    DailyPackedReportComponent,
    ExceptionsExportComponent,
    OrderExportComponent,
    UserStatsExportComponent,
    PaymentMethodComponent,
    ModifyPlanComponent,
    CostCalculatorComponent,
    CreateProductComponent,
    ShowAllProductComponent,
    ActiveProductComponent,
    InactiveProductComponent,
    NewProductComponent,
    ShowAllKitsComponent,
    ActiveKitsComponent,
    InactiveKitsComponent,
    NewKitsComponent,
    ReceiveRecountInventoryComponent,
    InventoryReportComponent,
    BaseComponent,
    UserInfoSettingComponent,
    ProductUserSettingComponent,
    OrderUserSettingComponent,
    UserCreateSettingComponent,
    SystemUserSettingComponent,
    ProductInfoCreateComponent,
    ScanPackCreateProductComponent,
    InventoryKitProductComponent,
    ActivityLogProductComponent,
    AmazonSettingComponent,
    MagentoSoapSettingComponent,
    MagentoRestSettingComponent,
    EbaySettingComponent,
    CsvSettingComponent,
    ShipstationApiSettingComponent,
    ShipworkSettingComponent,
    ShopifySettingComponent,
    BigcommerceSettingComponent,
    ShippingEasySettingComponent,
    TeapplixSettingComponent,
    ShowProductsComponent,
    CreateOrderComponent,
    ItemsOrderComponent,
    NotesOrderComponent,
    ActivitiesOrderComponent,
    InformationOrderComponent,
    MultiBoxOrderComponent,
    AddItemComponent,
    DataGridComponent
],
  entryComponents: [ReceiveRecountInventoryComponent]
})
export class SharedSideBarModule { }

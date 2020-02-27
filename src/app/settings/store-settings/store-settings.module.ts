import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreSettingsRoutingModule } from './store-settings-routing.module';
import { ShowAllStoreSettingsComponent } from './show-all-store-settings/show-all-store-settings.component';
import { CreateStoreSettingsComponent } from './create-store-settings/create-store-settings.component';
import { AmazonSettingComponent } from './create-store-settings/amazon-setting/amazon-setting.component';
import { MagentoSoapSettingComponent } from './create-store-settings/magento-soap-setting/magento-soap-setting.component';
import { MagentoRestSettingComponent } from './create-store-settings/magento-rest-setting/magento-rest-setting.component';
import { EbaySettingComponent } from './create-store-settings/ebay-setting/ebay-setting.component';
import { CsvSettingComponent } from './create-store-settings/csv-setting/csv-setting.component';
import { ShipworkSettingComponent } from './create-store-settings/shipwork-setting/shipwork-setting.component';
import { ShipstationApiSettingComponent } from './create-store-settings/shipstation-api-setting/shipstation-api-setting.component';
import { ShopifySettingComponent } from './create-store-settings/shopify-setting/shopify-setting.component';
import { TeapplixSettingComponent } from './create-store-settings/teapplix-setting/teapplix-setting.component';
import { ShippingEasySettingComponent } from './create-store-settings/shipping-easy-setting/shipping-easy-setting.component';
import { BigcommerceSettingComponent } from './create-store-settings/bigcommerce-setting/bigcommerce-setting.component';

@NgModule({
  declarations: [ShowAllStoreSettingsComponent, CreateStoreSettingsComponent, AmazonSettingComponent, MagentoSoapSettingComponent, MagentoRestSettingComponent, EbaySettingComponent, CsvSettingComponent, ShipworkSettingComponent, ShipstationApiSettingComponent, ShopifySettingComponent, TeapplixSettingComponent, ShippingEasySettingComponent, BigcommerceSettingComponent],
  imports: [
    CommonModule,
    StoreSettingsRoutingModule
  ]
})
export class StoreSettingsModule { }

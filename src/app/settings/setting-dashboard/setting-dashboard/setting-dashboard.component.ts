import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Translations } from 'src/app/interfaces/settings';
import { NgbModalOptions, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-setting-dashboard',
  templateUrl: './setting-dashboard.component.html',
  styleUrls: ['./setting-dashboard.component.scss']
})
export class SettingDashboardComponent implements OnInit {

  storeSettingsDropdown: boolean;
  settingsUserPermission: boolean;
  systemSettingsDropdown: boolean;
  backupExportDropdown: boolean;
  accountSettingsDropdown: boolean;
  general:boolean;
  scan:boolean;
  payment: boolean;
  modify: boolean;
  cost: boolean;
  restore: boolean;
  exception: boolean;
  order: boolean;
  userStats: boolean;
  dailyPacked: boolean;
  showAllSetting:boolean;
  showAllUser:boolean;
  modalReference:any;
  modalOptions: NgbModalOptions = {
    windowClass: 'in',
    backdrop: 'static',
    keyboard: false
  };

  public translations: Translations = {
    headings: {
      inventory: '',
      conf_notif: '',
      printing_option: '',
      multi_box_option: '',
      per_box_packing_slip: '',
      miscellaneous_settings: '',
      flash_setting: '',
      time_zone: '',
      adjust_for_daylight: '',
      order_item_export: '',
      order_tracking_no_order: '',
      order_tracking_no_tracking: '',
      product_weight: '',
      simple_product: '',
      pre_day_order: '',
      pre_day_import: '',
      import_orders: '',
      recurring_ftp: ''
    },
    labels: {
      inventory_tracking: '',
      low_inventory_alert_email: '',
      time_to_send_email: '',
      send_email_on: '',
      mon: '',
      tue: '',
      wed: '',
      thu: '',
      fri: '',
      sat: '',
      sun: '',
      strict_cc: '',
      conf_code_product_instruction: '',
      default_low_inventory_alert_limit: '',
      conf_req_on_notes_to_packer: '',
      send_email_for_packer_notes: '',
      email_address: '',
      system_notifications: 'System Notifications',
      billing_notifications: 'Billing Notifications',
      packing_slip_size: '',
      packing_slip_orientation: '',
      portrait: '',
      landscape: '',
      packing_slip_message_to_customer: '',
      show_primary_bin_loc_in_barcodeslip: '',
      inventory_auto_allocation: '',
      custom_field_one: 'Custom Field One',
      custom_field_two: 'Custom Field Two',
      html_print: '',
      inactive_logout_time: '',
      hex_barcode: '',
      multi_box_shipment: '',
      custom_user_field_one: 'Custom User Field One',
      custom_user_field_two: 'Custom User Field Two',
      display_kit_parts: 'Display Kit Parts on Packing Slips',
      remove_order_items: 'Remove order items with quantity of 0',
      print_when_order_complete: 'Print when the order is complete',
      print_when_new_box: 'Print when new boxes are started',
      manually_print: 'Are printed manually',
      display_sku_total: 'Display sku total order by order',
      display_one_total: 'Display one total for each sku'
    },
    tooltips: {
      inventory_tracking: '',
      low_inventory_alert_email: '',
      default_low_inventory_alert_limit: '',
      conf_req_on_notes_to_packer: '',
      strict_cc: '',
      conf_code_product_instruction: '',
      send_email_for_packer_notes: '',
      packing_slip_size: '',
      packing_slip_message_to_customer: '',
      show_primary_bin_loc_in_barcodeslip: '',
      order_item_export_message: '',
      simple_product_scanning: '',
      html_print: '',
      inactive_logout_time: '',
      hex_barcode: '',
      multi_box_shipment: '',
      custom_fields: '',
      pre_day_order_import_schedule: '',
      recurring_ftp_order_import_range: '',
      display_kit_parts: '',
      remove_order_items: ''
    }
  };

  constructor(
    private router: Router,
    private modalService: NgbModal
  ) { }

  ngOnInit() {
    this.storeSettingsDropdown = true;
    this.settingsUserPermission = false;
    this.systemSettingsDropdown = false;
    this.backupExportDropdown = false;
    this.accountSettingsDropdown = false;
    // this.storeSetting(this.storeSettingsDropdown)
  }

  dropdownList(storeSettingsDropdown, settingsUserPermission, systemSettingsDropdown,
    backupExportDropdown,accountSettingsDropdown)
  {
    if(!storeSettingsDropdown){
      this.storeSettingsDropdown = false
      // this.storeSetting(this.storeSettingsDropdown)
    }
    if(!settingsUserPermission){
      this.settingsUserPermission = false
      // this.userPermission(settingsUserPermission)
    }
    if(!systemSettingsDropdown){
      this.systemSettingsDropdown = false
      this.systemList(systemSettingsDropdown, false)
    }
    if(!backupExportDropdown){
      this.backupExportDropdown = false
      this.backupList(backupExportDropdown,false,false,false,false)
    }
    if(!accountSettingsDropdown){
      this.accountSettingsDropdown = false
      this.accountList(accountSettingsDropdown, false, false)
    }
    if(storeSettingsDropdown){
      this.storeSettingsDropdown = !this.storeSettingsDropdown
    }
    if(settingsUserPermission){
      this.settingsUserPermission = !this.settingsUserPermission
      // this.userPermission(settingsUserPermission)
    }
    if(systemSettingsDropdown){
      this.systemSettingsDropdown = !this.systemSettingsDropdown
      this.systemList(systemSettingsDropdown, false)
    }
    if(backupExportDropdown){
      this.backupExportDropdown = !this.backupExportDropdown
      this.backupList(backupExportDropdown,false,false,false,false)
    }
    if(accountSettingsDropdown){
      this.accountSettingsDropdown = !this.accountSettingsDropdown
      this.accountList(accountSettingsDropdown, false, false)
    }
  }

  // storeSetting(showAll){
  //   this.showAllSetting = showAll
  // }

  // userPermission(showAll){
  //   this.showAllUser = showAll
  // }

  systemList(general, scan){
    this.general = general
    this.scan = scan
  }
  
  backupList(restore,exception,order,userStats,dailyPacked){
    this.restore = restore
    this.exception = exception
    this.order = order
    this.userStats = userStats
    this.dailyPacked = dailyPacked
  }

  accountList(payment, modify, cost){
    this.payment = payment
    this.modify = modify
    this.cost = cost
  }

  showModal(content){
    this.openModal(content)
  }

  openModal(content){
    this.modalReference = this.modalService.open(content,this.modalOptions)
  }

  cancel(){
    this.modalReference.close();
  }
}

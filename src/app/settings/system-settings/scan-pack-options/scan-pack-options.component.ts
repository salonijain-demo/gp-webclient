import { Component, OnInit } from '@angular/core';
import { ScanPackSettingService } from 'src/app/services/scan-pack-setting.service';
import { SettingService } from 'src/app/services/setting.service';
import { general_settings } from 'src/app/interfaces/generalSettings';

@Component({
  selector: 'app-scan-pack-options',
  templateUrl: './scan-pack-options.component.html',
  styleUrls: ['./scan-pack-options.component.scss']
})
export class ScanPackOptionsComponent implements OnInit {

  translations = {
    "headings": {
      "options": "",
      "feedback": "",
      "scan_actions": "",
      "scan_actions_sub_head": ""
    },
    "labels": {
      "enable_click_sku": "",
      "ask_tracking_number": "",
      "show_success_image": "",
      "show_order_complete_image": "",
      "show_fail_image": "",
      "for": "",
      "seconds": "",
      "play_success_sound": "",
      "play_fail_sound": "",
      "play_order_complete_sound": "",
      "scan": "",
      "skip_code": "",
      "note_from_packer_code": "",
      "service_issue_code": "",
      "restart_code": "",
      "type_scan_code": "",
      "escape_string": "",
      "lot_number": "",
      "show_customer_notes": "",
      "show_internal_notes": "",
      "cue_orders_for_scanpack": "",
      "intangible_setting": "",
      "intangible_string": "",
      "cue_order_for_scan": "",
      "ask_tracking_number_second": "",
      "simple_product": ""
    },
    "tooltips": {
      "enable_click_sku": "",
      "ask_tracking_number": "",
      "feedback": "",
      "skip_code": "",
      "note_from_packer_code": "",
      "service_issue_code": "",
      "restart_code": "",
      "type_scan_code": "",
      "type_in_counts": "",
      "escape_string": "",
      "record_suffix": "",
      "ask_post_scanning_functions": "",
      "show_internal_notes": "",
      "show_customer_notes": "",
      "cue_orders_optons": "",
      "intangible_setting": "",
      "intangible_setting_gen_barcode_from_sku": "",
      "post_scan_pause": "",
      "string_removal": "",
      "order_verification": "",
      "cue_order_for_scan": "",
      "display_location_on_scanning_page": "",
      "return_to_orders": "",
      "scanning_sequence_tool": "",
      "click_scan_tooltip": "",
      "scanned_barcode_tooltip": "",
      "ask_post_scanning_functions_second": "",
      "require_serial": "",
      "replace_gp_code_tootip": "",
      "simple_product_scanning": ""
    }
  }

  scan_pack =  {
    state: 'none',
    scan_states: {
      // success: get_state(),
      // fail: get_state(),
      // order_complete: get_state()
    },
    settings: {
      post_scanning_option: '',
      post_scanning_option_second: '',
      scanning_sequence: '',
      scan_by_tracking_number: false,
      scan_by_hex_number: false
    }
  }

  general_settings = {
    single: {}
  }

  constructor(
    private scanPackSettingService : ScanPackSettingService,
    private settingService : SettingService
  ) { }

  ngOnInit() {
    // groov_translator.translate('settings.system.scan_pack',this.translations);
    this.get_settings();
    this.get_general_setting();
  }
 
  get_settings(){
    this.scanPackSettingService.get_settings(this.scan_pack).subscribe((response:any)=>
      {
        if (response.status) {
          this.scan_pack.settings = response.settings;
        } else {
          // notification.notify(data.error_messages, 0);
        }
      },error=>{
        // notification.server_error
      })
  }
  get_general_setting(){
    this.settingService.get_setting(this.general_settings)
  }

  change_post_scanning_opt(value){
    this.scan_pack.settings.post_scanning_option = value;
    this.update_settings();
  }

  change_post_scanning_opt_second(value) {
    this.scan_pack.settings.post_scanning_option_second = value;
    this.update_settings();
  };

  change_scanning_seq_opt(value) {
    this.scan_pack.settings.scanning_sequence = value;
    this.update_settings();
  };

  change_pre_scanning_opt(value) {
    if (value=="tracking"){
      this.scan_pack.settings.scan_by_tracking_number = true;
      this.scan_pack.settings.scan_by_hex_number = false;  
    } else if(value=="hex") {
      this.scan_pack.settings.scan_by_tracking_number = false;
      this.scan_pack.settings.scan_by_hex_number = true;
    }else{
      this.scan_pack.settings.scan_by_tracking_number = false;
      this.scan_pack.settings.scan_by_hex_number = false;
    }
    this.update_settings();
  };

  update_general_settings() {
    this.settingService.update_settings(general_settings)
  }

  update_product_intangibleness() {
    this.scanPackSettingService.update_intagibleness(this.scan_pack).subscribe(response=>{
      this.update_settings();
    })
  }

  update_settings() {
    this.scanPackSettingService.update_settings(this.scan_pack)
  }
}

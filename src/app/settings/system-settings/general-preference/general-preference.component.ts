import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { confirmation_hash, general_settings } from 'src/app/interfaces/generalSettings';
import { GeneralSettingsService } from 'src/app/services/general-settings.service';
import { SettingService } from 'src/app/services/setting.service';
import { Options } from 'ng5-slider';

@Component({
  selector: 'app-general-preference',
  templateUrl: './general-preference.component.html',
  styleUrls: ['./general-preference.component.scss']
})
export class GeneralPreferenceComponent implements OnInit {

  marked = false;
  theCheckbox = false;
  time = {
    hour: 13,
    minute: 30
  }

  exportItems: string;
  scheduleImportMode: string;
  confReqOnNotesToPacker: string;
  sendEmailForPackerNotes: string;
  confCodeProductInstruction: string;
  perBoxPackingSlips: string;
  toggleButton: boolean;
  custom_fields = [];
  ready_for_auto_complete: boolean;
  current_page: string;
  show_button = true;
  private confirmation_hash: confirmation_hash = {
    inventory_tracking: false
  };

  private general_settings: general_settings = {
    single: {
      flash: '',
      is_multi_box: false,
      api_call: false,
      allow_rts: false,
      groovelytic_stat: false,
      product_activity: true,
      custom_product_fields: false,
      time_zones: {},
      current_time: '',
      scheduled_import_toggle: false,
      to_import: '',
      from_import: '',
      time_to_import_orders: '',
      custom_field_one: '',
      custom_field_two: '',
      time_to_send_email: '',
      time_zone: '',
      dst: true,
      inventory_tracking: true,
      low_inventory_alert_email: false,
      low_inventory_email_address: ''
    }
  }

  value: number = 40;
  highValue: number = 60;
  options: Options = {
    floor: 0,
    ceil: 12
  };

  constructor(
    private activeRoute: ActivatedRoute,
    private generalSettingsService: GeneralSettingsService,
    private settingService: SettingService
  ) { }

  ngOnInit() {
    this.reload_settings();
    this.get_general_setting();
  }

  low_inventory_alert_email(e) {
    this.general_settings.single.low_inventory_alert_email = e.target.checked
  }

  inventory_tracking(e) {
    this.confirmation_hash.inventory_tracking = e.target.checked;
  }

  change_opt(key, value) {
    this.general_settings.single[key] = value;
    this.update_settings();
  };

  fetch_time_zone() {
    var time_zone = {}
    var time_in_zone = this.general_settings.single.time_zone
    var dst = this.general_settings.single.dst
    var auto_detect = this.general_settings.single.time_zone
    if (time_in_zone == "true" || time_in_zone == "false") {
      time_zone["auto_detect"] = auto_detect
      // time_in_zone = moment().format("Z")
    }
    time_zone["add_time_zone"] = time_in_zone
    time_zone["dst"] = dst
    this.generalSettingsService.add_time_zone(time_zone, this.general_settings).subscribe((response: any) => {
      this.general_settings.single.current_time = response.current_time
    }, error => { });
  };

  confirm_and_update(key) {
    if (key == 'inventory_tracking' && this.confirmation_hash[key] == false) {
      if (confirm("Are you sure? Turning inventory off will remove all inventory warehouse related data, including Quantity On Hand (QOH).")) {
        this.general_settings.single[key] = this.confirmation_hash[key];
      } else {
        this.confirmation_hash[key] = this.general_settings.single[key];
      }
    } else {
      this.general_settings.single[key] = this.confirmation_hash[key];
    }
    this.update_settings();
  };

  update_settings(){
    this.show_button = false;
    this.settingService.update_settings(this.general_settings)
    this.reload_settings();
    this.ready_for_auto_complete = false;
    this.custom_fields = [this.general_settings.single.custom_field_one, this.general_settings.single.custom_field_two];
  }
  
  async reload_settings(){
    await this.get_setting();
    this.confirmation_hash.inventory_tracking = this.general_settings.single.inventory_tracking;
  }

  async get_setting() {
    await this.settingService.get_setting(this.general_settings)
    this.general_settings = this.settingService.system.generalSettings
  }

  get_general_setting() {
    this.get_setting()
    // var flash_exist = this.flash_exist()
    // if (flash_exist == false){
    //   this.general_settings.single.flash = "off"  
    // } else {
    //   this.general_settings.single.flash = "on"  
    // }
    // $scope.general_settings.single.time_zones["time_zones"]["(AUTO DETECT)"] = $scope.general_settings.single.auto_detect
    var from_import = new Date(this.general_settings.single.from_import).getHours();
    var to_import = new Date(this.general_settings.single.to_import).getHours();
    var minutes = new Date(this.general_settings.single.to_import).getMinutes();
    if (to_import == 23 && minutes == 59) {
      to_import = 24;
    }

    //   if(from_import <= to_import){
    //     $scope.slider.min = from_import;
    //     $scope.slider.max = to_import;
    //   }
    //   else{
    //     $scope.slider.min = to_import;
    //     $scope.slider.max = from_import;
    //   }
    // $rootScope.$on('bulk_action_finished', this.reload_settings);
  }

  // flash_exist(){ 
  //   var b=new function(){var n=this;n.c=!1;var a="ShockwaveFlash.ShockwaveFlash",r=[{name:a+".7",version:function(n){return e(n)}},{name:a+".6",version:function(n){var a="6,0,21";try{n.AllowScriptAccess="always",a=e(n)}catch(r){}return a}},{name:a,version:function(n){return e(n)}}],e=function(n){var a=-1;try{a=n.GetVariable("$version")}catch(r){}return a},i=function(n){var a=-1;try{a=new ActiveXObject(n)}catch(r){a={activeXError:!0}}return a};n.b=function(){if(navigator.plugins&&navigator.plugins.length>0){var a="application/x-shockwave-flash",e=navigator.mimeTypes;e&&e[a]&&e[a].enabledPlugin&&e[a].enabledPlugin.description&&(n.c=!0)}else if(-1==navigator.appVersion.indexOf("Mac")&&window.execScript)for(var t=-1,c=0;c<r.length&&-1==t;c++){var o=i(r[c].name);o.activeXError||(n.c=!0)}}()};  
  //   return b.c;
  // }

  // setup_page(page, current) {
  //   for (var i = 0; i < $scope.tabs.length; i++) {
  //     if (page == $scope.tabs[i].page) {
  //       $scope.tabs[i].open = true;
  //       if (typeof current == 'undefined') {
  //         this.current_page = $scope.tabs[i].page;
  //       } else {
  //         this.current_page = current;
  //       }
  //     } else {
  //       $scope.tabs[i].open = false;
  //     }
  //   }
  // };

}


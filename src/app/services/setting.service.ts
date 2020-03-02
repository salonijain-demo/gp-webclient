import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import{ environment } from 'src/environments/environment'

@Injectable({
  providedIn: 'root'
})
export class SettingService {
  
  system:any;
  exportItems: string;
  scheduleImportMode: string;
  confReqOnNotesToPacker: string;
  sendEmailForPackerNotes: string;
  confCodeProductInstruction: string;
  perBoxPackingSlips:string;

  private generalSettings = {
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
      low_inventory_alert_email: false
    }
  };

  constructor(
    private http: HttpClient
  ) { }

  async get_setting(setting){
    // time_in_zone = moment().format("Z");
    var url = environment.baseUrl + '/settings/get_settings.json';
    await this.http.get<any>(url).toPromise().then((response:any) =>
    {
      if (response.status) {
        this.scheduleImportMode = response.data.settings.schedule_import_mode
        this.exportItems = response.data.settings.export_items
        this.sendEmailForPackerNotes = response.data.settings.send_email_for_packer_notes
        this.confCodeProductInstruction = response.data.settings.conf_code_product_instruction
        this.confReqOnNotesToPacker = response.data.settings.conf_req_on_notes_to_packer
        this.perBoxPackingSlips = response.data.settings.per_box_packing_slips
        this.generalSettings.single = response.data.settings;
        this.generalSettings.single.is_multi_box = response.is_multi_box
        this.generalSettings.single.api_call = response.api_call
        this.generalSettings.single.allow_rts = response.allow_rts
        this.generalSettings.single.groovelytic_stat = response.groovelytic_stat
        this.generalSettings.single.product_activity = response.product_activity
        this.generalSettings.single.custom_product_fields = response.custom_product_fields
        // this.generalSettings.single.email_address_for_billing_notification = response.email_address_for_billing_notification;
        this.generalSettings.single.time_zones = response.time_zone
        this.generalSettings.single.current_time = response.current_time
        response.data.settings.time_to_send_email = response.data.settings.time_to_send_email.replace("T", " ").replace("Z", "");
        // try {
        //   response.data.settings.time_to_import_orders = this.generalSettings.single.time_to_import_orders.replace("T", " ").replace("Z", "");
        // } catch (e) {
        //   response.data.settings.time_to_import_orders = new Date(this.generalSettings.single.time_to_import_orders).toString().split("GMT")[0];
        // }
        // try {
        //   response.data.settings.to_import = this.generalSettings.single.to_import.replace("T", " ").replace("Z", "");
        // } catch (e) {
        //   response.data.settings.to_import = this.generalSettings.single.to_import.toString().split("GMT")[0];
        // }
        // try {
        //   response.data.settings.from_import = this.generalSettings.single.from_import.replace("T", " ").replace("Z", "");
        // } catch (e) {
        //   response.data.settings.from_import = this.generalSettings.single.from_import.toString().split("GMT")[0];
        // }
        this.generalSettings.single.scheduled_import_toggle = response.scheduled_import_toggle
        // settings.single.time_to_send_email = new Date(data.data.settings.time_to_send_email);
        if (response.is_active == true) {
          // this.setIdleTimeout(response.data.settings.idle_timeout);
        } else {
          // this.logoutuser();
        }

        // if(data.user_sign_in_count<2 && data.data.settings.time_zone == null) {
        // time_zone = {}
        // time_zone["add_time_zone"] = time_in_zone;
        // time_zone["auto_detect"] = "true";
        // add_time_zone(time_zone);
        // }
        // } else {
        // notification.notify(data.error_messages, 0);
      }
      return this.system={
        status: response.status,
        generalSettings: this.generalSettings,
        exportItems: this.exportItems,
        scheduleImportMode: this.scheduleImportMode,
        confReqOnNotesToPacker: this.confReqOnNotesToPacker,
        sendEmailForPackerNotes: this.sendEmailForPackerNotes,
        confCodeProductInstruction: this.confCodeProductInstruction,
        perBoxPackingSlips: this.perBoxPackingSlips,
      }
    }).catch(error=>{return error;})
  }

  update_settings(settings) {
    // this.general_settings.single.low_inventory_alert_email = ev.target.checked
    this.fix_times(this.generalSettings);
    this.generalSettings.single.time_to_import_orders = this.generalSettings.single.time_to_import_orders.toString().split("GMT")[0];
    // try {
    //   this.general_settings.single.to_import = this.general_settings.single.to_import.replace("T", " ").replace("Z", "");
    // } catch (e) {
    //   this.general_settings.single.to_import = this.general_settings.single.to_import.toString().split("GMT")[0];
    // }
    // try {
    //   this.general_settings.single.from_import = this.general_settings.single.from_import.toString().split("GMT")[0];
    // } catch (e) {
    //   this.general_settings.single.from_import = this.general_settings.single.from_import.replace("T", " ").replace("Z", "");
    // }
    this.generalSettings.single.time_to_send_email = this.generalSettings.single.time_to_send_email.toString().split("GMT")[0];
    var url = environment.baseUrl + '/settings/update_settings.json';
    this.http.put(url, settings.single).subscribe((response: any) => {
      if (response.status) {
        this.get_setting(this.generalSettings);
        // notification.notify(response.success_messages, 1);
      } else {
        // notification.notify(data.error_messages, 0);
      }
    }, error => {
      // notification.server_error
    });
    return this.generalSettings
  }

  fix_times(settings) {
    var today = null;
    var all = ['time_to_import_orders', 'time_to_send_email'];
    var config_date = null;
    for (var i = 0; i < all.length; i++) {
      config_date = new Date(settings.single[all[i]]);
      today = new Date();
      today.setHours(config_date.getHours());
      today.setMinutes(config_date.getMinutes());
      today.setSeconds(0);
      settings.single[all[i]] = today;
    }

  }
}

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BackupExportService {

  url = "http://mydev.localpackerapi.com";
  access_token =  localStorage.getItem('access_token');
  
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': "Bearer " + this.access_token
    })
  }

  updateExportSetting={
    current_time: '',
    single: {}
  };
  export_settings = {
    current_time:'',
    single: {
      daily_packed_email: '',
      daily_packed_email_on_mon: false,
      daily_packed_email_on_tue: false,
      daily_packed_email_on_wed: false,
      daily_packed_email_on_thu: false,
      daily_packed_email_on_fri: false,
      daily_packed_email_on_sat: false,
      daily_packed_email_on_sun: false
    }
  }

  constructor(
    private http: HttpClient
  ) { }

  update_export_setting(settings){
    var url = this.url + '/exportsettings/update_export_settings.json';
    this.fix_time(settings);
    settings.single.time_to_send_export_email = settings.single.time_to_send_export_email.toString().split("GMT")[0];
    settings.single.time_to_send_stat_export_email = settings.single.time_to_send_stat_export_email.toString().split("GMT")[0];
    settings.single.time_to_send_daily_packed_export_email = settings.single.time_to_send_daily_packed_export_email.toString().split("GMT")[0];
    
    this.http.put(url, settings.single, this.httpOptions).subscribe( (response:any)=>{
      if (response.status) {
        this.get_export_settings(settings);
        // notification.notify(data.success_messages, 1);
      } else {
        // notification.notify(data.error_messages, 0);
      }
    }, error => {
      // notification.server_error
    })
    this.updateExportSetting = {
      current_time: settings.current_time,
      single: settings.single
    }
    return this.updateExportSetting;
  }

  fix_time(settings){
    var today = null;
    var all = ['time_to_send_export_email', 'time_to_send_stat_export_email','time_to_send_daily_packed_export_email'];
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

  get_export_settings(settings) {
    var url = this.url + '/exportsettings/get_export_settings.json';
    this.http.get(url, this.httpOptions).subscribe((response:any) =>
      {
        if (response.status) {
          this.export_settings.single.daily_packed_email = response.data.settings.daily_packed_email
          this.export_settings.single.daily_packed_email_on_mon = response.data.settings.daily_packed_email_on_mon
          this.export_settings.single.daily_packed_email_on_tue = response.data.settings.daily_packed_email_on_tue
          this.export_settings.single.daily_packed_email_on_wed = response.data.settings.daily_packed_email_on_wed
          this.export_settings.single.daily_packed_email_on_thu = response.data.settings.daily_packed_email_on_thu
          this.export_settings.single.daily_packed_email_on_fri = response.data.settings.daily_packed_email_on_fri
          this.export_settings.single.daily_packed_email_on_sat = response.data.settings.daily_packed_email_on_sat
          this.export_settings.single.daily_packed_email_on_sun = response.data.settings.daily_packed_email_on_sun
          try{
            response.data.settings.time_to_send_export_email = response.data.settings.time_to_send_export_email.replace("T", " ").replace("Z", "");
          }catch(e){
            response.data.settings.time_to_send_export_email = new Date(response.data.settings.time_to_send_export_email).toString().split("GMT")[0];
          }
          try{
            response.data.settings.time_to_send_stat_export_email = response.data.settings.time_to_send_stat_export_email.replace("T", " ").replace("Z", "");
          }catch(e){
            response.data.settings.time_to_send_stat_export_email = new Date(response.data.settings.time_to_send_stat_export_email).toString().split("GMT")[0];
          }
          try{
            response.data.settings.time_to_send_daily_packed_export_email = response.data.settings.time_to_send_daily_packed_export_email.replace("T", " ").replace("Z", "");
          }catch(e){
            response.data.settings.time_to_send_daily_packed_export_email = new Date(response.data.settings.time_to_send_daily_packed_export_email).toString().split("GMT")[0];
          }
          settings.single = response.data.settings;
          // settings.single.time_to_send_export_email = new Date(data.data.settings.time_to_send_export_email);
          
          return this.export_settings;

        } else {
          // notification.notify(data.error_messages, 0);
        }
      }, error => {
        // notification.server_error
      })
  }
}
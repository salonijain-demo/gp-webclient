import { Component, OnInit } from '@angular/core';
import { SettingService } from 'src/app/services/setting.service';
import { general_settings, confirmation_hash } from 'src/app/interfaces/generalSettings';
import { BackupExportService } from 'src/app/services/backup-export.service';

@Component({
  selector: 'app-daily-packed-report',
  templateUrl: './daily-packed-report.component.html',
  styleUrls: ['./daily-packed-report.component.scss']
})
export class DailyPackedReportComponent implements OnInit {

  time = { hour: 13, minute: 30 };
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
  };
  show_button: boolean

  constructor(
    private settingService: SettingService,
    private backupExportService: BackupExportService
  ) { }

  ngOnInit() {
    this.get_export_settings();
    this.get_settings()
  }

  async get_settings(){
    await this.settingService.get_setting(this.general_settings)
    this.general_settings = this.settingService.system.generalSettings
    this.export_settings.current_time = this.general_settings.single.current_time
    this.confirmation_hash.inventory_tracking = this.general_settings.single.inventory_tracking;
  }

  get_export_settings(){
    this.backupExportService.get_export_settings(this.export_settings)
  }

  update_daily_packed_export_settings(){
    this.show_button = false;
    this.update_export();
  }

  update_export(){
    this.backupExportService.update_export_setting(this.export_settings)
  }
}

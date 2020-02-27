import { Component, OnInit } from '@angular/core';
import { BackupExportService } from 'src/app/services/backup-export.service';
import { general_settings } from 'src/app/interfaces/generalSettings';
import { SettingService } from 'src/app/services/setting.service';

@Component({
  selector: 'app-order-export',
  templateUrl: './order-export.component.html',
  styleUrls: ['./order-export.component.scss']
})
export class OrderExportComponent implements OnInit {

  exports = {
    start: {
      open: false,
      time: new Date()
    },
    end: {
      open: false,
      time: new Date()
    }
  }

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
  show_button: boolean;

  constructor(
    private backupExportService: BackupExportService,
    private settingService: SettingService
  ) { }

  ngOnInit() {
    this.get_export_settings();
    this.get_general_setting();
  }

  async get_general_setting(){
    await this.settingService.get_setting(this.general_settings)
    this.general_settings = this.settingService.system.generalSettings
    this.export_settings.current_time = this.general_settings.single.current_time;
  }

  get_export_settings(){
    this.backupExportService.get_export_settings(this.export_settings)
  }

  open_picker(event, object) {
    event.preventDefault();
    event.stopPropagation();
    object.open = true;
  };

  update_export_settings() {
    this.show_button = false;
    this.backupExportService.update_export_setting(this.export_settings)
  };

  change_option = function (key, value) {
    this.export_settings.single[key] = value;
    this.update_export_settings();
  };

  // download_csv = function () {
  //   if (this.export_settings.single.order_export_email == ""){
  //     var notification_modal = $modal.open({
  //       templateUrl: '/assets/views/modals/settings/export_popup.html',
  //       controller: 'exportNotificationCtrl',
  //       size: 'lg',
  //       resolve: {
  //         settings_data: function() {
  //           return $scope.export_settings.single;
  //         }
  //       }
  //     });
  //     notification_modal.result.then(function () {
  //       if ($scope.exports.start.time <= $scope.exports.end.time) {
  //         $http.get($rootScope.api_url +'/exportsettings/order_exports?start=' + $scope.exports.start.time + '&end=' + $scope.exports.end.time);
  //         $scope.notify('export will be emailed to this address.', 1);
  //       } else {
  //         $scope.notify('Start time can not be after End time');
  //       }
  //     });
  //   } else {
  //     if ($scope.exports.start.time <= $scope.exports.end.time) {
  //       // $window.open('/exportsettings/order_exports?start=' + $scope.exports.start.time + '&end=' + $scope.exports.end.time);
  //       $http.get($rootScope.api_url + '/exportsettings/order_exports?start=' + $scope.exports.start.time + '&end=' + $scope.exports.end.time);
  //       $scope.notify('It will be emailed to ' + $scope.export_settings.single.order_export_email, 1);
  //     } else {
  //       $scope.notify('Start time can not be after End time');
  //     }
  //   }
  // };
}

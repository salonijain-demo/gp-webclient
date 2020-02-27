import { Component, OnInit } from '@angular/core';
import { SettingService } from 'src/app/services/setting.service';
import { general_settings } from 'src/app/interfaces/generalSettings';

@Component({
  selector: 'app-backup-restore',
  templateUrl: './backup-restore.component.html',
  styleUrls: ['./backup-restore.component.scss']
})
export class BackupRestoreComponent implements OnInit {

  backup_restore={
    data: {
      method: 'del_import',
      file: null
    },
    settings: {
      single: {}
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

  constructor(
    private settingService: SettingService
  ) { }

  ngOnInit() {
    this.get_setting();
    // $scope.$on("fileSelected", function (event, args) {
    //   if (args.name == "importbackupfile") {
    //     $scope.$apply(function () {
    //       $scope.backup_restore.data.file = args.file;
    //       $("input[type='file']").val('');
    //     });
    //     backup.restore($scope.backup_restore.data).then(function(response){
    //       setTimeout(function(){
    //         myscope.init();
    //       }, 300);
    //     });
    //   }
    // });
  }

  async get_setting(){
    await this.settingService.get_setting(this.general_settings)
  }

  update_export_email() {
    this.settingService.update_settings(this.general_settings)
  };

  // export_csv = function() {
  //   backup.back_up().then(function(){
  //     myscope.init();
  //   });
  // };
}

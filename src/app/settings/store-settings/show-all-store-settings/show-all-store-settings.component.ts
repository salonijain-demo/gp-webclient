import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { StoreSettingService } from 'src/app/services/store-setting.service';

@Component({
  selector: 'app-show-all-store-settings',
  templateUrl: './show-all-store-settings.component.html',
  styleUrls: ['./show-all-store-settings.component.scss']
})
export class ShowAllStoreSettingsComponent implements OnInit {

  settingSelected: any;
  stores = {
    list: [],
    selected: [],
    single: {},
    ebay: {},
    csv: {
      mapping: {},
      maps: {
        order: [],
        product: []
      }
    },
    import: {
      order: {},
      product: {}
    },
    update: {
      products: {}
    },
    types: {},
    current: 0,
    setup: {
      sort: "",
      order: "DESC",
      search: '',
      select_all: false,
      //used for updating only
      status: '',
      storeArray: []
    }
  }
  storesAllow: boolean;
  usersAllow: boolean;
  showAllStoreSettingData: any;
  selectAll:boolean= true;

  constructor(
    private storeSettingService: StoreSettingService
  ) { }

  ngOnInit() {
    this.get_stores();
    // if (typeof $scope.current_user.can != 'undefined' && $scope.current_user.can('add_edit_stores')) {
    //   $scope.gridOptions.all_fields.name.transclude = '<a ui-sref="settings.stores.single({storeid:row.id})"' +
    //     ' ng-click="$event.stopPropagation();">{{row[field]}}</a>';
    // }

    // $scope.$watch('stores.setup.search', myscope.get_stores);
    // $scope.store_modal_closed_callback = function () {
    //   $timeout(myscope.get_stores, 100);
    // }
  }

  showSelect(){
    this.selectAll = !this.selectAll;
  }

  get_stores() {
    this.storeSettingService.get_list(this.stores).subscribe((response:any)=>
    {
      this.showAllStoreSettingData = response;
      this.stores.list = response;
      this.select_all_toggle(undefined);
      this.check_reset_links();
    })
  }

  select_all_toggle(val) {
    this.stores.setup.select_all = val;
    for (var store_index = 0; store_index <= this.stores.list.length - 1; store_index++) {
      this.stores.list[store_index].checked = this.stores.setup.select_all;
    }
  }

  check_reset_links() {
    this.storeSettingService.can_create_single().subscribe((response:any) =>
    {
      this.storesAllow = response.can_create;
      // this.settings.stores.allow = response.can_create;
    })
    this.storeSettingService.can_create_single_user().subscribe((response:any)=>
    {
      this.usersAllow = response.can_create;
      // this.settings.users.allow = response.can_create;
    })
  }

  getSettingSelected(e){
    var setting = [];
    e.forEach(element => {
      setting.push(this.showAllStoreSettingData[element])
    })
    this.stores.selected = setting;
  }

  store_delete() {
    if(this.stores.selected) {
      // this.stores.selected = null;
      // var result = $q.defer();
      // for (var i = 0; i < this.stores.list.length; i++) {
      //     this.stores.selected += 1;
      // }
      if (this.stores.selected.length === 0) {
        // notification.notify('select a store to delete');
        // result.resolve();
      } else if (confirm("Are you sure you want to delete the store" + ((this.stores.selected.length == 1) ? "?" : "s?"))) {
        this.storeSettingService.update_list('delete', this.stores).subscribe((response:any)=>{
          if (response.status) {
            this.stores.setup.select_all = false;
            // notification.notify(success_messages[action], 1);
          } else {
            // notification.notify(data.messages, 0);
          }
          this.get_stores();
        },error=>{
          // notification.server_error
        })
      }
    }
  }

  store_duplicate() {
    if(this.stores.selected) {
      this.storeSettingService.update_list('duplicate', this.stores).subscribe((response:any)=>{
        if (response.status) {
          this.stores.setup.select_all = false;
          // notification.notify(success_messages[action], 1);
        } else {
          // notification.notify(data.messages, 0);
        }
        this.get_stores();
      },error=>{
        // notification.server_error
      })
    }
  }

  store_change_status(status) {
    if(this.stores.selected) {
      this.stores.setup.status = status;
      this.storeSettingService.update_list('update_status', this.stores).subscribe((response:any)=>{
        this.stores.setup.status = "";
        this.get_stores();
      });
    } else {
      //  stores.list.select_notification();
    }
  }
}

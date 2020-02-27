import { Component, OnInit } from '@angular/core';
import { StoreSettingService } from 'src/app/services/store-setting.service';
import { general_settings } from 'src/app/interfaces/generalSettings';
import { SettingService } from 'src/app/services/setting.service';
import { InventoryProductService } from 'src/app/services/inventory-product.service';
import { AmazonSettingComponent } from './amazon-setting/amazon-setting.component';

@Component({
  selector: 'app-create-store-settings',
  templateUrl: './create-store-settings.component.html',
  styleUrls: ['./create-store-settings.component.scss']
})
export class CreateStoreSettingsComponent implements OnInit {

  warehouses = {
    setup: {
      sort: '',
      order: 'DESC',
      search: '',
      select_all: false,
      status: '',
      inv_wh_ids: []
    },
    list: [],
    single: {
      inv_wh_info: {},
      inv_wh_users: []
    },
    available_users: []
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

  stores= {
    list: [],
    single: {
      file_path: '',
      inventory_warehouse_id: undefined,
      import_images: true,
      import_products: true,
      shall_import_awaiting_shipment: true,
      status: undefined,
      store_type: '',
      id: undefined,
      name: ''
    },
    ebay: {
      show_url: true,
      signin_url: '',
      signin_url_status: false,
      sessionid: 0,
      current_tenant: ''
    },
    csv: {
      mapping: {},
      maps: {
        order: [],
        product: []
      }
    },
    import: {
      order: {
        type: 'apiimport'
      },
      product: {
        type: 'apiimport'
      },
      image: {}
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

  inventory_manager = {
    single: {
      method: 'receive',
      product_barcode: '',
      inventory_count: '',
      location_primary:'',
      location_secondary:'',
      location_tertiary:'',
      inv_wh_id: '',
      id: Number
    }
  }

  translations = {
    tooltips: {
      ftp_address: '',
      import_from_ftp: ''
    }
  }

  start_editing_map = false;
  storesAllow: boolean;
  usersAllow: boolean;
  showAllStoreSettingData: any;
  selectAll:boolean= true;
  edit_status= false;
  redirect = false;

  constructor(
    private storeSettingService: StoreSettingService,
    private settingService: SettingService,
    private inventoryService: InventoryProductService
  ) { }

  ngOnInit() {
    this.get_store_type();
    this.get_model_list()
    this.get_setting()
    this.get_warehouses()
    this.get_ebay_signin();
    this.fetch_ebay_user_token();
  }

  get_store_type(){
    this.stores.types = {
      // types: {
        Magento: {
          name: "Magento SOAP",
          // file: "/assets/views/modals/settings/stores/magento.html"
        },
        "Magento API 2": {
          name: "Magento REST",
          // file: "/assets/views/modals/settings/stores/magento_rest.html"
        },
        Ebay: {
          name: "Ebay",
          // file: "/assets/views/modals/settings/stores/ebay.html"
        },
        Amazon: {
          name: "Amazon",
          // file: "./amazon-setting/amazon-setting.component"
        },
        CSV: {
          name: "CSV",
          // file: "/assets/views/modals/settings/stores/csv.html"
        },
        "Shipstation API 2": {
          name: "Shipstation API 2",
          // file: "/assets/views/modals/settings/stores/shipstation_rest.html"
        },
        Shipworks: {
          name: "Shipworks",
          // file: "/assets/views/modals/settings/stores/shipworks.html"
        },
        Shopify: {
          name: "Shopify",
          // file: "/assets/views/modals/settings/stores/shopify.html"
        },
        "BigCommerce": {
          name: "BigCommerce",
          // file: "/assets/views/modals/settings/stores/big_commerce.html"
        },
        "ShippingEasy": {
          name: "Shipping Easy",
          // file: "/assets/views/modals/settings/stores/shipping_easy.html"
        },
        "Teapplix": {
          name: "Teapplix",
          // file: "/assets/views/modals/settings/stores/teapplix.html"
        }
      // }
    }
    this.stores.ebay.show_url = true;
    this.stores.ebay.signin_url_status = true;
    this.stores.single.status = 1;
    this.stores.ebay.show_url = true;
  }
  
  get_model_list(){
    this.storeSettingService.get_list(this.stores).subscribe((response:any)=>{
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
    });
    this.storeSettingService.can_create_single_user().subscribe((response:any)=>
    {
      this.usersAllow = response.can_create;
      // this.settings.users.allow = response.can_create;
    });
  }

  async get_setting() {
    await this.settingService.get_setting(this.general_settings)
    this.general_settings = this.settingService.system.generalSettings
    this.stores.single.status = this.settingService.system.status
  }

  get_warehouses(){
    this.inventoryService.get_list(this.warehouses).subscribe((response:any)=>{
    this.warehouses.list = response.data.inv_whs
    // if (typeof this.inventory_manager.single['inv_wh_id'] != "number") {
    //   for (var i = 0; i < this.warehouses.list.length; i++) {
    //     if (this.warehouses.list[i].info.is_default) {
    //       this.inventory_manager.single.inv_wh_id = this.warehouses.list[i].info.id;
    //       break;
    //     }
    //   }
    // }

      if (typeof this.stores.single['inventory_warehouse_id'] != "number") {
        for (var i = 0; i < this.warehouses.list.length; i++) {
          if (this.warehouses.list[i].info.is_default) {
            this.stores.single.inventory_warehouse_id = this.warehouses.list[i].info.id;
            break;
          }
        }
      }
      this.get_csv_maps()
    }) 
  }

  get_csv_maps() {
    this.inventoryService.get_csv_maps().subscribe((response:any)=>{
      this.stores.csv.maps = response;
    })
  }

  get_ebay_signin(){
    this.inventoryService.ebay_sign_in_url().subscribe((response:any)=>{
      if (response.ebay_signin_url_status) {
        this.stores.ebay.signin_url = response.ebay_signin_url;
        this.stores.ebay.signin_url_status = response.ebay_signin_url_status;
        this.stores.ebay.sessionid = response.ebay_sessionid;
        this.stores.ebay.current_tenant = response.current_tenant;
      }
    },error=>{
      this.stores.ebay.signin_url_status = false;
      // notification.server_error(data);
    })
  }

  fetch_ebay_user_token(){
    this.inventoryService.ebay_token_fetch().subscribe((response:any)=>{
      if (response.data.status) {
        this.stores.ebay.show_url = false;
        this.update_single_store(true);
      }
    })
  }
  
  change_opt(id, value) {
    this.stores.single[id] = value;
    this.update_single_store(true);
  }
  
  // store_single_details(id, new_rollback) {
  //   for (var i = 0; i < this.stores.list.length; i++) {
  //     if (this.stores.list[i].id == id) {
  //       // this.stores.current = parseInt(i);
  //       break;
  //     }
  //   }
  //   return stores.single.get(id, this.stores).then(function (response) {
  //     if (response.data.status) {
  //       this.edit_status = true;
  //       if (typeof new_rollback == 'boolean' && new_rollback) {
  //         this.single = {};
  //         // angular.copy(scope.stores.single, myscope.single);
  //       }
  //     }
  //   })
  // }

  update_single_store(auto) {
    if (this.stores.single.store_type && !this.stores.single.id && !this.stores.single.name) {
      this.stores.single.name= this.stores.single.store_type+'-'+this.stores.list.length;
    }
    if (this.edit_status || this.storeSettingService.validate_create_single(this.stores)) {
      // return stores.single.update(this.stores, auto).success(function (data) {
    this.storeSettingService.create_update_single(this.stores, auto).subscribe((response:any)=>{
      if (response.status && response.store_id) {
        if (!auto) {
          if (response.csv_import) {
            // notification.notify("Successfully Updated", 1);
          };
        }
      } else {
        // notification.notify(data.messages, 0);
      }
        if (response.status && response.store_id) {
          if (this.stores.single['id'] != 0) {
            // this.store_single_details(response.store_id);
          }
          if (typeof this.stores.single['id'] == "undefined") {
            // this.store_single_details(response.store_id);
          }
          // if (!auto) {
            //Use FileReader API here if it exists (post prototype feature)
            // if (response.csv_import && response.store_id) {
              
              // if (this.stores.csv.mapping[this.stores.single.type + '_csv_map_id'] && !this.start_editing_map) {
              //   var result = $q.defer();
                // for (var i = 0; i < this.stores.csv.maps[this.stores.single.type].length; i++) {
                //   if (this.stores.csv.mapping[this.stores.single.type + '_csv_map_id'] == this.stores.csv.maps[this.stores.single.type][i].id) {
                //     var current_map = jQuery.extend(true, {}, this.stores.csv.maps[this.stores.single.type][i]);
                //     break;
                //   }
                // }

                // current_map.map.store_id = this.stores.single.id;
                // current_map.map.type = this.stores.single.type;
                // current_map.map.name = current_map.name;
                // current_map.map.flag = 'file_upload';
                // if (current_map.map.type == 'order') {
                //   if (current_map.map.order_date_time_format == null) {
                //     if(confirm("Order Date/Time format has not been set. Would you like to continue using the current Date/Time for each imported order? Click ok to continue the import using the current date/time for all orders or click cancel and edit map to select one.")){
                //       current_map.map.order_placed_at = new Date();
                //       this.stores.csv.do_import({current: current_map.map});
                //       this.reset_choose_file();
                //       // $modalInstance.close("csv-modal-closed");
                //       result.resolve();
                //     } else {
                //       result.resolve();
                //     };
                //   } else {
                //     var not_found = true
                //     for (var i = 0; i < Object.keys(current_map.map.map).length; i++) {
                //       if (current_map.map.map[i].name == "Order Date/Time") {
                //         not_found &= false
                //         break;
                //       } else {
                //         continue;
                //       }
                //       ;
                //     }
                //     if (not_found) {
                //       if (confirm("An Order Date/Time has not been mapped. Would you like to continue using the current Date/Time for each imported order?")) {
                //         current_map.map.order_placed_at = new Date();
                //         this.stores.csv.do_import({current: current_map.map});
                //         this.reset_choose_file();
                //         // $modalInstance.close("csv-modal-closed");
                //         result.resolve();
                //       };
                //     } else {
                //       current_map.map.order_placed_at = null;
                //       this.stores.csv.do_import({current: current_map.map});
                //       this.reset_choose_file();
                //       // $modalInstance.close("csv-modal-closed");
                //       result.resolve();
                //     };
                // }

                // } else {
                //   this.stores.csv.do_import({current: current_map.map});
                //   this.reset_choose_file();
                //   // $modalInstance.close("csv-modal-closed");
                //   result.resolve();
                // };
                // stores.csv.do_import({current:current_map.map});
                // $modalInstance.close("csv-modal-closed");
                // return result.promise;
              // } else {
              //   var csv_modal;
                // if (this.stores.single.type == 'order' || this.stores.single.type == 'kit') {
                //   csv_modal = $modal.open({
                //     templateUrl: '/assets/views/modals/settings/stores/csv_import.html',
                //     controller: 'csvSingleModal',
                //     size: 'lg',
                //     resolve: {
                //       store_data: function () {
                //         return scope.stores;
                //       }
                //     }
                //   });
                // } else if (scope.stores.single.type == 'product') {
                //   csv_modal = $modal.open({
                //     templateUrl: '/assets/views/modals/settings/stores/csv_import_detailed.html',
                //     controller: 'csvDetailedModal',
                //     size: 'lg',
                //     resolve: {
                //       store_data: function () {
                //         return scope.stores;
                //       }
                //     }
                //   });
                // };
              //   csv_modal.result.finally(function () {
              //     myscope.reset_choose_file();
              //     $modalInstance.close("csv-modal-closed");
              //   });
              // };
            // } else {
            //   if(scope.stores.single.import_type != 'bc_products_import'){
            //     notification.notify("Please choose a file to import first",0);
            //   }
            // }
          // }
        }

        this.start_editing_map = false;
      })
    }
  }
}
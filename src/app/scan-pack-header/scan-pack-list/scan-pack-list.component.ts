import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { OrderService } from 'src/app/services/order.service';
import { ScanPackSettingService } from 'src/app/services/scan-pack-setting.service';
import { GeneralSettingsService } from 'src/app/services/general-settings.service';
import { general_settings } from 'src/app/interfaces/generalSettings';


@Component({
  selector: 'app-scan-pack-list',
  templateUrl: './scan-pack-list.component.html',
  styleUrls: ['./scan-pack-list.component.scss']
})
export class ScanPackListComponent implements OnInit {

  private subscription: Subscription;
  order: string;
  note_obj = null;
  serial_obj = null;
  order_instruction_confirmed = false;
  order_instruction_obj = null;
  product_instruction_obj = null;
  product_instruction_confirmed_id = 0;
  click_scan_confirm_obj = null;
  click_scan_confirmed_id = 0;
  type_scan_confirm_obj = null;
  type_scan_confirmed_id = 0;
  confirmation_code = "";
  service_issue_message_saved = false;
  check_request = true;
  check_remove_box =  true;
  data:any;
  click_scan_happend: boolean;
  last_scanned_barcode:string;
  increment_id:string;
  general_settings={
    single: {
      flash: '',
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
    },
    is_multi_box: false,
  }
  current_state = 'scanpack.rfo';
  scan_pack = {
    state: 'none',
    scan_states: {
    },
    settings: {
      order_verification: false,
      click_scan_barcode: '',
      click_scan: false,
      scanned_barcode: '',
      scanned: true
    }
  }
  scanOrder:string;
  qty_remaining: ''

  constructor(
    private activatedRoute: ActivatedRoute,
    private orderService: OrderService,
    private scanPackSettingService: ScanPackSettingService,
    private generalSettingService: GeneralSettingsService
  ) { }

  ngOnInit() {
    this.scanOrder =this.activatedRoute.snapshot.paramMap.get('name')
    // this.subscription = this.orderService.getMessage().subscribe(receiveddata=>{
    //   this.data = receiveddata
    //   
    // })
    this.get_scan_list()
    this.generalSettingService.get_settings(this.general_settings).subscribe((response:any)=> {
      this.general_settings.single = response.data.settings
      this.general_settings.is_multi_box = response.is_multi_box
      
    })
    // this.check_reload_compute();
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

  get_scan_list(){
    // setTimeout(async ()=>{
      this.scanPackSettingService.get_settings(this.scan_pack).subscribe((response:any)=>{
        this.scan_pack.settings.order_verification = response.order_verification
        this.scan_pack.settings.click_scan_barcode = response.click_scan_barcode
        this.scan_pack.settings.click_scan = response.click_scan
        this.scan_pack.settings.scanned_barcode = response.scanned_barcode
        this.scan_pack.settings.scanned = response.scanned
        this.scan_barcode()
      })
    // }, 2000)
  }

  async scan_barcode(){
    var id = null;
    await this.scanPackSettingService.input(this.scan_pack, this.scanOrder, this.current_state, id, this.qty_remaining, null, null)
    if(this.scanPackSettingService.responses){
      this.data = this.scanPackSettingService.responses.response
    }
  }

  reset_order(){
    if (confirm("Resetting the order will remove all items that have been packed for this order. Are you sure?")){
      this.scanPackSettingService.reset(this.data.data.order.id).subscribe((response:any)=>{
        // notification.notify(data.notice_messages, 2);
        // notification.notify(data.success_messages, 1);
        // notification.notify(data.error_messages, 0);
        if (response.status) {
          if (typeof response.data != "undefined") {
            if (typeof response.data.next_state != "undefined") {
              //states[data.data.next_state](data.data);
              // if ($state.current.name == response.data.next_state) {
              //   $state.reload();
              // } else {
              //   // $state.go(response.data.next_state, response.data);
              // }
            }
          }
        }
      })
    }
  }

  autoscan_barcode() {
    
    if (this.data.data.scan_pack_settings.enable_click_sku) {
      if (this.data.data.order.next_item.click_scan_enabled == "on_with_confirmation") {
        // this.show_click_scan_confirm();
      } else if (this.data.data.order.next_item.click_scan_enabled == "on") {
        if(this.general_settings.is_multi_box) {
          if (this.check_request == true){
            this.check_request = false;
            this.do_autoscan();
          }
        }else{
          this.do_autoscan();
        }
      } else if (this.data.order.next_item.click_scan_enabled == "off") {
        // notification.notify('Click Scan is disabled for this product');
      }

    } else {
      // notification.notify('Click Scan is disabled');
    }
  }

  async do_autoscan() {
    this.click_scan_happend = true;
    this.last_scanned_barcode = this.data.data.order.next_item.barcodes[0].barcode;
    this.increment_id = this.data.data.order.increment_id;
    
    if(this.data.current_box == undefined){
      await this.scanPackSettingService.click_scan(this.data.data.order.next_item.barcodes[0].barcode, this.data.data.order.id, null)
      if(this.scanPackSettingService.scanResponse){
        this.scan_barcode()
        // this.handle_scan_return();
      }
    }
    else{
      await this.scanPackSettingService.click_scan(this.data.data.order.next_item.barcodes[0].barcode, this.data.data.order.id, this.data.current_box.id)
      if(this.scanPackSettingService.scanResponse){
        this.scan_barcode()
        // this.handle_scan_return();
      }
    }
  }

  // show_click_scan_confirm() {
  //   if (this.click_scan_confirmed_id != this.data.data.order.next_item.product_id) {
  //     this.click_scan_confirm_obj = $modal.open({
  //       templateUrl: '/assets/views/modals/scanpack/codeconfirm.html',
  //       controller: 'scanPackRfpCodeConfirm',
  //       size: 'lg',
  //       resolve: {
  //         order_data: function () {
  //           return this.data.data.order;
  //         },
  //         confirm: function () {
  //           return function () {
  //             this.click_scan_confirmed_id = this.data.data.order.next_item.product_id;
  //             this.do_autoscan();
  //           }
  //         }
  //       }
  //     });
  //     this.click_scan_confirm_obj.result.finally(function () {
  //       $timeout(this.focus_search, 500);
  //       $timeout(this.show_click_scan_confirm, 100);
  //     });
  //   } else {
  //     this.click_scan_confirmed_id = 0;
  //   }
  // }

  // check_reload_compute() {
  //   this.rfpinit().then(function () {
  //     // this.set('title', "Ready for Product Scan");
  //     this.check_request = true;
  //     if (typeof this.data.raw.data.serial != 'undefined' && (this.data.raw.data.serial.ask || this.data.raw.data.serial.ask_2)) {
  //       this.ask_serial(this.data.raw.data.serial);
  //     } else{
  //       // setTimeout(()=> {
  //       //   $('#ready_product_scan').focus();
  //       // }, 1000);
  //     }

  //     if (this.data.order.status != "awaiting") {
  //       this.set('order', {});
  //       this.rfpinit().then(this.compute_counts);
  //     } else {
  //       this.compute_counts();
  //     }
  //     this.reg_callback(this.handle_known_codes);
  //   })
  // }

  // rfpinit() {
  //   
  //   this.alternate_orders = [];
  //   // this.init();
  //   var result = $q.defer();
  //   result.promise.then(function () {
  //     if (typeof this.data.raw.data != "undefined"
  //       && typeof this.data.raw.data.matched_orders != "undefined"
  //       && this.data.raw.data.matched_orders.length > 0) {
  //       this.alternate_orders = this.data.raw.data.matched_orders;
  //     }
  //   });
  //   if (typeof this.data.order != 'undefined' && typeof this.data.order.status != 'undefined') {
  //     result.resolve();
  //   } else {
  //     return scanPack.input($stateParams.order_num, 'scanpack.rfo', null, null, null, $stateParams.store_order_id).then(function (data) {
  //       this.set('raw', data.data);
  //       if (typeof data.data != 'undefined' && typeof data.data.data != 'undefined') {
  //         if (typeof data.data.data['next_state'] != 'undefined' && data.data.data['next_state'] != $state.current.name) {
  //           if (typeof(some_variable) !== "undefined" && some_variable !== null){
  //             $stateParams.username = data.data.data.order.firstname
  //           } 
  //           if (typeof(some_variable) !== "undefined" && some_variable !== null){
  //             $stateParams.username = $stateParams.username + " "  + data.data.data.order.lastname
  //           }
  //           // $state.go(data.data.data['next_state'], {order_num: $stateParams.order_num, username: $stateParams.username});
  //         }
  //         this.set('order', data.data.data.order);
  //         this.set('scan_pack_settings', data.data.data.scan_pack_settings);
  //         this.set('current_box', data.data.data.order.box[0]);
  //       }
  //     }).then(result.resolve);
  //   }
  //   return result.promise;
  // }
}

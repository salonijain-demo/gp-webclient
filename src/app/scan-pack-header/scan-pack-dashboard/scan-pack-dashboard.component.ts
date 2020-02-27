import { Component, OnInit } from '@angular/core';
import { GeneralSettingsService } from 'src/app/services/general-settings.service';
import { general_settings } from 'src/app/interfaces/generalSettings';
import { ScanPackSettingService } from 'src/app/services/scan-pack-setting.service';
import { OrderService } from 'src/app/services/order.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-scan-pack-dashboard',
  templateUrl: './scan-pack-dashboard.component.html',
  styleUrls: ['./scan-pack-dashboard.component.scss']
})
export class ScanPackDashboardComponent implements OnInit {

  data: any;
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
  last_scanned_barcode:string;
  inactive_or_new_products:any;
  response:any;
  scan_pack = {
    state: 'none',
    scan_states: {
    },
    settings: {}
  }
  scanOrder:''
  current_state = 'scanpack.rfo';
  is_clicked:boolean;
  qty_remaining: ''

  constructor(
    private generalSettingService: GeneralSettingsService,
    private orderService: OrderService,
    private scanpackSettingService: ScanPackSettingService,
    private router: Router,
    private route:ActivatedRoute
  ) { }

  ngOnInit() {
    
    this.last_scanned_barcode = '';
    this.generalSettingService.get_settings(this.general_settings).subscribe((response:any)=> {
      // this.gen_setting_loaded = (new Date).getTime();
    });
    // if (typeof myscope['sounds'] == 'undefined') {
    //   myscope.sounds = {};
    // }
    //$scope.scan_pack_state = 'none';
    this.scanpackSettingService.get_settings(this.scan_pack).subscribe((response:any)=>{
      this.scan_pack.settings = response
      // angular.forEach(['success', 'fail', 'order_complete'], function (i) {
        // if ($scope.scan_pack.settings['show_' + i + '_image']) {
        //   $scope.scan_pack.scan_states[i].image.enabled = $scope.scan_pack.settings['show_' + i + '_image']; 
        //   $scope.scan_pack.scan_states[i].image.src = $scope.scan_pack.settings[i + '_image_src'];
        //   $scope.scan_pack.scan_states[i].image.time = $scope.scan_pack.settings[i + '_image_time'] * 1000;
        // }
        // if ($scope.scan_pack.settings['play_' + i + '_sound']) {
        //   $scope.scan_pack.scan_states[i].sound.enabled = $scope.scan_pack.settings['play_' + i + '_sound'];
        //   if (typeof myscope.sounds[i] == 'undefined'){
        //     myscope.sounds[i] = groov_audio.load($scope.scan_pack.settings[i + '_sound_url'], $scope.scan_pack.settings[i + '_sound_vol']);
        //   }
        // }
      // });
      // this.scanpack_setting_loaded = (new Date).getTime();
    });
  }

  set(key, val) {
    this.data[key] = val;
  }

  input_enter(event) {
    debugger
    if (event.which != '13') return;
    // if(this.scanOrder == "BOXNEXT" || this.scanOrder == "BOXPREV"){
    //   this.change_box_with_input();
    // }
     
    // && this.scan_pack.settings.post_scan_pause_enabled
    else{
      if (this.current_state == 'scanpack.rfp.default') {
        // window.setTimeout(function() {
          this.start_scanning(event);
        // }, this.scan_pack.settings.post_scan_pause_time*1000);
      } else {
        this.start_scanning(event);
      }
    }
  }

  prev_next_box(type) {
    var index = this.data.order.box.indexOf(this.data.current_box);
    if(type == 'next'){
      this.set('current_box', this.data.order.box[index+1]);
    }else{
      this.set('current_box', this.data.order.box[index-1]);
    }
  }

  create_box() {
    if (this.is_clicked == false){
      var box = this.data.current_box;
      this.is_clicked = true;
      this.scanpackSettingService.create_box(this.data.order.id, this.data.order.box.length + 1).subscribe((response:any)=>{
        this.data.order.box.push(response);
        this.set('current_box', response);
      });
    }  

    // if(this.general_settings.single.multi_box_shipments && this.general_settings.single.per_box_packing_slips == 'when_new_boxes_are_started'
    //    && box != undefined){
    //   this.orderService.generate_box_slip(this.data.order, [box.id]);
    // }
  }

  change_box_with_input(){
    if(this.data.input == "BOXNEXT"){
      if(this.data.next_box){
        this.prev_next_box('next');
      }else if(!this.data.box_is_empty){
        this.create_box();
      }
      else{
        // notification.notify("Box is empty so can not create next box", 0);
      }
    }
    else{
      if(this.data.prev_box){
        this.prev_next_box('prev');
      }
    }
    this.data.input = null;
  }

  async start_scanning(event) {
    debugger
    // if (!this.callback()) return;
    var id = null;
    // if (typeof this.data.order.id !== "undefined") {
    //   id = this.data.order.id;
    // }

    // this.scan_pack.settings.scan_by_hex_number == true &&
    // if ( this.data.order.id == undefined){
    //   try{
    //     var hex = this.data.input.split('^')[2];
    //     // if (/^-?[\d.]+(?:e-?\d+)?$/.test(hex)) {
    //       this.data.input = String(parseInt(hex,16));
    //     // } else {
    //     //   string = "";
    //     //   for (var i = 0; i < hex.length; i += 2) {
    //     //     string += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
    //     //   }
    //     //   this.data.input = string;
    //     // }
    //   } catch(e){}
    // }
    if (this.current_state == 'scanpack.rfp.default') {
      // this.scanPack.input_scan_happend = true
    }
    if (this.scanOrder!=undefined && this.scanOrder!='') {
      this.last_scanned_barcode = this.scanOrder;
    }
    // this.increment_id = this.data.order.increment_id;
    // try{
    //   obj = this.data.order.unscanned_items;
    //   angular.forEach(obj, function(value, key) {
    //     angular.forEach(value.barcodes, function(v, k) {
    //       if (v.barcode == this.data.input){
    //         scope.qty_remaining = value.qty_remaining;
    //       } else if(value.child_items != undefined && value.child_items.length > 0){
    //         angular.forEach(value.child_items, function(value, key) {
    //           angular.forEach(value.barcodes, function(v, k) {
    //             if (v.barcode.toLowerCase() == this.data.input.toLowerCase()){
    //               scope.qty_remaining = value.qty_remaining;
    //             }
    //           });
    //         });
    //       }
    //     });
    //   });
    // }catch(e){
    //   scope.qty_remaining = null
    // }
    // if(this.data.current_box == undefined){
      await this.scanpackSettingService.input(this.scan_pack, this.scanOrder, this.current_state, id, this.qty_remaining, null, null)
      debugger
      if(this.scanpackSettingService.responses){
        this.response = this.scanpackSettingService.responses.response
        if(this.response.data.inactive_or_new_products){
          this.inactive_or_new_products = this.response.data.inactive_or_new_products
          this.orderService.sendDataToOtherComponent(this.inactive_or_new_products);
          this.router.navigate(['../scanpack.rfp.product_edit', this.response.data.order_num],{ relativeTo: this.route})
        }
        else if(this.response.data.inactive_or_new_products == undefined){
          this.orderService.sendDataToOtherComponent(this.response);
          this.router.navigate(['../scanpack.rfp.default'], { relativeTo: this.route })
        }
        // ,{queryParams: {order: this.scanOrder}}
        // this.handle_scan_return()
      }
    // else{
      // scanPack.input(this.data.input, this.current_state, id, scope.qty_remaining, this.data.current_box.id, null).success(this.handle_scan_return);
    // }
      // scanPack.update_chrome_tab();
    // var barcodes = [];
    // if (typeof this.data.order.next_item != "undefined" ){
    //   var values = this.data.order.next_item.barcodes;
    //   angular.forEach(values, function(value) { this.push(value.barcode.toLowerCase()); }, barcodes);
    // };
    // if (barcodes.includes(this.data.input.toLowerCase()) || (this.current_state != 'scanpack.rfp.default')) {
    //   $window.increment_id = this.data.order.increment_id;
    //   scanPack.input(this.data.input, this.current_state, id).success(this.handle_scan_return);
    // } else {
    //   this.trigger_scan_message('fail');
    // }      
  }

  // $scope.handle_scan_return = function (data) {
  //   debugger
  //   if ((data.data != "undefined") && (data.data.order!=undefined) && (data.data.order.store_type != undefined)) {
  //     $scope.store_type = data.data.order.store_type
  //   } 
  //   $scope.set('raw', data);
  //   if (typeof data.data != "undefined") {
  //     if (typeof data.data.order != "undefined") {
  //       var box = $scope.data.order.box;
  //       $scope.set('order', data.data.order);
  //       $scope.set('scan_pack_settings', data.data.scan_pack_settings);
  //       if($scope.data.current_box == undefined){
  //         $scope.set('current_box', data.data.order.box[0]);
  //       }else{
  //         $scope.data.order.box = box;
  //         $scope.set('box_is_empty', false);
  //       }
  //     }
  //     if (typeof data.data.next_state != "undefined") {
  //       if ($state.current.name == data.data.next_state) {
  //         if (data.data.next_state == 'scanpack.rfp.default') {
  //           $scope.trigger_scan_message((data.status) ? 'success' : 'fail');
  //           $scope.focus_search();
  //         }
  //         $scope.$broadcast('reload-scanpack-state');
  //       } else {
  //         if (data.data.order_complete) {
  //           //destroy empty boxes
  //           $scope.remove_empty_boxes();

  //           // Print multi-box packing slips when  order is complete 
  //           if($scope.general_settings.single.multi_box_shipments){
  //             var box_ids = [];
  //             if($scope.general_settings.single.per_box_packing_slips == 'when_order_is_complete'){
  //               angular.forEach($scope.data.order.box, function(value, key){
  //                 box_ids.push(value.id);
  //               });
  //             }
  //             else if($scope.general_settings.single.per_box_packing_slips == 'when_new_boxes_are_started'){
  //               box_ids.push($scope.data.current_box.id);
  //             }
  //             if(box_ids.length > 0){
  //               orders.list.generate_box_slip($scope.data.order, box_ids);
  //             }
  //           }

  //           if ($scope.data.order.store_type=="ShippingEasy" && ($scope.data != "undefined") && ($scope.data.order!=undefined) && $scope.data.order.popup_shipping_label==true){
  //             if($scope.data.order.shipment_id != null){
  //               var shippingeasy_url = $sce.trustAsResourceUrl("http://app.shippingeasy.com/shipments/" + parseInt($scope.data.order.shipment_id) + "/edit");
  //               $scope.open_popup(shippingeasy_url);
  //             } else {
  //               scanPack.getshipment($scope.data.order.store_id, $scope.data.order.store_order_id).success(function (d) {
  //                 if(d.shipment_id != null){
  //                   var shippingeasy_url = $sce.trustAsResourceUrl("http://app.shippingeasy.com/shipments/" + parseInt(d.shipment_id) + "/edit");
  //                   $scope.open_popup(shippingeasy_url);
  //                 };
  //               });
  //             };
  //           } else {
  //             $scope.trigger_scan_message('order_complete');
  //           }

  //           if ($scope.data.order.store_type == "Shipstation API 2" && $scope.data.order.use_chrome_extention==true){
  //             $(".content_for_extension").attr("data-switch_back",  [$scope.data.order.switch_back_button, $scope.data.order.auto_click_create_label, $scope.data.order.return_to_order]);
  //             $(".content_for_extension").text($scope.data.order.increment_id);
  //             if ($scope.data.order.switch_back_button && $scope.data.order.return_to_order){
  //               localStorage.setItem("return_to_order", true);
  //             }
  //           }
            
  //           // show split next order
  //           if ($scope.data.order.store_type=="ShippingEasy"){
  //             orders.single.next_split_order($scope.data.order).success(function(response){
  //               if(response != "null") {
  //                 $state.go('scanpack.rfp.default', {order_num: response.increment_id, username: response.firstname+' '+response.lastname });
  //               }
  //             });
  //           }
  //           // update dashboard data

  //           if ($scope.general_settings.single.api_call == true) {
  //             scanPack.send_api_request($scope.data.order.id)
  //           }

  //           if ($scope.general_settings.single.allow_rts == true) {  
  //             setTimeout(function(){ dashboard.stats.dashboard_stat('0'); }, 5000);
  //           }
  //         }
  //       }

  //       if($scope.scan_pack.settings.return_to_orders == true && data.data.order_complete ){
  //         $state.go('orders');
  //       }else{  
  //         $state.go(data.data.next_state, data.data);
  //       }
  //     }
  //   }
  // }
}

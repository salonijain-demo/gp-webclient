import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { NotifierService } from "angular-notifier";

@Injectable({
  providedIn: 'root'
})
export class ScanPackSettingService {
  access_token =  localStorage.getItem('access_token');
  responses:any;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': "Bearer " + this.access_token
    })
  }
  order_modified = [];
  increment_id: '';
  username: string;
  url = "http://mydev.localpackerapi.com";
  private readonly notifier: NotifierService;

  constructor(
    private http: HttpClient,
    notifierService: NotifierService
  ) { 
    this.notifier = notifierService;
  }

  get_settings(model) {
    return this.http.get(this.url + '/settings/get_scan_pack_settings.json', this.httpOptions) 
  }

  update_intagibleness(model) {
    return this.http.post(this.url + '/products/update_intangibleness.json', model.settings,this.httpOptions)
  }

  update_settings(model) {
    this.http.post(this.url + '/settings/update_scan_pack_settings.json', model.settings,this.httpOptions).subscribe((response:any)=>{
      if (response.status) {
        this.get_settings(model);
        // this.notifier.notify(data.success_messages, 1);
      } else {
        // this.notifier.notify(data.error_messages, 0);
      }
    })
  }

  async input(scan_state, input, state, id, rem_qty, box_id, store_order_id) {
    debugger
    if (input == scan_state.settings.settings.click_scan_barcode && scan_state.settings.settings.click_scan) {
      this.set_order_scanned('push');
      // barcode: scope.data.order.next_item.barcodes[0].barcode
      return this.http.post(this.url + '/scan_pack/click_scan.json', { id: id, box_id: box_id})
      .subscribe((response:any)=> {
        this.notifier.notify(response.notice_messages, '');
        this.notifier.notify(response.success_messages, '');
        this.notifier.notify(response.error_messages, '');
      },error => {
        // this.notifier.server_error;
        this.set_order_scanned('pop');
      })
    }
    else if (input == scan_state.settings.settings.scanned_barcode && scan_state.settings.settings.scanned) {
      return this.http.post(this.url + '/scan_pack/order_change_into_scanned.json', {id: id})
      .subscribe((response:any)=>{
        this.notifier.notify(response.notice_messages, '');
        this.notifier.notify(response.success_messages, '');
        this.notifier.notify(response.error_messages, '');
      },error=>{
        // this.notifier.server_error;
      })
      // $scope.$broadcast('reload-scanpack-state');
    }
    else{
      this.set_order_scanned('push');
      await this.http.post(this.url + '/scan_pack/scan_barcode.json', {input: input, state: state, id: id, rem_qty: rem_qty, box_id: box_id, store_order_id: store_order_id}, this.httpOptions)
      .toPromise().then((response:any)=>{
        try{
          this.username = response.data.order.firstname + " " + response.data.order.lastname;
        }catch(e){}
        if (response.notice_messages.length == 0){
          // this.notifier.close(2);
          this.notifier.notify(response.notice_messages, '');
        } else if(response.notice_messages.length > 400)  {
          // this.notifier.close(1);
          this.notifier.notify(response.notice_messages, '');
        } else {
          this.notifier.notify(response.notice_messages, '');
        }
        if (response.on_demand == true) {
          this.notifier.notify("We are requesting that order and it will open as soon as it's available. If you do not wish to wait you can scan another order number." , '')
        }
        this.notifier.notify(response.success_messages, '');
        if (response.on_demand != true) {
          this.notifier.notify(response.error_messages, '');
        }
        return this.responses = {
          response: response
        };
      },error=>{
        // this.notifier.server_error;
        this.set_order_scanned('pop');
      })
    }
  }

  set_order_scanned(action){
    let index = this.order_modified.indexOf(this.increment_id);
    if(action == 'push'){
      if(this.increment_id != null && index == -1){
        this.order_modified.push(this.increment_id);
      }
    }
    else{
      if(index > -1){
        this.order_modified.splice(index, 1);
      }
    }
  }

  create_box(order_id, box){
    return this.http.post(this.url + '/box.json', { order_id: order_id, name: 'Box '+ box });
  }
}

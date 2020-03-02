import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import{ environment } from 'src/environments/environment'

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  i=1;

  constructor(
    private http: HttpClient
  ) { }

  order_modified =[];

  private shareDataSubject = new BehaviorSubject<any>({});

  sendDataToOtherComponent(somedata){
    this.shareDataSubject.next(somedata);
  }

  getMessage(): Observable<any> {
    return this.shareDataSubject.asObservable();
  }

  orders_single_update(orderId, orderData){
    return this.http.put(environment.baseUrl + "/orders/" + orderId + ".json",{order: orderData})
  }

  create_single(order){
    if(this.i==1){
      this.i++
      return this.http.post(environment.baseUrl + '/orders', order)
    }
  }

  get_list_order(url){
    return this.http.get(url);
  }

  get_setting(){
    var url = environment.baseUrl + '/settings/get_settings.json';
    return this.http.get(url)
  }

  addTimeZone(time_zone){
    var url = environment.baseUrl + '/settings/fetch_and_update_time_zone.json';
    return this.http.post(url, time_zone)
  }

  get_single(id) {
    return this.http.get(environment.baseUrl + '/orders/' + id + '.json')
  }

  get_list(object, page, product_search_toggle) {
    var url = '';
    var setup = object.setup;
    if (typeof page != 'undefined' && page > 0) {
      page = page - 1;
    } else {
      page = 0;
    }
    try{
      // object.ctrlKey = event.ctrlKey;
    } catch(e){}
    object.setup.offset = page * object.setup.limit;
    if (setup.search == '') {
      url = environment.baseUrl + '/orders.json?filter=' + setup.filter +  '&sort=' + setup.sort + '&order=' + setup.order;
    } else {
      url = environment.baseUrl + '/orders/search.json?search=' + setup.search + '&sort=' + setup.sort + '&order=' + setup.order;
    }
    url += '&limit=' + setup.limit + '&offset=' + setup.offset + '&product_search_toggle=' + product_search_toggle;
    return this.http.get(url)
  }

  orders_update(orderData,auto){
    if (typeof auto !== "boolean") {
      auto = true;
    }
    return this.http.put(environment.baseUrl + "/orders/" + orderData.id + ".json",{order: orderData})
  }

  single_record_exception(orders) {
    if(orders.single.exception.assoc==undefined) {
      orders.single.exception.assoc = orders.single.users[0];
    }
    return this.http.post(environment.baseUrl + 
      '/orders/'+orders.single.basicinfo.id+'/record_exception.json',
      {
        reason: orders.single.exception.reason,
        description: orders.single.exception.description,
        assoc: orders.single.exception.assoc
      }
    )
  }

  single_clear_exception(orders) {
    return this.http.post(environment.baseUrl + '/orders/'+orders.single.basicinfo.id+'/clear_exception.json',{})
  }

  update_list(action, orders) {
    if (["update_status", "delete", "duplicate"].indexOf(action) != -1) {
      orders.setup.orderArray = [];
      for (var i = 0; i < orders.selected.length; i++) {
        // if (orders.selected[i].checked == true) {
        //   orders.setup.orderArray.push({id: orders.selected[i].id});
        // }
        orders.setup.orderArray.push({id: orders.selected[i].id});
      }
      if (orders.setup.orderArray.length<1 && !orders.setup.select_all) {
        // notification.notify("Please select orders to perform this action.", 0);
        // return;
      }

      var url = '';
      if (action == "delete") {
        url = environment.baseUrl + '/orders/delete_orders.json';
      } else if (action == "duplicate") {
        url = environment.baseUrl + '/orders/duplicate_orders.json';
      } else if (action == "update_status") {
        url = environment.baseUrl + '/orders/change_orders_status.json';
      }
      return this.http.post(url, orders.setup)
    }
  }

  generate_list(action, orders) {
    // if(typeof $window.order_modified == 'undefined'){$window.order_modified = []};
    orders.setup.orderArray = [];

    for (var i = 0; i < orders.selected.length; i++) {
      // if (orders.list[i].checked == true) {

        orders.setup.orderArray.push({id: orders.selected[i].id});
        // $window.order_modified.push(orders.list[i].ordernum);
      // }
    }
    var url = '';
    var slip_url = ''
    var myscope = {};
    var interval = null;
    var barcode_url;
    //set url for each action.
    if (action == "pick_list") {
      url = environment.baseUrl + '/orders/generate_pick_list.json';
    }
    else if (action == "packing_slip") {
      if (orders.setup.select_all == true && orders.html_print == true){
        if(orders.setup.search != null && orders.setup.search != ""){
          // var ids = [];
          // angular.forEach(orders.selected, function(value, key) {
          //   ids.push(value.id)
          // });
          slip_url = environment.baseUrl + '/orders/generate_all_packing_slip?filter='+orders.setup.filter+'&limit='+orders.setup.limit+'&select_all='+orders.setup.select_all+'&sort='+orders.setup.sort+'&product_search_toggle='+ orders.product_search_toggle +'&offset=' + orders.setup.offset+'&search='+orders.setup.search+'&order='+orders.setup.order;
        }else{
          slip_url = environment.baseUrl + '/orders/generate_all_packing_slip?filter='+orders.setup.filter+'&sort='+orders.setup.sort+'&order='+orders.setup.order;
        }
        window.open(slip_url);
      } else {
        url = environment.baseUrl + '/orders/generate_packing_slip.json';
      }
    } else if (action == 'items_list') {
      url = environment.baseUrl + '/orders/order_items_export.json';
    } else if (action == 'barcode_slip') {
      if (orders.setup.select_all == true){
        url = environment.baseUrl + '/products/bulk_barcode_generation?ids=all&status=' + orders.setup.filter;
        barcode_url =  null
      } else {
        var ids = ""
        orders.setup.orderArray.forEach(element=>{
          ids = ids + "," + element.id
        })
        if (orders.setup.orderArray.length > 20) {
          url = environment.baseUrl + '/products/bulk_barcode_generation?ids=' + ids;
          barcode_url = null
        } else{
          barcode_url = environment.baseUrl + '/products/bulk_barcode_pdf.pdf?ids=' + ids;
        }
      }
      if (barcode_url != null) {
        window.open(barcode_url);
      }
    }
    //send post http request and catch the response to display the pdfs.
    if (url != ""){
      return this.http.post(url, orders.setup)
    }
  }

  update_order_list(orders){
    return this.http.post(environment.baseUrl + '/orders/update_order_list.json', orders)
  }

  generate_box_slip(order, box_ids, type){
    if(type == undefined){ type = null };
    if(typeof this.order_modified == 'undefined'){this.order_modified = []};
    this.order_modified.push(order.increment_id);
    var orderArray = [{id: order.id}];
    return this.http.post(environment.baseUrl + '/orders/generate_packing_slip.json', { orderArray: orderArray, box_ids: box_ids, packing_type: type });
  }
}
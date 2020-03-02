import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import{ environment } from 'src/environments/environment'

@Injectable({
  providedIn: 'root'
})
export class StoreSettingService {

  constructor(
    private http : HttpClient
  ) { }

  get_list(object) {
    var result = [];
    return this.http.get(environment.baseUrl + '/stores.json')
      // {
      //   result = $filter('filter')(response, object.setup.search);
      //   result = $filter('orderBy')(result, object.setup.sort, (object.setup.order == 'DESC'));
      //   object.list = result;
      // },error => {
      //   // notification.server_error
      // // return result;
  }

  can_create_single() {
    return this.http.get(environment.baseUrl + '/stores/let_store_be_created.json')
  }

  can_create_single_user() {
    return this.http.get(environment.baseUrl + '/users/let_user_be_created.json')
  }

  validate_create_single(stores){
    //Return true if the checks match, if it reaches the end it returns false by default.
    if (stores.single.name && stores.single.store_type) {
      switch (stores.single.store_type) {
        case 'Magento':
          return (stores.single.host && stores.single.username && stores.single.api_key);
          break;
        case 'Shipstation':
          return (stores.single.username && stores.single.password);
          break;
        // case 'Shipstation API 2':
        //   return (stores.single.api_key && stores.single.api_secret);
        //   break;
        case 'Amazon':
          return (stores.single.merchant_id && stores.single.marketplace_id);
          break;
        case 'Shopify':
          return (stores.single.shop_name);
          break;
        //for any other store types (ebay and csv) just return true
        case 'Shipworks':
        default:
          return true;
      }
    }
    return false;
  }

  create_update_single(stores, auto) {
    if (typeof auto !== "boolean") {
      auto = true;
    }
    var params = stores.single
    return this.http.post(environment.baseUrl + '/stores/create_update_store.json' ,params)
    // return this.http({
    //   method: 'POST',
    //   headers: {'Content-Type': undefined},
    //   url: environment.baseUrl + '/stores/create_update_store.json',
    //   transformRequest: function (data) {
    //     var request = new FormData();
    //     for (var key in data) {
    //       if (data.hasOwnProperty(key)) {
    //         request.append(key, data[key]);
    //       }
    //     }
    //     return request;
    //   },
    //   data: stores.single
    // })
  }

  update_list(action, stores) {
    if (["update_status", "delete", "duplicate"].indexOf(action) != -1) {
      stores.setup.storeArray = [];
      for (var i = 0; i < stores.selected.length; i++) {
        // if (stores.list[i].checked == true) {
          stores.setup.storeArray.push({id: stores.selected[i].id, status: (stores.setup.status == 'active')});
        // }
      }
      var url = '';
      if (action == "delete") {
        url = environment.baseUrl + '/stores/delete_store.json';
      } else if (action == "duplicate") {
        url = environment.baseUrl + '/stores/duplicate_store.json';
      } else if (action == "update_status") {
        url = environment.baseUrl + '/stores/change_store_status.json';
      }
      return this.http.post(url, stores.setup.storeArray)
    }
  }
}

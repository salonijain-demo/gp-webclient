import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class InventoryProductService {

  constructor(
    private http: HttpClient
  ) { }

  get_list(object){
    var result = [];
    return this.http.get(environment.baseUrl + '/inventory_warehouse.json')
    // .subscribe((response:any)=> {
    //   if (response.status) {
        // result = $filter('filter')(data.data.inv_whs, object.setup.search);
        // result = $filter('orderBy')(result, object.setup.sort, (object.setup.order == 'DESC'));
        // object.list = result;
      // } else {
        // notification.notify("Can't load list of inventory warehouses", 0);
      // }
      // return response
    // } , error=>{
        // notification.server_error
    // });
  }

  get_single_product_by_barcode(barcode, products) {
    return this.http.get(environment.baseUrl + '/products/'+null+'.json?barcode=' + barcode).subscribe((response:any)=>{
      products.single = {};
      if (response.product) {
        products.single = response.product;
      }
      else {
        // notification.notify('Cannot find product with barcode: ' + barcode, 0);
      }
    },error=>{
      // notification.server_error
    })
  }

  generate_barcode_slip(id){
    var urls = environment.baseUrl + '/products/' + id + '/generate_barcode_slip.pdf';
    return this.http.get(environment.baseUrl)
    .subscribe((response:any)=> {
       var fileURL = JSON.stringify(response);
       URL = JSON.parse(fileURL);
       window.open(environment.baseUrl)
    },error=>{
      // function(response) {
    });
  }

  post_receive_or_recount_inventory(inventory_manager_obj) {
    var urls = environment.baseUrl + '/products/'+inventory_manager_obj.single.id+'/adjust_available_inventory.json';
    return this.http.put(urls, inventory_manager_obj.single).subscribe((response:any)=>{
        if (!response.status) {
          // notification.notify(data.error_messages, 0);
        }
      },error=>{
        // notification.server_error
      })
  }

  update_list(action, products) {
    if (['update_status', 'delete', 'duplicate', 'barcode', 'receiving_label', 'barcode_label', 'update_per_product'].indexOf(action) != -1) {
      products.setup.productArray = [];
      for (var i = 0; i < products.selected.length; i++) {
        if (products.selected[i].checked == true) {
          products.setup.productArray.push({id: products.selected[i].id});
        }
      }

      if (products.setup.productArray<1 && !products.setup.select_all) {
        // notification.notify("Please select products to perform this action.", 0);
        return;
      }

      var url = '';
      if (action == "delete") {
        url = environment.baseUrl + '/products/delete_product.json';
      } else if (action == "duplicate") {
        url = environment.baseUrl + '/products/duplicate_product.json';
      } else if (action == "update_status") {
        url = environment.baseUrl + '/products/change_product_status.json';
      } else if (action == "barcode") {
        url = environment.baseUrl + '/products/generate_barcode.json';
      } else if (action == "barcode_label") {
        url = environment.baseUrl + '/products/print_product_barcode_label.json';
      } else if (action == "receiving_label") {
        url = environment.baseUrl + '/products/print_receiving_label.json';
      } else if (action == 'update_per_product') {
        url = environment.baseUrl + '/products/scan_per_product.json';
      }

      return this.http.post(url, products.setup).subscribe((response:any)=>{
        if (response) {
          // notification.notify(success_messages[action], 1);
          products.setup.select_all = false;
          products.setup.inverted = false;
          products.selected = [];
          var URL: {
            url: ''
          }
          if (action == "receiving_label" && response.url != undefined ) {
            var fileURL = JSON.stringify(response);
            URL = JSON.parse(fileURL);
            window.open(URL.url)
          } else if (action == "barcode_label" && response.url != undefined ) {
            var fileURL = JSON.stringify(response);
            URL = JSON.parse(fileURL);
            window.open(URL.url)
          }
        } else {
          // notification.notify(response.messages, 0);
        }
      },error=>{
        // notification.server_error
      })
    }
  }

  get_csv_maps(){
    return this.http.get(environment.baseUrl + '/stores/csv_map_data.json')
  }

  ebay_sign_in_url() {
    return this.http.get(environment.baseUrl + '/stores/get_ebay_signin_url.json')
  }

  ebay_token_fetch() {
    return this.http.get(environment.baseUrl + '/stores/ebay_user_fetch_token.json')
  }
}

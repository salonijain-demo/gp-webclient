import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { async } from '@angular/core/testing';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  access_token =  localStorage.getItem('access_token');
  
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': "Bearer " + this.access_token
    })
  }

  url = "http://mydev.localpackerapi.com";
  responses:any;
  response:any;
  can_load_products: boolean;
  page_exists:number;

  constructor(
    private http: HttpClient
  ) { }

  async get_product(){
    await this.http.get<any>(this.url+ '/products/get_inventory_setting.json', this.httpOptions).toPromise().then((response:any)=>
    {
      try{
        response.setting.time_to_send_report_email = response.setting.time_to_send_report_email.replace("T", " ").replace("Z", "");
      } catch(e){
        response.setting.time_to_send_report_email = new Date().toString().split("GMT")[0];
      }
      return this.responses = {
        inventory_report_toggle: response.inventory_report_toggle,
        inventory_report_settings: response.setting,
        inventory_report_products: response.products,
        start_time: response.setting.start_time,
        end_time: response.setting.end_time
      };
    });
  }

  async get_product_list(products, page){
  
      var url = '';
      var setup = products.setup;
      if (typeof page != 'undefined' && page > 0) {
        page = page - 1;
      } else {
        page = 0;
      }
      try{
        // products.ctrlKey = event.ctrlKey;
      } catch(e){}
      products.setup.offset = page * products.setup.limit;
      if (setup.search == '') {
        url = this.url + '/products.json?filter=' + setup.filter + '&sort=' + setup.sort + '&order=' + setup.order;
      } else {
        url = this.url + '/products/search.json?' + 'search='+ setup.search +'&sort='+setup.sort+ '&order=' + setup.order;
      }
      if(products.setup.report_id) {
        url = this.url +'/products/get_report_products?report_id=' + products.setup.report_id + '&filter=' + setup.filter + '&sort=' + setup.sort + '&order=' + setup.order + '&search=' + setup.search;
      }
      url += '&is_kit=' + setup.is_kit + '&limit=' + setup.limit + '&offset=' + setup.offset;
      await this.http.get<any>(url,this.httpOptions).toPromise().then((response:any)=>
        {
          if (response.status) {
            products.load_new = (response.products.length > 0);
            products.products_count = response.products_count;
            products.list = response.products;
            products.current = false;
            if (products.setup.select_all) {
              products.selected = [];
            }
            for (var i = 0; i < products.list.length; i++) {
              if (products.ctrlKey == true){
                products.list[i].checked =  true;
              }
              if (products.single && typeof products.single['basicinfo'] != "undefined") {
                if (products.list[i].id == products.single.basicinfo.id) {
                  products.current = i;
                }
              }
              if (products.setup.select_all) {
                products.list[i].checked = products.setup.select_all;
                this.select_single(products, products.list[i]);
              } else {
                for (var j = 0; j < products.selected.length; j++) {
                  if (products.list[i].id == products.selected[j].id) {
                    products.list[i].checked = products.selected[j].checked;
                    break;
                  }
                }
              }
            }
          } else {
            // notification.notify("Can't load list of products", 0);
          }

          // if (this.ctrlKey == true){
          //   products.selected.push(products.list);
          //   products.selected = [].concat.apply([], products.selected);
          // }
          this.can_load_products = true;
          this.page_exists = page;
          return this.response = {
            response: response
          }
        }, error=>{
          // notification.server_error
          this.can_load_products = true;
        })
    }
  
    select_single(products, row) {
      var found = false;
      for (var i = 0; i < products.selected.length; i++) {
        if (products.selected[i].id == row.id) {
          var founds = i;
          break;
        }
      }
      if (found !== false) {
        if (!row.checked) {
          products.selected.splice(found, 1);
        }
      } else {
        if (row.checked) {
          products.selected.push(row);
        }
      }
    }

    get_single_product(id) {
      return this.http.get(this.url + '/products/' + id + '.json',this.httpOptions)
    }

    update_single(products, auto) {
      if (typeof auto !== "boolean") {
        auto = true;
      }
      return this.http.put(this.url + '/products/'+products.single.basicinfo.id+'.json', products.single, this.httpOptions)
    }

    update_list(action, products) {
      if (['update_status', 'delete', 'duplicate', 'barcode', 'receiving_label', 'barcode_label', 'update_per_product'].indexOf(action) != -1) {
        products.setup.productArray = [];
        for (var i = 0; i < products.selected.length; i++) {
          // if (products.selected[i].checked == true) {
            products.setup.productArray.push({id: products.selected[i].id});
          // }
        }

        if (products.setup.productArray<1 && !products.setup.select_all) {
          // notification.notify("Please select products to perform this action.", 0);
          // return;
        }

        var url = '';
        if (action == "delete") {
          url = this.url + '/products/delete_product.json';
        } else if (action == "duplicate") {
          url = this.url + '/products/duplicate_product.json';
        } else if (action == "update_status") {
          url = this.url + '/products/change_product_status.json';
        } else if (action == "barcode") {
          url = this.url + '/products/generate_barcode.json';
        } else if (action == "barcode_label") {
          url = this.url + '/products/print_product_barcode_label.json';
        } else if (action == "receiving_label") {
          url = this.url + '/products/print_receiving_label.json';
        } else if (action == 'update_per_product') {
          url = this.url + '/products/scan_per_product.json';
        }
        return this.http.post(url, products.setup,this.httpOptions)
      }
    }

    single_add_item(orders, ids) {
      var product_ids = [];
      debugger
      product_ids.push(orders[0][0].ProductId)

      return this.http.post(this.url + "/orders/" + ids + "/add_item_to_order.json", {productids: product_ids, qty: 1},this.httpOptions)
      //   function (data) {
      //     if (data.status) {
      //       notification.notify("Item Successfully Added", 1);
      //     } else {
      //       notification.notify("Error adding", 0);
      //     }
      //   }
      // ).error(notification.server_error);
    }
  
    single_remove_item(ids) {
      return this.http.post(this.url + "/orders/remove_item_from_order.json", {orderitem: ids},this.httpOptions)
      //   function (data) {
      //     if (data.status) {
      //       notification.notify("Item Successfully Removed", 1);
      //     } else {
      //       notification.notify(data.messages, 0);
      //     }
      //   }
      // ).error(notification.server_error);
    }
  }
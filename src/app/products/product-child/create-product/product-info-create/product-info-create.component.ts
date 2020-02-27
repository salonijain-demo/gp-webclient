import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-info-create',
  templateUrl: './product-info-create.component.html',
  styleUrls: ['./product-info-create.component.scss']
})
export class ProductInfoCreateComponent implements OnInit {
  
  @Output()idEmit = new EventEmitter<object>();

  basicInfoId: any;
  single = {};
  products = {
    list: [],
    selected: [],
    single: {},
    load_new: true,
    current: 0,
    setup: {
      sort: "",
      order: "DESC",
      filter: "all",
      search: '',
      select_all: false,
      inverted: false,
      is_kit: 0,
      limit: 20,
      offset: 0,
      //for per product setting only
      setting: '',
      //used for updating only
      status: '',
      productArray: []
    },
    products_count: {}
  }

  inventory_record_time = {
    start: {
      open: false,
      time: new Date()
    },
    end: {
      open: false,
      time: new Date()
    }
  }
  do_load_products = false;
  can_load_products = true;
  page_exists = -1;
  initializing = true;
  inventory_report_toggle: boolean;
  inventory_report_settings: any;
  inventory_report_products: any;
  page= 1;  
  productList: any;
  update_state:boolean;
  id: Number;
  // changeProductToKit = false;

  constructor(
    private productService: ProductService
  ) { }

  ngOnInit() {
    this.get_product();
    
  }
  async get_product(){
    await this.productService.get_product()
    this.inventory_report_toggle = this.productService.responses.inventory_report_toggle;
    this.inventory_report_settings = this.productService.responses.setting;
    this.inventory_report_products = this.productService.responses.products;
    this.inventory_record_time.start.time = this.productService.responses.start_time
    this.inventory_record_time.end.time = this.productService.responses.end_time
    this.get_products_list(this.page);
  }

  async get_products_list(page) {
    if(typeof page != 'undefined' && this.page_exists.toString() === page.toString()){
      return;
    }
   
    if (this.can_load_products) {
      this.can_load_products = false;
      await this.productService.get_product_list(this.products, this.page)
      this.productList = this.productService.response.response.products
    } else {
      this.do_load_products = page;
    }
    this.product_single_details(this.products,undefined,true);
  }

  can_do_load_products() {
    if (this.can_load_products && this.do_load_products) {
      this.get_products_list(this.do_load_products);
      this.do_load_products = false;
    }
  }

  product_single_details(products,id,auto){
    if(products){
      this.id=  ++products.products_count.all;
    }
    if(this.id){
      this.idEmit.emit(this.id)
      this.productService.get_single_product(this.id).subscribe((response:any)=>{
      if (response.product) {
        if (!auto) {
          //if (basicinfo_changed(products.single['basicinfo'], response.product.basicinfo) &&
          //  products.single['barcodes'].length == response.product.barcodes.length &&
          //  products.single['cats'].length == response.product.cats.length &&
          //  products.single['inventory_warehouses'].length == response.product.inventory_warehouses.length &&
          //  products.single['skus'].length == response.product.skus.length) {
            this.products.single = {};
            this.products.single = response.product;
          //}
        }else {
          if (typeof products.single['basicinfo'] != "undefined" && response.product.basicinfo.id == products.single.basicinfo.id) {
            // angular.extend(products.single, response.product);
          }else {
            
            // if (typeof new_rollback == 'boolean' && new_rollback) {
            //   this.single = {};
            //   angular.copy(this.products.single, this.single);
            // }
            var multipackbarcode_count;
            multipackbarcode_count = Object.keys(response.product.basicinfo.multibarcode).length
            if (multipackbarcode_count == 0) {
              response.product.basicinfo.multibarcode[1] = {"barcode":null,"packcount":1, "id":null};
            }
            this.products.single = {};
            this.products.single = response.product;
            this.basicInfoId = response.product.basicinfo.id
          }
        }
      } else {
        
        this.products.single = {};
      }
      
      // this.products.single = products.single;
    }),error=>{
      // notification.server_error).success(editable.force_exit).error(editable.force_exit)
    }
   }
  }

  update_single_product(){
    // this.changeProductToKit = true;
    var auto = true;
    // this.products.single.post_fn = post_fn;
    this.productService.update_single(this.products,auto).subscribe((response:any) =>
    {
    if (response.exist_barcode){
      // notification.notify("Already existing barcode", 0);
    } else if (response.status) {
      if (!auto) {
        // notification.notify("Successfully Updated", 1);
      }
    } else {
      if (response.message) {
        // notification.notify(response.message, 0);
      } else {
        // notification.notify("Some error Occurred", 0);
      }
    }
    this.product_single_details(undefined,this.basicInfoId,true);
  },error => {
    // notification.server_error
  })
  }


  // change_setting(key, value) {
  //   this.products.single.basicinfo[key] = value;
  //   this.update_single_product();
  // }
}
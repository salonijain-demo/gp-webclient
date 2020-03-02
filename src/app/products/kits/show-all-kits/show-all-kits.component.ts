import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-show-all-kits',
  templateUrl: './show-all-kits.component.html',
  styleUrls: ['./show-all-kits.component.scss']
})
export class ShowAllKitsComponent implements OnInit {

  @Output()
  productSelected = new EventEmitter<any>();

  @Input()
  search_data:string

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
      is_kit: 1,
      limit: 20,
      offset: 0,
      setting: '',
      status: '',
      productArray: []
    },
    products_count: {}
  };

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

  constructor(
    private productService: ProductService
  ) { }

  ngOnInit() {
    this.get_product();
  }
  
  ngOnChanges(){
    this.products.setup.search = this.search_data
    this.get_search_data()
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
  }

  can_do_load_products() {
    if (this.can_load_products && this.do_load_products) {
      this.get_products_list(this.do_load_products);
      this.do_load_products = false;
    }
  }

  getProductSelected(e){
    var product = [];
    e.forEach(element => {
      product.push(this.productList[element])
    })
    this.productSelected.emit(product)
  }

  get_search_data(){
    this.productService.get_product_list(this.products,this.page)
    var response = this.productService.response.response
    if (response.status) {
      this.productList = response.products
    }
  }
}

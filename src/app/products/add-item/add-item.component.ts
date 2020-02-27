import { Component, OnInit, EventEmitter, Output,Input } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.scss']
})
export class AddItemComponent implements OnInit {
  
  // @Output()
  // productSelected = new EventEmitter<any>();

  @Input()
  orderItems:boolean;

  allowToAddItems:any;
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

  do_load_products = false;
  can_load_products = true;
  page_exists = -1;
  page= 1;  
  productList: any;
  productSelected=[];

  constructor(
    private productService: ProductService
  ) { }

  ngOnInit() {
    debugger
    this.get_products_list(this.page)
  }
  
  ngOnChanges(){
    this.allowToAddItems = this.orderItems
    debugger
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

  getProductSelected(event){
    var product = [];
    // e.forEach(element => {
    //   product.push(this.productList[element])
    // })
    product.push(event)
    this.productSelected = product
    debugger
    if(this.allowToAddItems && this.productSelected){
      this.addItems()
    }
    // this.productSelected.emit(product)
  }

  addItems(){
    if(this.allowToAddItems && this.productSelected){
      this.productService.single_add_item(this.productSelected,this.allowToAddItems.id).subscribe((response)=>{
        debugger
      })
    }
  }
}

import { Component, OnInit, Input } from '@angular/core';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-show-orders',
  templateUrl: './show-orders.component.html',
  styleUrls: ['./show-orders.component.scss']
})
export class ShowOrdersComponent implements OnInit {

  @Input()
  order:any
  search:''
  showDropdownSelect: boolean = false;
  selectAll: boolean = true;
  orders = {
    list: [],
    selected: [],
    single: {},
    load_new: true,
    current: 0,
    setup: {
      sort: "",
      order: "DESC",
      filter: "awaiting",
      search: '',
      select_all: false,
      inverted: false,
      limit: 20,
      offset: 0,
      status: '',
      reallocate_inventory: false,
      orderArray: []
    },
    orders_count: {},
    product_search_toggle: ''
  }
  
  constructor(
    private orderService: OrderService
  ) { }

  ngOnInit(){ }

  ngOnChanges(){
    this.orders = this.order
  }

  showDropdown(value){
    this.showDropdownSelect = value;
  }

  showSelect(){
    this.selectAll = !this.selectAll;
  }

  actionListener(action){
    this.orderService.sendDataToOtherComponent(action)
  }

  get_search_data(event){
    this.orderService.sendDataToOtherComponent(event)
  }
}
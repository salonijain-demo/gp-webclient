import { Component, OnInit, Input } from '@angular/core';
import { OrderService } from 'src/app/services/order.service';
import { paramsModel, toParams } from 'src/app/interfaces/order';

@Component({
  selector: 'app-activities-order',
  templateUrl: './activities-order.component.html',
  styleUrls: ['./activities-order.component.scss']
})
export class ActivitiesOrderComponent implements OnInit {

  @Input()
  created_order:any

  selected_box = [];
  basic_order;
  private params: paramsModel = {
    filter : '',
  }

  private toParams: toParams = {
    order_id: '',
    new_order: false
  }

  orders= {
    list: [],
    selected: [],
    single: {
      basicinfo: {},
      users: [],
      boxes: [],
      exception: {
        assoc: {
          id: null
        },
        reason: ''
      }
    },
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
    private orderService : OrderService
  ) { }

  ngOnInit() {
  }

  ngOnChanges(){
    this.orders.single.basicinfo = this.created_order;
  }
  
  get_single_order(id,new_rollback){
  this.orderService.get_single(id).subscribe((response:any)=> {
    // this.orders.single = null
    if (response.order) {
      //data.order.basicinfo.order_placed_time = new Date(data.order.basicinfo.order_placed_time);
      if (response.order.basicinfo.order_placed_time != null) {
        response.order.basicinfo.order_placed_time = response.order.basicinfo.order_placed_time.replace("Z", ""); 
      }
      this.orders.single = response.order
    }
    var user_found = false;
    var currentuser_idx = -1;
    for (var i = 0; i < this.orders.single.users.length; i++) {
      if (this.orders.single.exception != null &&
        this.orders.single.exception.assoc != null &&
        this.orders.single.users[i].id == this.orders.single.exception.assoc.id) {
        this.orders.single.exception.assoc = this.orders.single.users[i];
        user_found = true;
        break;
      }
    }
    if(this.orders.single.boxes.length > 0){
      this.selected_box.push(this.orders.single.boxes[0].id);
    }
    if (typeof new_rollback == 'boolean' && new_rollback) {
      // myscope.single = {};
      // angular.copy(scope.orders.single, myscope.single);
    }
  }, error=>{
    // notification.server_error
  })
  }

  get_setting(){
    this.orderService.get_setting().subscribe((response:any)=>{
    })
  }
  
  update_order_exception() {
    this.orderService.single_record_exception(this.orders).subscribe((response:any)=>{
      if (response.status) {
        // notification.notify("Exception successfully recorded", 1);
      } else {
        // notification.notify(data.messages, 0);
      }
    },error=>{
      // notification.server_error
      // myscope.order_single_details(scope.orders.single.basicinfo.id);
    })
  }

  clear_order_exception() {
    this.orderService.single_clear_exception(this.orders).subscribe((response:any)=>{
      if (response.status) {
        // notification.notify("Exception successfully cleared", 1);
      } else {
        // notification.notify(data.messages, 0);
      }
    },error=>{
      // notification.server_error
      // myscope.order_single_details(scope.orders.single.basicinfo.id);
    })
  }
}
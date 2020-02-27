import { Component, OnInit, Input,Output,EventEmitter } from '@angular/core';
import { paramsModel, toParams } from 'src/app/interfaces/order';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-information-order',
  templateUrl: './information-order.component.html',
  styleUrls: ['./information-order.component.scss']
})
export class InformationOrderComponent implements OnInit {

  @Input()
  created_order:any

  @Output()
  allowToProceedOrder = new EventEmitter<boolean>();

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
        }
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

  update_single_order(){
    // scope.update_single_order = function (auto) {
      // if ($state.params.new_order && this.orders.single.basicinfo.increment_id == "") {
      //   doConfirm("Please click continue to assign an order number and save the order, or click delete to exit and cancel order creation.", function yes(){alert("YEs") }, function no(){ alert("no")
      //   });
      // } else {
        // scope.date_picker.show_button = false;
        this.orderService.orders_update(this.orders.single.basicinfo,true).subscribe((response:any)=>{
          if(response){
            this.allowToProceedOrder.emit(true);
            this.get_single_order(this.basic_order.id, true);
            this.get_list();
          }
        })
      }
    // }
  // }

  get_list(){
    var page = 1;
    this.orderService.get_list(this.orders, page, undefined).subscribe((response:any)=>{
        if (response.status) {
          this.orders.load_new = (response.orders.length > 0);
          this.orders.orders_count = response.orders_count;
          this.orders.list = response.orders;
          for (var i = 0; i < this.orders.list.length; i++) {
            if (this.orders.list[i].order_date!= null) {
              this.orders.list[i].order_date = this.orders.list[i].order_date.replace("Z", "");
            }
          } 
          
          // this.orders.current = false;
          if (this.orders.setup.select_all) {
            this.orders.selected = [];
          }
          for (var i = 0; i < this.orders.list.length; i++) {
            // if (this.orders.ctrlKey == true){
            //   this.orders.list[i].checked =  true;
            // }
            if (this.orders.single && typeof this.orders.single['basicinfo'] != "undefined") {
              if (this.orders.list[i].id == this.basic_order.id) {
                this.orders.current = i;
              }
            }
            if (this.orders.setup.select_all) {
              this.orders.list[i].checked = this.orders.setup.select_all;
            } else {
              for (var j = 0; j < this.orders.selected.length; j++) {
                if (this.orders.list[i].id == this.orders.selected[j].id) {
                  this.orders.list[i].checked = this.orders.selected[j].checked;
                  break;
                }
              }
            }
          }
        } else {
          // notification.notify("Can't load list of orders", 0);
        }
      }, error=>{
        // notification.server_error
      })
  }
}

import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { CreateOrderComponent } from '../create-order.component';
import { OrderService } from 'src/app/services/order.service';
import { paramsModel,toParams } from 'src/app/interfaces/order';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-items-order',
  templateUrl: './items-order.component.html',
  styleUrls: ['./items-order.component.scss']
})
export class ItemsOrderComponent implements OnInit {

  @Output()
  created_order = new EventEmitter<any>();
  
  @Input()
  allowToProceedOrder:boolean;
  
  selected_box = [];
  selectedItems = [];

  private params: paramsModel = {
    filter : ''
  }

  private toParams: toParams = {
    order_id: '',
    new_order: false
  }

  modalReference:any;
  modalOptions: NgbModalOptions = {
    windowClass: 'in',
    backdrop: 'static',
    keyboard: false
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
      },
      items: []
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
  orderItems={
    canAddItem: false,
    id: undefined
  };

  constructor(
    private orderService : OrderService,
    private modalService : NgbModal
  ) { }

  ngOnInit() {
    this.create_order();
  }

  ngOnChanges(){
    this.orderItems.canAddItem = this.allowToProceedOrder
  }

  create_order() {
    this.orders.setup.search = '';
    this.orderService.create_single(this.orders).subscribe((response:any)=>{
      // this.orders.single = null
      if (response.status) {
        debugger
        this.params.filter = 'onhold';
        response.order.new_order = true;
        this.orders.single.basicinfo = response.order;
        this.created_order.emit(response.order)
        this.get_single_order(response.order.id,true);
        this.handle_click_fn_for_new_order(response.order, undefined);
      }
      if (!response.status) {
        // notification.notify(response.messages, 0);
      }
    })
  }

  handle_click_fn_for_new_order(row, event) {
    if (typeof event != 'undefined') {
      event.stopPropagation();
    }
    var toState = 'orders.filter.page.single';
    var toParams = {};
    // for (var key in $state.params) {
    //   if (['type', 'filter', 'page'].indexOf(key) != -1) {
    //     this.toParams[key] = $state.params[key];
    //   }
    // }
    this.toParams.order_id = row.id;
    if (row.new_order) {
      this.toParams.new_order = true;
    }
    this.toParams.order_id = row.id;
    this.select_all_toggle(false);
    // $state.go(toState, toParams);
  }

  select_all_toggle(val) {
    this.orders.setup.select_all = !!val;
    // myscope.invert(false);
    this.orders.selected = [];
    for (var i = 0; i < this.orders.list.length; i++) {
      // this.orders.list[i].checked = this.orders.setup.select_all;
      if (this.orders.setup.select_all) {
        // this.select_single(this.orders.list[i]);
      }
    }
  }

  get_single_order(id,new_rollback){
  this.orderService.get_single(id).subscribe((response:any)=> {
    this.orders.single = null
    if (response.order) {
      debugger
      //data.order.basicinfo.order_placed_time = new Date(data.order.basicinfo.order_placed_time);
      if (response.order.basicinfo.order_placed_time != null) {
        response.order.basicinfo.order_placed_time = response.order.basicinfo.order_placed_time.replace("Z", ""); 
      }
      this.orders.single = response.order
      this.orderItems.id = response.order.basicinfo.id
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

  item_order(content) {
   this.openModal(content)
   debugger
  }
  // ,type, exceptions, id

  openModal(content){
    this.modalReference = this.modalService.open(content,this.modalOptions);
  }
  
  closeModal(){
    this.modalReference.close();
  }

  cancel(){
    this.closeModal();
  }
}

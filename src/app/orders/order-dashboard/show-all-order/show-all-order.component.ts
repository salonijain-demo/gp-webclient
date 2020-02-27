import { Component, OnInit, Output, EventEmitter, Input, OnDestroy } from '@angular/core';
import { OrderService } from 'src/app/services/order.service';
import { ActivatedRoute } from '@angular/router';
import { paramsModel, allowStatusChanges, generalSettings, Options, gridOptions } from 'src/app/interfaces/order';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-show-all-order',
  templateUrl: './show-all-order.component.html',
  styleUrls: ['./show-all-order.component.scss']
})
export class ShowAllOrderComponent implements OnInit, OnDestroy {

  @Output()
  order = new EventEmitter<any>();

  private subscription: Subscription;
  orderTypeValue:string;
  orderSelected:any;
  orderData:any;
  url: string;
  ctrlKey: boolean = false;
  childStateParams= {
    filter: 'all',
    page: 1
  }
  editedData:any;
  page:number = 1;
  page_exists:number = -1;
  product_search_toggle = undefined;

  private params: paramsModel = {
    filter : ''
  }

  orders={
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
      limit: 20,
      offset: 0,
      status: '',
      reallocate_inventory: false,
      orderArray: []
    },
    orders_count: {},
    product_search_toggle: ''
  }

  private allowStatusChanges: allowStatusChanges = {
    scanned: true,
    cancelled: true
  }

  canLoadOrders = true;
  doLoadOrders: boolean;

  private generalSettings: generalSettings = {
    single: {
      customFieldOne: '',
      customFieldTwo: '',
      searchByProduct: ''
    }
  }

  private options: Options = {
    idle: 0
  }

  private gridOptions: gridOptions = {
    paginate:{
      total_items: 0,
      show: true
    },
    selections: {
      selected_count: 0
    },
    allFields: {
      customFieldOne: {
        name: '',
        hidden: true,
        col_length: 20,
        enable_edit: true
      },
      customFieldTwo: {
        name: '',
        hidden: true,
        col_length: 20,
        enable_edit: true
      }
    }
  }

  constructor(
    private activatedRoute: ActivatedRoute,
    private orderService: OrderService
  ) {
    this.subscription = this.orderService.getMessage().subscribe(receiveddata=>{
      debugger
      // if(this.orders.selected && receiveddata == 'export_items') {
      //   this.generate_orders_items_list();
      //   this.get_orders(this.page);
      // }else
      console.log('receive data', this.orders)
       if(this.orders.selected && receiveddata == 'delete') {
        this.order_delete();
        // this.get_orders(this.page);
        // this.orders.selected = [];
      }
      // else if(this.orders.selected && receiveddata == 'duplicate') {
      //   this.order_duplicate();
      //   this.get_orders(this.page);
      // }
      // else if(this.orders.selected && (receiveddata == 'cancelled'
      //   || receiveddata == 'scanned' || receiveddata == 'serviceissue'
      //   || receiveddata == 'awaiting')) {
      //   this.order_change_status(receiveddata);
      //   this.get_orders(this.page);
      // }
    })
  }

  ngOnInit() {
    // this.childStateParams = { filter: this.activatedRoute.snapshot.queryParams.filter,
    //   page: this.activatedRoute.snapshot.queryParams.page }
    this.setup_child(this.childStateParams);
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

  setup_child(childStateParams){
    this.params.filter = childStateParams.filter;
    if (typeof childStateParams['filter'] != 'undefined') {
      this.update_setup(this.orders.setup, 'filter', childStateParams['filter']);
    } else if (typeof childStateParams['search'] != 'undefined') {
      this.update_setup(this.orders.setup, 'search', childStateParams['search']);
    }
    if (typeof childStateParams['page'] == 'undefined' || childStateParams['page'] <= 0) {
      childStateParams['page'] = 1
    }
    this.get_orders(childStateParams['page']);
  }
  
  update_setup(setup, type, value) {
    if (type == 'sort') {
      if (setup[type] == value) {
        if (setup.order == "DESC") {
          setup.order = "ASC";
        } else {
          setup.order = "DESC";
        }
      } else {
        setup.order = "DESC";
      }
    }
    setup[type] = value;
    return setup;
  }
  
  get_orders(page) {
    // if(typeof page != 'undefined' && this.page_exists.toString() === page.toString()){
    //   return;
    // }

    if (typeof page == 'undefined') {
      // page = $state.params.page;
      page = 1;
    }
    // try{
    //   $scope.ctrlKey = event.ctrlKey;
    // } catch (e){}
    this.reset_change_status();
    if (this.canLoadOrders) {
      this.canLoadOrders = false;
      // var product_search_toggle = this.generalSettings.single.searchByProduct;

      var params = {
        filter: this.orders.setup.filter,
        sort: this.orders.setup.sort,
        order: this.orders.setup.order
      }

      this.url ='http://mydev.localpackerapi.com' + '/orders.json?' + 'filter=' +params.filter+'&sort='+params.sort+'&order='+params.order;
      debugger
      return this.orderService.get_list_order(this.url).subscribe( (response: any) =>
        {
          debugger
          if (this.ctrlKey == true){
            // this.order.selected.push(this.order.list);
            this.orders.selected = [].concat.apply([], this.orders.selected);
          }
          this.gridOptions.paginate.total_items = this.total_items_list(this.orders);
          this.update_selected_count();
          // this.update_table_accordian_width();
          this.canLoadOrders = true;
          this.page_exists = page;
          this.orderData=response;
          debugger
          this.order.emit(response);
        }, error => {
          this.canLoadOrders = true;
        })
    } else {
      this.doLoadOrders = page;

      // var req = $q.defer();
      // req.resolve();
      // return req.promise;
    }
  }

  reset_change_status() {
    this.allowStatusChanges.cancelled = this.params.filter != "scanned";
    this.allowStatusChanges.scanned = this.params.filter != "cancelled"
  }

  total_items_list(orders) {
    var total_items;
    if (orders.setup.search != "") {
      total_items = orders.orders_count['search'];
    } else {
      total_items = orders.orders_count[orders.setup['filter']];
    }
    if (typeof total_items == 'undefined') {
      total_items = 0;
    }
    return total_items;
  }
  
  update_selected_count() {
    if (this.orders.setup.inverted && this.gridOptions.paginate.show) {
      this.gridOptions.selections.selected_count = this.gridOptions.paginate.total_items - this.orders.selected.length;
    } else {
      this.gridOptions.selections.selected_count = this.orders.selected.length;
    }
  }

  order_delete(){
    console.log(this.orders)
    this.orderService.update_list('delete', this.orders).subscribe((response:any)=>{
      if (response.status) {
        debugger
        this.orders.setup.select_all = false;
        this.orders.setup.inverted = false;
        this.orders.selected = [];
        // setTimeout(()=>{
          // alert()
          this.get_orders(this.page);
        // }, 5000)
        // notification.notify(success_messages[action], 1);
        // notification.notify(data.notice_messages, 2);
      } else {
        // notification.notify(data.error_messages, 0);
      }
      // this.get_orders(this.page);
    },error=>{
      // notification.server_error
    })
  }

  order_change_status(status) {
    // if ($state.params.filter == "scanned") {
    //   this.orders.setup.reallocate_inventory = confirm("Should inventory deduct from available for allocation?");
    // }
    this.orders.setup.status = status;
    this.orderService.update_list('update_status', this.orders).subscribe((response:any)=>{
      this.orders.setup.status = "";
      this.get_orders(this.page);
    })
  }

  order_duplicate() {
    this.orderService.update_list('duplicate', this.orders).subscribe((response:any)=>{
      this.orders.selected = [];
      if (response.status) {
        this.orders.setup.select_all = false;
        this.orders.setup.inverted = false;
        // notification.notify(success_messages[action], 1);
        // notification.notify(data.notice_messages, 2);
      } else {
        // notification.notify(data.error_messages, 0);
      }
      this.get_orders(this.page);
    }, error=>{
      // notification.server_error
    })
  }

  generate_orders_pick_list() {
    this.orderService.generate_list('pick_list', this.orders).subscribe((response:any)=>{
      window.open(response.url);
      window.open(response.data.pick_list_file_paths);
    },error=>{
      // notification.server_error
    })
  }

  generate_orders_items_list() {
    this.orderService.generate_list('items_list', this.orders).subscribe((response:any)=>{
      if (response['status']) {
        if (response.filename != '') {
          window.open(response.filename);
        }
      } else {
        // notification.notify(response['messages']);
      }
    })
  }

  generate_orders_packing_slip() {
    // this.orders.html_print = this.general_settings.single.html_print;

    this.orderService.generate_list('packing_slip', this.orders).subscribe((response:any)=>{
    })
  }

  generate_product_barcode_slip() {
    this.orderService.generate_list('barcode_slip', this.orders).subscribe((response:any)=>{
    })
  }

  generate_orders_pick_list_and_packing_slip() {
    this.orderService.generate_list('pick_list', this.orders).subscribe((response:any)=>{
    })
    this.orderService.generate_list('packing_slip', this.orders).subscribe((response:any)=>{
    })
  }

  getOrderSelected(event){
    this.orders.selected = event;
    console.log('first selcted',this.orders.selected)
  }

  getEditedData(event){
    this.editedData={
      'id': this.orders.selected[0].id,
      'var': event.name,
      'value': event.value
    }
    console.log(this.orders.selected[0].id , this.editedData)
    this.orderService.update_order_list(this.editedData).subscribe(response =>{
      this.orders.selected = []
    })
  }
}

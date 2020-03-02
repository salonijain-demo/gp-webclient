import { Component, OnInit,Output, EventEmitter, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { paramsModel, allowStatusChanges, generalSettings, Options, gridOptions } from 'src/app/interfaces/order';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-service-issue-order',
  templateUrl: './service-issue-order.component.html',
  styleUrls: ['./service-issue-order.component.scss']
})
export class ServiceIssueOrderComponent implements OnInit {

  @Output()
  orderSelected = new EventEmitter<any>();

  @Output()
  order = new EventEmitter<any>();
  
  editedData:any;
  childStateParams={
    filter: 'serviceissue',
    page: 1
  };
  orderData:any;
  url: string;
  ctrlKey: boolean = false;
  page:number = 1;
  page_exists:number = -1;
  product_search_toggle = undefined;

  private params: paramsModel = {
    filter : ''
  };

  private orders= {
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
    this.orderService.getMessage().subscribe(receiveddata=>{
      if(this.orders.selected && receiveddata == 'export_items') {
        this.generate_orders_items_list();
      }else
       if(this.orders.selected && receiveddata == 'delete') {
        this.order_delete();
      }
      else if(this.orders.selected && receiveddata == 'duplicate') {
        this.order_duplicate();
      }
      else if(this.orders.selected && (receiveddata == 'cancelled'
        || receiveddata == 'scanned' || receiveddata == 'serviceissue'
        || receiveddata == 'awaiting')) {
        this.order_change_status(receiveddata);
      }
      else{
        if(receiveddata !== ''){
          this.orders.setup.search = receiveddata
          this.get_search_data()
        }
      }
    })
   }

  ngOnInit() {
    this.setup_child(this.childStateParams);
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
    };
  
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
        return this.orderService.get_list_order(this.url).subscribe( (response: any) =>
          {
      
            if (this.ctrlKey == true){
              // this.orders.selected.push(this.orders.list);
              this.orders.selected = [].concat.apply([], this.orders.selected);
            }
      
            this.gridOptions.paginate.total_items = this.total_items_list(this.orders);
            this.update_selected_count();
            // this.update_table_accordian_width();
            this.canLoadOrders = true;
            this.page_exists = page;
            // this.orderData.push(response);
            this.orderData = response;
            this.order.emit(response);
          }, error => {
            this.canLoadOrders = true;
          });
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

    getOrderSelected(e){
      var orders = [];
      e.forEach(element => {
        orders.push(this.orderData.orders[element])
      })
      this.orderSelected.emit(orders)
    }

    getEditedData(event){
      this.editedData={
        'id': this.orders.selected[0].id,
        'var': event.name,
        'value': event.value
      }
      this.orderService.update_order_list(this.editedData).subscribe(response =>{
        this.orders.selected = []
      })
    }
    
    order_delete(){
      this.orderService.update_list('delete', this.orders).subscribe((response:any)=>{
        if (response.status) {
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


    get_search_data(){
      this.orderService.get_list(this.orders,this.page,false).subscribe((response:any)=>{
        if (response.status) {
          this.orderData = response
        }
      })
    }
}

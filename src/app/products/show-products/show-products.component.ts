import { Component, OnInit, Input } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-show-products',
  templateUrl: './show-products.component.html',
  styleUrls: ['./show-products.component.scss']
})
export class ShowProductsComponent implements OnInit {

  @Input()
  productSelected: any;

  showDropdownSelect: boolean = false;
  selectAll: boolean = true;
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
  page= 1;  
  productList: any;
  page_exists = -1;

  constructor(
    private productService: ProductService
  ) { }

  ngOnInit() {
  }

  showDropdown(value){
    this.showDropdownSelect = value;
  }

  showSelect(){
    this.selectAll = !this.selectAll;
  }

  ngOnChanges(){
    this.products.selected = this.productSelected
  }

  product_duplicate() {
    this.productService.update_list('duplicate', this.products).subscribe((response:any)=>{
      if (response) {
        // notification.notify(success_messages[action], 1);
        this.products.setup.select_all = false;
        this.products.setup.inverted = false;
        this.products.selected = [];
      } else {
        // notification.notify(data.messages, 0);
      }
      this.get_products_list(this.page);
    },error=>{
      // notification.server_error
    })
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

  product_change_status(status) {
    this.products.setup.status = status;
    this.productService.update_list('update_status', this.products).subscribe((response:any)=>{
      this.products.setup.status = "";
      this.get_products_list(this.page);
    })
  }

  product_barcode_label() {
    var URL: {
      url: ''
    }
    if(this.products.selected.length>0){
      this.productService.update_list('barcode_label', this.products).subscribe((response:any)=>{
        if (response.url != undefined ) {
          var fileURL = JSON.stringify(response);
          URL = JSON.parse(fileURL);
          window.open(URL.url)
        }
        this.get_products_list(this.page);
      });
    } else {
      // products.list.select_notification();
    }
  }

  product_receiving_label() {
    var URL:{
      url: ''
    }
    if(this.products.selected.length>0){
      this.productService.update_list('receiving_label', this.products).subscribe((response:any)=>{
        if (response.url != undefined ) {
          var fileURL = JSON.stringify(response);
          URL = JSON.parse(fileURL);
          window.open(URL.url)
        }
        this.get_products_list(this.page);
      });
    } else {
      // products.list.select_notification();
    }
  };

  product_barcode() {
    if(this.products.selected.length>0){
      this.productService.update_list('barcode', this.products).subscribe((response:any)=>{
        this.get_products_list(this.page);
      });
    } else {
      // products.list.select_notification();
    }
  };

  // backup_product_csv() {
  //   this.general_settings = generalsettings.model.get();
  //   generalsettings.single.get(this.general_settings).success(function(response){
  //     this.products.email_address_for_packer_notes = response.data.settings.email_address_for_packer_notes;
  //     if (this.products.selected.length == 0) {
  //       products.list.select_notification();
  //     } else if(response.data.settings.email_address_for_packer_notes == ""){ 
  //       var notification_modal = $modal.open({
  //         templateUrl: '/assets/views/modals/settings/product_export_popup.html',
  //         controller: 'productExportNotificationCtrl',
  //         size: 'lg',
  //         resolve: {
  //           settings_data: function() {
  //             return response.data.settings;
  //           }
  //         }
  //       });
  //       notification_modal.result.then(function () {
  //           products.list.generate(this.products).then(function (data) {
  //             myscope.get_products();
  //           });
  //         }
  //       );
  //     } else {
  //       products.list.generate(this.products).then(function (data) {
  //         myscope.get_products();
  //       });
  //     }
  //   });
  // };

  // broken_image_export = function(){
  //   this.general_settings = generalsettings.model.get();
  //   generalsettings.single.get(this.general_settings).success(function(response){
  //     this.products.email_address_for_packer_notes = response.data.settings.email_address_for_packer_notes;
  //     if(this.products.selected.length == 0){
  //       products.list.select_notification();
  //     } else if(this.products.email_address_for_packer_notes==""){
  //       var broken_image_notification_modal = $modal.open({
  //         templateUrl: '/assets/views/modals/settings/product_export_popup.html',
  //         controller: 'productExportNotificationCtrl',
  //         size: 'lg',
  //         resolve: {
  //           settings_data: function() {
  //             return response.data.settings;
  //           }
  //         }
  //       });
  //       $timeout(function () {
  //         broken_image_notification_modal.result.then(function (){
  //           this.products.email_address_for_packer_notes = this.general_settings.single.email_address_for_packer_notes;
  //           products.list.generate_broken_image(this.products).then(function (data) {
  //             myscope.get_products();
  //           });
  //         });
  //       }, 700);
  //     } else {
  //       products.list.generate_broken_image(this.products).then(function (data) {
  //         myscope.get_products();
  //       });
  //     }
  //   });
  // } 

  // find_inactive_product() {
  //   if (confirm("This process will find all products that have not been created, modified or found in any orders or kits for 90 days or more, and it will set their status to Inactive. You'll be able to delete the items from the list or restore them by changing the status back to Active. If you already have items visible in this view you may want to remove them prior to starting this process. Do you wish to continue? ")){
  //     $http.get($rootScope.api_url +'/products/find_inactive_product.json').success(function(data){
  //       if (data.status) {
  //         this.notify("Finding products", 1);
  //       }
  //       else{
  //         this.notify("Some error occurred.", 0);
  //       }
  //     })
  //   }
  // }

}

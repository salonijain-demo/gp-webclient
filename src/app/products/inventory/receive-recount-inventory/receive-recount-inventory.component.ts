import { Component, OnInit } from '@angular/core';
import { InventoryProductService } from 'src/app/services/inventory-product.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-receive-recount-inventory',
  templateUrl: './receive-recount-inventory.component.html',
  styleUrls: ['./receive-recount-inventory.component.scss']
})
export class ReceiveRecountInventoryComponent implements OnInit {

  warehouses = {
    setup: {
      sort: '',
      order: 'DESC',
      search: '',
      select_all: false,
      status: '',
      inv_wh_ids: []
    },
    list: [],
    single: {
      inv_wh_info: {},
      inv_wh_users: []
    },
    available_users: []
  }

  inventory_manager = {
    single: {
      method: 'receive',
      product_barcode: '',
      inventory_count: '',
      location_primary:'',
      location_secondary:'',
      location_tertiary:'',
      inv_wh_id: '',
      id: ''
    }
  }

  products_inv_manager = {
    list: [],
    selected: [],
    single: {
      basicinfo: {
        id: ''
      },
      images:[],
      product_barcode: '',
      inventory_warehouses: []
    },
    load_new: true,
    current: 0,
    setup: {
      sort: "",
      order: "DESC",
      filter: "active",
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
  inv_wh_found:boolean;

  constructor(
    private inventoryService: InventoryProductService
  ) { }

  ngOnInit() {
    this.get_inventory_list();    
  }

  get_inventory_list(){
    this.inventoryService.get_list(this.warehouses)
    // this._inventory_warehouse_inputObj = $('input#inventorymanagerbarcode');
      if (typeof this.inventory_manager.single['inv_wh_id'] != "number") {
        for (var i = 0; i < this.warehouses.list.length; i++) {
          if (this.warehouses.list[i].info.is_default) {
            this.inventory_manager.single.inv_wh_id = this.warehouses.list[i].info.id;
            break;
          }
        }
      }
      //$('#showProductInv').modal('show');
      // $timeout(function () {
      //   $scope._inventory_warehouse_inputObj.focus()
      // }, 20);
    }
    // $modalInstance.result.then($scope.update, $scope.update);

  generate_barcode_slip_pdf(id) {
    this.inventoryService.generate_barcode_slip(id)
  }

  update(reason) {
    if (reason == "cancel-button-click") {

    } else {
    }
  }

  openLightboxModal(index) {
    // var filtered_images = $filter('filter')($scope.products_inv_manager.single.images, {added_to_receiving_instructions: true});
    // Lightbox.openModal(filtered_images, index);
  }

  submit_recount_or_receive_inventory() {
  }

  _handle_inv_manager_key_event(event) {
    if (event.which == 13) {
      this.products_inv_manager = this.products_inv_manager
      this.inventoryService.get_single_product_by_barcode(this.inventory_manager.single.product_barcode,
        this.products_inv_manager)
          // this._inventory_count_inputObj = $('input#inventory_count');
          this.inventory_manager.single.id = this.products_inv_manager.single.basicinfo.id;
          this.inventory_manager.single.inventory_count = '';
          this.inventory_manager.single.location_primary = '';
          this.inventory_manager.single.location_secondary = '';
          this.inventory_manager.single.location_tertiary = '';
          this.check_if_inv_wh_is_associated_with_product();
          // setTimeout(()=> {
          //   this._inventory_count_inputObj.focus()
          // }, 20);
          this.set_image_data();
    }
    ;
  };

  set_image_data() {
    for (var i = 0; i < this.products_inv_manager.single.images.length; i++) {
      this.products_inv_manager.single.images[i].url = this.products_inv_manager.single.images[i].image;
      this.products_inv_manager.single.images[i].caption = this.products_inv_manager.single.images[i].image_note;
    }
  };

  check_if_inv_wh_is_associated_with_product() {
    this.inv_wh_found = false;
    if (typeof this.products_inv_manager.single.inventory_warehouses != 'undefined') {
      for (var i = 0; i < this.products_inv_manager.single.inventory_warehouses.length; i++) {
        if (this.products_inv_manager.single.inventory_warehouses[i].warehouse_info.id ==
          this.inventory_manager.single.inv_wh_id) {
          this.inv_wh_found = true;
        }
      }
    }
  };

  _handle_inv_count_key_event(event) {
    if (event.which === 13) {
      //call inventory manager service
      this.inventoryService.post_receive_or_recount_inventory(this.inventory_manager)
        this.products_single_reset_obj(this.products_inv_manager);
        this.inventory_manager.single.product_barcode = '';
        this.inventory_manager.single.inventory_count = '';
        this.inventory_manager.single.location_primary = '';
        this.inventory_manager.single.location_secondary = '';
        this.inventory_manager.single.location_tertiary = '';
        // setTimeout(()=> {
        //   this._inventory_warehouse_inputObj.focus()
        // }, 20);
      event.preventDefault();
    }
  }

  products_single_reset_obj(products){
    products.single = {};
  }

  handle_change_event(id) {
    if (typeof id != "undefined" && id) {
      this.inventory_manager.single.inv_wh_id = id;
    }
    this.check_if_inv_wh_is_associated_with_product();
    // setTimeout(()=>{
    //   this._inventory_warehouse_inputObj.focus()
    // }, 20);
  }

  print_receive_label(event) {
    event.preventDefault();
    this.inventoryService.post_receive_or_recount_inventory(this.inventory_manager)
      var prods = this.products_inv_manager
      prods.selected.push({id: this.products_inv_manager.single.basicinfo.id, checked: true});
      this.inventoryService.update_list('receiving_label', prods)
        // var e = jQuery.Event("click");
        // e.which = 13;
        // this._handle_inv_manager_key_event(e);
  }
}

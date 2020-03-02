import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { ReceiveRecountInventoryComponent } from '../../inventory/receive-recount-inventory/receive-recount-inventory.component';

@Component({
  selector: 'app-product-dashboard',
  templateUrl: './product-dashboard.component.html',
  styleUrls: ['./product-dashboard.component.scss']
})
export class ProductDashboardComponent implements OnInit {
  
  productSelected: any;
  productDropdown:boolean;
  kitDropdown:boolean;
  inventoryDropdown:boolean;
  showAllProduct: boolean;
  activeProduct: boolean;
  inactiveProduct: boolean;
  newProduct: boolean;
  inventoryReport: boolean;
  showAllKit: boolean;
  activeKit: boolean;
  inactiveKit: boolean;
  newKit: boolean;
  modalReference: any;
  modalOptions: NgbModalOptions = {
    windowClass: 'in',
    backdrop: 'static',
    keyboard: false
  }
  search_data:string

  constructor(
    private modalService: NgbModal
  ) { }

  ngOnInit() {
    this.productDropdown = true;
    this.kitDropdown = false;
    this.inventoryDropdown = false;
    // this.product(false,this.productDropdown,false,false)
  }

  dropdownList(productDropdown, kitDropdown, inventoryDropdown){
    if(!productDropdown){
      this.productDropdown = false
      // this.product(false,false,this.productDropdown,false)
    }
    if(!kitDropdown){
      this.kitDropdown = false
      // this.kit(false,kitDropdown,false,false)
    }
    if(!inventoryDropdown){
      this.inventoryDropdown = false
      this.inventory(inventoryDropdown)
    }
    if(productDropdown){
      this.productDropdown = !this.productDropdown
    }
    if(kitDropdown){
      this.kitDropdown = !this.kitDropdown
      // this.kit(false,kitDropdown,false,false)
    }
    if(inventoryDropdown){
      this.inventoryDropdown = !this.inventoryDropdown
      this.inventory(inventoryDropdown)
    }
  }

  // product(showAllProduct,activeProduct,inactiveProduct,newProduct){
  //   this.showAllProduct = showAllProduct
  //   this.activeProduct = activeProduct
  //   this.inactiveProduct = inactiveProduct
  //   this.newProduct = newProduct
  // }

  // kit(showAllKit,activeKit,inactiveKit,newKit){
  //   this.showAllKit = showAllKit
  //   this.activeKit = activeKit
  //   this.inactiveKit = inactiveKit
  //   this.newKit = newKit
  // }

  inventory(inventoryReport){
    this.inventoryReport = inventoryReport
  }

  openModal(content){
    this.modalReference = this.modalService.open(content,this.modalOptions);
  }

  closeModal(){
    this.modalReference.close();
  }

  cancel(){
    this.closeModal();
  }

  getProductSelected(e){
    this.productSelected = e
  }

  get_search_data(event){
    this.search_data = event
  }
}

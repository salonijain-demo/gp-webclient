import { Component, OnInit, Input, ViewChild, Output, EventEmitter,ElementRef } from '@angular/core';
import { PageSettingsModel, GridComponent, RowSelectEventArgs, ToolbarItems, EditSettingsModel, SelectionSettingsModel, DialogEditEventArgs, SaveEventArgs, QueryCellInfoEventArgs} from '@syncfusion/ej2-angular-grids';
import { FormGroup } from '@angular/forms';
import { DialogComponent } from '@syncfusion/ej2-angular-popups';
import { EmitType } from '@syncfusion/ej2-base';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-data-grid',
  templateUrl: './data-grid.component.html',
  styleUrls: ['./data-grid.component.scss']
})
export class DataGridComponent implements OnInit {

  // @ViewChild('ejDialog') ejDialog: DialogComponent;
  // // Create element reference for dialog target element.
  // @ViewChild('container', { read: ElementRef }) container: ElementRef;
  // // The Dialog shows within the target element.
  // public targetElement: HTMLElement;

  @ViewChild('grid') 
  public grid: GridComponent; 

  @Input()
  itemOrderData: any

  @Input()
  createProductData:any;

  @Input()
  productData:any;

  @Input()
  productDatas:any;

  @Input()
  orderList: any;

  @Input()
  orderData=[];
  
  @Input()
  settingData =[];
  
  @Input()
  userSettingData=[];
  
  @Input()
  inactive_or_new_products: any;

  @Output()
  selected = new EventEmitter<any>();

  @Output()
  editData = new EventEmitter<any>();

  @ViewChild('orderForm') public orderForm: FormGroup;
  public saveData: object

  editedData={
    id: null,
    name: '',
    default_value: '',
    value: ''
  }
  rows = [];
  selectedRow: any;
  selectedRowData = [];
  rowIndex: number;
  public data: Object[];
  finalData =[];
  public pageSettings: PageSettingsModel;
  orderDataValues: Object;
  settingDataValues:Object;
  userSettingDataValues:Object;
  productDataValues:Object;
  productDataValue:Object;
  itemOrderDataValues:Object;
  inactiveNewProductData:Object;
  createProductDataValues:Object;
  statusName:string
  showOrder = false
  showProduct = false;
  public editSettings: EditSettingsModel;
  public selectionOptions: SelectionSettingsModel;
  modalReference: any;
  modalOptions: NgbModalOptions = {
    windowClass: 'in',
    backdrop: 'static',
    keyboard: false
  }

  constructor(
    private modalService: NgbModal
  ) { }

  ngOnInit() {
    // this.initilaizeTarget();
    // this.ejDialog.hide();

    this.pageSettings = { pageSize: 20 };
    this.editSettings = { allowEditing: true, allowAdding: true, allowDeleting: true, mode: 'Batch' };
    this.selectionOptions = { type: 'Multiple', enableSimpleMultiRowSelection: true };

    if(this.settingData.length != 0){
      this.showOrder = false;
      this.getStoreSettingData();
    }
    if(this.userSettingData.length != 0){
      this.showOrder = false;
      this.getUserPermissionData();
    }
    if(this.productData){
      this.showOrder = false;
      this.productListData();
    }
    if(this.productDatas){
      this.showOrder = false;
      this.productListDatas();
    }
    if(this.createProductData != undefined){
      if(this.createProductData.length>=0){
        this.showOrder = false;
        this.createProductDataTable();
      }
    }
  }

  ngOnChanges(){
    debugger
    if(this.orderData != undefined){
    this.showOrder = true;
    if(this.orderData.length != 0){
      var order = [];
      order.push(this.orderData)
      
      if(order[0].orders.length == 1){
        var list = order[0].orders[0];
        this.orderDataValues = [
          {id: list.id, ordernum: list.ordernum, store_name: list.store_name, 
            notes: list.notes, order_date: list.order_date, itemslength: list.itemslength,
            recipient: list.recipient, status:list.status, city: list.city,
            country: list.country, email: list.email, state: list.state, tracking_num: list.tracking_num
          }
        ];
      }

      if(order[0].orders.length >= 1){
        var finalData = []
        var data
        order[0].orders.forEach(element => {
          data = {
            id: element.id, ordernum: element.ordernum, store_name: element.store_name,
            notes: element.notes, order_date: element.order_date,
            itemslength: element.itemslength, recipient: element.recipient,
            status:element.status, city: element.city, country: element.country,
            email: element.email, state: element.state, tracking_num: element.tracking_num
          }
          finalData.push(data)
        });
        this.orderDataValues=finalData;
      }
      else{
        this.orderDataValues = [];
      }
    }
    }
    console.log('orde5rVAlues',this.orderDataValues)
    debugger
    if(this.itemOrderData != undefined){
      this.showOrder = false;
      this.createItemOrderData();
    }

    if(!!this.inactive_or_new_products){
      this.showOrder = false;
      this.inactiveNewProducts();
    }
  }

  getStoreSettingData(){
    var finalData = []
    var data
      this.settingData.forEach(element => {
        data = {
          Name: element.name, Status: element.status, Type: element.store_type
        }
        finalData.push(data)
      })
    this.settingDataValues=finalData;
  }

  getUserPermissionData(){
    var finalData = []
    var data
      this.userSettingData.forEach(element => {
        if(element.active == true){
          this.statusName = 'Active'
        }
        if(element.active == false){
          this.statusName = 'Inactive'
        }
        data = {
          Username: element.username, Status: this.statusName, LastActivity: element.last_activity, Type: element.role.name
        }
        finalData.push(data)
      })
    this.userSettingDataValues=finalData;
  }

  productListData(){
    var finalData = []
    var data
    if(this.productData){
      this.productData.forEach(element => {
        data = {
          Image: element.image, SKU: element.sku, Status: element.status, ItemName: element.name, Barcode: element.barcode, PrimaryLocation: element.location_primary, Store: element.store_name, Qoh: element.qty_on_hand, AvblInv: element.available_inv
        }
        finalData.push(data)
      })
    }
    this.productDataValues=finalData;
  }

  productListDatas(){
    var finalData = []
    var data
    if(this.productDatas){
      this.productDatas.forEach(element => {
        data = {
          ProductId: element.id, SKU: element.sku, Status: element.status, ItemName: element.name, Barcode: element.barcode
        }
        finalData.push(data)
      })
    }
    this.productDataValue=finalData;
  }

  inactiveNewProducts(){
    var finalData = []
    var data
    if(this.inactive_or_new_products){
      this.inactive_or_new_products.forEach(element => {
        data = {
          Image: element.product_images, ItemName: element.name, Status: element.status, SKU: element.sku,Barcode: element.barcode
        }
        finalData.push(data)
      })
    }
    this.inactiveNewProductData=finalData;
  }

  createProductDataTable(){
    var finalData = []
    var data
    if(this.createProductData){
      this.createProductData.forEach(element => {
        data = {
          WarehouseName: element.warehouse_info.name,
          Status: element.warehouse_info.status,
          AvailableInv: element.info.available_inv,
          AllocatedInv: element.info.allocated_inv,
          Qoh: element.info.quantity_on_hand,
          SoldInv: element.info.sold_inv,
          PrimaryLocation: element.info.location_primary,
          SecondaryLocation: element.info.location_secondary,
          TertiaryLocation: element.info.location_tertiary,
          OverrideGlobalInvAlertLvl: element.info.product_inv_alert,
          InvAlertLevel: element.info.product_inv_alert_level
        }
        finalData.push(data)
      })
      this.showProduct = true;
    }else if(this.createProductData.length == 0){
      this.createProductDataValues = null
    }
    this.showProduct = false;
    this.createProductDataValues=finalData;
  }
  
  createItemOrderData(){
    var finalData = []
    var data
    if(this.itemOrderData){
    this.itemOrderData.forEach(element => {
      data = {
        PrimaryImage: element.image,
        Product: element.name,
        PrimarySku: element.sku,
        Status: element.status,
        PrimaryBarcode: element.barcode,
        QtyOrdered: element.qty_on_hand,
        PrimaryLocation: element.location_primary
      }
      finalData.push(data)
    })
    }
    this.itemOrderDataValues=finalData;
  }

  select(args:RowSelectEventArgs){ 
    this.selectedRow = this.grid.getRowInfo(args.target).rowData
    this.rowIndex = parseInt(args.target.attributes[6].value)
    // this.rows.push(this.rowIndex)
    
    if(this.selectedRowData.includes(this.selectedRow)){
      this.selectedRowData.filter((item, index) => {
        if(this.selectedRow.OrderID === item.OrderID) {
          this.selectedRowData.splice(index,1);
        }
      })
    }
    else{
      this.selectedRowData.push(this.selectedRow)
    }
    console.log('selected data',this.selectedRowData)
    this.selected.emit(this.selectedRowData)
    this.selectedRowData = [];
  }

  edit_change(event){
    this.editedData = {
      id: this.selectedRow.OrderId,
      name: event.target.form.elements[0].form.elements[0].name,
      default_value: event.target.form.elements[0].form.elements[0].defaultValue,
      value: event.target.form.elements[0].form.elements[0].value
    }
    this.editData.emit(this.editedData)
  }
  show() {
    this.grid.columnChooserModule.openColumnChooser(200, 50); // give X and Y axis
  }

  openModal(content){
    debugger
    this.modalReference = this.modalService.open(content,this.modalOptions);
  }
  
  closeModal(){
    this.modalReference.close();
  }

  cancel(){
    this.closeModal();
  }

  // public initilaizeTarget: EmitType<object> = () => {
  //   debugger
  //   this.ejDialog.hide();
    
  // }

  // onOpenDialog(event: any): void {
  //   debugger
  //   this.ejDialog.show();
  //   this.targetElement = this.container.nativeElement.parentElement;
  // }

}
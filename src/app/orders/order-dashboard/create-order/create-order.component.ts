import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-order',
  templateUrl: './create-order.component.html',
  styleUrls: ['./create-order.component.scss']
})
export class CreateOrderComponent implements OnInit {
  
  created_order:any;
  allowToProceedOrder:boolean;
  
  constructor() {  
  }

  ngOnInit() {
  }

  get_order_created(event){
    this.created_order = event;
  }

  getOrderToProceed(event){
    this.allowToProceedOrder = event;
  }
  // closeModal(){
  //   this.modalReference.close();
  // }

  // cancel(){
  //   this.closeModal();
  // }
}

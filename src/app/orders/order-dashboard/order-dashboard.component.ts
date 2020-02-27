import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-order-dashboard',
  templateUrl: './order-dashboard.component.html',
  styleUrls: ['./order-dashboard.component.scss']
})
export class OrderDashboardComponent implements OnInit {
  
  order:any;
  orderSelected:any;
  allLink: boolean;
  awaitingLink: boolean = true;
  onholdLink :boolean;
  serviceissueLink: boolean;
  cancelledLink: boolean;
  scannedLink: boolean;
  showOrderDropdown: boolean = true;
  modalReference: any;
  modalOptions: NgbModalOptions = {
    windowClass: 'in',
    backdrop: 'static',
    keyboard: false
  };

  constructor(
    private router: Router,
    private modalService: NgbModal
  ) { }


  ngOnInit() {
  }

  setup_child(all, awaiting, onhold, serviceissue, cancelled, scanned) {
    this.allLink = all;
    this.awaitingLink= awaiting;
    this.onholdLink= onhold;
    this.serviceissueLink= serviceissue;
    this.cancelledLink= cancelled;
    this.scannedLink= scanned;
  }

  showOrderDropdownList(){
    this.showOrderDropdown = !this.showOrderDropdown;
  }

  createOrder(content){
    this.openModal(content)
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

  getOrderSelected(e){
    this.orderSelected = e
  }

  get_order(event){
    this.order = event
  }
}

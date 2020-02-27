import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { PaymentMethodService } from 'src/app/services/payment-method.service';

@Component({
  selector: 'app-payment-method',
  templateUrl: './payment-method.component.html',
  styleUrls: ['./payment-method.component.scss']
})
export class PaymentMethodComponent implements OnInit {

  show_table_data: boolean;
  payments = {
    list: [],
    single: {}
  }
  modalReference: any;
  modalOptions: NgbModalOptions = {
    windowClass: 'in',
    backdrop: 'static',
    keyboard: false
  };

  constructor(
    private modalService: NgbModal,
    private paymentService: PaymentMethodService
  ) { }

  ngOnInit() {
    this.getTableData();
  }

  getTableData() {
    this.paymentService.get_card_list(this.payments).subscribe((response:any) => 
      {
        if (response.status == true) {
          if (response.cards.data.length > 0) {
            // return 
            this.payments.list = response.cards.data;
          } else {
            // notification.notify("No cards found for the subscriber");
            // return
             this.payments.list = [];
          }
        } else {
          // response.messages.forEach(function (message) {
            // notification.notify(message);
            // return
             this.payments.list = [];
          // }
        }

        if (typeof response.data.cards.data != 'undefined') {
          for (var i = 0; i < response.data.cards.data.length; i++) {
            response.data.cards.data[i].checked = false;
          }
        }
      }, error=>{
        // notification.server_error
      });
    
    this.paymentService.get_default_card(this.payments).subscribe((response:any) =>
      {
        if (response.status == true) {
          this.payments.single = response.default_card;
        } else {
          // response.messages.forEach(function (message) {
          //   notification.notify(message);
        }
        this.show_table_data = true;
      }, error => {
        // notification.server_error
      });
  }

  addNewCard(content){
    this.openModal(content);
  }

  openModal(content){
    this.modalReference = this.modalService.open(content, this.modalOptions);
  }

  closeModal(){
    this.modalReference.close();
  }

  cancel(){
    this.closeModal();
  }
}

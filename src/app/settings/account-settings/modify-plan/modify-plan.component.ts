import { Component, OnInit } from '@angular/core';
import { PaymentMethodService } from 'src/app/services/payment-method.service';
import { Modify } from 'src/app/interfaces/modifyPlan';

@Component({
  selector: 'app-modify-plan',
  templateUrl: './modify-plan.component.html',
  styleUrls: ['./modify-plan.component.scss']
})
export class ModifyPlanComponent implements OnInit {

  current_page:string;
  private modify: Modify = {
    no_of_users: 0,
    users: 0,
    price: 0,
    total_users: 0,
    added_through_ui: '',
    discount: 0,
    is_annual: false,
    calender: '',
    allow_delete: false,
    fix_amount: 0
  }

  constructor(
    private paymentService: PaymentMethodService
  ) { }

  ngOnInit() {
    this.get_modify_plan();
  }
  get_modify_plan(){
    this.paymentService.get_modify_plan().subscribe((response: any) =>
    {
      // this.modify = { } 
      this.modify.no_of_users = response["no_of_users"]
      this.modify.users  = response["no_of_users"]
      this.modify.price = response["amount"]
      this.modify.total_users = response["total_users"]
      this.modify.added_through_ui = response["added_through_ui"]
      this.modify.discount = (this.modify.price * 12)/10
      this.modify.is_annual = false
      this.modify.calender = "month"
      this.modify.allow_delete = false
      this.modify.fix_amount = response["amount"]
    }, error => {});
  }

  calculate(sign){
    var no_of_users = this.modify.no_of_users
    var ui_user = this.modify.added_through_ui
    var users = this.modify.users
    var total_users = this.modify.total_users

    if(sign=="+") {
      no_of_users = no_of_users+1;
    } else {
      if(no_of_users>2) {
        if (total_users <= no_of_users) {
           no_of_users = no_of_users-1;
        } else{
          // $scope.notify('The number of users in the user list exceeds the plan total.');
          // $scope.notify('Please delete the user(s) that are no longer needed before removing them from the plan.');
        }
      }
    }

    if (no_of_users == 2) {
      // $scope.notify('The minimum plan is 2 users.');
    }

    if (this.modify.is_annual) {
      this.modify.no_of_users = no_of_users
      this.price_calculate()
      var month_price = this.modify.price
      this.modify.discount = (this.modify.price * 12)/10
      var discount = this.modify.discount
      var annual_price = (month_price * 12) - discount
      this.modify.price = annual_price
      this.modify.is_annual = true
      this.modify.calender = "year"
    }else{
      this.modify.no_of_users = no_of_users
      this.price_calculate()
      this.modify.discount = (this.modify.price * 12)/10
      this.modify.is_annual = false
      this.modify.calender = "month"
    }

    var allow_delete = (this.modify.users ) - this.modify.added_through_ui  
    if (allow_delete > this.modify.no_of_users) {
      this.modify.allow_delete = true
    }else{
      this.modify.allow_delete = false
    }

  }

  annual(value){
    
    if (!value) {
      var month_price = this.modify.price
      var discount = this.modify.discount
      var annual_price = (month_price * 12) - discount
      this.modify.price = annual_price
      this.modify.is_annual = true
      this.modify.calender = "year"
    }else{
      var no_of_users = this.modify.no_of_users
      this.price_calculate()
      this.modify.is_annual = false
      this.modify.calender = "month"
    }

  }

  price_calculate(){
    var fix_amount = this.modify.fix_amount
    if (this.modify.no_of_users > this.modify.users) {
      var added_user = this.modify.no_of_users - this.modify.users
      this.modify.price  = (fix_amount + 50 )* added_user
    } else if (this.modify.no_of_users < this.modify.users){
      var remove_user = this.modify.users - this.modify.no_of_users
      this.modify.price  = fix_amount - 50* remove_user
    }else if(this.modify.no_of_users == this.modify.users){
      this.modify.price  = fix_amount
    }
  }

  update_plan(){
    this.paymentService.update_plan(this.modify.no_of_users, this.modify.price ,this.modify.is_annual)
    .subscribe((response:any) => {
      if (response.status) {
        // notification.notify("Successfully Updated!", 1);
        if (response.request_send) {
        //  notification.notify("A removal request has been sent. The GroovePacker team will make the change and your billing will be updated.When the change is complete it will be reflected below.", 1);
        }
        if (response.annual_request) {
          // notification.notify("Thank you for choosing to move to annual billing. We have received your request and will update your account momentarily.", 1);
        }
      } else {
        // notification.notify(data.error_messages);
      }
    }, error => {})
  }
}

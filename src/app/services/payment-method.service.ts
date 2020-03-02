import { Injectable } from '@angular/core';
import {  HttpClient } from '@angular/common/http';
import{ environment } from 'src/environments/environment'

@Injectable({
  providedIn: 'root'
})
export class PaymentMethodService {

  constructor(
    private http: HttpClient
  ) { }

  get_card_list(payments) {
    var url = environment.baseUrl + '/payments';
    return this.http.get(url)
  }

  get_default_card(payments) {
    var url = environment.baseUrl + '/payments/default_card';
    return this.http.get(url) 
  }
  get_modify_plan(){
    return this.http.get(environment.baseUrl + '/users/get_subscription_info.json')
  }

  update_plan(data,data1,data2){
    return this.http.get(environment.baseUrl + '/users/modify_plan.json?users='+ data +'&amount=' + data1 + '&is_annual=' + data2)    
  }
}

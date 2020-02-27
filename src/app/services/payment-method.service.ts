import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PaymentMethodService {
  access_token =  localStorage.getItem('access_token');
  
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': "Bearer " + this.access_token
    })
  }

  url = "http://mydev.localpackerapi.com";

  constructor(
    private http: HttpClient
  ) { }

  get_card_list(payments) {
    var url = this.url + '/payments';
    return this.http.get(url, this.httpOptions)
  }

  get_default_card(payments) {
    var url = this.url + '/payments/default_card';
    return this.http.get(url, this.httpOptions) 
  }
  get_modify_plan(){
    return this.http.get(this.url + '/users/get_subscription_info.json', this.httpOptions)
  }

  update_plan(data,data1,data2){
    return this.http.get(this.url + '/users/modify_plan.json?users='+ data +'&amount=' + data1 + '&is_annual=' + data2, this.httpOptions)    
  }
}

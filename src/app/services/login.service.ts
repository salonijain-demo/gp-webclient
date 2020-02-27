import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    private http: HttpClient
  ) { }

  access_token =  localStorage.getItem('access_token');
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': "Bearer " + this.access_token
    })
  }
  
  url = "http://mydev.localpackerapi.com";
  
  login(username, password){
    var target_url = this.url + '/auth/v1/login'
    return this.http.post(target_url, {username: username, password: password}, this.httpOptions);
  }

  update_login_date(username){
    var target_url = this.url + '/users/update_login_date';
    return this.http.post(target_url, {username: username},this.httpOptions);
  }

  check() {
    var target_url = this.url + '/home/userinfo.json';
    return this.http.get(target_url, this.httpOptions)
  }

  get_users_email(username){
    return this.http.get(this.url + '/users/get_email?username=' + username, this.httpOptions);
  }
  
  request_socket(){
    return this.http.get(this.url + '/home/request_socket_notifs.json');
  }

  forgetpass(user){
    var target_url = this.url + '/users/get_user_email?user=' + user
    return this.http.get(target_url);
  }

  settings_data(data){
    this.http.post(this.url + '/users/update_email.json', data);
  }
}

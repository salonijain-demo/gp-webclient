import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import{ environment } from 'src/environments/environment'

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    private http: HttpClient
  ) { }
  
  login(username, password){
    var target_url = environment.baseUrl + '/auth/v1/login'
    return this.http.post(target_url, {username: username, password: password});
  }

  update_login_date(username){
    var target_url = environment.baseUrl + '/users/update_login_date';
    return this.http.post(target_url, {username: username});
  }

  check() {
    var target_url = environment.baseUrl + '/home/userinfo.json';
    return this.http.get(target_url)
  }

  get_users_email(username){
    return this.http.get(environment.baseUrl + '/users/get_email?username=' + username);
  }
  
  request_socket(){
    return this.http.get(environment.baseUrl + '/home/request_socket_notifs.json');
  }

  forgetpass(user){
    var target_url = environment.baseUrl + '/users/get_user_email?user=' + user
    return this.http.get(target_url);
  }

  settings_data(data){
    this.http.post(environment.baseUrl + '/users/update_email.json', data);
  }
}

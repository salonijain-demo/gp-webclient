import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import{ environment } from 'src/environments/environment'

@Injectable({
  providedIn: 'root'
})
export class UserPermissionService {

  constructor(
    private http : HttpClient
  ) { }

  get_list(object) {
    var result = [];
    return this.http.get(environment.baseUrl + '/users.json')
    //   function (data) {
    //     if (object != null) {
    //       result = $filter('filter')(data, object.setup.search);
    //       result = $filter('orderBy')(result, object.setup.sort, (object.setup.order == 'DESC'));
    //       object.list = result;
    //     }
    //   }
    // ).error(notification.server_error);
  }

  get_super_admin_email(){
    return this.http.get(environment.baseUrl + '/users/get_super_admin_email.json')
  }

  get_user_role(){
    return this.http.get(environment.baseUrl + '/users/get_roles.json')
  }

  update_users(users, auto) {
    if (typeof auto !== "boolean") {
      auto = true;
    }
    var confirmation_code_auto_generated = false;
    if (typeof users.single.confirmation_code == 'undefined' ||
      users.single.confirmation_code == null) {
      confirmation_code_auto_generated = true;
    }
    if(users.single.role.name.name){
      users.single.role = users.single.role.name
    }
    return this.http.post(environment.baseUrl + '/users/createUpdateUser.json', users.single)
  }
  
  create_role(users) {
    return this.http.put(environment.baseUrl + '/users/'+users.single.id+'/create_role.json', users.single)
  }

  delete_role(users) {
    return this.http.post(environment.baseUrl + '/users/delete_role.json', users.single)
  }

  update_list(action, users) {
    if (["update_status", "delete", "duplicate"].indexOf(action) != -1) {
      users.setup.userArray = [];
      for (var i = 0; i < users.selected.length; i++) {
        // if (users.list[i].checked == true) {
          users.setup.userArray.push({id: users.selected[i].id, index: i, active: (users.setup.status == 'active')});
        // }
      }
      var url = '';
      if (action == "delete") {
        url = environment.baseUrl + '/users/delete_user.json';
      } else if (action == "duplicate") {
        url = environment.baseUrl + '/users/duplicate_user.json';
      } else if (action == "update_status") {
        url = environment.baseUrl + '/users/change_user_status.json';
      }
      return this.http.post(url, users.setup.userArray)
      }
  }
}

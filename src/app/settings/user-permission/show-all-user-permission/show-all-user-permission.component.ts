import { Component, OnInit } from '@angular/core';
import { UserPermissionService } from 'src/app/services/user-permission.service';
import { ShowAllStoreSettingsComponent } from '../../store-settings/show-all-store-settings/show-all-store-settings.component';
import { StoreSettingService } from 'src/app/services/store-setting.service';

@Component({
  selector: 'app-show-all-user-permission',
  templateUrl: './show-all-user-permission.component.html',
  styleUrls: ['./show-all-user-permission.component.scss']
})
export class ShowAllUserPermissionComponent implements OnInit {

  userPermissionSelected:any;
  users = {
    list: [],
    selected: [],
    single: {},
    roles: [],
    current: 0,
    setup: {
      sort: "",
      order: "DESC",
      search: '',
      select_all: false,
      status: '',
      userArray: []
    }
  }
  storesAllow: boolean;
  usersAllow: boolean;
  showAllPermissionData: any;
  selectAll: boolean = true;

  constructor(
    private userPermissionService: UserPermissionService,
    private storeSettingService: StoreSettingService
  ) { }

  ngOnInit() {
    this.get_users();
  }

  showSelect(){
    this.selectAll = !this.selectAll;
  }

  get_users() {
    this.userPermissionService.get_list(this.users).subscribe((response:any)=>
    {
      this.showAllPermissionData = response;
      this.select_all_toggle(undefined);
      this.check_reset_links();
    })
  }

  select_all_toggle(val) {
    this.users.setup.select_all = val;
    for (var user_index = 0; user_index <= this.users.list.length - 1; user_index++) {
      this.users.list[user_index].checked = this.users.setup.select_all;
    }
  }

  check_reset_links() {
    this.storeSettingService.can_create_single().subscribe((response:any)=>
    {
      this.storesAllow = response.can_create;
    })
    this.storeSettingService.can_create_single_user().subscribe((response:any)=>
    {
      this.usersAllow = response.can_create;
    })
  }

  // user_change_status(status) {
  //   $scope.users.setup.status = status;
  //   return users.list.update('update_status', $scope.users).then(function (data) {
  //     $scope.users.setup.status = "";
  //     this.get_users();
  //   })
  // }

  // user_delete() {
  //   $scope.users.selected = 0;
  //   var result = $q.defer();
  //   for (var i = 0; i < $scope.users.list.length; i++) {
  //     if ($scope.users.list[i].checked) {
  //       $scope.users.selected += 1;
  //     }
  //   }
  //   if ($scope.users.selected == 0) {
  //     notification.notify('select a user to delete');
  //     result.resolve();
  //   } else if (confirm("Are you sure you want to delete the user" + (($scope.users.selected == 1) ? "?" : "s?"))) {
  //     users.list.update('delete', $scope.users).then(function (data) {
  //       this.get_users();
  //     }).then(result.resolve);
  //   } else {
  //     result.resolve();
  //   }
  //   return result.promise;
  // }

  // user_duplicate() {
  //   return users.list.update('duplicate', $scope.users).then(function (data) {
  //     this.get_users();
  //   })
  // }

  // handlesort(predicate) {
  //   this.user_setup_opt('sort', predicate);
  // };

  // user_setup_opt(type, value) {
  //   users.setup.update($scope.users.setup, type, value);
  //   this.get_users();
  // }

  // get_users() {
  //   return users.list.get($scope.users).then(function () {
  //     $scope.select_all_toggle();
  //     $scope.check_reset_links();
  //   })
  // }

  // update_single_user(user){
  //   users.single.update_status(user);
  //   this.get_users();
  // }

  getUserPermissionSelected(e){
    var user = [];
    e.forEach(element => {
      user.push(this.showAllPermissionData[element])
    })
    this.users.selected = user;
  }

  user_change_status(status) {
    this.users.setup.status = status;
    this.userPermissionService.update_list('update_status', this.users).subscribe((response:any)=>{
      this.users.setup.select_all = false;
      this.users.setup.status = "";
      this.get_users();
    })
  }

  user_delete() {
    // this.users.selected = null;
    // var result = $q.defer();
    // for (var i = 0; i < this.users.list.length; i++) {
      // if (this.users.list[i].checked) {
        // this.users.selected += 1;
      // }
    // }
    if (this.users.selected.length == 0) {
      // notification.notify('select a user to delete');
    } else if (confirm("Are you sure you want to delete the user" + ((this.users.selected.length == 1) ? "?" : "s?"))) {
      this.userPermissionService.update_list('delete', this.users).subscribe((response:any)=>{
        this.users.setup.select_all = false;
        this.get_users();
      })
    }
  }

  user_duplicate() {
    this.userPermissionService.update_list('duplicate', this.users).subscribe((response:any)=>{
      this.users.setup.select_all = false;
      this.get_users();
    })
  }

  get_search_data(event){
    var selected = []
    this.users.setup.search = event
    this.showAllPermissionData.filter(element=>{
    var result = element.username.includes(event)
      if(result){
        selected.push(element)
      }
    })
    this.showAllPermissionData = selected
  }
}

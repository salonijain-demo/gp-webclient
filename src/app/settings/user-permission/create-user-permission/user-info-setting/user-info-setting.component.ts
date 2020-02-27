import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { UserPermissionService } from 'src/app/services/user-permission.service';
import { StoreSettingService } from 'src/app/services/store-setting.service';
import { SettingService } from 'src/app/services/setting.service';

@Component({
  selector: 'app-user-info-setting',
  templateUrl: './user-info-setting.component.html',
  styleUrls: ['./user-info-setting.component.scss']
})
export class UserInfoSettingComponent implements OnInit {
  
  @Output() roles = new EventEmitter<string>();

  users = {
    list: [],
    single: {
      email: '',
      role: {
        name: '',
        id: null
      }
    },
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

  general_settings = {
    single: {}
  }

  roles_data = {
    showSelectBaseRole: true,
    selectedRole: ''
  }

  storesAllow: boolean;
  usersAllow: boolean;
  showAllPermissionData: any;
  selectAll: boolean = true;
  show_password: boolean = true;
  edit_status: boolean;
  updateUsers: any;
  ready_for_auto_complete: boolean;

  constructor(
    private userPermissionService: UserPermissionService,
    private storeSettingService: StoreSettingService,
    private settingService: SettingService
  ) { }

  ngOnInit() {
    this.get_users();
    this.get_setting();
    this.get_super_admin_email();
    this.get_users_role();
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
    });
    this.storeSettingService.can_create_single_user().subscribe((response:any)=>
    {
      this.usersAllow = response.can_create;
    });
  }

  get_setting(){
    this.settingService.get_setting(this.general_settings)
  }

  get_super_admin_email(){
    this.userPermissionService.get_super_admin_email().subscribe((response:any)=>{
      this.users.single.email = response.email;
    })
  }

  get_users_role(){
    this.userPermissionService.get_user_role().subscribe((response:any)=>{
      this.users.roles = response.roles;
      this.reset_selected_role();
      // users.roles.get(scope.users).then(myscope.reset_selected_role);
      for (var i = 0; i < this.users.roles.length; i++) {
        if (this.users.roles[i].name == 'Scan & Pack User') {
          this.users.single.role = this.users.roles[i];
          this.reset_selected_role();
          break;
        }
      }
    })
  }

  update_single_user(auto) {
    // var update_user = {
    //   email: this.users.single.email,
    //   role: this.users.single.role.name
    // }
    if (this.validate_single(this.users, auto, this.edit_status)) {
      this.userPermissionService.update_users(this.users, auto).subscribe((response:any)=>{
      if (response.status) {
        // if (response.data.status) {
          this.edit_status = true;
          this.show_password = false;
          this.ready_for_auto_complete = false;
        // }
        this.users.single = response.user;
        this.users.single.role = response.user.role;
        if (!auto) {
          // notification.notify("Successfully Updated", 1);
        }
        // if (confirmation_code_auto_generated) {
          // notification.notify("A unique confirmation code has been generated for this user, you can change the confirmation code to another value if you like.", 1);
        // }
        this.get_users_role();
      } else {
        // notification.notify(data.messages, 0);
      }
      })
    }
  }

   validate_single(users, auto, edit_status) {
    if (typeof auto !== 'boolean') auto = true;
    if (!auto) return true;
    var valid = true;
    if (typeof users.single.username == 'undefined' ||
      users.single.username == null || users.single.username == '') {
      valid = false;
    }
    if (edit_status) {
      if (typeof users.single.confirmation_code == 'undefined' ||
        users.single.confirmation_code == null ||
        users.single.confirmation_code == '') {
        valid = false;
      }
      //If password or conf password is blank while the other is not
      if (
        (!(typeof users.single.password == 'undefined' || users.single.password == null || users.single.password == '')
          && (typeof users.single.conf_password == 'undefined' || users.single.conf_password == null || users.single.conf_password == '')
        ) ||
        (!(typeof users.single.conf_password == 'undefined' || users.single.conf_password == null || users.single.conf_password == '')
          && (typeof users.single.password == 'undefined' || users.single.password == null || users.single.password == '')
        )
      ) {
        valid = false;
      }
    } else {
      if (typeof users.single.password == 'undefined' ||
        users.single.password == null ||
        users.single.password == '') {
        valid = false;
      }

      if (typeof users.single.conf_password == 'undefined' ||
        users.single.conf_password == null ||
        users.single.conf_password == '') {
        valid = false;
      }
    }
    //We really don't want this notification to be shown.
    // notification.notify(valid);

    return (valid);
  }

  reset_selected_role() {
    this.roles_data.selectedRole = null;
    //set role by reference for modal
    for (var i = 0; i < this.users.roles.length; i++) {
      if (this.users.single.role.id === this.users.roles[i].id) {
        this.roles_data.selectedRole = this.users.roles[i];
        // auth.check();
      }
    }
    this.roles.emit(this.roles_data.selectedRole);
  }

  set_base_role(role) {
    for (var i in role) {
      if (role.hasOwnProperty(i) && i != "id" && i != "name") {
        this.users.single.role[i] = role[i];
      }
    }
    this.roles_data.showSelectBaseRole = false;
    // notification.notify("Permissions from " + role.name + " applied", 1);
  }

  make_new_role() {
    this.userPermissionService.create_role(this.users).subscribe((response:any)=>{
      if (response.status) {
        // notification.notify("Role successfully applied", 1);
        this.users.single.role = response.role;
        this.get_users_role();
      } else {
        // notification.notify(data.messages, 0);
      }
    })
  }

  set_selected_role(event) {
    this.roles_data.showSelectBaseRole = false;
    if (this.roles_data.selectedRole != null) {
      if (confirm("Are you sure?")) {
        setTimeout(()=>{
          this.users.single.role.name = this.roles_data.selectedRole;
          this.update_single_user(undefined);
        });
      }
      this.roles.emit(this.roles_data.selectedRole)
    } else {
      this.roles_data.showSelectBaseRole = true;
      this.users.single.role.name = '';
      this.users.single.role.id = null;
    }
  }

  delete_role() {
    if (confirm("Are you sure you want to delete this role? All users with current role will be changed to Scan & Pack users")) {
      this.userPermissionService.delete_role(this.users)
      .subscribe((response:any)=>{
        if (response.status) {
          // notification.notify("Role successfully deleted", 1);
          this.users.single.role = response.role;
          this.get_users_role();
        }
        else {
          // notification.notify(data.messages, 0);
        }
      })
    }
  }

  change_password(){
    this.show_password = true;
  }
}

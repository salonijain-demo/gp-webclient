import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-user-create-setting',
  templateUrl: './user-create-setting.component.html',
  styleUrls: ['./user-create-setting.component.scss']
})
export class UserCreateSettingComponent implements OnInit {

  @Input()
  roles: string;
  users = {
    single: {
      role: {}
    }
  }
  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(){
    this.users.single.role = this.roles;
  }
}

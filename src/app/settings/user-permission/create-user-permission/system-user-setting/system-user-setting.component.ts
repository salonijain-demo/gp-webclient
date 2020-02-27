import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-system-user-setting',
  templateUrl: './system-user-setting.component.html',
  styleUrls: ['./system-user-setting.component.scss']
})
export class SystemUserSettingComponent implements OnInit {

  @Input()
  roles: string;
  users = {
    single:{
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

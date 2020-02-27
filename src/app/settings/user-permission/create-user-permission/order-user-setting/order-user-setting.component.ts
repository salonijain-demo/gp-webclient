import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-order-user-setting',
  templateUrl: './order-user-setting.component.html',
  styleUrls: ['./order-user-setting.component.scss']
})
export class OrderUserSettingComponent implements OnInit {
  
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

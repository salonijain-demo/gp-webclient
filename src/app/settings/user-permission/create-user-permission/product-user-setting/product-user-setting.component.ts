import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-product-user-setting',
  templateUrl: './product-user-setting.component.html',
  styleUrls: ['./product-user-setting.component.scss']
})
export class ProductUserSettingComponent implements OnInit {

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

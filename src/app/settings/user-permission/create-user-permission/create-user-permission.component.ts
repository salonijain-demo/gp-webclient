import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-user-permission',
  templateUrl: './create-user-permission.component.html',
  styleUrls: ['./create-user-permission.component.scss']
})
export class CreateUserPermissionComponent implements OnInit {

  role: string;

  constructor() { }

  ngOnInit() {
  }

  getRole(role){
    if(role==null){
      this.role='null'
    }
    if(role!= null){
      this.role=role;
    }
  }
}

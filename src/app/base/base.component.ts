import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.scss']
})
export class BaseComponent implements OnInit {

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
  }

  openOrders(){
    this.router.navigate(['/orders'])
  }
  
  openProducts(){
    this.router.navigate(['/products'])
  }

  openSettings(){
    this.router.navigate(['/settings']);
  }

  openScanPack(){
    this.router.navigate(['/scan']);
  }

  sign_out() {
    localStorage.removeItem('current_user');
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('created_at');
    this.router.navigate(['/']);
  }
}

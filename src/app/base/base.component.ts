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
}

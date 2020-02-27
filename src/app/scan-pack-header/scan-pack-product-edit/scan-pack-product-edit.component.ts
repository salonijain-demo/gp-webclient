import { Component, OnInit, OnDestroy } from '@angular/core';
import { OrderService } from 'src/app/services/order.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-scan-pack-product-edit',
  templateUrl: './scan-pack-product-edit.component.html',
  styleUrls: ['./scan-pack-product-edit.component.scss']
})
export class ScanPackProductEditComponent implements OnInit, OnDestroy{
  
  private subscription: Subscription;
  inactive_or_new_products:any[]=[];

  constructor(
    private orderService: OrderService
  ) { }

  ngOnInit() {
    this.subscription = this.orderService.getMessage().subscribe(receiveddata=>{
      this.inactive_or_new_products = receiveddata
    })
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
}

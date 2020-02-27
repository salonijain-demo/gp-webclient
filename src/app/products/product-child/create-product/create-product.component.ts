import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.scss']
})
export class CreateProductComponent implements OnInit {
  
  id:any;

  constructor(
  ) { }

  ngOnInit() { }
  
  getId(e){
    this.id =e;
  }
}

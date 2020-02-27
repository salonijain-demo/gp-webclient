import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-main-side-bar',
  templateUrl: './main-side-bar.component.html',
  styleUrls: ['./main-side-bar.component.scss']
})
export class MainSideBarComponent implements OnInit {

  @Input()
  path:string;

  constructor() { }

  ngOnInit() {
  }

}

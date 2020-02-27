import { Component } from '@angular/core';
import { Router, Event, NavigationStart, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  showHeader: boolean;
  constructor(private router: Router){
    var currentUrl: string;
    router.events.subscribe( (event: Event) =>{
      if (event instanceof NavigationStart) {
        currentUrl = event.url;
        if(currentUrl !='/' && currentUrl !='/login' && currentUrl != '/base' ){
          this.showHeader = true;
        }
      }
    })
  }
}

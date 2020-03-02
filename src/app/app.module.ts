import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MatTabsModule, MatTooltipModule } from '@angular/material';
import { LoginComponent } from './login/login.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { HighlightDirective } from './Directives/highlight.directive';
import { SharedSideBarModule } from './shared-side-bar/shared-side-bar.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReceiveRecountInventoryComponent } from './products/inventory/receive-recount-inventory/receive-recount-inventory.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedOrderModule } from './orders/order-dashboard/shared-order/shared-order.module';
import { AuthHttpInterceptor } from './services/auth.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HighlightDirective
  ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    MatTabsModule,
    HttpClientModule,
    SharedSideBarModule,
    // SharedOrderModule,
    NgbModule,
    BrowserAnimationsModule
  ],
  exports: [],
  entryComponents: [ReceiveRecountInventoryComponent],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthHttpInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }

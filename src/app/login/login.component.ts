import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  user: any;
  email: string;
  auth = {
    username: '',
    password: ''
  }
  modalOptions: NgbModalOptions = {
    windowClass: 'in',
    backdrop: 'static',
    keyboard: false
  };
  modalReference: any;

  constructor(
    private modalService: NgbModal,
    private router: Router,
    private loginService: LoginService
  ) { }

  ngOnInit() {
  }

  login(auth_form, content) {
    this.loginService.login(auth_form.username, auth_form.password).subscribe( (response: any) =>
    {
      localStorage.setItem('access_token', response.access_token);
      localStorage.setItem('refresh_token', response.refresh_token);
      localStorage.setItem('created_at', response.created_at);
      this.loginService.update_login_date(auth_form.username).subscribe(response =>
      {
        this.loginService.check().subscribe(response =>
        {
          // if (!jQuery.isEmptyObject(data)) {
          //     groovIO.connect();
          //   } else {
          //     groovIO.disconnect();
          //   }
          //   if(data.view_dashboard == "0"){ data.view_dashboard = "none" }
          //   $rootScope.current_user_data = data;
          //   if($rootScope.current_user_data.view_dashboard == "0"){ $rootScope.current_user_data.view_dashboard = "none" }
          //   $window.localStorage.setItem('current_user', JSON.stringify(data))
          //   $rootScope.$broadcast("user-data-reloaded");
          //   $rootScope.$broadcast("connect-to-socket-server");
          //   $rootScope.$broadcast("connect-dashboard-to-socket-server");
          // })
          this.loginService.get_users_email(auth_form.username).subscribe( (response: any) => 
            {
              this.email = response.email;
              // this.user = JSON.parse(localStorage.getItem('current_user'));
              this.user = localStorage.getItem('current_user');
              if(response.status == true && (this.email == "" || typeof this.email == undefined || this.email == null)){  
                this.openModal(content);
                // var notification_modal = $modal.open({
                //   templateUrl: '/assets/views/modals/settings/user_email_popup.html',
                //   controller: 'userEmailNotificationCtrl',
                //   size: 'lg',
                //   resolve: {
                //     settings_data: function() {
                //       return {username: auth_form.username};
                //     }
                //   }
                // });
                // notification_modal.result.then(function () {
                //   if (this.user.is_active == false){
                //     this.sign_out();
                //   } else {
                //     this.router.navigate(['./home']);
                //     // $state.go('home');
                //   }
                //   this.loginService.request_socket()
                // });
              } else {
                if (this.user.is_active == false){
                  this.sign_out();
                } else {
                  // this.router.navigate(['./home']);
                  // $state.go('home');
                }
                this.loginService.request_socket();
              }
            }, error => {}); 
        }, error => {
              // $rootScope.$broadcast("sign-out");
            });
      }, error => {
      });
            this.router.navigate(['./orders'])
    }, error => {
          // notification.notify("Un-authorised User");
        })
  }

  openModal(content) {
    this.modalReference = this.modalService.open(content, this.modalOptions);
  }

  closeModal(){
    this.modalReference.close();
  }

  forgetpassword(content){
    this.openModal(content);
  }

  cancel(){
    this.closeModal();
  }

  sign_out(){

  }

  forgetpass(auth_form){
    if (auth_form != undefined && auth_form != ""){
      this.loginService.forgetpass(auth_form.username).subscribe(response => {
        // notification.notify(result["msg"],result["code"]);
        this.router.navigate(['./login']);
        // $state.go('login');
        // $modalInstance.close("ok-button-click");
      }, error => {})
    } else {
      // notification.notify("please enter valid username");
    }
  }

  update_user_email_address(email){
    if (email != "" && email.includes("@")){
      // this.settings_data.email = email;
      // this.loginService.settings_data(this.settings_data)
      // notification.notify("Email is succesfully updated.", 1);
      // $modalInstance.close("ok-button-click");
    } else {
      // notification.notify("Please update email", 0);
      // $modalInstance.dismiss("cancel-button-click");  
    }
  }
}

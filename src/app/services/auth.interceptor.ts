import { Injectable } from '@angular/core'
import { HttpInterceptor } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class AuthHttpInterceptor implements HttpInterceptor {
  
  access_token =  localStorage.getItem('access_token');
  
  constructor() { }

  // intercept intercepts http requests and their responses.
  intercept(req, next){
    if(this.access_token != null)
    {
      //clone http to the custom AuthRequest and send it to the server 
       const modified = req.clone({setHeaders: {'Authorization': "Bearer " + this.access_token}});
        return next.handle(modified);
    }
  }
}

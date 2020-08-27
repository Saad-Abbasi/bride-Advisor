import { Injectable } from '@angular/core';
 import {HttpInterceptor} from '@angular/common/http';
 import {LoginService} from '../shared/login/login.service'
@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor{

  constructor(private _loginService: LoginService) { }

  intercept(req,next){
    
    let tockenizedReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${this._loginService.getToken()}`
      }
    })
    return next.handle(tockenizedReq)
  }
}

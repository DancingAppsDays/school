import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Constants } from '../constants';

@Injectable({
  providedIn: 'root'
})
export class AuthinterceptService implements HttpInterceptor {

  constructor() { }


  token:string|null;
  usertype:string|null;


  intercept(httpRequest: HttpRequest<any>,next:HttpHandler): Observable<HttpEvent<any>>{

    //console.log("INTERCEPTEEEED")
    this.token = localStorage.getItem('access_token');   
    if(this.token == undefined || this.token == null)
    {
      this.token = "emptytoken";
    }

    this.usertype =  Constants.usertype; //AVOID manipulation   sessionStorage.getItem('usertype'); 
    
      
    if(this.usertype == undefined || this.usertype == undefined)
    {
      this.usertype = "emptyuser";
    }


  
    httpRequest = httpRequest.clone({
      setHeaders: {
        Authorization: 'Bearer '+this.token,
        Role: ''+this.usertype
      }
    });
    return next.handle(httpRequest);

  }
}

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  constructor() { }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    let authReq = req;
    const token = JSON.parse(localStorage.getItem('currentUserData'));
    if (token) {
      authReq = req.clone({
        setHeaders: {
          'Token': `Bearer ${token['token']}`
        }
      });
    }
    return next.handle(authReq);
  }
}




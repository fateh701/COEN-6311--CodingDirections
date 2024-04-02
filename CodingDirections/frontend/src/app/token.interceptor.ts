import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor,HttpInterceptorFn } from '@angular/common/http';
import { Observable } from 'rxjs';


export const tokenInterceptor: HttpInterceptorFn  = (req, next) => {
  return next(req);
};

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (typeof localStorage !== 'undefined') {
      const userData = JSON.parse(localStorage.getItem('userData')! || '{}');
    if (userData.token){
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${userData.token}`
        }
    });
  }
  // Your code accessing localStorage here
    }

    return next.handle(request);
}
}

import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../login/authentication.service';

@Injectable()
export class JWTInterceptorService implements HttpInterceptor{

  constructor(private authent:AuthenticationService) {

   }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.authent.JWTToken;
    const clone = req.clone({setHeaders:{Authorization: `Bearer ${token}`}})
    return next.handle(clone);
  }
}

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest
} from '@angular/common/http';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  public intercept(req: HttpRequest<object>, next: HttpHandler): Observable<HttpEvent<any>> {

    const modifiedReq = req.clone({
      setHeaders: { 'Authorization': 'Client-ID 2a0a414444af0cd13129b44ce8742480b93c3fad1214d5600abdb2c221aac2cb' } 
    });
    return next.handle(modifiedReq);
  }
}

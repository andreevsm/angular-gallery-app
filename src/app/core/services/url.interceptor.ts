import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest
} from '@angular/common/http';

const BASE_URL = 'https://api.unsplash.com';

@Injectable()
export class UrlInterceptor implements HttpInterceptor {
  public intercept(req: HttpRequest<object>, next: HttpHandler): Observable<HttpEvent<any>> {

    const modifiedReq = req.clone({
      url: BASE_URL + req.url
    });
    return next.handle(modifiedReq);
  }
}

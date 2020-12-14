import { AuthService } from './../../auth/auth.service';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable()
export class RequestInterceptor implements HttpInterceptor {
  token: string;
  constructor(
      private authSrv: AuthService) {
      this.authSrv.currentUserSubject.subscribe(res => this.token = res);
  }
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (this.token) {
      req = req.clone({
        setHeaders: {
          authorization: `Bearer ${this.token}`,
        },
      });
    }

    return next.handle(req);
  }
}

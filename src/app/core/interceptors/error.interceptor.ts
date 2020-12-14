import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/auth/auth.service';
import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { GeneralService } from 'src/app/shared/services/general.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(
        private authSrv: AuthService,
        private gs: GeneralService,
        private toastr: ToastrService) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError(err => {
            if (this.isLogin(request)) {
                return throwError(err);
            }
            switch (err.status) {
                case 401:
                    this.authSrv.logout().finally(() => {
                        this.toastr.warning('Session timout, please login');
                    });
                    break;
                case 400: case 412:
                    return throwError(err);
                default:
                    return throwError(err);
            }
            const error = err;
            return throwError(error);
        }));
    }

    isLogin(request: HttpRequest<any>): any {
        return request.url.search('/login') !== -1;
    }
}

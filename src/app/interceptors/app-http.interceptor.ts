import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { AuthenticationService } from './../services/authentication.service';

@Injectable()
export class AppHttpInterceptor implements HttpInterceptor {
  constructor(private authenticationService: AuthenticationService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    if (!request.url.includes('/auth/login')) {
      let newRequest = request.clone({
        headers: request.headers.set(
          'Authorization',
          'Bearer ' + this.authenticationService.accessToken
        ),
      });
      return next.handle(newRequest).pipe(
        catchError((err) => {
          if (err.status == 401) {
            this.authenticationService.logout();
          }
          return throwError(() => err.message);
        })
      );
    } else {
      return next.handle(request);
    }
  }
}

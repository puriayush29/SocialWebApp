import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { fromPromise } from 'rxjs/observable/fromPromise';
import { switchMap } from 'rxjs/operators';
import { TokenProvider } from './token/token';


@Injectable()
export class TokenInterceptor implements HttpInterceptor {

    constructor(private tokenProvider: TokenProvider) {

    }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return fromPromise(this.tokenProvider.getToken()).pipe(switchMap(token => {

            const headerConfig = {
                'Content-Type': 'application/json',
                Accept: 'aplication/json'
            };
            if (token) {
                headerConfig['Authorization'] = `beader ${token}`;
            }

            const _req = req.clone({ setHeaders: headerConfig });
            return next.handle(_req);
        }))
    }
}
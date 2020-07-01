import { TokenStorageService } from './../_services/token-storage.service';
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HTTP_INTERCEPTORS} from '@angular/common/http';
import { Observable } from 'rxjs';

const TOKEN_HEADER_KEY='Authorization';

@Injectable()
export class AuthInterceptor implements HttpInterceptor{

  constructor(private tokenStorage: TokenStorageService){

  }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let authReq= req;
    const token = this.tokenStorage.getToken();
  //  const token = JSON.parse(this.tokenStorage.getToken()).token;

    if(token != null){
      if(authReq.url.endsWith('/add')){
        const tokenAdd = JSON.parse(token).token;
        console.log(tokenAdd);
        authReq=req.clone({headers: req.headers.set(TOKEN_HEADER_KEY, 'Bearer '+tokenAdd)});
      } else{
      authReq=req.clone({ headers: req.headers.set(TOKEN_HEADER_KEY, 'Bearer '+token)});
      }
    }
    return next.handle(authReq);
  }

}

export const authInterceptorProvider = [
  { provide: HTTP_INTERCEPTORS, useClass : AuthInterceptor, multi: true}
]

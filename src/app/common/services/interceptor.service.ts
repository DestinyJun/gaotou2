import {Injectable} from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {LocalStorageService} from './local-storage.service';
import {Observable} from 'rxjs/Observable';
import {catchError, map} from 'rxjs/operators';
import {Router} from '@angular/router';

@Injectable()
export class InterceptorService implements HttpInterceptor {
  public clonedRequest: any; // 请求地址及请求头配置对象
  public skipUrl = [`/login`]; // 需要跳过认证的地址
  public http_url: any; // 动态分配服务器地址

  constructor(
    private localSessionStorage: LocalStorageService,
    private router: Router,
  ) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.skipUrl.includes(req.url)) {
      this.http_url = environment.urla;
    } else {
      this.http_url = environment.urlc;
    }
    return this.prod_http(req, next);
  }

  public prod_http(req: HttpRequest<any>, next: HttpHandler): Observable<any> {
    if (this.skipUrl.includes(req.url)) {
      // 为无需认证的接口配置请求地址以及请求头
      this.clonedRequest = req.clone({
        url: this.http_url + req.url,
        headers: req.headers
          .set('Content-type', 'application/json')
      });
    }
    else {
      // 给需要认证的接口配置请求地址以及请求头
      this.clonedRequest = req.clone({
        url: this.http_url + req.url,
        headers: req.headers
          .set('Content-type', 'application/json')
          .set('systemKey', 'c1fa8026-cfcf-4436-9f7e-ec2c8dd7d468')
          .set('accessToken', this.localSessionStorage.get('accessToken'))
      });
    }
    return next.handle(this.clonedRequest).pipe(
      map((event: HttpResponse<any>) => {
        if (event instanceof HttpResponse && event.status === 200) {
          if (event.body.status === 1000) {
            return event;
          } else {
            throw event.body;
          }
        }
      }),
      catchError((err: HttpErrorResponse) => {
        if (err.status === 1012) {
          if (window.confirm('当前账户已在另外客户端上线，请您重新登录！')) {
            this.router.navigate(['/login']);
          }
        } else {
          window.alert(`${err.message}，错误码：${err.status}`);
        }
        return Observable.empty(null);
      })
    );
  }
}

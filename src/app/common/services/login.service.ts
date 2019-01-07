import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {environment} from '../../../environments/environment';

@Injectable()
export class LoginService {
  constructor(
    private http: HttpClient,
  ) { }
  // 登陆
  public getLogin(params): Observable<any> {
    // return this.http.post(`${this.globalService.urls}/common/auth/login`, params);
    return this.http.post(`${environment.urla}/authenticator/login`, params);
  }
  // 初始化路由
  public getRouter (accessToken): Observable<any> {
      return this.http.get(`${environment.urla}/authenticator/init/business/accessToken/${accessToken}`)
  }
}

import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {GlobalService} from './global.service';

@Injectable()
export class LoginService {
  constructor(
    private http: HttpClient,
    private globalService: GlobalService
  ) { }
  // 登陆
  public getLogin(params): Observable<any> {
    // return this.http.post(`${this.globalService.urls}/common/auth/login`, params);
    return this.http.post(`${this.globalService.urla}/authenticator/login`, params);
  }
}

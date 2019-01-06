import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';

@Injectable()
export class PersonalService {

  constructor(
    private http: HttpClient,
  ) {}
  // 获取用户信息
  public getUsers (accessToken): Observable<any> {
    return this.http.get(`${environment.urla}/authenticator/init/business/accessToken/${accessToken}`);
  }
  // 修改用户信息
  public updateProfile(params): Observable<any> {
    return this.http.post(`${environment.urls}/common/auth/editUser`, params);
  }
  // 修改密码
  public updatePassword(params): Observable<any> {
    return this.http.post(`${environment.urls}/common/auth/updatePassword`, params);
  }
  //
}

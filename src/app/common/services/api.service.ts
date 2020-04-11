import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class ApiService {
  constructor(private http: HttpClient) {}
  // 登陆
  public getLogin(params): Observable<any> {
    return this.http.post(`/login`, params);
  }
  // 初始化路由
  public getRouter(params): Observable<any> {
    return this.http.post(`/getLeftSelectionBar`, params);
  }
  // 获取实时数据
  public getInitData(params): Observable<any> {
    return this.http.post(`/provinceRealTimeData`, params);
  }
}

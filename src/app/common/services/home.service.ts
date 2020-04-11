import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class HomeService {

  constructor(private http: HttpClient) { }
  // 初始化路由
  public getRouter (params): Observable<any> {
    return this.http.post(`/getLeftSelectionBar`, params);
  }
}

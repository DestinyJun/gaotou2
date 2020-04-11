import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class FinanceDataService {
  constructor(private http: HttpClient) { }
  // 获取实时数据
  public getInitData(params): Observable<any> {
    return this.http.post(`/provinceRealTimeData`, params);
  }
}

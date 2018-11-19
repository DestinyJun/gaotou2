import { Injectable } from '@angular/core';
import {Subject} from 'rxjs/Subject';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {LocalStorageService} from './local-storage.service';

@Injectable()
export class GlobalService {
  // public headers = {};
  public accessToken: string;
  public headers = {headers: new HttpHeaders({'AccessToken': '123456'})};
  // public userInfo: any;
  // 顶一个可订阅的项目
  public eventBus: Subject<any> = new Subject<any>();
  public persons: Subject<any> = new Subject<any>();
  public urls = `http://120.78.137.182:8888/highway-management`;
  public urlc = `http://120.78.137.182:8888/highway-interactive`;
  public urla = `http://120.77.171.73:8080/highway-authentication`;
  constructor(
    private http: HttpClient,
    private localSessionStorage: LocalStorageService
  ) {
    console.log(this.localSessionStorage.userSessionStorage.userDTO);
    this.accessToken = JSON.parse(this.localSessionStorage.userSessionStorage.authentication).accessToken;
    // this.headers = {headers: new HttpHeaders({'accessToken': this.accessToken})};
    // this.userInfo = JSON.parse(this.localSessionStorage.userSessionStorage.userDTO);
  }
  // 分页查询
  public searchList(num): Observable<any> {
    return this.http.post(
      `${this.urls}/administrativeArea/queryTreeByPaging/${num.page}/${num.nums}`, {});
  }
}

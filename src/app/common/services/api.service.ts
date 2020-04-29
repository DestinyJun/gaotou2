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
  // 获取省级实时数据
  public getProvinceData(params): Observable<any> {
    return this.http.post(`/provinceRealTimeData`, params);
  }
  // 获取省级服务区坐标
  public getProvinceMapPoints(params): Observable<any> {
    return this.http.post(`/getPrvcServiceAreaCoordinateInfo`, params);
  }
  // 获取片区级实时数据
  public getCityData(params): Observable<any> {
    return this.http.post(`/areaRealTimeData`, params);
  }
  // 获取片区级服务区坐标
  public getCityMapPoints(params): Observable<any> {
    return this.http.post(`/getAreaServiceAreaCoordinateInfo`, params);
  }
  // 获取服务区级实时数据
  public getAreaData(params): Observable<any> {
    return this.http.post(`/serviceAreaRealTimeData`, params);
  }
  // 获取服务区店铺数据
  public getAreaShopData(params): Observable<any> {
    return this.http.post(`/getServiceAreaCamera`, params);
  }
  // 获取视频列表
  public getVideoList(params): Observable<any> {
    return this.http.post(`/getCameraCall`, params);
  }
}

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
  // 获取客流分布
  public getPersonDistribute(params): Observable<any> {
    return this.http.post(`/getPassengerFlowDistribution`, params);
  }
  // 获取服务区店铺信息
  public getStoreInfo(params): Observable<any> {
    return this.http.post(`/getStroreInfo`, params);
  }
  // 获取车辆类型
  public getCarType(): Observable<any> {
    return this.http.post(`/getAllVehicleType`, {});
  }
  // 获取车辆分布信息
  public getCarDistribute(params): Observable<any> {
    return this.http.post(`/pageVehicleFolw`, params);
  }
  // 获取收入类型
  public getIncomeType(): Observable<any> {
    return this.http.post(`/getAllStoreType`, {});
  }
  // 获取收入分布信息
  public getIncomeDistribute(params): Observable<any> {
    return this.http.post(`/pageIncome`, params);
  }
  // 修改密码
  public updatePassword(params): Observable<any> {
    return this.http.post(`/modifyPwd`, params);
  }
}

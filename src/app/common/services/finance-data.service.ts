import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {GlobalService} from './global.service';

@Injectable()
export class FinanceDataService {

  constructor(
    private http: HttpClient,
    private globalService: GlobalService
  ) { }
  // 获取服务区坐标点
  public getServiceNamePoint(): Observable<any> {
    return this.http.get(`${this.globalService.urls}/common/config/getServiceAreaCoordinate/2`);
  }
  // 3D图数据、点击后的柱状图、扇形图
  public search3DBar(params): Observable<any> {
    return this.http.post(`${this.globalService.urlc}/administrativeAreaStatistics/monthly3D/${params.id}`, params.parameter);
  }
  public search3DAlertBar(params): Observable<any> {
    return this.http.get(`${this.globalService.urlc}/administrativeAreaStatistics/monthlyByType/${params.id}/${params.types}`);
  }
  public search3DAlertPie(params): Observable<any> {
    return this.http.get(`
    ${this.globalService.urlc}/administrativeAreaStatistics/mothlyChildAdministrtiveArea/${params.id}/${params.xType}/${params.types}`);
  }
  // top10柱状图
  public searchTop10Bar(params): Observable<any> {
    return this.http.get(`${this.globalService.urlc}/realTime/top10/province/${params.id}/sortBy/${params.type}`);
  }
  // 实时车流
  public searchCarTotal(params): Observable<any> {
    return this.http.get(`${this.globalService.urlc}/realTime/vechile/province/total/${params.id}`);
  }
  public searchCarTotalPie(params): Observable<any> {
    return this.http.get(`${this.globalService.urlc}/realTime/vechile/province/getVechileTypePie/${params.id}`);
  }
  public searchCarAlertTable(params): Observable<any> {
    return this.http.get(`${this.globalService.urlc}/realTime/vechile/province/${params.id}/${params.type}/getServiceAreaVechilePage/1/10`);
  }
  public searchCarAlertPie(params): Observable<any> {
    return this.http.get(`${this.globalService.urlc}/realTime/vechile/province/${params.id}/${params.type}/getChildAreaVechilePie`);
  }
  // 实时收入
  public searchIncomeTotal(params): Observable<any> {
    return this.http.get(`${this.globalService.urlc}/realTime/revenue/province/total/${params.id}`);
  }
  public searchIncomeTotalPie(params): Observable<any> {
    return this.http.get(`${this.globalService.urlc}/realTime/revenue/province/getRevenueTypePie/${params.id}`);
  }
  public searchIncomeAlertTable(params): Observable<any> {
    return this.http.get(`${this.globalService.urlc}/realTime/revenue/province/${params.id}/${params.type}/getServiceAreaRevenuePage/1/10`);
  }
  public searchIncomeAlertPie(params): Observable<any> {
    return this.http.get(`${this.globalService.urlc}/realTime/revenue/province/${params.id}/${params.type}/getChildAreaRevenuePie`);
  }
  // 实时客流
  public searchPersonTotal(params): Observable<any> {
    return this.http.get(`${this.globalService.urlc}/realTime/passenger/province/total/${params.id}`);
  }
  // 事件统计
  public searchEventNum(params): Observable<any> {
    return this.http.get(`${this.globalService.urlc}/event/countByCategory/`);
  }
}

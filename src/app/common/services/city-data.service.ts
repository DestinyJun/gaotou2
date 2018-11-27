import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {GlobalService} from './global.service';

@Injectable()
export class CityDataService {

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
    ${this.globalService.urlc}/serviceAreaStatistics/monthlyChildServiceArea/${params.id}/${params.xType}/${params.types}`);
  }
  // top10柱状图
  public searchTop10Bar(params): Observable<any> {
    return this.http.get(`${this.globalService.urlc}/realTime/top10/city/${params.id}/sortBy/${params.type}`);
  }
  // 实时车流
  public searchCarTotal(params): Observable<any> {
    return this.http.get(`${this.globalService.urlc}/realTime/vechile/city/total/${params.id}`);
  }
  public searchCarTotalPie(params): Observable<any> {
    return this.http.get(`${this.globalService.urlc}/realTime/vechile/city/getVechileTypePie/${params.id}`);
  }
  public searchCarAlertTable(params): Observable<any> {
    return this.http.get(`${this.globalService.urlc}/realTime/vechile/city/${params.id}/${params.type}/getServiceAreaVechilePage/1/10`);
  }
  public searchCarAlertPie(params): Observable<any> {
    return this.http.get(`${this.globalService.urlc}/realTime/vechile/city/${params.id}/${params.type}/getChildAreaVechilePie`);
  }
  // 实时收入
  public searchIncomeTotal(params): Observable<any> {
    return this.http.get(`${this.globalService.urlc}/realTime/revenue/city/total/${params.id}`);
  }
  public searchIncomeTotalPie(params): Observable<any> {
    return this.http.get(`${this.globalService.urlc}/realTime/revenue/city/getRevenueTypePie/${params.id}`);
  }
  public searchIncomeAlertTable(params): Observable<any> {
    return this.http.get(`${this.globalService.urlc}/realTime/revenue/city/${params.id}/${params.type}/getServiceAreaRevenuePage/1/10`);
  }
  public searchIncomeAlertPie(params): Observable<any> {
    return this.http.get(`${this.globalService.urlc}/realTime/revenue/city/${params.id}/${params.type}/getChildAreaRevenuePie`);
  }
  // 实时客流
  public searchPersonTotal(params): Observable<any> {
    return this.http.get(`${this.globalService.urlc}/realTime/passenger/city/total/${params.id}`);
  }
// 事件类型
  public searchEventCategory(): Observable<any> {
    return this.http.get(`${this.globalService.urls}/common/config/eventCategory/getAll`);
  }
  public searchEventCategoryCount(params): Observable<any> {
    return this.http.post(`${this.globalService.urlc}/event/administrativeArea/countNoProcess/${params.id}`, params.list);
  }
  public searchEventsTypeList(params): Observable<any> {
    return this.http.get(`${this.globalService.urlc}/event/administrativeArea/3/eventCategory/${params.eventCategoryCode}/eventState/${params.processState}/queryByPaging/${params.page}/${params.nums}`);
  }
}

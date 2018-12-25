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
  /*public search3DBar(params): Observable<any> {
    return this.http.post(`${this.globalService.urlc}/administrativeAreaStatistics/monthly3D/${params.id}`, params.parameter);
  }*/
  /*public search3DAlertBar(params): Observable<any> {
    return this.http.get(`${this.globalService.urlc}/administrativeAreaStatistics/monthlyByType/${params.id}/${params.types}`);
  }*/
  public search3DBar(params): Observable<any> {
    return this.http.post(`${this.globalService.urlc}/administrativeAreaStatistics/currentYear/monthly3D/${params.id}`, params.parameter);
  }
  public search3DAlertBar(params): Observable<any> {
    return this.http.get(`${this.globalService.urlc}/administrativeAreaStatistics/currentYear/monthlyByType/${params.id}/${params.types}`);
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
    return this.http.get(`${this.globalService.urlc}/realTime/vechile/province/${params.id}/${params.type}/getServiceAreaVechilePage/${params.page}/${params.nums}`);
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
    return this.http.get(`${this.globalService.urlc}/realTime/revenue/province/${params.id}/${params.type}/getServiceAreaRevenuePage/${params.page}/${params.nums}`);
  }
  public searchIncomeAlertPie(params): Observable<any> {
    return this.http.get(`${this.globalService.urlc}/realTime/revenue/province/${params.id}/${params.type}/getChildAreaRevenuePie`);
  }
  // 实时客流
  public searchPersonTotal(params): Observable<any> {
    return this.http.get(`${this.globalService.urlt}/realTime/passenger/province/total/${params.id}`);
  }
  public searchPersonProvince(params): Observable<any> {
    return this.http.get(`${this.globalService.urlt}/realTime/passenger/province/nationwideDistributeMap/${params.id}`);
  }
  public searchPersonCity(params): Observable<any> {
    return this.http.get(`${this.globalService.urlt}/realTime/passenger/province/gzDistributeMap/${params.id}`);
  }
  // 事件类型
  public searchEventCategory(): Observable<any> {
    return this.http.get(`${this.globalService.urls}/common/config/eventCategory/getAll`);
  }
  public searchEventCategoryCount(params): Observable<any> {
    return this.http.post(`${this.globalService.urlc}/event/administrativeArea/countNoProcess/${params.id}`, params.list);
  }
  public searchEventsTypeList(params): Observable<any> {
    return this.http.get(`${this.globalService.urlc}/event/administrativeArea/2/eventCategory/${params.eventCategoryCode}/eventState/${params.processState}/queryByPaging/${params.page}/${params.nums}`);
  }
  // 3D图表格导出
  public export3dBar(params): Observable<any> {
    return this.http.get(`http://120.78.137.182:8888/highway-interactive/report/province/3d/2/startDate/${params.startTime}/endDate/${params.endTime}`);
    /*return this.http.get(`${this.globalService.urlc}/report/province/3d/3/startDate/${params.startTime}/endDate/${params.endTime}`);*/
  }
}

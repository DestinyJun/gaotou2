import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {GlobalService} from './global.service';

@Injectable()
export class ServiceDataService {

  constructor(
    private http: HttpClient,
    private globalService: GlobalService
  ) { }
  public getServiceShopVDate(): Observable<any> {
    return this.http.get(`${this.globalService.urls}/common/config/getStoreAndCamera/1`);
  }
  // 查询商家店铺信息
  public getServiceShopMsg(params): Observable<any> {
    return this.http.post(`${this.globalService.urlc}/storeStatistics/base/upToNow`, {});
  }
  // 3D图数据、点击后的柱状图、折线图
  public search3DBar(params): Observable<any> {
    return this.http.post(`${this.globalService.urlc}/serviceAreaStatistics/monthly3D/${params.id}`, params.parameter);
  }
  public search3DAlertBar(params): Observable<any> {
    return this.http.get(`${this.globalService.urlc}/serviceAreaStatistics/monthlyByType/${params.id}/${params.types}`);
  }
  public search3DAlertLineMonth(params): Observable<any> {
    return this.http.get(`
    ${this.globalService.urlc}/serviceAreaStatistics/brokenLineLastMonth/${params.id}/${params.xType}/${params.types}`);
  }
  public search3DAlertLineWeek(params): Observable<any> {
    return this.http.get(`
    ${this.globalService.urlc}/administrativeAreaStatistics/mothlyChildAdministrtiveArea/${params.id}/${params.xType}/${params.types}`);
  }
  // 实时车流
  public searchCarTotal(params): Observable<any> {
    return this.http.get(`${this.globalService.urlc}/realTime/vechile/serviceArea/total/${params.id}`);
  }
  public searchCarTotalPie(params): Observable<any> {
    return this.http.get(`${this.globalService.urlc}/realTime/vechile/serviceArea/getVechileTypePie/${params.id}`);
  }
  public searchCarAlertTable(params): Observable<any> {
    return this.http.get(`${this.globalService.urlc}/realTime/vechile/province/${params.id}/${params.type}/getServiceAreaVechilePage/1/10`);
  }
  // 实时收入
  public searchIncomeTotal(params): Observable<any> {
    return this.http.get(`${this.globalService.urlc}/realTime/revenue/serviceArea/total/${params.id}`);
  }
  public searchIncomeTotalPie(params): Observable<any> {
    return this.http.get(`${this.globalService.urlc}/realTime/revenue/serviceArea/getRevenueTypePie/${params.id}`);
  }
  public searchIncomeAlertTable(params): Observable<any> {
    return this.http.get(`${this.globalService.urlc}/realTime/revenue/province/${params.id}/${params.type}/getServiceAreaRevenuePage/1/10`);
  }
  // 实时客流
  public searchPersonTotal(params): Observable<any> {
    return this.http.get(`${this.globalService.urlc}/realTime/passenger/serviceArea/getPassengerDistribute/${params.id}`);
  }
  // 修改服务区信息
  public modifySerAraItem(params): Observable<any> {
    return this.http.post(`${this.globalService.urls}/serviceArea/update`, params);
  }
  // 查询服务区信息
  public searchSerAraItem(id): Observable<any> {
    return this.http.get(`${this.globalService.urls}/serviceArea/queryById/${id}`);
  }
  public searchEventCategoryCount(params): Observable<any> {
    console.log(params.list);
    return this.http.post(`${this.globalService.urlc}/event/serviceArea/countNoProcess/${params.id}`, params.list);
  }
  // 未处理事件列表
  public searchNotPoocessEventsList(params): Observable<any> {
    return this.http.get(`${this.globalService.urlc}/event/serviceArea/1/notPoocess/queryByPaging/${params.page}/${params.nums}`);
  }
  // 根据事件类型及状态查询事件列表
  public searchEventsTypeList(params): Observable<any> {
    return this.http.get(`${this.globalService.urlc}/event/serviceArea/1/eventCategory/${params.eventCategoryCode}/eventState/${params.processState}/queryByPaging/${params.page}/${params.nums}`);
  }
  // 事件分类
  public searchEventCategory(): Observable<any> {
    return this.http.get(`${this.globalService.urls}/common/config/eventCategory/getAll`);
  }
  // 事件上报
  public searchEventsReported(params): Observable<any> {
    return this.http.post(`${this.globalService.urlc}/event/serviceArea/reportEvent`, params);
  }
}

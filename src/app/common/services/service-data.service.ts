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
  // 3D图数据、点击后的柱状图、折线图
 /* public search3DBar(params): Observable<any> {
    return this.http.post(`${this.globalService.urlc}/serviceAreaStatistics/monthly3D/${params.id}`, params.parameter);
  }*/
  /*public search3DBar(params): Observable<any> {
    return this.http.post(`${this.globalService.urlc}/serviceAreaStatistics/currentYear/monthly3D/${params.id}`, params.parameter);
  }*/
 /* public search3DAlertLineMonth(params): Observable<any> {
    return this.http.post(`${this.globalService.urlc}/serviceAreaStatistics/brokenLineLastMonth/${params.id}`, params.types);
  }*/
  /*public search3DAlertLineWeek(params): Observable<any> {
    return this.http.get(`
    ${this.globalService.urlc}/administrativeAreaStatistics/mothlyChildAdministrtiveArea/${params.id}/${params.xType}/${params.types}`);
  }*/
  public search3DBar(params): Observable<any> {
    return this.http.post(`${this.globalService.urlc}/serviceAreaStatistics/currentYear/monthly3D/${params.id}`, params.parameter);
  }
  public search3DAlertBar(params): Observable<any> {
    return this.http.get(`${this.globalService.urlc}/serviceAreaStatistics/currentYear/monthlyByType/${params.id}/${params.types}`);
  }
  public search3DAlertLineMonth(params): Observable<any> {
    return this.http.post(`${this.globalService.urlc}/serviceAreaStatistics/brokenLineCurrentMonth/${params.id}/${params.month}`, params.types);
  }

  // 实时车流
  public searchCarTotal(params): Observable<any> {
    return this.http.get(`${this.globalService.urlc}/realTime/vechile/serviceArea/total/${params.id}`);
  }
  public searchCarTotalPie(params): Observable<any> {
    return this.http.get(`${this.globalService.urlc}/realTime/vechile/serviceArea/getVechileTypePie/${params.id}`);
  }
  public searchCarAlertTable(params): Observable<any> {
    return this.http.get(`${this.globalService.urlc}/serviceArea/vehicle/${params.dateType}/${params.id}/${params.page}/${params.nums}`);
  }
  // 实时收入
  public searchIncomeTotal(params): Observable<any> {
    return this.http.get(`${this.globalService.urlc}/realTime/revenue/serviceArea/total/${params.id}`);
  }
  public searchIncomeTotalPie(params): Observable<any> {
    return this.http.get(`${this.globalService.urlc}/realTime/revenue/serviceArea/getRevenueTypePie/${params.id}`);
  }
  // 实时客流
  /*public searchPersonTotal(params): Observable<any> {
    return this.http.get(`${this.globalService.urlc}/realTime/passenger/serviceArea/getPassengerDistribute/${params.id}`);
  }*/
  public searchPersonTotal(params): Observable<any> {
    return this.http.get(`${this.globalService.urlt}/realTime/passenger/serviceArea/total/${params.id}`);
  }
  public searchPersonProvince(params): Observable<any> {
    return this.http.get(`${this.globalService.urlt}/realTime/passenger/serviceArea/nationwideDistributeMap/${params.id}`);
  }
  public searchPersonCity(params): Observable<any> {
    return this.http.get(`${this.globalService.urlt}/realTime/passenger/serviceArea/gzDistributeMap/${params.id}`);
  }
  // 修改服务区信息
  public modifySerAraItem(params): Observable<any> {
    return this.http.post(`${this.globalService.urls}/serviceArea/update`, params);
  }
  // 查询服务区信息
  public searchSerAraItem(id): Observable<any> {
    return this.http.get(`${this.globalService.urls}/serviceArea/queryById/${id}`);
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
  // 服务区店铺实时收入
  public  searchServiceShopIncome(): Observable<any> {
    return this.http.get(`${this.globalService.urlc}/realTime/revenue/serviceArea/storeRevenue2/1`);
  }
  // 服务区店铺折线图
 /* public searchServiceShopLine(params): Observable<any> {
    return this.http.post(`${this.globalService.urlc}/storeStatistics/brokenLineLastDayByHour/${params.id}`, params.yIndex);
  }*/
  public searchServiceShopLine(params): Observable<any> {
    return this.http.post(`${this.globalService.urlc}/storeStatistics/brokenLineCurrentDayByHour/${params.id}`, params.yIndex);
  }
  // 服务区店铺面积图
 /* public searchServiceShopArea(id): Observable<any> {
    return this.http.get(`${this.globalService.urlc}/storeStatistics/brokenLineLastYearByMonth/${id}`);
  }*/
  public searchServiceShopArea(id): Observable<any> {
    return this.http.get(`${this.globalService.urlc}/storeStatistics/brokenLineCurrentYearByMonth/${id}`);
  }
  // 获取经营类型
  public searchIncomeTypes(): Observable<any> {
    return this.http.get(`${this.globalService.urls}/common/config/getStoreByServiceAreaId/1/groupByType`);
  }
  // 获取经营分类收入
  public searchIncomeTypesList(params): Observable<any> {
    return this.http.get(`${this.globalService.urlc}/serviceArea/revenue/${params.dateType}/${params.id}/sortBy/total/${params.page}/${params.nums}`);
  }
  // 指定经营类型获取店铺收入
  /*public searchIncomeTypesItem(params): Observable<any> {
    return this.http.post(`${this.globalService.urlc}/hourly/revenue/1/${params.entryCode}/${params.page}/${params.nums}`, params.shopList);
  }*/
  public searchIncomeTypesItem(params): Observable<any> {
    return this.http.get(`${this.globalService.urlc}/serviceArea/revenue/${params.dateType}/${params.id}/${params.entryCode}/${params.page}/${params.nums}`);
  }
}

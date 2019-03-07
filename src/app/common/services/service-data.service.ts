import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';

@Injectable()
export class ServiceDataService {

  constructor(
    private http: HttpClient,
  ) { }
  public getServiceShopVDate(params): Observable<any> {
    return this.http.get(`${environment.urls}/common/config/getStoreAndCamera/${params.id}`);
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
    return this.http.post(`${environment.urlc}/serviceAreaStatistics/currentYear/monthly3D/${params.id}`, params.parameter);
  }
  public search3DAlertBar(params): Observable<any> {
    return this.http.get(`${environment.urlc}/serviceAreaStatistics/currentYear/monthlyByType/${params.id}/${params.types}`);
  }
  public search3DAlertLineMonth(params): Observable<any> {
    return this.http.post(`${environment.urlc}/serviceAreaStatistics/brokenLineCurrentMonth/${params.id}/${params.month}`, params.types);
  }

  // 实时车流
  public searchCarTotal(params): Observable<any> {
    return this.http.get(`${environment.urlc}/realTime/vechile/serviceArea/total/${params.id}`);
  }
  public searchCarTotalPie(params): Observable<any> {
    return this.http.get(`${environment.urlc}/realTime/vechile/serviceArea/getVechileTypePie/${params.id}`);
  }
  public searchCarAlertTable(params): Observable<any> {
    return this.http.get(`${environment.urlc}/serviceArea/vehicle/${params.dateType}/${params.id}/${params.page}/${params.nums}`);
  }
  // 实时收入
  public searchIncomeTotal(params): Observable<any> {
    return this.http.get(`${environment.urlc}/realTime/revenue/serviceArea/total/${params.id}`);
  }
  public searchIncomeTotalPie(params): Observable<any> {
    return this.http.get(`${environment.urlc}/realTime/revenue/serviceArea/getRevenueTypePie/${params.id}`);
  }
  // 实时客流
  /*public searchPersonTotal(params): Observable<any> {
    return this.http.get(`${environment.urlc}/realTime/passenger/serviceArea/getPassengerDistribute/${params.id}`);
  }*/
  public searchPersonTotal(params): Observable<any> {
    return this.http.get(`${environment.urlc}/realTime/passenger/serviceArea/total/${params.id}`);
  }
  public searchPersonProvince(params): Observable<any> {
    return this.http.get(`${environment.urlc}/realTime/passenger/serviceArea/nationwideDistributeMap/${params.id}`);
  }
  public searchPersonCity(params): Observable<any> {
    return this.http.get(`${environment.urlc}/realTime/passenger/serviceArea/gzDistributeMap/${params.id}`);
  }
  // 修改服务区信息
  public modifySerAraItem(params): Observable<any> {
    return this.http.post(`${environment.urls}/serviceArea/update`, params);
  }
  // 查询服务区信息
  public searchSerAraItem(id): Observable<any> {
    return this.http.get(`${environment.urls}/serviceArea/queryById/${id}`);
  }
  // 未处理事件列表
  public searchNotPoocessEventsList(params): Observable<any> {
    return this.http.get(`${environment.urlc}/event/serviceArea/${params.id}/notPoocess/queryByPaging/${params.page}/${params.nums}`);
  }
  // 根据事件类型及状态查询事件列表
  public searchEventsTypeList(params): Observable<any> {
    return this.http.get(`${environment.urlc}/event/serviceArea/${params.id}/eventCategory/${params.eventCategoryCode}/eventState/${params.processState}/queryByPaging/${params.page}/${params.nums}`);
  }
  // 事件分类
  public searchEventCategory(): Observable<any> {
    return this.http.get(`${environment.urls}/common/config/eventCategory/getAll`);
  }
  // 事件上报
  public searchEventsReported(params): Observable<any> {
    return this.http.post(`${environment.urlc}/event/serviceArea/reportEvent`, params);
  }
  // 服务区店铺实时收入
  public  searchServiceShopIncome(params): Observable<any> {
    return this.http.get(`${environment.urlc}/realTime/revenue/serviceArea/storeRevenue2/${params.id}`);
  }
  // 服务区店铺折线图
 /* public searchServiceShopLine(params): Observable<any> {
    return this.http.post(`${environment.urlc}/storeStatistics/brokenLineLastDayByHour/${params.id}`, params.yIndex);
  }*/
  public searchServiceShopLine(params): Observable<any> {
    return this.http.post(`${environment.urlc}/storeStatistics/brokenLineCurrentDayByHour/${params.id}`, params.yIndex);
  }
  // 服务区店铺面积图
 /* public searchServiceShopArea(id): Observable<any> {
    return this.http.get(`${environment.urlc}/storeStatistics/brokenLineLastYearByMonth/${id}`);
  }*/
  public searchServiceShopArea(id): Observable<any> {
    return this.http.get(`${environment.urlc}/storeStatistics/brokenLineCurrentYearByMonth/${id}`);
  }
  // 获取经营类型
  public searchIncomeTypes(params): Observable<any> {
    return this.http.get(`${environment.urls}/common/config/getStoreByServiceAreaId/${params.id}/groupByType`);
  }
  // 获取经营分类收入
  public searchIncomeTypesList(params): Observable<any> {
    return this.http.get(`${environment.urlc}/serviceArea/revenue/${params.dateType}/${params.id}/sortBy/total/${params.page}/${params.nums}`);
  }
  // 指定经营类型获取店铺收入
  /*public searchIncomeTypesItem(params): Observable<any> {
    return this.http.post(`${environment.urlc}/hourly/revenue/${params.id}/${params.entryCode}/${params.page}/${params.nums}`, params.shopList);
  }*/
  public searchIncomeTypesItem(params): Observable<any> {
    return this.http.get(`${environment.urlc}/serviceArea/revenue/${params.dateType}/${params.id}/${params.entryCode}/${params.page}/${params.nums}`);
  }
  // 查询服务区方向
  public searchServiceDirection (id): Observable<any> {
    return this.http.get(`${environment.urls}/common/config/getOrientation/${id}`);
  }
  // 根据服务区方向查询没有收银机的店铺
  public searchServiceNoCashShop (id): Observable<any> {
    return this.http.get(`${environment.urls}/common/config/getNoCashStore/${id}`);
  }
  // 添加输入没有收银机的店铺收入
  public addNoCashShopIncome (params): Observable<any> {
    return this.http.post(`${environment.urlc}/storeStatistics/addStoreCash`, params);
  }
}

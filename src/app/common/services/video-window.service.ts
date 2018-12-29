import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';

@Injectable()
export class VideoWindowService {

  constructor(
    private http: HttpClient,
  ) { }
  /**********************数据联动*****************************/
  // 查询激活区域
  public searchAreaList(): Observable<any> {
    return this.http.get(`${environment.urls}/common/config/getAllAdministrativeAreaTree`);
  }
  // 根据区域ID查服务区
  public searchServiceAreaList(id): Observable<any> {
    return this.http.get(`${environment.urls}/common/config/getServiceAreaByAdministrativeAreaId/${id}`);
  }
  // 根据服务区ID查摄像头
  public searchVideosList(id): Observable<any> {
    return this.http.get(`${environment.urls}/common/config/getCameras/${id}`);
  }
  // 初始化视频播放
  public getVideosUrl(id): Observable<any> {
    return this.http.get(`${environment.urlc}/cameraRecord/queryByUserId/${id}`);
  }
  // 保存视频播放地址
  public saveVideosUrl(id, params): Observable<any> {
    console.log(params);
    return this.http.post(`${environment.urlc}/cameraRecord/addRecord/${id}`, params);
  }
}

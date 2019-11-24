import { Injectable } from '@angular/core';
import {Subject} from 'rxjs/Subject';

@Injectable()
export class LocalStorageService {
  public accessToken: string;
  public eventBus: Subject<any> = new Subject<any>(); // 头部数据信息
  public persons: Subject<any> = new Subject<any>(); // 客流
  public personsShow: Subject<any> = new Subject<any>(); // 客流
  public loading: Subject<any> = new Subject<any>(); // 加载动画控制
  public videoShow: Subject<any> = new Subject<any>(); // 视频加载控制
  public windowVideoShow: Subject<any> = new Subject<any>(); // 服务区视频加载控制
  public userSessionStorage: any;
  constructor() {
    if (!sessionStorage) {
      throw new Error('Current browser does not support Local Storage');
    }
    this.userSessionStorage = sessionStorage;
  }
  public set(key: string, value: string): void {
    this.userSessionStorage[key] = value;
  }
  public get(key: string): string {
    return this.userSessionStorage[key] || false;
  }
  public setObject(key: string, value: any): void {
    this.userSessionStorage[key] = JSON.stringify(value);
  }
  public getObject(key: string): any {
    return JSON.parse(this.userSessionStorage[key] || '{}');
  }
  public remove(key: string): any {
    this.userSessionStorage.removeItem(key);
  }
}



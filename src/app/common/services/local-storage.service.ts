import { Injectable } from '@angular/core';
import {Subject} from 'rxjs/Subject';

@Injectable()
export class LocalStorageService {
  // 顶一个可订阅的项目
  public eventBus: Subject<any> = new Subject<any>();
  public persons: Subject<any> = new Subject<any>();
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



import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {LocalStorageService} from './local-storage.service';

@Injectable()
export class GlobalService {
  public accessToken: string;
  // gaotou
  public urls = `http://120.78.137.182:8888/highway-management`;
  public urlc = `http://120.78.137.182:8888/highway-interactive`;
  public urlt = `http://120.78.137.182:8888/highway-interactive`;
  public urla = `http://120.77.171.73:8080/highway-authentication`;
  // gaotou3
 /* public urls = `http://123.249.28.108:8082/highway-management`;
  public urlc = `http://123.249.28.108:8082/highway-interactive`;
  public urlt = `http://123.249.28.108:8082/highway-interactive`;
  public urla = `http://120.77.171.73:8080/highway-authentication`;*/
  constructor(
    private http: HttpClient,
    private localSessionStorage: LocalStorageService
  ) {}
}

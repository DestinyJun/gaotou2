import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {LocalStorageService} from '../../common/services/local-storage.service';
import {HttpClient} from '@angular/common/http';
import {GlobalService} from '../../common/services/global.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  public flagState: string;  // 路由状态及名称
  public flagName: string;
  public dataTime = new Date();  // 时间
  public headerTitle: string;  // 顶部标题
  public persons = [];  // 客流量
  public personsTop: any;  // 客流量
  public personsBottom: any;  // 客流量
  public personNum = [];
  public serviceNameArray: any;
  public serviceName: string;
  // 弹窗
  public serviceZonePersonAlert = false;
  public cityPersonAlert = false;
  constructor(
    private routerInfo: ActivatedRoute,
    private localService: LocalStorageService,
    private http: HttpClient,
    private globalService: GlobalService,
    private router: Router
  ) { }

  ngOnInit() {
    this.http.get(`${this.globalService.urls}/common/config/getServiceAreaCoordinate/2`).subscribe(
      (val) => {
        this.serviceNameArray = val;
      }
    );
    this.http.get(`${this.globalService.urlc}/realTime/passenger/province/getPassengerDistributeMap/2`).subscribe(
      (val) => {
        console.log(val);
      }
    );
    // 时间
    setInterval(() => {
      this.dataTime = new Date();
    });
    // 订阅title以及车流事件
    this.localService.eventBus.subscribe((value) => {
      this.headerTitle = value.title;
      this.flagState = value.flagState;
      this.flagName = value.flagName;
    });
    // 客流
    this.localService.persons.subscribe((value) => {
      console.log(value);
      this.persons = value.total;
      this.persons.map((val, index) => {
        this.personNum.push({number: val});
      });
      if (value.totalDistribute) {
        value.totalDistribute.map((item, i) => {
          if (item.flag === '2') {
            this.personsTop = item;
          } else {
            this.personsBottom = item;
          }
        });
      }
    });
  }
  public serviceSearchChange(e): void {
    const a = this.serviceNameArray.data.filter((item, index) => {
      return e.target.value === item.name;
    });
    if (a.length !== 0) {
      if (a[0].name === '久长服务区') {
        this.router.navigate(['/home/serzone', {name: a[0].name}]);
      } else {
        window.alert('此服务区暂无数据');
      }
    } else {
      window.alert('暂无此服务区');
    }
  }
  // 客流量弹窗
  public personClick() {
    if (this.flagState === 'serzone') {
      this.serviceZonePersonAlert = true;
    } else {
      this.cityPersonAlert = true;
      this.localService.videoShow.next(this.cityPersonAlert);
    }
  }
  public closePersonAlert() {
      this.serviceZonePersonAlert = false;
      this.cityPersonAlert = false;
      this.localService.videoShow.next(this.cityPersonAlert);
  }
}

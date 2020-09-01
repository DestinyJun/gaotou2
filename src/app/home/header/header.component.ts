import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {LocalStorageService} from '../../common/services/local-storage.service';
import {HttpClient} from '@angular/common/http';
import { CountUpOptions } from 'countup.js';
import {ApiService} from '../../common/services/api.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  public flagState: any;  // 路由状态及名称
  public flagName: string;
  public dataTime = new Date();  // 时间
  public headerTitle: string;  // 顶部标题
  public persons: any;  // 客流量
  public serviceNameArray: any;
  public serviceName: string;
  public serviceSearchListShow = false;
  public serviceSearchList = [];
  public personNumber: number;
  public target = null;
  public type = null;
  public provinceData = null;
  public cityData = null;
  public serviceData = null;
  public personNumberOption: CountUpOptions = {
    useGrouping: false,
    duration: 3,
  };
  // 弹窗
  public serviceZonePersonAlert = false;
  public cityPersonAlert = false;
  constructor(
    private routerInfo: ActivatedRoute,
    private localService: LocalStorageService,
    private http: HttpClient,
    private router: Router,
    private apiSrv: ApiService,
  ) { }

  ngOnInit() {
    const that = this;
   /* this.http.get(`${environment.urls}/common/config/getServiceAreaCoordinate/2`).subscribe(
      (val) => {
        this.serviceNameArray = val;
      }
    );*/
    window.onclick = function (event) {
      if (
        event.srcElement.className === 'saerch-list-li' ||
        event.srcElement.className === 'ui-scrollpanel-content' ||
        event.srcElement.id === 'search'
      ) {
        return;
      }
      that.serviceSearchListShow = false;
    };
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
      this.personNumber = parseInt(value.total.join(''), 10);
      this.persons = value;
      this.target = value.target;
      this.type = value.type;
    });
    // 客流
    this.localService.personsShow.subscribe((value) => {
      this.cityPersonAlert = true;
    });
  }
  public logOut(): void {
    this.localService.remove('accessToken');
    this.localService.remove('companyId');
    this.router.navigate(['/login']);
  }
  public serviceSearchChange(e): void {
    if (e.keyCode === 13) {
      if (this.serviceName === undefined) {
        window.alert('请输入要搜索的关键字');
        return;
      }
      if (this.serviceName === '久长服务区') {
        this.router.navigate(['/home/serzone', {id: 1, name: this.serviceName}]);
        this.serviceSearchListShow = false;
        return;
      }
      window.alert('此服务区暂无数据');
    }
    if (this.serviceNameArray !== undefined) {
      this.serviceSearchList = this.serviceNameArray.data.filter((item, index) => {
        return item.name.indexOf(e.target.value) !== -1;
      });
    }
  }
  public saerchListClick (e): void {
    this.serviceName = e.name;
    this.router.navigate(['/home/serzone', {id: e.id, name: this.serviceName}]);
    this.serviceSearchListShow = false;
  }
  public searchFocus (e): void {
    if (this.serviceNameArray !== undefined) {
      this.serviceSearchList = this.serviceNameArray.data.filter((item, index) => {
        return item.name.indexOf(e.target.value) !== -1;
      });
      this.serviceSearchListShow = true;
    }
  }
  // 客流量弹窗
  public personClick() {
    const params = {
      companyId: this.localService.get('companyId'),
      target: this.target,
      type: this.type
    };
    this.apiSrv.getPersonDistribute(params).subscribe((res) => {
      this.provinceData = res.date.province.map((item) => ({name: item.provinceName, value: item.number}));
      this.cityData = res.date.guizhou.map((item) => {
        let name = '';
        if (item.provinceName === '铜仁地区') {
          name = '铜仁市';
        } else if (item.provinceName === '毕节地区') {
          name = '毕节市';
        } else {
          name = item.provinceName;
        }
        return {name: name, value: item.number};
      });
      if (this.flagState === 'serzone') {
        this.serviceZonePersonAlert = true;
      } else {
        this.cityPersonAlert = true;
        this.localService.videoShow.next(this.cityPersonAlert);
      }
      this.cityPersonAlert = true;
      this.localService.videoShow.next(this.cityPersonAlert);
      this.localService.windowVideoShow.next(false);
    });
  }
  public closePersonAlert() {
      this.serviceZonePersonAlert = false;
      this.cityPersonAlert = false;
      this.localService.windowVideoShow.next(true);
      this.localService.videoShow.next(this.cityPersonAlert);
  }
}

import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {LocalStorageService} from '../../common/services/local-storage.service';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  encapsulation: ViewEncapsulation.None
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
  // 弹窗
  public serviceZonePersonAlert = false;
  public cityPersonAlert = false;
  constructor(
    private routerInfo: ActivatedRoute,
    private localService: LocalStorageService,
    private http: HttpClient,
    private router: Router
  ) { }

  ngOnInit() {
    const that = this;
    this.http.get(`${environment.urls}/common/config/getServiceAreaCoordinate/2`).subscribe(
      (val) => {
        this.serviceNameArray = val;
      }
    );
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
      this.persons = value;
      // console.log(this.persons.total);
     /* this.persons.map((val, index) => {
        this.personNum.push({number: val});
      });*/
     /* if (value.totalDistribute.length !== 0) {
        value.totalDistribute.map((item, i) => {
          if (item.flag === '2') {
            this.personsTop = item;
          } else {
            this.personsBottom = item;
          }
        });
      }*/
    });
  }
  public serviceSearchChange(e): void {
    if (e.keyCode === 13) {
      if (this.serviceName === undefined) {
        window.alert('请输入要搜索的关键字');
        return;
      }
      if (this.serviceName === '久长服务区') {
        this.router.navigate(['/home/serzone', {name: this.serviceName}]);
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
    if (this.serviceName === '久长服务区') {
      this.router.navigate(['/home/serzone', {name: this.serviceName}]);
      this.serviceSearchListShow = false;
    } else {
      window.alert('此服务区暂无数据');
      this.serviceSearchListShow = false;
    }
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
    /*if (this.flagState === 'serzone') {
      this.serviceZonePersonAlert = true;
    } else {
      this.cityPersonAlert = true;
      this.localService.videoShow.next(this.cityPersonAlert);
    }*/
    this.cityPersonAlert = true;
    this.localService.videoShow.next(this.cityPersonAlert);
  }
  public closePersonAlert() {
      this.serviceZonePersonAlert = false;
      this.cityPersonAlert = false;
      this.localService.videoShow.next(this.cityPersonAlert);
  }
}

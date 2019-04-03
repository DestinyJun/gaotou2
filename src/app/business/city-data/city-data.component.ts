import {Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {DataService} from '../../common/services/data.service';
import {ConfigModule, WenjunAlertService} from '../../common/wenjun';
import {CityDataService} from '../../common/services/city-data.service';
import {LocalStorageService} from '../../common/services/local-storage.service';
@Component({
  selector: 'app-city-data',
  templateUrl: './city-data.component.html',
  styleUrls: ['./city-data.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class CityDataComponent implements OnInit, OnDestroy {
  /***********************基础信息************************/
  public esDate: any;  // 时间初始化
    // 组件销毁后清除时钟任务
  public personAmountCountClean: any;
  /*****************************中部**************************/
  public mapPoints: any; // 地图点
  // 省市联动
  public dataToggle: string;
  public cityId: any;
  // 事件类数据
  public eventTypes: any;
  public eventConfig: ConfigModule;
  public eventAlertListShow = true;
  public eventListNoProcess: any;
  public eventListProcess: any;
  public eventListInfo: any;
  // 办公类事件
  public officeTypes: any;
  public alertOfficeShow = false;
  // 个人类事件
  public personOfficeTypes: any;
  public alertPersonShow = false;
  constructor(
    private dataService: DataService,
    private router: Router,
    private routerInfo: ActivatedRoute,
    private wenJunAlertService: WenjunAlertService,
    private cityDataService: CityDataService,
    private localService: LocalStorageService,
  ) {
  }

  ngOnInit() {
    // 路由接受参数
    this.routerInfo.params.subscribe(
      (params) => {
        this.dataToggle = params.name;
        this.cityId = params.id;
        this.getPerson();
        // 时间初始化
        this.esDate = {
          firstDayOfWeek: 0,
          dayNames: ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'],
          dayNamesShort: ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'],
          dayNamesMin: ['周日', '周一', '周二', '周三', '周四', '周五', '周六'],
          monthNames: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
          monthNamesShort: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
          today: '今天',
          clear: '清除'
        };
        // 发射也太数据名称
        this.localService.eventBus.next({title: this.dataToggle + '高速业态大数据', flagState: 'city', flagName: this.dataToggle});
        // 图表更行
        this.updataEcharts();
      }
    );
  }
  ngOnDestroy(): void {
    clearInterval(this.personAmountCountClean);
  }

  /*********************************数据初始化*****************************/
  public updataEcharts(): void {
    /**************************中部****************************/
    this.centerMap();
    // 事件
    this.initialize();
    // 办公
    this.officeTypes = this.dataService.officeTypes;
    // 个人
    this.personOfficeTypes = this.dataService.personOfficeTypes;
    // 实时客流
    this.personAmountCountClean = setInterval(() => {
      this.getPerson();
    }, 3000);
  }
  // 客流
  public getPerson(): void {
    let total: any;
    let province: any;
    let city: any;
    this.cityDataService.searchPersonTotal({id: this.cityId}).subscribe(
      (totalVal) => {
        if (totalVal.status === '200') {
          total = totalVal.data;
          if (!(total === 0)) {
            this.cityDataService.searchPersonProvince({id: this.cityId}).subscribe(
              (provinceVal) => {
                if (provinceVal.status === '200') {
                  province = provinceVal.data;
                  this.cityDataService.searchPersonCity({id: this.cityId}).subscribe(
                    (cityVal) => {
                      if (cityVal.status === '200') {
                        city = cityVal.data;
                        this.localService.persons.next({
                          total: total.toString().split(''),
                          province: province,
                          city: city
                        });
                      }
                    }
                  );
                }
              }
            );
          } else {
            this.localService.persons.next({
              total: [],
              province: [],
              city: []
            });
          }
        }
      }
    );
  }
  /*********************************中部*****************************/
  // 中部地图
  public centerMap (): void {
    this.cityDataService.getServiceNamePoint({id: this.cityId}).subscribe(
      (val) => {
        if (val.status === '200') {
          this.mapPoints = val.data;
        }
      }
    );
  }
  public mapCityClick (param): void {
    if (param.areaName !== undefined) {
      if (param.areaName === '久长服务区') {
        this.router.navigate(['/home/serzone', {id: 1, name: param.areaName}]);
      } else {
        this.router.navigate(['/home/serzone', {id: 28, name: param.areaName}]);
        // window.alert('此服务区暂无数据');
      }
    }
  }
  // 事件类型统计
  public initialize(): void {
    this.cityDataService.searchEventCategory().subscribe(
      (value) => {
        if (value.status === '200') {
          this.cityDataService.searchEventCategoryCount({id: this.cityId, list: value.data}).subscribe(
            (item) => {
              if (item.status === '200') {
                this.eventTypes = item.data;
              }
            }
          );
        }
      }
    );
  }
  public tableEventClick(item): void {
    this.eventConfig = {
      alertTitle: item.eventCategoryName,
      width: 80,
      height: 60,
    };
    if (item.eventCategoryName === '经营类') {
      this.wenJunAlertService.openAlertShow();
    } else {
      this.alertOfficeShow = true;
    }
    this.getEventsTypeList(item);
  }
  public getEventsTypeList (item): void {
    // 未处理
    this.cityDataService.searchEventsTypeList(
      {id: this.cityId, eventCategoryCode: item.categoryCode, processState: 2, page: 1, nums: 1000}).subscribe(
      (val) => {
        if (val.status === '200') {
          this.eventListNoProcess = val.data.contents;
        }
      }
    );
    // 已处理
    this.cityDataService.searchEventsTypeList(
      {id: this.cityId, eventCategoryCode: item.categoryCode, processState: 1, page: 1, nums: 1000}).subscribe(
      (value) => {
        if (value.status === '200') {
          this.eventListProcess = value.data.contents;
        }
      }
    );
  }
  public eventAlertListCtrlw(): void {
    this.eventAlertListShow = true;
  }
  public eventAlertListCtrly(): void {
    this.eventAlertListShow = false;
  }
  public eventListInfoClick(item): void {
    this.eventListInfo = item;
  }
  // 办公室信息处理函数
  public tableOfficeClick(e): void {
    this.alertOfficeShow = true;
  }
  public closeOfficeShow() {
    this.alertOfficeShow = false;
  }

  // 个人信息处理
  public tablePersonClick(e) {
    this.alertPersonShow = true;
  }
  public closePersonShow() {
    this.alertPersonShow = false;
  }
}

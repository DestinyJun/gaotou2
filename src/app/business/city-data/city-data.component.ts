import {Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {DataService} from '../../common/services/data.service';
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
  constructor(
    private dataService: DataService,
    private router: Router,
    private routerInfo: ActivatedRoute,
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
}

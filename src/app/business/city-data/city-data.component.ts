import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {DataService} from '../../common/services/data.service';
import {CityDataService} from '../../common/services/city-data.service';
import {LocalStorageService} from '../../common/services/local-storage.service';
@Component({
  selector: 'app-city-data',
  templateUrl: './city-data.component.html',
  styleUrls: ['./city-data.component.less'],
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
  public provinceId: any;
  // 3D柱状图配置
  public options3d: any;
  public options3dCopy: any;
  public optionsNumber = 0;
  public optionsNumberCopy = 0;
  public optionTimer: any;
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
        clearInterval(this.personAmountCountClean);
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
        // 实时数据
        this.personAmountCountClean = setInterval(() => {
          this.getPerson();
        }, 3000);
      }
    );
    this.packOption3();
    this.packOption3Copy();
    this.optionTimer = setInterval(() => {
      this.packOption3();
      this.packOption3Copy();
    }, 8000);
  }
  ngOnDestroy(): void {
    clearInterval(this.personAmountCountClean);
    clearInterval(this.optionTimer);
  }

  /*********************************数据初始化*****************************/
  public updataEcharts(): void {
    /**************************中部****************************/
    this.centerMap();
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
  // 3D柱状图
  public packOption3() {
    const types1 = ['revenue', 'passenger', 'vehicle'];
    const colors = ['#031845', '#00C800', '#eb64fb'];
    // 车流客流人流
    this.cityDataService.search3DBar({id: this.cityId, parameter: [types1[this.optionsNumber]]}).subscribe(
      (val) => {
        if (val.status === '200') {
          this.options3d = {
            data: val.data,
            color: colors[this.optionsNumber],
            title: this.dataToggle
          };
        }
      }
    );
    this.optionsNumber++;
    if (this.optionsNumber >= types1.length) {
      this.optionsNumber = 0;
    }
  }
  public packOption3Copy() {
    const typesCopy = ['electric', 'water'];
    // 用电量用水量
    this.cityDataService.search3DBar({id: this.cityId, parameter: [typesCopy[this.optionsNumberCopy]]}).subscribe(
      (val) => {
        if (val.status === '200') {
          this.options3dCopy = {
            data: val.data,
            title: this.dataToggle
          };
        }
      }
    );
    this.optionsNumberCopy++;
    if (this.optionsNumberCopy >= typesCopy.length) {
      this.optionsNumberCopy = 0;
    }
  }
}

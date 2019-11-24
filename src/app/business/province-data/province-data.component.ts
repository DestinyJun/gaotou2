import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {DataService} from '../../common/services/data.service';
import {FinanceDataService} from '../../common/services/finance-data.service';
import {LocalStorageService} from '../../common/services/local-storage.service';
@Component({
  selector: 'app-finance-data',
  templateUrl: './province-data.component.html',
  styleUrls: ['./province-data.component.less'],
})
export class ProvinceDataComponent implements OnInit, OnDestroy {
  /***********************基础信息************************/
  public esDate: any;  // 时间初始化
  public personAmountCountClean: any;
  /*****************************中部**************************/
  // 地图点
  public mapPoints: any;
    // 省市联动
  public dataToggle: string;
  public province: any;
  public city: any;
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
    private financeDataService: FinanceDataService,
    private localService: LocalStorageService,
  ) {}

  ngOnInit() {
    // 路由接受参数
    this.routerInfo.params.subscribe(
      (params) => {
        clearInterval(this.personAmountCountClean);
        this.dataToggle = params.name;
        this.provinceId = params.id;
        // 发射业态数据名称
        this.localService.eventBus.next({title: params.name + '高速业态大数据',  flagState: 'finance', flagName: this.dataToggle});
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
        // 图表更行
        this.updataEcharts();
        // 实时刷新数据
        // 实时客流
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
  public updataEcharts(): void {
    // 地图数据
    this.centertMap();
  }
  // 客流
  public getPerson(): void {
    let total: any;
    let province: any;
    let city: any;
    this.financeDataService.searchPersonTotal({id: this.provinceId}).subscribe(
      (totalVal) => {
        if (totalVal.status === '200') {
          total = totalVal.data;
          if (!(total === 0)) {
            this.financeDataService.searchPersonProvince({id: this.provinceId}).subscribe(
              (provinceVal) => {
                if (provinceVal.status === '200') {
                  province = provinceVal.data;
                  this.financeDataService.searchPersonCity({id: this.provinceId}).subscribe(
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
  public centertMap (): void {
      this.financeDataService.getServiceNamePoint({id: this.provinceId}).subscribe(
        (val) => {
          if (val.status === '200') {
            this.mapPoints = val.data;
          }
        }
      );
  }
  public mapCityClick (param): void {
    if (param.areaName === undefined) {
      if (param.cityName === '贵阳市') {
        this.router.navigate(['/home/city', {id: 3, name: param.cityName}]);
      } else {
        this.router.navigate(['/home/city', {id: 5, name: param.cityName}]);
        // window.alert(`很抱歉${param.cityName}暂无数据`);
      }
    } else {
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
    this.financeDataService.search3DBar({id: this.provinceId, parameter: [types1[this.optionsNumber]]}).subscribe(
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
    this.financeDataService.search3DBar({id: this.provinceId, parameter: [typesCopy[this.optionsNumberCopy]]}).subscribe(
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

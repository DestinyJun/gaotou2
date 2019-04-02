import {Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {DataService} from '../../common/services/data.service';
import {ConfigModule, WenjunAlertService} from '../../common/wenjun';
import {FinanceDataService} from '../../common/services/finance-data.service';
import {LocalStorageService} from '../../common/services/local-storage.service';
import {DatePipe} from '@angular/common';
@Component({
  selector: 'app-finance-data',
  templateUrl: './province-data.component.html',
  styleUrls: ['./province-data.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ProvinceDataComponent implements OnInit, OnDestroy {
  /***********************基础信息************************/
  public esDate: any;  // 时间初始化
    // 组件销毁后清除时钟任务
  public vehicleAmountCountClean: any;
  public incomeAmountCountClean: any;
  public personAmountCountClean: any;
  /*****************************中部**************************/
  // 地图点
  public mapPoints: any;
    // 省市联动
  public dataToggle: string;
  public province: any;
  public city: any;
  public provinceId: any;
  // 事件类型
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

  /*****************************右边***************************/
    // 全国业态经营数据前十排名
  public crosswiseBar = {};
  public barStatus1 = true;
  public barStatus2 = false;
  public barStatus3 = false;
  public dataStatus = '业态收入/万元';
  // 收入监控
  public incomeAmount: any;
  public optionsIncomeModel: any;
  public alertIncomeShow = false;
  public alertIncomeTitle = '';
  public optionsIncomeTypes = {};
  public IncomeTableData: any;
  public arryIncomePie = [];
  public IncomeOptionType: any;
  public incomeExcelShow = false;
  public incomeStartTime: Date; // 时间选择器
  public incomeEndTime: Date; // 时间选择器
  constructor(
    private dataService: DataService,
    private router: Router,
    private routerInfo: ActivatedRoute,
    private wenJunAlertService: WenjunAlertService,
    private financeDataService: FinanceDataService,
    private localService: LocalStorageService,
    private datePipe: DatePipe,
  ) {}

  ngOnInit() {
    // 路由接受参数
    this.routerInfo.params.subscribe(
      (params) => {
        this.dataToggle = params.name;
        this.provinceId = params.id;
        // 发射业态数据名称
        this.localService.eventBus.next({title: params.name + '高速业态大数据',  flagState: 'finance', flagName: this.dataToggle});
        this.incomeAmountCount();
        this.IncomeTypes();
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
      }
    );
  }
  ngOnDestroy(): void {
    clearInterval(this.vehicleAmountCountClean);
    clearInterval(this.incomeAmountCountClean);
    clearInterval(this.personAmountCountClean);
  }
  /*********************************数据初始化*****************************/
  public updataEcharts(): void {
    /**************************中部****************************/
    // 地图数据
    this.centertMap();
    // 事件
    this.initialize();
    // 办公
    this.officeTypes = this.dataService.officeTypes;
    // 个人
    this.personOfficeTypes = this.dataService.personOfficeTypes;
    // 业态经营数据前十排名
    this.backCrosswiseBar('revenue');
    // 收入监控
    this.incomeAmountCountClean = setInterval(() => {
      this.incomeAmountCount();
      this.IncomeTypes();
    }, 3000);
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
  // 事件类型统计
  public initialize(): void {
    this.financeDataService.searchEventCategory().subscribe(
      (value) => {
        if (value.status === '200') {
          this.financeDataService.searchEventCategoryCount({id: this.provinceId, list: value.data}).subscribe(
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
      this.financeDataService.searchEventsTypeList(
        {eventCategoryCode: item.categoryCode, processState: 2, page: 1, nums: 1000}).subscribe(
        (val) => {
          if (val.status === '200') {
            this.eventListNoProcess = val.data.contents;
          }
        }
      );
    // 已处理
    this.financeDataService.searchEventsTypeList(
      {eventCategoryCode: item.categoryCode, processState: 1, page: 1, nums: 1000}).subscribe(
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

  /*********************************右边*****************************/
  // 业态经营数据前十排名相关操作
  public backCrosswiseBar(type): void {
    this.financeDataService.searchTop10Bar({id: this.provinceId, type: type}).subscribe(
      (value) => {
        if (value.status === '200') {
          // 这里是排序算法
          value.data.barDatas.map((val, index, obj) => {
            if (val.titleCode === type) {
              obj.unshift(val);
              obj.splice(index + 1, 1);
            }
          });
          this.crosswiseBar = {
            data: value.data,
            color: ['#2307EF', '#3B78B1', '#04A6BB']
          };
        }
      }
    );
  }
  public clickBtn(e): void {
    const types = ['revenue', 'vehicle', 'passenger'];
    if (e.srcElement.innerText === '业态收入/万元') {
      this.dataStatus = '业态收入/万元';
      this.barStatus1 = true;
      this.barStatus2 = false;
      this.barStatus3 = false;
      this.backCrosswiseBar(types[0]);
    } else if (e.srcElement.innerText === '车流量/辆') {
      this.dataStatus = '车流量/辆';
      this.barStatus1 = false;
      this.barStatus2 = true;
      this.barStatus3 = false;
      this.backCrosswiseBar(types[1]);
    } else {
      this.dataStatus = '客流量/人次';
      this.barStatus1 = false;
      this.barStatus2 = false;
      this.barStatus3 = true;
      this.backCrosswiseBar(types[2]);
    }
  }
  // 收入监控
  public incomeAmountCount(): void {
    this.financeDataService.searchIncomeTotal({id: this.provinceId}).subscribe(
      (value) => {
        if (value.status === '200') {
          this.incomeAmount = {
            number: value.data,
            units: '元'
          };
        }
      }
    );
  }
  public IncomeTypes() {
    this.financeDataService.searchIncomeTotalPie({id: this.provinceId}).subscribe(
      (value) => {
        if (value.status === '200') {
          this.optionsIncomeModel = {
            data: value.data,
            title: '',
            total: '',
            color: ['#00CAE2', '#2307EF', '#4791D8', '#F86110', '#0096A4', '#F0B801']
          };
        }
      }
    );
  }
  public incomeDistribution(e): void {
    const incomeType = {
      '总收入': 'total',
      '小吃': 1,
      '中式快餐': 2,
      '西式快餐': 3,
      '商超': 4,
      '住宿': 5,
      '汽修': 6,
    };
    this.IncomeOptionType = e.name;
    // 表格
    this.financeDataService.searchIncomeAlertTable({id: this.provinceId, type: incomeType[e.name], page: 1, nums: 10}).subscribe(
      (val) => {
        if (val.status === '200') {
          this.IncomeTableData = val.data;
        }
      }
    );
    // 饼状图
    this.financeDataService.searchIncomeAlertPie({id: this.provinceId, type: incomeType[e.name]}).subscribe(
      (value) => {
        if (value.status === '200') {
          this.optionsIncomeTypes = {
            data: value.data,
            title: `贵州省各市所有服务区今日${e.name}占比统计`,
            total: '',
            color: ['#CE2D79', '#BDD139', '#78E77D', '#09D4D6', '#3C75B9',
              '#6769B1', '#FF8C9D', '#2796C4', '#E57D0D']
          };
        }
      }
    );
  }
  public incomeDistributionPaging(e): void {
    const incomeType = {
      '总收入': 'total',
      '小吃': 1,
      '中式快餐': 2,
      '西式快餐': 3,
      '商超': 4,
      '住宿': 5,
      '汽修': 6,
    };
    this.financeDataService.searchIncomeAlertTable({id: this.provinceId, type: incomeType[this.IncomeOptionType], page: e, nums: 10}).subscribe(
      (val) => {
        this.IncomeTableData = val.data;
      }
    );
  }
  // 收入类型相关操作
  public incomeClick(e): void {
    this.alertIncomeShow = true;
    this.alertIncomeTitle = e.name;
    document.body.className = 'ui-overflow-hidden';
    this.incomeDistribution(e);
  }
  public closeIncomeShow(): void {
    document.body.className = '';
    this.alertIncomeShow = false;
  }
  // 收入类型弹窗
  public optionsIncomePieClick(e) {
    if (e.name === '贵阳市') {
      this.router.navigate(['/home/city', {name: e.name}]);
    } else {
      window.alert (`很抱歉，${e.name}暂无数据`);
    }
  }
  public IncomeBtnClick(e): void {
    if (e.srcElement.innerText === '小吃') {
      this.alertIncomeTitle = '小吃';
      this.arryIncomePie = [];
      this.incomeDistribution({name: e.srcElement.innerText });
    } else if (e.srcElement.innerText === '中式快餐') {
      this.alertIncomeTitle = '中式快餐';
      this.arryIncomePie = [];
      this.incomeDistribution({name: e.srcElement.innerText });
    } else if (e.srcElement.innerText === '西式快餐') {
      this.alertIncomeTitle = '西式快餐';
      this.arryIncomePie = [];
      this.incomeDistribution({name: e.srcElement.innerText });
    } else if (e.srcElement.innerText === '商超') {
      this.alertIncomeTitle = '商超';
      this.arryIncomePie = [];
      this.incomeDistribution({name: e.srcElement.innerText });
    } else if (e.srcElement.innerText === '住宿') {
      this.alertIncomeTitle = '住宿';
      this.arryIncomePie = [];
      this.incomeDistribution({name: e.srcElement.innerText });
    } else if (e.srcElement.innerText === '汽修') {
      this.alertIncomeTitle = '汽修';
      this.arryIncomePie = [];
      this.incomeDistribution({name: e.srcElement.innerText });
    } else if (e.srcElement.innerText === '总收入') {
      this.alertIncomeTitle = '总收入';
      this.arryIncomePie = [];
      this.incomeDistribution({name: e.srcElement.innerText });
    }
  }
  public IncomeTableClick(e): void {
    this.router.navigate(['/home/serzone', {name: e}]);
  }
  // 表格导出
  public incomeExportClick(): void {
    const startTime = this.datePipe.transform(this.incomeStartTime, 'yyyyMMdd');
    const endTime = this.datePipe.transform(this.incomeEndTime, 'yyyyMMdd');
    if (this.incomeStartTime && this.incomeEndTime) {
      window.open(`http://120.78.137.182:8888/highway-interactive/report/province/revenue/2/startDate/${startTime}/endDate/${endTime}`);
    } else {
      window.alert('请把数据选择全在提交');
    }
  }
}

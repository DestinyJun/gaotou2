import {Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {Router} from '@angular/router';
import {DataService} from '../../common/services/data.service';
import {ConfigModule, WenjunAlertService} from '../../common/wenjun';
import {FinanceDataService} from '../../common/services/finance-data.service';
import {LocalStorageService} from '../../common/services/local-storage.service';
import {DatePipe} from '@angular/common';
@Component({
  selector: 'app-finance-data',
  templateUrl: './finance-data.component.html',
  styleUrls: ['./finance-data.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class FinanceDataComponent implements OnInit, OnDestroy {
  /***********************基础信息************************/
  public esDate: any;  // 时间初始化
    // 组件销毁后清除时钟任务
  public vehicleAmountCountClean: any;
  public incomeAmountCountClean: any;
  public personAmountCountClean: any;
  /****************************左边***************************/
    // 3D柱状图配置
  public options3d: any;
  public options3dCopy: any;
  public alertBarShow = false;
  public alertBarTitle: string;
  public options3dBar = {};
  public options3dPie = {};
  public outOptions3d: any; // 3D图组件传出来的值
  public bar3dExcelShow = false;  // 3D图统计的表格导出
  public startTime3d: Date; // 时间选择器
  public endTime3d: Date; // 时间选择器
  // 车辆监控
  public vehicleAmount: any;
  public optionsCarModel: any; // 车辆饼状图
  public alertCarShow = false;
  public alertCarTitle = '总数';
  public optionsCarType = {};
  public arryCarPie = [];
  public carTableData: any;
  public carExcelShow = false;
  public carStartTime: Date; // 时间选择器
  public carEndTime: Date; // 时间选择器
  /*****************************中部**************************/
  // 地图点
  public mapPoints: any;
    // 省市联动
  public dataToggle = '贵州省';
  public province: any;
  public city: any;
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
  public incomeExcelShow = false;
  public incomeStartTime: Date; // 时间选择器
  public incomeEndTime: Date; // 时间选择器
  constructor(
    private dataService: DataService,
    private router: Router,
    private wenJunAlertService: WenjunAlertService,
    private financeDataService: FinanceDataService,
    private localService: LocalStorageService,
    private datePipe: DatePipe
  ) {}

  ngOnInit() {
    // 实时数据
    this.vehicleAmountCount();
    this.CarTypes();
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
    // 发射业态数据名称
    this.localService.eventBus.next({title: '贵州省高速业态大数据',  flagState: 'finance', flagName: this.dataToggle});
    // 图表更行
    this.updataEcharts();
  }
  ngOnDestroy(): void {
    clearInterval(this.vehicleAmountCountClean);
    clearInterval(this.incomeAmountCountClean);
    clearInterval(this.personAmountCountClean);
  }
  /*********************************数据初始化*****************************/
  public updataEcharts(): void {
    // 3D柱状图
    this.packOption3();
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
    // 车流监控
     this.vehicleAmountCountClean = setInterval(() => {
       this.vehicleAmountCount();
       this.CarTypes();
     }, 5000);
    // 收入监控
    this.incomeAmountCountClean = setInterval(() => {
      this.incomeAmountCount();
      this.IncomeTypes();
    }, 5000);
    // 实时客流
    this.personAmountCountClean = setInterval(() => {
      // this.getPerson();
    }, 5000);
  }
  // 客流
  public getPerson(): void {
    this.financeDataService.searchPersonTotal({id: 2}).subscribe(
      (val) => {
        if (val.status === '200') {
          const a = '';
          // console.log(val)
          // this.localService.persons.next(val.data.toString().split(''));
          this.localService.persons.next(a.toString().split(''));
        }
      }
    );
  }
  /**********************************左边*****************************/
  // 3D柱状图
  public packOption3() {
    // 车流客流人流
    this.financeDataService.search3DBar({id: 2, parameter: ['revenue', 'passenger', 'vehicle']}).subscribe(
      (val) => {
        if (val.status === '200') {
          this.options3d = val.data;
        }
      }
    );
    // 用电量用水量
    this.financeDataService.search3DBar({id: 2, parameter: ['electric', 'water']}).subscribe(
      (val) => {
        if (val.status === '200') {
          this.options3dCopy = val.data;
        }
      }
    );
  }
  public onOutOptions3d(e): void {
    this.outOptions3d = e;
    document.body.className = 'ui-overflow-hidden';
    this.alertBarShow = true;
    this.alertBarTitle = this.outOptions3d.alertBarTitle;
    // 柱状图
    this.financeDataService.search3DAlertBar({id: 2, types: this.outOptions3d.bar.types}).subscribe(
      (val) => {
        if (val.status === '200') {
          this.options3dBar = {
            data: val.data,
            xType: this.outOptions3d.pie.xType,
            title: `贵州省所有服务区年度${this.outOptions3d.alertBarTitle}统计`
          };
        }
      }
    );
    // 类型占比扇形图
    this.financeDataService.search3DAlertPie({id: 2, xType: this.outOptions3d.pie.xType, types: this.outOptions3d.pie.types}).subscribe(
      (val) => {
        if (val.status === '200') {
          this.options3dPie = {
            data: val.data,
            title: `贵州省所有服务区年度${this.outOptions3d.alertBarTitle}类型占比统计`,
            total: this.outOptions3d.total,
            color: ['#CE2D79', '#BDD139', '#78E77D', '#09D4D6', '#3C75B9',
              '#6769B1', '#FF8C9D', '#2796C4', '#E57D0D']
          };
        }
      }
    );
  }
  public onOutOptions3dBar(e): void {
    // 类型占比扇形图
    this.financeDataService.search3DAlertPie({id: 2, xType: e.xType, types: this.outOptions3d.pie.types}).subscribe(
      (val) => {
        if (val.status === '200') {
          this.options3dPie = {
            data: val.data,
            title: `贵州省所有服务区年度${this.outOptions3d.alertBarTitle}类型占比统计`,
            total: e.data,
            color: ['#CE2D79', '#BDD139', '#78E77D', '#09D4D6', '#3C75B9',
              '#6769B1', '#FF8C9D', '#2796C4', '#E57D0D']
          };
        }
      }
    );
  }
  public onOptions3dPie(e): void {
    if (e.name === '贵阳市') {
      this.router.navigate(['/home/city', {name: e.name}]);
    } else {
      window.alert (`很抱歉，${e.name}暂无数据`);
    }
  }
  public closeBarShow() {
    document.body.className = '';
    this.alertBarShow = false;
  }
  public bar3dExportClick() {
    const startTime = this.datePipe.transform(this.startTime3d, 'yyyyMMdd');
    const endTime = this.datePipe.transform(this.endTime3d, 'yyyyMMdd');
    if (this.startTime3d && this.endTime3d) {
      window.location.assign(`http://120.78.137.182:8888/highway-interactive/report/province/3d/2/startDate/${startTime}/endDate/${endTime}`);
    } else {
      window.alert('请把数据选择全在提交');
    }
  }
  // 车流监控
  public vehicleAmountCount(): void {
    this.financeDataService.searchCarTotal({id: 2}).subscribe(
      (value) => {
        if (value.status === '200') {
          this.vehicleAmount = {
            number: value.data,
            units: '辆'
          };
        }
      }
    );
  }
  public CarTypes() {
    this.financeDataService.searchCarTotalPie({id: 2}).subscribe(
      (value) => {
        if (value.status === '200') {
          this.optionsCarModel = {
            data: value.data,
            title: '',
            total: '',
            color: ['#00CAE2', '#2307EF', '#4791D8']
          };
        }
      }
    );
  }
  public parkClick(e): void {
    this.alertCarTitle = e.name;
    this.alertCarShow = true;
    document.body.className = 'ui-overflow-hidden';
    this.arryCarPie = [];
    this.carDistribution(e);
  }
  public carDistribution(e): void {
    const carTypes = {
      '总数': 'total',
      '小车': 1,
      '客车': 2,
      '货车': 3,
    };
    // 表格
    this.financeDataService.searchCarAlertTable({id: 2, type: carTypes[e.name]}).subscribe(
      (val) => {
        this.carTableData = val.data.contents;
      }
    );
    // 饼状图
    this.financeDataService.searchCarAlertPie({id: 2, type: carTypes[e.name]}).subscribe(
      (value) => {
        const arryCarPie = [];
        value.data.map((val, index) => {
          arryCarPie.push({value: val.value, name: val.name});
        });
        this.optionsCarType = {
          data: arryCarPie,
          title: `贵州省各市所有服务区今日${e.name}占比统计`,
          total: '',
          color: ['#CE2D79', '#BDD139', '#78E77D', '#09D4D6', '#3C75B9',
            '#6769B1', '#FF8C9D', '#2796C4', '#E57D0D']
        };
      }
    );
  }
  public closeCarShow(): void {
    document.body.className = '';
    this.alertCarShow = false;
  }
  public optionsCarPieClick(e) {
    if (e.name === '贵阳市') {
      this.router.navigate(['/home/city', {name: e.name}]);
    } else {
      window.alert (`很抱歉，${e.name}暂无数据`);
    }
  }
  public carBtnClick(e): void {
    if (e.srcElement.innerText === '小车') {
      this.alertCarTitle = '小车';
      this.arryCarPie = [];
      this.carTableData = [];
      this.carDistribution({name: e.srcElement.innerText });
    }  else if (e.srcElement.innerText === '客车') {
      this.alertCarTitle = '客车';
      this.arryCarPie = [];
      this.carTableData = [];
      this.carDistribution({name: e.srcElement.innerText });
    } else if (e.srcElement.innerText === '货车') {
      this.alertCarTitle = '货车';
      this.arryCarPie = [];
      this.carTableData = [];
      this.carDistribution({name: e.srcElement.innerText });
    } else if (e.srcElement.innerText === '总数') {
      this.alertCarTitle = '总数';
      this.arryCarPie = [];
      this.carTableData = [];
      this.carDistribution({name: e.srcElement.innerText });
    }
  }
  public carTableClick(e) {
    this.router.navigate(['/home/serzone', {name: e}]);
  }
  // 车流监控：表格导出
  public carExportClick() {
    const startTime = this.datePipe.transform(this.carStartTime, 'yyyyMMdd');
    const endTime = this.datePipe.transform(this.carEndTime, 'yyyyMMdd');
    if (this.carStartTime && this.carEndTime) {
      window.location.assign(`http://120.78.137.182:8888/highway-interactive/report/province/vihicle/2/startDate/${startTime}/endDate/${endTime}`);
    } else {
      window.alert('请把数据选择全在提交');
    }
  }
  /*********************************中部*****************************/
  // 中部地图
  public centertMap (): void {
      this.financeDataService.getServiceNamePoint().subscribe(
        (val) => {
          this.mapPoints = val.data;
        }
      );
  }
  public mapCityClick (param): void {
    if (param.areaName === undefined) {
      if (param.cityName === '贵阳市') {
        this.router.navigate(['/home/city']);
      } else {
        window.alert(`很抱歉${param.cityName}暂无数据`);
      }
    } else {
      if (param.areaName === '久长服务区') {
        this.router.navigate(['/home/serzone', {name: param.areaName}]);
      } else {
        window.alert('此服务区暂无数据');
      }
    }
  }
  // 事件类型统计
  public initialize(): void {
    this.financeDataService.searchEventCategory().subscribe(
      (value) => {
        if (value.status === '200') {
          this.financeDataService.searchEventCategoryCount({id: 2, list: value.data}).subscribe(
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
    this.financeDataService.searchTop10Bar({id: 2, type: type}).subscribe(
      (value) => {
        this.crosswiseBar = value.data;
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
    this.financeDataService.searchIncomeTotal({id: 2}).subscribe(
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
    this.financeDataService.searchIncomeTotalPie({id: 2}).subscribe(
      (value) => {
        if (value.status === '200') {
          this.optionsIncomeModel = {
            data: value.data,
            title: '',
            total: '',
            color: ['#00CAE2', '#2307EF', '#4791D8']
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
    // 表格
    this.financeDataService.searchIncomeAlertTable({id: 2, type: incomeType[e.name]}).subscribe(
      (val) => {
        if (val.status === '200') {
          this.IncomeTableData = val.data.contents;
          console.log(this.IncomeTableData);
        }
      }
    );
    // 饼状图
    this.financeDataService.searchIncomeAlertPie({id: 2, type: incomeType[e.name]}).subscribe(
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
      window.location.assign(`http://120.78.137.182:8888/highway-interactive/report/province/revenue/2/startDate/${startTime}/endDate/${endTime}`);
    } else {
      window.alert('请把数据选择全在提交');
    }
  }
}

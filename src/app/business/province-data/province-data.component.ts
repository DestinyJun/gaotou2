import {Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {Router} from '@angular/router';
import {DataService} from '../../common/services/data.service';
import {ConfigModule, WenjunAlertService} from '../../common/wenjun';
import {FinanceDataService} from '../../common/services/finance-data.service';
import {LocalStorageService} from '../../common/services/local-storage.service';
import {DatePipe} from '@angular/common';
import {ExampleDataService} from '../../common/services/example-data.service';
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
  public dataMonthChinese = [
    '一月', '二月', '三月', '四月', '五月', '六月',
    '七月', '八月', '九月', '十月', '十一月', '十二月'
  ];
  public selectDataYear: any;
  public selectDataMonth: any;
  public selectDataDay: any;
  public isYear = true;
  public dataYear = [
    {name: '请选择年', code: -1},
    {name: '2015年', code: 'year'},
    {name: '2016年', code: 'year'},
    {name: '2017年', code: 'year'},
    {name: '2018年', code: 'year'},
    {name: '2019年', code: 'year'}];
  public dataMonth = [];
  public dataDay = [];
  public monthShow = false;
  public dayShow = false;
  /****************************左边***************************/
    // 3D柱状图配置
  public options3d: any;
  public options3dCopy: any;
  public alertBarShow = false;
  public alertBarTitle: string;
  public options3dBar = {};
  public options3dPie = {};
  public options3dLine = {};
  public options3dCityCrosswise: any;
  public options3dServiceCrosswise: any;
  public outOptions3d: any; // 3D图组件传出来的值
  public bar3dExcelShow = false;  // 3D图统计的表格导出
  public startTime3d: Date; // 时间选择器
  public endTime3d: Date; // 时间选择器
  public bar3DCityBtnData = [
    {name: '用水量/立方', backColor: '#59B2EE', titleCode: 'water'},
    {name: '用电量/度', backColor: '#B3A5DE', titleCode: 'electricity'},
    {name: '排污量/立方', backColor: '#FCB984', titleCode: 'pollution'},
  ];
  public bar3DServiceBtnData = [
    {name: '用水量/立方', backColor: '#F01C70', titleCode: 'water'},
    {name: '用电量/度', backColor: '#4DE5B0', titleCode: 'electricity'},
    {name: '排污量/立方', backColor: '#FEAC00', titleCode: 'pollution'},
  ];
  // 车辆监控
  public vehicleAmount: any;
  public optionsCarModel: any; // 车辆饼状图
  public alertCarShow = false;
  public alertCarTitle = '总数';
  public optionsCarType = {};
  public arryCarPie = [];
  public carOptionType: any;
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
  public IncomeOptionType: any;
  public incomeExcelShow = false;
  public incomeStartTime: Date; // 时间选择器
  public incomeEndTime: Date; // 时间选择器
  constructor(
    private dataService: DataService,
    private router: Router,
    private wenJunAlertService: WenjunAlertService,
    private financeDataService: FinanceDataService,
    private localService: LocalStorageService,
    private datePipe: DatePipe,
    private exampleService: ExampleDataService
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
     }, 3000);
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
    this.financeDataService.searchPersonTotal({id: 2}).subscribe(
      (totalVal) => {
        if (totalVal.status === '200') {
          total = totalVal.data;
          if (!(total === 0)) {
            this.financeDataService.searchPersonProvince({id: 2}).subscribe(
              (provinceVal) => {
                if (provinceVal.status === '200') {
                  province = provinceVal.data;
                  this.financeDataService.searchPersonCity({id: 2}).subscribe(
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
    this.selectDataYear = {
      name: '2019年', code: 'year'
    };
    // 柱状图
    this.options3dBar = {
      timeType: 'month',
      data: this.exampleService.getProvinceBarMonthData(),
      xType: this.outOptions3d.pie.xType,
      title: `贵州省${this.selectDataYear.name}服务区${this.outOptions3d.alertBarTitle}统计`
    };
   // 折线图
    this.options3dLine = {
      title: `贵州省2019年服务区业态走势图`,
      data: this.exampleService.getProvinceLineMonthData(),
      color: ['#7C7CD4', '#36B9AB', '#6ACD72', '#0A30BF', '#027204', '#E36E57']
    };
    // 地区横向排名柱状图
    this.options3dCityCrosswise = {
      title: `贵州省2019年地区功耗排污前十排名`,
      data: this.exampleService.getCityCrosswiseBarMonthData(),
      color: ['#B3A5DE', '#59B2EE', '#FCB984']
    };
    // 服务区横向排名柱状图
    this.options3dServiceCrosswise = {
      title: `贵州省2019年服务区功耗排污前十排名`,
      data: this.exampleService.getServiceCrosswiseBarMonthData(),
      color: ['#4DE5B0', '#F01C70', '#FEAC00']
    };
    // 服务器的柱状图
    /*this.financeDataService.search3DAlertBar({id: 2, types: this.outOptions3d.bar.types}).subscribe(
      (val) => {
        if (val.status === '200') {
          this.options3dBar = {
            data: val.data,
            xType: this.outOptions3d.pie.xType,
            title: `贵州省所有服务区年度${this.outOptions3d.alertBarTitle}统计`
          };
        }
      }
    );*/
    // 类型占比扇形图
   /* this.financeDataService.search3DAlertPie({id: 2, xType: this.outOptions3d.pie.xType, types: this.outOptions3d.pie.types}).subscribe(
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
    );*/
    /*this.financeDataService.search3DAlertBar({id: 2, types: this.outOptions3d.bar.types}).subscribe(
        (val) => {
          if (val.status === '200') {
            this.options3dBar = {
              data: val.data,
              xType: this.outOptions3d.pie.xType,
              title: `贵州省所有服务区年度${this.outOptions3d.alertBarTitle}统计`
            };
          }
        }
      );*/
  }
  public onOutOptions3dBar(e): void {
    if (e.timeType === 'year') {
      this.isYear = true;
      // 折线图
      this.options3dLine = {
        title: `贵州省${e.name}服务区业态走势图`,
        data: this.exampleService.getProvinceLineMonthData(),
        color: ['#7C7CD4', '#36B9AB', '#6ACD72', '#0A30BF', '#027204', '#E36E57']
      };
      // 地区横向排名柱状图
      this.options3dCityCrosswise = {
        title: `贵州省${e.name}地区功耗排污前十排名`,
        data: this.exampleService.getCityCrosswiseBarMonthData(),
        color: ['#B3A5DE', '#59B2EE', '#FCB984']
      };
      // 服务区横向排名柱状图
      this.options3dServiceCrosswise = {
        title: `贵州省${e.name}服务区功耗排污前十排名`,
        data: this.exampleService.getServiceCrosswiseBarMonthData(),
        color: ['#4DE5B0', '#F01C70', '#FEAC00']
      };
      return;
    }
    if (e.timeType === 'month') {
      // 折线图
      this.options3dLine = {
        title: `贵州省${this.selectDataYear.name}${e.name}服务区业态走势图`,
        data: this.exampleService.getProvinceLineDayData(),
        color: ['#7C7CD4', '#36B9AB', '#6ACD72', '#0A30BF', '#027204', '#E36E57']
      };
      // 地区横向排名柱状图
      this.options3dCityCrosswise = {
        title: `贵州省${this.selectDataYear.name}${e.name}地区功耗排污前十排名`,
        data: this.exampleService.getCityCrosswiseBarMonthData(),
        color: ['#B3A5DE', '#59B2EE', '#FCB984']
      };
      // 服务区横向排名柱状图
      this.options3dServiceCrosswise = {
        title: `贵州省${this.selectDataYear.name}${e.name}服务区功耗排污前十排名`,
        data: this.exampleService.getServiceCrosswiseBarMonthData(),
        color: ['#4DE5B0', '#F01C70', '#FEAC00']
      };
      return;
    }
    if (e.timeType === 'day') {
      // 折线图
      this.options3dLine = {
        title: `贵州省贵州省${this.selectDataYear.name}${this.selectDataMonth.name}${e.name}日服务区业态走势图`,
        data: this.exampleService.getProvinceLineHourData(),
        color: ['#7C7CD4', '#36B9AB', '#6ACD72', '#0A30BF', '#027204', '#E36E57']
      };
      // 地区横向排名柱状图
      this.options3dCityCrosswise = {
        title: `贵州省贵州省贵州省${this.selectDataYear.name}${this.selectDataMonth.name}${e.name}日地区功耗排污前十排名`,
        data: this.exampleService.getCityCrosswiseBarDayData(),
        color: ['#B3A5DE', '#59B2EE', '#FCB984']
      };
      // 服务区横向排名柱状图
      this.options3dServiceCrosswise = {
        title: `贵州省贵州省贵州省${this.selectDataYear.name}${this.selectDataMonth.name}${e.name}日服务区功耗排污前十排名`,
        data: this.exampleService.getServiceCrosswiseBarDayData(),
        color: ['#4DE5B0', '#F01C70', '#FEAC00']
      };
      return;
    }
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
      window.open(`http://120.78.137.182:8888/highway-interactive/report/province/3d/2/startDate/${startTime}/endDate/${endTime}`);
    } else {
      window.alert('请把数据选择全在提交');
    }
  }
    // 二期测试
    public bar3dCrosswiseBtnClick (i, area): void {
      const that = this;
      const a = that.exampleService.getCityCrosswiseBarMonthData();
      // 这里是排序算法
      a.barDatas.map((val, index, obj) => {
        if (val.titleCode === this.bar3DCityBtnData[i].titleCode) {
          obj.unshift(val);
          obj.splice(index + 1, 1);
        }
      });
      if (area === 'city') {
        this.bar3DCityBtnData = [
          {name: '用水量/立方', backColor: '#59B2EE', titleCode: 'water'},
          {name: '用电量/度', backColor: '#B3A5DE', titleCode: 'electricity'},
          {name: '排污量/立方', backColor: '#FCB984', titleCode: 'pollution'},
        ];
        this.bar3DCityBtnData[i].backColor = 'red';
        // 从新刷新数据
        this.options3dCityCrosswise = {
          data: a,
          color: ['red', '#59B2EE', '#FCB984']
        };
        return;
    }
      this.bar3DServiceBtnData = [
      {name: '用水量/立方', backColor: '#F01C70', titleCode: 'water'},
      {name: '用电量/度', backColor: '#4DE5B0', titleCode: 'electricity'},
      {name: '排污量/立方', backColor: '#FEAC00', titleCode: 'pollution'},
    ];
      this.bar3DServiceBtnData[i].backColor = 'red';
      // 从新刷新数据
      this.options3dServiceCrosswise = {
        data: a,
        color: ['red', '#59B2EE', '#FCB984']
      };
  }
    public bar3dYearClick(): void {
      this.isYear = false;
      // 柱状图
      this.options3dBar = {
        timeType: 'year',
        data: this.exampleService.getProvinceBarYearData(),
        xType: this.outOptions3d.pie.xType,
        title: `贵州省所有服务近年${this.outOptions3d.alertBarTitle}统计`
      };
      // 折线图
      this.options3dLine = {
        title: `贵州省久长服务区近年业态走势图`,
        data: this.exampleService.getProvinceLineYearData(),
        color: ['#7C7CD4', '#36B9AB', '#6ACD72', '#0A30BF', '#027204', '#E36E57']
      };
      // 年度横向排名柱状图
      this.options3dCityCrosswise = {
        title: `贵州省近年地区功耗排污排名`,
        data: this.exampleService.getCityCrosswiseBarYearData(),
        color: ['#B3A5DE', '#59B2EE', '#FCB984']
      };
  }
    public bar3dInputDropDownYearClick (e): void {
      if (e.code === -1) {
        this.dataMonth = [
          {name: '请选择月', code: -1}
        ];
        this.monthShow = false;
        return;
      }
      this.monthShow = true;
      this.dataMonth = [
        {name: '请选择月', code: -1}
      ];
      const year = parseInt(e.name.split('年')[0], 10);
      this.selectDataYear = e;
      if (year < new Date().getFullYear()) {
        for (let i = 0; i < 12; i++) {
          this.dataMonth.push({name: this.dataMonthChinese[i], code: 'month'});
        }
      } else {
        for (let i = 0; i < new Date().getMonth() + 1; i++) {
          this.dataMonth.push({name: this.dataMonthChinese[i], code: 'month'});
        }
        this.monthShow = true;
      }
    }
    public bar3dInputDropDownMonthClick (e): void {
      this.dataDay = [];
      if (e.code === -1) {
        this.dayShow = false;
        return;
      }
      this.dayShow = true;
      const months = this.dataMonthChinese.indexOf(e.name) + 1;
      this.selectDataMonth = e;
      const days = new Date(parseInt(this.selectDataYear.name.split('年')[0], 10), months, 0).getDate();
      for (let i = 1; i <= days; i++) {
        this.dataDay.push({name: i, code: 'day'});
      }
    }
    public bar3dInputDropDownDayClick (e): void {
      this.selectDataDay = e;
    }
    public bar3dDateSureClick (): void {
      this.isYear = true;
      // 日
      if (this.selectDataDay && this.selectDataDay.code !== '-1') {
        // 柱状图
        this.options3dBar = {
          timeType: 'hour',
          data: this.exampleService.getProvinceBarHourData(),
          xType: this.outOptions3d.pie.xType,
          title: `贵州省${this.selectDataYear.name}${this.selectDataMonth.name}${this.selectDataDay.name}日服务区${this.outOptions3d.alertBarTitle}统计`
        };
        // 折线图
        this.options3dLine = {
          title: `贵州省${this.selectDataYear.name}${this.selectDataMonth.name}${this.selectDataDay.name}日服务区业态走势图`,
          data: this.exampleService.getProvinceLineHourData(),
          color: ['#7C7CD4', '#36B9AB', '#6ACD72', '#0A30BF', '#027204', '#E36E57']
        };
        // 地区横向排名柱状图
        this.options3dCityCrosswise = {
          title: `贵州省${this.selectDataYear.name}${this.selectDataMonth.name}${this.selectDataDay.name}日地区功耗排污前十排名`,
          data: this.exampleService.getCityCrosswiseBarDayData(),
          color: ['#B3A5DE', '#59B2EE', '#FCB984']
        };
        // 服务区横向排名柱状图
        this.options3dServiceCrosswise = {
          title: `贵州省${this.selectDataYear.name}${this.selectDataMonth.name}${this.selectDataDay.name}日服务区功耗排污前十排名`,
          data: this.exampleService.getServiceCrosswiseBarDayData(),
          color: ['#4DE5B0', '#F01C70', '#FEAC00']
        };
        return;
      }
      // 月
      if (this.selectDataMonth && this.selectDataMonth.code !== '-1') {
        // 柱状图
        this.options3dBar = {
          timeType: 'day',
          data: this.exampleService.getProvinceBarDayData(),
          xType: this.outOptions3d.pie.xType,
          title: `贵州省${this.selectDataYear.name}${this.selectDataMonth.name}服务区${this.outOptions3d.alertBarTitle}统计`
        };
        // 折线图
        this.options3dLine = {
          title: `贵州省${this.selectDataYear.name}${this.selectDataMonth.name}服务区业态走势图`,
          data: this.exampleService.getProvinceLineDayData(),
          color: ['#7C7CD4', '#36B9AB', '#6ACD72', '#0A30BF', '#027204', '#E36E57']
        };
        // 地区横向排名柱状图
        this.options3dCityCrosswise = {
          title: `贵州省${this.selectDataYear.name}${this.selectDataMonth.name}地区功耗排污前十排名`,
          data: this.exampleService.getCityCrosswiseBarMonthData(),
          color: ['#B3A5DE', '#59B2EE', '#FCB984']
        };
        // 服务区横向排名柱状图
        this.options3dServiceCrosswise = {
          title: `贵州省${this.selectDataYear.name}${this.selectDataMonth.name}服务区功耗排污前十排名`,
          data: this.exampleService.getServiceCrosswiseBarMonthData(),
          color: ['#4DE5B0', '#F01C70', '#FEAC00']
        };
        return;
      }
      // 年
      if (this.selectDataYear) {
        // 柱状图
        this.options3dBar = {
          timeType: 'month',
          data: this.exampleService.getProvinceBarMonthData(),
          xType: this.outOptions3d.pie.xType,
          title: `贵州省${this.selectDataYear.name}服务区${this.outOptions3d.alertBarTitle}统计`
        };
        // 折线图
        this.options3dLine = {
          title: `贵州省${this.selectDataYear.name}服务区业态走势图`,
          data: this.exampleService.getProvinceLineMonthData(),
          color: ['#7C7CD4', '#36B9AB', '#6ACD72', '#0A30BF', '#027204', '#E36E57']
        };
        // 地区横向排名柱状图
        this.options3dCityCrosswise = {
          title: `贵州省${this.selectDataYear.name}地区功耗排污前十排名`,
          data: this.exampleService.getCityCrosswiseBarMonthData(),
          color: ['#B3A5DE', '#59B2EE', '#FCB984']
        };
        // 服务区横向排名柱状图
        this.options3dServiceCrosswise = {
          title: `贵州省${this.selectDataYear.name}服务区功耗排污前十排名`,
          data: this.exampleService.getServiceCrosswiseBarMonthData(),
          color: ['#4DE5B0', '#F01C70', '#FEAC00']
        };
        return;
      }
    }
    public bar3dDateCleanClick (): void {
        this.monthShow = false;
        this.dayShow = false;
        this.selectDataDay = null;
        this.selectDataMonth = null;
        this.selectDataYear = null;
        this.dataYear = [
          {name: '请选择年', code: -1},
          {name: '2015年', code: 'year'},
          {name: '2016年', code: 'year'},
          {name: '2017年', code: 'year'},
          {name: '2018年', code: 'year'},
          {name: '2019年', code: 'year'}
        ];
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
    this.carOptionType = e.name;
    // 表格
    this.financeDataService.searchCarAlertTable({id: 2, type: carTypes[this.carOptionType], page: 1, nums: 10}).subscribe(
      (val) => {
        this.carTableData = val.data;
      }
    );
    // 饼状图
    this.financeDataService.searchCarAlertPie({id: 2, type: carTypes[this.carOptionType]}).subscribe(
      (value) => {
        const arryCarPie = [];
        value.data.map((val, index) => {
          arryCarPie.push({value: val.value, name: val.name});
        });
        console.log(arryCarPie);
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
  public carDistributionPaging(e): void {
    const carTypes = {
      '总数': 'total',
      '小车': 1,
      '客车': 2,
      '货车': 3,
    };
    this.financeDataService.searchCarAlertTable({id: 2, type: carTypes[this.carOptionType], page: e, nums: 10}).subscribe(
      (val) => {
        this.carTableData = val.data;
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
        this.router.navigate(['/home/serzone', {id: 1, name: param.areaName}]);
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
    this.financeDataService.searchIncomeAlertTable({id: 2, type: incomeType[e.name], page: 1, nums: 10}).subscribe(
      (val) => {
        if (val.status === '200') {
          this.IncomeTableData = val.data;
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
    this.financeDataService.searchIncomeAlertTable({id: 2, type: incomeType[this.IncomeOptionType], page: e, nums: 10}).subscribe(
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
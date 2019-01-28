import { Component, OnInit } from '@angular/core';
import {DataService} from '../../../common/services/data.service';
import {Router} from '@angular/router';
import {WenjunAlertService} from '../../../common/wenjun/wenjun-alert';
import {FinanceDataService} from '../../../common/services/finance-data.service';
import {LocalStorageService} from '../../../common/services/local-storage.service';
import {DatePipe} from '@angular/common';
import {ExampleDataService} from '../../../common/services/example-data.service';

@Component({
  selector: 'app-province-3d',
  templateUrl: './province-3d.component.html',
  styleUrls: ['./province-3d.component.less']
})
export class Province3dComponent implements OnInit {
  public esDate: any;  // 时间初始化
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
  constructor(
    private dataService: DataService,
    private router: Router,
    private wenJunAlertService: WenjunAlertService,
    private financeDataService: FinanceDataService,
    private localService: LocalStorageService,
    private datePipe: DatePipe,
    private exampleService: ExampleDataService
  ) { }

  ngOnInit() {
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
    this.packOption3();
  }
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
}

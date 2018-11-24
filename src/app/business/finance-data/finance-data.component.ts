import {
  Component,
  ComponentFactoryResolver, OnDestroy,
  OnInit
} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {NgxEchartsService} from 'ngx-echarts';
import {EventsService} from '../../common/services/events.service';
import {Data3dService} from '../../common/services/data3d.service';
import {CentermapService} from '../../common/services/centermap.service';
import {DiagramService} from '../../common/services/diagram.service';
import {Router} from '@angular/router';
import {DataService} from '../../common/services/data.service';
import {ConfigModule, WenjunAlertService} from '../../common/wenjun';
import {FinanceDataService} from '../../common/services/finance-data.service';
import {LocalStorageService} from '../../common/services/local-storage.service';
import {Bar3dExportType, CarExportType, IncomeExportType} from '../../common/model/shared.model';
declare let BMap;
@Component({
  selector: 'app-finance-data',
  templateUrl: './finance-data.component.html',
  styleUrls: ['./finance-data.component.css']
})
export class FinanceDataComponent implements OnInit, OnDestroy {
  /***********************基础信息************************/
    // 组件销毁后清除时钟任务
  public vehicleAmountCountClean: any;
  public incomeAmountCountClean: any;
  public personAmountCountClean: any;
  /****************************左边***************************/
    // 3D柱状图配置
  public options3d: any;
  public options3dCopy: any;
  public alertBarShow = false;  // 3D柱状图弹窗
  public alertBarTitle: string;
  public options3dBar = {};
  public options3dPie = {};
  public outOptions3d: any; // 3D图组件传出来的值
  public bar3dExcelShow = false;  // 3D图统计的表格导出
  public bar3dExportType: Bar3dExportType = new Bar3dExportType;

  // 车流量实时数值
  public vehicleAmount = [];
  public incomeAmount = [];

  // 车辆类型分布
  public optionsCarModel = {};
  // 车辆类型弹窗
  public alertCarShow = false;
  public alertCarTitle = '';
  public optionsCarType = {};
  public arryCarPie = [];
  public carTableData: any;
  public carAreaName = '贵州省';
  public optionsCarPieInstance: any;
  public carExcelShow = false;
  public carExportType: CarExportType = new CarExportType();
  public CarTypeisShow = false;

  /*****************************中部**************************/
    // 省市联动
  public dataToggle = '贵州省';
  public selectDate = '贵州省';
  public province: any;
  public city: any;
  public citeDate: string;
  public provinceShow = false;
  public cityShow = false;
  public flag: string;

  // 全国高速服务区分布图
  public optionsMap = {};

  // 事件类数据
  public eventTypes: any;
  // 事件弹窗
  public eventConfig: ConfigModule;
  // 办公类数据
  public officeTypes: any;
  // 办公信息弹窗
  public alertOfficeShow = false;
  // 个人信息数据
  public personOfficeTypes: any;
  // 个人信息弹窗
  public alertPersonShow = false;

  /*****************************右边***************************/
    // 全国业态经营数据前十排名
  public crosswiseBar = {};
  public barStatus1 = true;
  public barStatus2 = false;
  public barStatus3 = false;
  public dataStatus = '业态收入/万元';

  // 全国当日收入类型占比分析
  public optionsIncomeModel = {};
  // 收入类型弹窗
  public alertIncomeShow = false;
  public alertIncomeTitle = '';
  public optionsIncomeTypes = {};
  public IncomeAreaName = '贵州省';
  public IncomeTableData: any;
  public arryIncomePie = [];
  public incomeExcelShow = false;
  public incomeExportType: IncomeExportType = new IncomeExportType();
  public incomeTypeisShow = true;

  /**********************基础数据部分**********************/
  public citys = ['贵阳市', '遵义市', '六盘水市', '安顺市', '毕节市', '铜仁市', '黔东南苗族侗族自治州', '黔南布依族苗族自治州', '黔西南布依族苗族自治州'];
  // 时间初始化
  public esDate: any;
  public value: Date; // 时间选择器
  public date6: Date;
  // 车月度所有服务区车辆流量柱状图统计
  public optionsCar = {};

  constructor(
    private http: HttpClient,
    private es: NgxEchartsService,
    private eventsService: EventsService,
    private resolver: ComponentFactoryResolver,
    private data3dS: Data3dService,
    private centerMapS: CentermapService,
    private diagrams: DiagramService,
    private dataService: DataService,
    private router: Router,
    private wenJunAlertService: WenjunAlertService,
    private financeDataService: FinanceDataService,
    private localService: LocalStorageService
  ) {}

  ngOnInit() {
    // 实时数据
    this.vehicleAmountCount();
    this.CarTypes();
    this.incomeAmountCount();
    this.IncomeTypes();
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
    this.localService.eventBus.next({title: '贵州省高速业态大数据',  flagState: 'finance', flagName: this.dataToggle});
    // 图表更行
    this.updataEcharts();
    // 全屏点击事件
    window.document.addEventListener('click', (e) => {
      this.flag = e.srcElement.parentElement.className;
      if ((this.provinceShow || this.cityShow) && !(this.flag === 'location')) {
        this.provinceShow = false;
        this.cityShow = false;
      }
    });
    window.addEventListener('resize', function (e) {
    });
  }
  ngOnDestroy(): void {
    clearInterval(this.vehicleAmountCountClean);
    clearInterval(this.incomeAmountCountClean);
    clearInterval(this.personAmountCountClean);
  }

  /**********************************左边*****************************/
  // 3D柱状图图表配置
  public packOption3() {
    // 车流客流人流
    this.financeDataService.search3DBar({id: 2, parameter: ['revenue', 'passenger', 'vehicle']}).subscribe(
      (val) => {
        this.options3d = val.data;
      }
    );
    // 用电量用水量
    this.financeDataService.search3DBar({id: 2, parameter: ['electric', 'water']}).subscribe(
      (val) => {
        this.options3dCopy = val.data;
      }
    );
  }
  // 3D柱状图的相关点击事件
  public onOutOptions3d(e): void {
    this.outOptions3d = e;
    document.body.className = 'ui-overflow-hidden';
    this.alertBarShow = true;
    this.alertBarTitle = this.outOptions3d.alertBarTitle;
    // 柱状图
    this.financeDataService.search3DAlertBar({id: 2, types: this.outOptions3d.bar.types}).subscribe(
      (val) => {
        console.log(val);
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
            total: this.outOptions3d.total
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
          };
        }
      }
    );
  }
  public closeBarShow() {
    document.body.className = '';
    this.alertBarShow = false;
  }
  // 表格导出
  public bar3dDateChange(e) {
    this.bar3dExportType.Bar3dDate = e.srcElement.value;
  }
  public bar3dTypeChange(e) {
    this.bar3dExportType.Bar3dNumType = e.srcElement.options[e.srcElement.selectedIndex].innerText;
  }
  public bar3dAreaChange(e) {
    this.bar3dExportType.Bar3dArea = e.srcElement.options[e.srcElement.selectedIndex].innerText;
    console.log(this.bar3dExportType.Bar3dArea);
  }
  public bar3dExportClick() {
    if (!(this.bar3dExportType.Bar3dDate === '')
      || !(this.bar3dExportType.Bar3dNumType === '')
      || !(this.bar3dExportType.Bar3dArea === '')) {
      this.bar3dExcelShow = false;
      console.log(this.bar3dExportType);
      // 导出表格数据初始化
      this.bar3dExportType = {
        Bar3dNumType: '',
        Bar3dArea: '',
        Bar3dDate: ''
      };
    } else {
      window.alert('请把数据选择全在提交');
    }
  }
  public open3dBarExcel() {
    this.bar3dExcelShow = true;
  }
  public close3dBarExcel() {
    this.bar3dExcelShow = false;
  }

  // 实时车流监控
  public vehicleAmountCount(): void {
    this.financeDataService.searchCarTotal({id: 2}).subscribe(
      (value) => {
        this.vehicleAmount = value.data.toString().split('');
      }
    );
  }
  // 车型日分布类型占比饼状图
  public CarTypes() {
    this.financeDataService.searchCarTotalPie({id: 2}).subscribe(
      (value) => {
        // console.log(value);
        this.optionsCarModel = {
          tooltip: {
            trigger: 'item',
            formatter: '{b} : {d}%'
          },
          series: [
            {
              type: 'pie',
              radius: '55%',
              center: ['50%', '50%'],
              label: {
                show: true,
                position: 'outside',
                formatter: '{b}: {d}%',
                color: 'white',
                align: 'center',
                emphasis: {
                  show: true,
                  textStyle: {
                    fontSize: 12
                  }
                }
              },
              color: ['#00CAE2', '#2307EF', '#4791D8'],
              data: value.data,
              itemStyle: {
                emphasis: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              }
            }
          ]
        };
      }
    );
  }
  // 车型日分布类型占比饼状图相关点击事件
  public parkClick(e): void {
    console.log(e);
    this.alertCarTitle = e.name + '车辆分布统计';
    this.alertCarShow = true;
    document.body.className = 'ui-overflow-hidden';
    this.arryCarPie = [];
    // tables数据
    // this.carTableData = this.dataService.getJsonObj(8, 1000, 100, this.alertCarTitle);
    this.financeDataService.searchCarAlertTable({id: 2, types: e.name}).subscribe(
      (val) => {
        console.log(val);
        this.carTableData = val.data.contents;
      }
    );
    // 饼状图
    this.financeDataService.searchCarAlertPie({id: 2, types: e.name}).subscribe(
      (value) => {
        console.log(value.data);
       /* this.dataService.getrandomPie(9, 900, 50).map((val, index) => {
          this.arryCarPie.push({value: val, name: this.citys[index]});
        });*/
        value.data.map((val, index) => {
          this.arryCarPie.push({value: 1, name: val.name});
        });
        this.optionsCarType = {
          title: {
            text: `贵州省各市所有服务区今日${e.name}占比统计`,
            x: 'center',
            textStyle: {
              color: '#fff',
              fontSize: 16
            }
          },
          tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {d}%'
          },
          series: [
            {
              name: `${e.name}`,
              type: 'pie',
              radius: '55%',
              center: ['50%', '60%'],
              data:  this.arryCarPie,
              itemStyle: {
                color: function (params) {
                  return ['#CE2D79', '#BDD139', '#78E77D', '#09D4D6',
                    '#3C75B9', '#6769B1', '#FF8C9D', '#2796C4', '#E57D0D'][params.dataIndex];
                },
                emphasis: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              }
            }
          ]
        };
      }
    );

  }
  public closeCarShow(): void {
    document.body.className = '';
    this.alertCarShow = false;
  }
  // 车型日分布类型占比饼状图弹窗
  public optionsCarPieInit(ec): void {
    this.optionsCarPieInstance = ec;
  }
  public optionsCarPieClick(e) {
  /*  this.CarTypeisShow = false;
    this.carAreaName = e.name;*/
    if (e.name === '贵阳市') {
      this.router.navigate(['/home/city', {name: e.name}]);
    } else {
      window.alert (`很抱歉，${e.name}暂无数据`);
    }
    // this.carTableData = this.dataService.getJsonObj(8, 1000, 100, this.alertCarTitle);
  }
  public carBtnClick(e): void {
    if (e.srcElement.innerText === '小车') {
      this.alertCarTitle = '小车' + '车辆分布统计';
      this.arryCarPie = [];
      this.carTableData = [];
      // tables数据
      // this.carTableData = this.dataService.getJsonObj(8, 1000, 100, this.alertCarTitle);
      this.financeDataService.searchCarAlertTable({id: 2, types: e.name}).subscribe(
        (val) => {
          console.log(val);
          this.carTableData = val.data.contents;
        }
      );
      // 饼状图
      this.financeDataService.searchIncomeAlertPie({id: 2, types: e.name}).subscribe(
        (value) => {
          console.log(value.data);
          /* this.dataService.getrandomPie(9, 900, 50).map((val, index) => {
             this.arryCarPie.push({value: val, name: this.citys[index]});
           });*/
          value.data.map((val, index) => {
            this.arryCarPie.push({value: val.value, name: val.name});
          });
          this.optionsCarType = {
            title: {
              text: `贵州省各市所有服务区今日小车占比统计`,
              x: 'center',
              textStyle: {
                color: '#fff',
                fontSize: 16
              }
            },
            tooltip: {
              trigger: 'item',
              formatter: '{a} <br/>{b} : {d}%'
            },
            series: [
              {
                name: `${e.name}`,
                type: 'pie',
                radius: '55%',
                center: ['50%', '60%'],
                data:  this.arryCarPie,
                itemStyle: {
                  color: function (params) {
                    return ['#CE2D79', '#BDD139', '#78E77D', '#09D4D6',
                      '#3C75B9', '#6769B1', '#FF8C9D', '#2796C4', '#E57D0D'][params.dataIndex];
                  },
                  emphasis: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                  }
                }
              }
            ]
          };
        }
      );
    }
    else if (e.srcElement.innerText === '客车') {
      this.alertCarTitle = '客车' + '车辆分布统计';
      this.arryCarPie = [];
      this.carTableData = [];
      // tables数据
      // this.carTableData = this.dataService.getJsonObj(8, 1000, 100, this.alertCarTitle);
      this.financeDataService.searchCarAlertTable({id: 2, types: e.name}).subscribe(
        (val) => {
          console.log(val);
          this.carTableData = val.data.contents;
        }
      );
      // 饼状图
      this.financeDataService.searchIncomeAlertPie({id: 2, types: e.name}).subscribe(
        (value) => {
          console.log(value.data);
          /* this.dataService.getrandomPie(9, 900, 50).map((val, index) => {
             this.arryCarPie.push({value: val, name: this.citys[index]});
           });*/
          value.data.map((val, index) => {
            this.arryCarPie.push({value: val.value, name: val.name});
          });
          this.optionsCarType = {
            title: {
              text: `贵州省各市所有服务区今日客车占比统计`,
              x: 'center',
              textStyle: {
                color: '#fff',
                fontSize: 16
              }
            },
            tooltip: {
              trigger: 'item',
              formatter: '{a} <br/>{b} : {d}%'
            },
            series: [
              {
                name: `${e.name}`,
                type: 'pie',
                radius: '55%',
                center: ['50%', '60%'],
                data:  this.arryCarPie,
                itemStyle: {
                  color: function (params) {
                    return ['#CE2D79', '#BDD139', '#78E77D', '#09D4D6',
                      '#3C75B9', '#6769B1', '#FF8C9D', '#2796C4', '#E57D0D'][params.dataIndex];
                  },
                  emphasis: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                  }
                }
              }
            ]
          };
        }
      );
    }
    else if (e.srcElement.innerText === '货车') {
      this.alertCarTitle = '货车' + '车辆分布统计';
      this.arryCarPie = [];
      this.carTableData = [];
      // tables数据
      // this.carTableData = this.dataService.getJsonObj(8, 1000, 100, this.alertCarTitle);
      this.financeDataService.searchCarAlertTable({id: 2, types: e.name}).subscribe(
        (val) => {
          console.log(val);
          this.carTableData = val.data.contents;
        }
      );
      // 饼状图
      this.financeDataService.searchIncomeAlertPie({id: 2, types: e.name}).subscribe(
        (value) => {
          console.log(value.data);
          /* this.dataService.getrandomPie(9, 900, 50).map((val, index) => {
             this.arryCarPie.push({value: val, name: this.citys[index]});
           });*/
          value.data.map((val, index) => {
            this.arryCarPie.push({value: val.value, name: val.name});
          });
          this.optionsCarType = {
            title: {
              text: `贵州省各市所有服务区今日货车占比统计`,
              x: 'center',
              textStyle: {
                color: '#fff',
                fontSize: 16
              }
            },
            tooltip: {
              trigger: 'item',
              formatter: '{a} <br/>{b} : {d}%'
            },
            series: [
              {
                name: `${e.name}`,
                type: 'pie',
                radius: '55%',
                center: ['50%', '60%'],
                data:  this.arryCarPie,
                itemStyle: {
                  color: function (params) {
                    return ['#CE2D79', '#BDD139', '#78E77D', '#09D4D6',
                      '#3C75B9', '#6769B1', '#FF8C9D', '#2796C4', '#E57D0D'][params.dataIndex];
                  },
                  emphasis: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                  }
                }
              }
            ]
          };
        }
      );
    }
  }
  public carTableClick(e) {
    this.router.navigate(['/home/serzone', {name: e}]);
  }
  public echartBtn(e): void {
    this.CarTypeisShow = true;
    this.carAreaName = e.srcElement.innerText;
    this.arryCarPie = [];
    this.dataService.getrandomPie(9, 900, 50).map((val, index) => {
      this.arryCarPie.push({value: val, name: this.citys[index]});
    });
    this.optionsCarType = {
      title: {
        text: `贵州省各市所有服务区今日${e.name}占比统计`,
        x: 'center',
        textStyle: {
          color: '#fff',
          fontSize: 16
        }
      },
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {d}%'
      },
      series: [
        {
          name: `${e.name}`,
          type: 'pie',
          radius: '55%',
          center: ['50%', '60%'],
          data: this.arryCarPie,
          itemStyle: {
            color: function (params) {
              return ['#CE2D79', '#BDD139', '#78E77D', '#09D4D6', '#3C75B9', '#6769B1', '#FF8C9D', '#2796C4', '#E57D0D'][params.dataIndex];
            },
            emphasis: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]
    };
    this.carTableData = this.dataService.getJsonObj(8, 1000, 100, this.alertCarTitle);
  }
  // 表格导出
  public carDateChange(e) {
    this.carExportType.carDate = e.srcElement.value;
  }
  public carTypeChange(e) {
    this.carExportType.carNumType = e.srcElement.options[e.srcElement.selectedIndex].innerText;
  }
  public carAreaChange(e) {
    this.carExportType.carArea = e.srcElement.options[e.srcElement.selectedIndex].innerText;
  }
  public carExportClick() {
    if (!(this.carExportType.carDate === '') || !(this.carExportType.carNumType === '') || !(this.carExportType.carArea === '')) {
      this.carExcelShow = false;
      console.log(this.carExportType);
      // 导出表格数据初始化
      this.carExportType = {
        carNumType: '',
        carArea: '',
        carDate: ''
      };
    } else {
      window.alert('请把数据选择全在提交');
    }
  }
  public openCarExcel() {
    this.carExcelShow = true;
  }
  public closeCarExcel() {
    this.carExcelShow = false;
  }

  /*********************************中部*****************************/
  // 中部百度地图画省边界外
  public centerMap2() {
    const that = this;
    const map = new BMap.Map('center_map', {minZoom: 7, maxZoom: 9});
    map.setMapStyle({
      styleJson: [
        // 城市名字的颜色
        /*{
            "featureType": "city",
            "elementType": "labels.text.fill",
            "stylers": {
                "color": "#aedce2ff",
                "visibility": "on"
            }
        },*/
        // 地图背景颜色
        {
          'featureType': 'background',
          'elementType': 'all',
          'stylers': {
            'color': '#002240'
          }
        },
        // 高速配置
        {
          'featureType': 'highway',
          'elementType': 'all',
          'stylers': {
            'color': '#0045C4',
            'visibility': 'on'
          }
        },
        {
          'featureType': 'highway',
          'elementType': 'geometry',
          'stylers': {
            'color': '#B3BDC6',
            'weight': '0.6',
            'visibility': 'on'
          }
        },
        {
          'featureType': 'local',
          'elementType': 'all',
          'stylers': {
            'visibility': 'on'
          }
        },
        {
          'featureType': 'railway',
          'elementType': 'all',
          'stylers': {
            'visibility': 'off'
          }
        },
        // 配置区县不显示
        {
          'featureType': 'district',
          'elementType': 'all',
          'stylers': {
            'visibility': 'off'
          }
        }
      ]
    });
    map.centerAndZoom(new BMap.Point(106.640265, 26.653005), 8);
    map.enableScrollWheelZoom(true);
    map.disableDoubleClickZoom(false);
    // 创建一个右键菜单
    const menu = new BMap.ContextMenu();
    // 定义右键菜单的内容
    const txtMenuItem = [
      {
        text: '放大',
        callback: function () {
          console.log('地图放大');
        }
      },
      {
        text: '缩小',
        callback: function () {
          console.log('地图缩小');
        }
      }
    ];
    // 给右键菜单里面添加东西
    for (let i = 0; i < txtMenuItem.length; i++) {
      // 右键菜单里面添加的内容格式是一个MenuItem类
      menu.addItem(new BMap.MenuItem(txtMenuItem[i].text, txtMenuItem[i].callback, 100));
    }

    // 控制地图显示范围
    /*  const b = new BMap.Bounds(new BMap.Point(105.75777, 24.618423), new BMap.Point(109.400435, 30.469081));
      try {
        BMapLib.AreaRestriction.setBounds(map, b);
      } catch (e) {
        alert(e);
      }*/

    // 编写自定义函数,创建标注
   /* const pointsMarket = [
      [106.626806, 26.683542, '贵阳服务区', 80],
      [104.842269, 26.625681, '遵义服务区', 150],
      [105.293002, 27.301609, '六盘水服务区', 300],
      [106.93956, 27.760846, '毕节服务区', 781],
      [106.994752, 26.0953, '安顺服务区', 198],
      [106.706049, 26.901505, '贵州久长高速服务区', 230],
    ];*/
    const pointsMarket = [];
    this.financeDataService.getServiceNamePoint().subscribe(
      (val) => {
        val.data.map((val1, index1) => {
          let a = [];
          // console.log(val1.name);
          // pointsMarket.push([])
          val1.attributeValueList.map((val2, index2) => {
            if (val2.attributeDesc === '经度') {
              a.push(val2.attributeValue);
            } else if (val2.attributeDesc === '纬度')
              a.push(val2.attributeValue);
          });
          if (a) {
            a.push(val1.name);
          }
          pointsMarket.push(a);
        });
        if (pointsMarket) {
          // console.log(pointsMarket);
          for (let i = 0; i < pointsMarket.length; i++) {
            const points = [pointsMarket[i][0], pointsMarket[i][1]];
            // addMarker(points, pointsMarket[i][2], pointsMarket[i][3]);
            addMarker(points, pointsMarket[i][2]);
          }
        }
      });
   /* function addMarker(point, name, num) {
      const myIcon = new BMap.Icon('http://lbsyun.baidu.com/jsdemo/img/fox.gif', new BMap.Size(200, 130));
      const points = new BMap.Point(point[0], point[1]);
      const marker = new BMap.Marker(points);
      map.addOverlay(marker);

      // 跳动的动画
      // marker.setAnimation(BMAP_ANIMATION_BOUNCE);

      // market事件
      marker.addEventListener('mouseover', function () {
        // 信息窗口
        const sContent = `<div><h5>${name}</h5><p>驻车量：${num}辆</p></div>`;
        const infoWindow = new BMap.InfoWindow(sContent, {enableCloseOnClick: true});
        this.openInfoWindow(infoWindow);
      });
      marker.addEventListener('click', function (e) {
          if (name === '贵州久长高速服务区') {
            that.router.navigate(['/home/serzone', {name: name, point: point}]);
          } else {
            window.alert('此服务区暂无数据');
          }
        that.router.navigate(['/home/serzone', {name: name, point: point}]);
      });
    }*/
    function addMarker(point, name) {
      // const myIcon = new BMap.Icon('http://lbsyun.baidu.com/jsdemo/img/fox.gif', new BMap.Size(200, 130));
      const myIcon = new BMap.Icon('assets/images/s1.png', new BMap.Size(10, 10), {
        offset: new BMap.Size(0, 10),
      });
      const points = new BMap.Point(point[0], point[1]);
      const marker = new BMap.Marker(points, {icon: myIcon});
      map.addOverlay(marker);

      // 跳动的动画
      // marker.setAnimation(BMAP_ANIMATION_BOUNCE);

      // market事件
      marker.addEventListener('mouseover', function () {
        // 信息窗口
        // const sContent = `<div><h5>${name}</h5><p>驻车量：${num}辆</p></div>`;
        const sContent = `<div><h5>${name}</h5></div>`;
        const infoWindow = new BMap.InfoWindow(sContent, {enableCloseOnClick: true});
        this.openInfoWindow(infoWindow);
      });
      marker.addEventListener('click', function (e) {
        if (name === '久长服务区') {
          that.router.navigate(['/home/serzone', {name: name, point: point}]);
        } else {
          window.alert('此服务区暂无数据');
        }
        // that.router.navigate(['/home/serzone', {name: name, point: point}]);
      });
    }

    // 添加5标注
    /*for (let i = 0; i < pointsMarket.length; i++) {
      const points = [pointsMarket[i][0], pointsMarket[i][1]];
      // addMarker(points, pointsMarket[i][2], pointsMarket[i][3]);
      addMarker(points, pointsMarket[i][2]);
    }*/

    // 绘制边线轮廓rankingClick
    const citys = [
      '贵州省',
      '贵阳市',
      '遵义市',
      '毕节市',
      '铜仁市',
      '安顺市',
      '六盘水市',
      '贵阳市',
      '黔西南布依族苗族自治州',
      '黔东南苗族侗族自治州',
      '黔南布依族苗族自治州',
    ];

    function getBoundary(name) {
      const bdary = new BMap.Boundary();

      function randomRgbColor() { // 随机生成RGB颜色
        const r = Math.floor(Math.random() * 256); // 随机生成256以内r值
        const g = Math.floor(Math.random() * 256); // 随机生成256以内g值
        const b = Math.floor(Math.random() * 256); // 随机生成256以内b值
        return `rgb(${r},${g},${b})`; // 返回rgb(r,g,b)格式颜色
      }

      const colors = randomRgbColor();
      if (name === '贵州省') {
        bdary.get(name, function (rs) {       // 获取行政区域
          for (let i = 0; i < rs.boundaries.length; i++) {
            const ply = new BMap.Polygon(rs.boundaries[i], {
              strokeWeight: 3,
              strokeColor: 'white',
              fillColor: '',
              fillOpacity: 0
            }); // 建立多边形覆盖物
            map.addOverlay(ply);  // 添加覆盖物
            // map.setViewport(ply.getPath());    // 调整视野
          }
        });
      }
      bdary.get(name, function (rs) {       // 获取行政区域
        for (let i = 0; i < rs.boundaries.length; i++) {
          const ply = new BMap.Polygon(rs.boundaries[i], {
            strokeWeight: 1,
            strokeColor: colors,
            fillColor: colors,
            fillOpacity: 0.1
          }); // 建立多边形覆盖物
          map.addOverlay(ply);  // 添加覆盖物
          // map.setViewport(ply.getPath());    // 调整视野
        }
      });
    }

    for (let i = 0; i <= citys.length; i++) {
      getBoundary(citys[i]);
    }
    // getBoundary('贵阳',"#F9EB08");
    // getBoundary('遵义',"#00FF00");
    // getBoundary('毕节',"#00FF00");
    /* getBoundary('安顺市',"#01D867");
     getBoundary('铜仁地区',"#00FF00");

     getBoundary('六盘市',"#00FF00");

     getBoundary('黔西南布依族苗族自治州',"#00FF00");
     getBoundary('黔东南苗族侗族自治州',"#00FF00");
     getBoundary('黔南布依族苗族自治州',"#00FF00");*/

    // 地图事件，逆地址解析
    const geoc = new BMap.Geocoder();
    map.addEventListener('click', function (e) {
      const pt = e.point;
        if (!e.overlay.Bc) {
          geoc.getLocation(pt, function (rs) {
         const addComp = rs.addressComponents;
         // alert(addComp.city);
         if (addComp.city === '贵阳市') {
           that.router.navigate(['/home/city']);
         } else {
           window.alert('很抱歉' + addComp.city + '暂无数据');
         }
       });
        }


    });
  }
  // 中部地图省市联动
  public provinceClick() {
    this.provinceShow = true;
    this.http.get('assets/data/province.json').subscribe(
      (res) => {
        this.province = res;
      }
    );
  }
  public provinceMouseEnter(item) {
    if (item === '全国') {
      this.cityShow = false;
      return;
    } else if (item === '贵州省') {
      this.cityShow = true;
      this.http.get('assets/data/guizhoucity.json').subscribe(
        (res) => {
          this.city = res[0].children;
          this.citeDate = res[0].province;
        }
      );
    } else if (item === '云南省') {
      this.cityShow = true;
      this.http.get('assets/data/yunnancity.json').subscribe(
        (res) => {
          this.city = res[0].children;
          this.citeDate = res[0].province;
        }
      );
    } else {
      this.cityShow = true;
      this.city = [{city: '暂未开通'}];
      this.citeDate = '暂未开通';
    }
  }
  public provinceDataClick(item) {
    this.selectDate = item.province;
    if (item.name === '全国') {
      this.dataToggle = '全国';
      this.router.navigate(['/home/whole']);
    } else if (item.name === '贵州') {
      this.dataToggle = '贵州省';
    } else {
      window.confirm('此地区暂未开通');
    }
  }
  public cityDataClick(item) {
    if (item.city === '贵阳市') {
      this.router.navigate(['/home/city']);
    } else {
      window.confirm('此地区暂未开通');
    }
  }

  // 事件处理函数
  public tableEventClick(name): void {
    // 弹窗配置
    this.eventConfig = {
      alertTitle: name,
      width: 80,
      height: 60,
    };
    if (name === '经营类') {
      this.wenJunAlertService.openAlertShow();
    } else {
      this.alertOfficeShow = true;
    }
  }
  // 为处理事件统计
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
  // 办公室信息处理函数
  public tableOfficeClick(): void {
    this.alertOfficeShow = true;
  }
  public closeOfficeShow() {
    this.alertOfficeShow = false;
  }
  // 个人信息处理
  public tablePersonClick() {
    this.alertPersonShow = true;
  }
  public closePersonShow() {
    this.alertPersonShow = false;
  }

  /*********************************右边*****************************/
  // 业态经营数据前十排名
  public backCrosswiseBar(type) {
    const types = ['revenue', 'passenger', 'vehicle'];
    const type1 = ['收入', '人流', '车流'];
    const colors = ['#2307EF', '#3B78B1', '#04A6BB'];
    this.financeDataService.searchTop10Bar({id: 2, type: type}).subscribe(
      (value) => {
        const barData = [];
        const barArea = [];
        value.data.yAxis.map((val, index) => {
          barArea.push(val.serviceName);
        });
        value.data.barDatas.map((val, index) => {
          barData.push(
            {
              name: val.title,
              type: 'bar',
              stack: '总量',
              color: colors[index],
              label: {
                normal: {
                  show: true,
                  position: 'insideRight'
                }
              },
              data: val.datas,
            }
          );
        });
        this.crosswiseBar = {
          tooltip : {
            trigger: 'axis',
            axisPointer : {            // 坐标轴指示器，坐标轴触发有效
              type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            }
          },
          grid: {
            top: '5%',
            left: '1%',
            right: '5%',
            bottom: '5%',
            containLabel: true
          },
          xAxis: {
            type: 'value',
            splitLine: {show: false},
            axisLabel: {
              formatter: '{value}'
            },
            nameTextStyle: {
              color: 'white'
            },
            axisLine: {
              lineStyle: {
                color: 'white'
              }
            },
          },
          yAxis: {
            type: 'category',
            // name: '万元/辆/人次',
            inverse: false,
            splitLine: {show: false},
            data: barArea,
            axisLabel: {
              margin: 20,
            },
            nameTextStyle: {
              color: 'white'
            },
            axisLine: {
              lineStyle: {
                color: 'white'
              }
            },
          },
          series: barData
        };
      }
    );
  }
  // 业态经营数据前十排名相关操作
  public clickBtn(e): void {
    const types = ['revenue', 'vehicle', 'passenger'];
    const type1 = ['收入', '车流', '客流'];
    console.log(e.srcElement.innerText);
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
      this.backCrosswiseBar(types[3]);
    }
  }
  /*等候数据调试*/
  public rankingClick(e) {
    this.router.navigate(['/home/serzone', {name: e.name}]);
  }

  // 实时收入监控
  public incomeAmountCount(): void {
    this.financeDataService.searchIncomeTotal({id: 2}).subscribe(
      (value) => {
        // console.log(value);
        this.incomeAmount = Math.ceil(value.data).toString().split('');
      }
    );
  }
  // 收入日分布类型占比饼状图
  public IncomeTypes() {
    this.financeDataService.searchIncomeTotalPie({id: 2}).subscribe(
      (value) => {
        this.optionsIncomeModel = {
          tooltip: {
            trigger: 'item',
            formatter: '{b} : {c} ({d}%)'
          },
          series: [
            {
              type: 'pie',
              radius: '55%',
              center: ['50%', '50%'],
              label: {
                show: true,
                position: 'outside',
                formatter: '{b}: {d}%',
                color: 'white',
                align: 'center',
                emphasis: {
                  show: true,
                  textStyle: {
                    fontSize: 12
                  }
                }
              },
              color: ['#01CBE3', '#2A58DF', '#1B94E3', '#3B4F74', '#D33939', '#2407EF'],
              data: value.data,
              itemStyle: {
                emphasis: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              }
            }
          ]
        };
      }
    );
  }
  // 收入类型相关操作
  public incomeClick(e): void {
    this.alertIncomeShow = true;
    this.alertIncomeTitle = e.name + '收入分布统计';
    document.body.className = 'ui-overflow-hidden';
    this.arryIncomePie = [];
    // tables数据
    // this.carTableData = this.dataService.getJsonObj(8, 1000, 100, this.alertCarTitle);
    this.financeDataService.searchIncomeAlertTable({id: 2, types: e.name}).subscribe(
      (val) => {
        console.log(val);
        // this.IncomeTableData = this.dataService.getIncomeObj(8, 1000, 100, this.alertIncomeTitle);
        this.IncomeTableData = val.data.contents;
      }
    );
    // 饼状图
    this.financeDataService.searchIncomeAlertPie({id: 2, types: e.name}).subscribe(
      (value) => {
        console.log(value.data);
        /*this.dataService.getrandomPie(9, 1000, 100).map((val, index) => {
          this.arryIncomePie.push({value: val, name: this.citys[index]});
        });*/
        value.data.map((val, index) => {
          this.arryIncomePie.push({value: 1, name: val.name});
        });
        this.optionsIncomeTypes = {
          title: {
            text: `贵州省各市所有服务区今日${e.name}占比统计`,
            x: 'center',
            textStyle: {
              color: '#fff',
              fontSize: 16
            }
          },
          tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {d}%'
          },
          series: [
            {
              name: `${e.name}`,
              type: 'pie',
              radius: '55%',
              center: ['50%', '60%'],
              data:  this.arryIncomePie,
              itemStyle: {
                color: function (params) {
                  return ['#CE2D79', '#BDD139', '#78E77D', '#09D4D6',
                    '#3C75B9', '#6769B1', '#FF8C9D', '#2796C4', '#E57D0D'][params.dataIndex];
                },
                emphasis: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              }
            }
          ]
        };
      }
    );
  }
  public closeIncomeShow(): void {
    document.body.className = '';
    this.alertIncomeShow = false;
  }
  // 收入类型弹窗
  public optionsIncomePieInit(ec): void {
    this.optionsCarPieInstance = ec;
  }
  public optionsIncomePieClick(e) {
    if (e.name === '贵阳市') {
      this.router.navigate(['/home/city', {name: e.name}]);
    } else {
      window.alert (`很抱歉，${e.name}暂无数据`);
    }
    /*this.IncomeAreaName = e.name;
    this.incomeTypeisShow = false;
    this.IncomeTableData = this.dataService.getIncomeObj(8, 1000, 100, this.alertIncomeTitle);*/
  }
  public IncomeBtnClick(e): void {
    if (e.srcElement.innerText === '小吃') {
      this.alertIncomeTitle = '小吃收入分布统计';
      this.arryIncomePie = [];
      // tables数据
      // this.carTableData = this.dataService.getJsonObj(8, 1000, 100, this.alertCarTitle);
      this.financeDataService.searchIncomeAlertTable({id: 2, types: '小吃'}).subscribe(
        (val) => {
          console.log(val);
          // this.IncomeTableData = this.dataService.getIncomeObj(8, 1000, 100, this.alertIncomeTitle);
          this.IncomeTableData = val.data.contents;
        }
      );
      // 饼状图
      this.financeDataService.searchIncomeAlertPie({id: 2, types: '小吃'}).subscribe(
        (value) => {
          console.log(value.data);
          /*this.dataService.getrandomPie(9, 1000, 100).map((val, index) => {
            this.arryIncomePie.push({value: val, name: this.citys[index]});
          });*/
          value.data.map((val, index) => {
            this.arryIncomePie.push({value: 1, name: val.name});
          });
          this.optionsIncomeTypes = {
            title: {
              text: `贵州省各市所有服务区今日小吃占比统计`,
              x: 'center',
              textStyle: {
                color: '#fff',
                fontSize: 16
              }
            },
            tooltip: {
              trigger: 'item',
              formatter: '{a} <br/>{b} : {d}%'
            },
            series: [
              {
                name: `${e.name}`,
                type: 'pie',
                radius: '55%',
                center: ['50%', '60%'],
                data:  this.arryIncomePie,
                itemStyle: {
                  color: function (params) {
                    return ['#CE2D79', '#BDD139', '#78E77D', '#09D4D6',
                      '#3C75B9', '#6769B1', '#FF8C9D', '#2796C4', '#E57D0D'][params.dataIndex];
                  },
                  emphasis: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                  }
                }
              }
            ]
          };
        }
      );
    }
    else if (e.srcElement.innerText === '中式快餐') {
      this.alertIncomeTitle = '中式快餐收入分布统计';
      this.arryIncomePie = [];
      // tables数据
      // this.carTableData = this.dataService.getJsonObj(8, 1000, 100, this.alertCarTitle);
      this.financeDataService.searchIncomeAlertTable({id: 2, types: '中式快餐'}).subscribe(
        (val) => {
          console.log(val);
          // this.IncomeTableData = this.dataService.getIncomeObj(8, 1000, 100, this.alertIncomeTitle);
          this.IncomeTableData = val.data.contents;
        }
      );
      // 饼状图
      this.financeDataService.searchIncomeAlertPie({id: 2, types: '中式快餐'}).subscribe(
        (value) => {
          console.log(value.data);
          /*this.dataService.getrandomPie(9, 1000, 100).map((val, index) => {
            this.arryIncomePie.push({value: val, name: this.citys[index]});
          });*/
          value.data.map((val, index) => {
            this.arryIncomePie.push({value: 1, name: val.name});
          });
          this.optionsIncomeTypes = {
            title: {
              text: `贵州省各市所有服务区今日小吃占比统计`,
              x: 'center',
              textStyle: {
                color: '#fff',
                fontSize: 16
              }
            },
            tooltip: {
              trigger: 'item',
              formatter: '{a} <br/>{b} : {d}%'
            },
            series: [
              {
                name: `${e.name}`,
                type: 'pie',
                radius: '55%',
                center: ['50%', '60%'],
                data:  this.arryIncomePie,
                itemStyle: {
                  color: function (params) {
                    return ['#CE2D79', '#BDD139', '#78E77D', '#09D4D6',
                      '#3C75B9', '#6769B1', '#FF8C9D', '#2796C4', '#E57D0D'][params.dataIndex];
                  },
                  emphasis: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                  }
                }
              }
            ]
          };
        }
      );
    }
    else if (e.srcElement.innerText === '西式快餐') {
      this.alertIncomeTitle = '西式快餐收入分布统计';
      this.arryIncomePie = [];
      // tables数据
      // this.carTableData = this.dataService.getJsonObj(8, 1000, 100, this.alertCarTitle);
      this.financeDataService.searchIncomeAlertTable({id: 2, types: '西式快餐'}).subscribe(
        (val) => {
          console.log(val);
          // this.IncomeTableData = this.dataService.getIncomeObj(8, 1000, 100, this.alertIncomeTitle);
          this.IncomeTableData = val.data.contents;
        }
      );
      // 饼状图
      this.financeDataService.searchIncomeAlertPie({id: 2, types: '西式快餐'}).subscribe(
        (value) => {
          console.log(value.data);
          /*this.dataService.getrandomPie(9, 1000, 100).map((val, index) => {
            this.arryIncomePie.push({value: val, name: this.citys[index]});
          });*/
          value.data.map((val, index) => {
            this.arryIncomePie.push({value: 1, name: val.name});
          });
          this.optionsIncomeTypes = {
            title: {
              text: `贵州省各市所有服务区今日小吃占比统计`,
              x: 'center',
              textStyle: {
                color: '#fff',
                fontSize: 16
              }
            },
            tooltip: {
              trigger: 'item',
              formatter: '{a} <br/>{b} : {d}%'
            },
            series: [
              {
                name: `${e.name}`,
                type: 'pie',
                radius: '55%',
                center: ['50%', '60%'],
                data:  this.arryIncomePie,
                itemStyle: {
                  color: function (params) {
                    return ['#CE2D79', '#BDD139', '#78E77D', '#09D4D6',
                      '#3C75B9', '#6769B1', '#FF8C9D', '#2796C4', '#E57D0D'][params.dataIndex];
                  },
                  emphasis: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                  }
                }
              }
            ]
          };
        }
      );
    }
    else if (e.srcElement.innerText === '商超') {
      this.alertIncomeTitle = '商超收入分布统计';
      this.arryIncomePie = [];
      // tables数据
      // this.carTableData = this.dataService.getJsonObj(8, 1000, 100, this.alertCarTitle);
      this.financeDataService.searchIncomeAlertTable({id: 2, types: '商超'}).subscribe(
        (val) => {
          console.log(val);
          // this.IncomeTableData = this.dataService.getIncomeObj(8, 1000, 100, this.alertIncomeTitle);
          this.IncomeTableData = val.data.contents;
        }
      );
      // 饼状图
      this.financeDataService.searchIncomeAlertPie({id: 2, types: '商超'}).subscribe(
        (value) => {
          console.log(value.data);
          /*this.dataService.getrandomPie(9, 1000, 100).map((val, index) => {
            this.arryIncomePie.push({value: val, name: this.citys[index]});
          });*/
          value.data.map((val, index) => {
            this.arryIncomePie.push({value: 1, name: val.name});
          });
          this.optionsIncomeTypes = {
            title: {
              text: `贵州省各市所有服务区今日小吃占比统计`,
              x: 'center',
              textStyle: {
                color: '#fff',
                fontSize: 16
              }
            },
            tooltip: {
              trigger: 'item',
              formatter: '{a} <br/>{b} : {d}%'
            },
            series: [
              {
                name: `${e.name}`,
                type: 'pie',
                radius: '55%',
                center: ['50%', '60%'],
                data:  this.arryIncomePie,
                itemStyle: {
                  color: function (params) {
                    return ['#CE2D79', '#BDD139', '#78E77D', '#09D4D6',
                      '#3C75B9', '#6769B1', '#FF8C9D', '#2796C4', '#E57D0D'][params.dataIndex];
                  },
                  emphasis: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                  }
                }
              }
            ]
          };
        }
      );
    }
    else if (e.srcElement.innerText === '住宿') {
      this.alertIncomeTitle = '住宿收入分布统计';
      this.arryIncomePie = [];
      // tables数据
      // this.carTableData = this.dataService.getJsonObj(8, 1000, 100, this.alertCarTitle);
      this.financeDataService.searchIncomeAlertTable({id: 2, types: '住宿'}).subscribe(
        (val) => {
          console.log(val);
          // this.IncomeTableData = this.dataService.getIncomeObj(8, 1000, 100, this.alertIncomeTitle);
          this.IncomeTableData = val.data.contents;
        }
      );
      // 饼状图
      this.financeDataService.searchIncomeAlertPie({id: 2, types: '住宿'}).subscribe(
        (value) => {
          console.log(value.data);
          /*this.dataService.getrandomPie(9, 1000, 100).map((val, index) => {
            this.arryIncomePie.push({value: val, name: this.citys[index]});
          });*/
          value.data.map((val, index) => {
            this.arryIncomePie.push({value: 1, name: val.name});
          });
          this.optionsIncomeTypes = {
            title: {
              text: `贵州省各市所有服务区今日小吃占比统计`,
              x: 'center',
              textStyle: {
                color: '#fff',
                fontSize: 16
              }
            },
            tooltip: {
              trigger: 'item',
              formatter: '{a} <br/>{b} : {d}%'
            },
            series: [
              {
                name: `${e.name}`,
                type: 'pie',
                radius: '55%',
                center: ['50%', '60%'],
                data:  this.arryIncomePie,
                itemStyle: {
                  color: function (params) {
                    return ['#CE2D79', '#BDD139', '#78E77D', '#09D4D6',
                      '#3C75B9', '#6769B1', '#FF8C9D', '#2796C4', '#E57D0D'][params.dataIndex];
                  },
                  emphasis: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                  }
                }
              }
            ]
          };
        }
      );
    }
    else if (e.srcElement.innerText === '汽修') {
      this.alertIncomeTitle = '汽修收入分布统计';
      this.arryIncomePie = [];
      // tables数据
      // this.carTableData = this.dataService.getJsonObj(8, 1000, 100, this.alertCarTitle);
      this.financeDataService.searchIncomeAlertTable({id: 2, types: '汽修'}).subscribe(
        (val) => {
          console.log(val);
          // this.IncomeTableData = this.dataService.getIncomeObj(8, 1000, 100, this.alertIncomeTitle);
          this.IncomeTableData = val.data.contents;
        }
      );
      // 饼状图
      this.financeDataService.searchIncomeAlertPie({id: 2, types: '汽修'}).subscribe(
        (value) => {
          console.log(value.data);
          /*this.dataService.getrandomPie(9, 1000, 100).map((val, index) => {
            this.arryIncomePie.push({value: val, name: this.citys[index]});
          });*/
          value.data.map((val, index) => {
            this.arryIncomePie.push({value: 1, name: val.name});
          });
          this.optionsIncomeTypes = {
            title: {
              text: `贵州省各市所有服务区今日汽修占比统计`,
              x: 'center',
              textStyle: {
                color: '#fff',
                fontSize: 16
              }
            },
            tooltip: {
              trigger: 'item',
              formatter: '{a} <br/>{b} : {d}%'
            },
            series: [
              {
                name: `${e.name}`,
                type: 'pie',
                radius: '55%',
                center: ['50%', '60%'],
                data:  this.arryIncomePie,
                itemStyle: {
                  color: function (params) {
                    return ['#CE2D79', '#BDD139', '#78E77D', '#09D4D6',
                      '#3C75B9', '#6769B1', '#FF8C9D', '#2796C4', '#E57D0D'][params.dataIndex];
                  },
                  emphasis: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                  }
                }
              }
            ]
          };
        }
      );
    }
  }
  public IncomeTableClick(e): void {
    this.router.navigate(['/home/serzone', {name: e}]);
  }
  public echarIncomeBtn(e): void {
    this.incomeTypeisShow = true;
    this.IncomeAreaName = e.srcElement.innerText;
    this.arryIncomePie = [];
    this.dataService.getrandomPie(9, 1000, 100).map((val, index) => {
      this.arryIncomePie.push({value: val, name: this.citys[index]});
    });
    this.optionsIncomeTypes = {
      title: {
        text: `贵州省各市所有服务区当日${e.name}类型占比统计`,
        x: 'center',
        textStyle: {
          color: '#fff',
          fontSize: 16
        }
      },
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c} ({d}%)'
      },
      series: [
        {
          name: `${e.name}`,
          type: 'pie',
          radius: '50%',
          center: ['50%', '50%'],
          data: this.arryIncomePie,
          itemStyle: {
            color: function (params) {
              return ['#CE2D79', '#BDD139', '#78E77D', '#09D4D6', '#3C75B9', '#6769B1', '#FF8C9D', '#2796C4', '#E57D0D'][params.dataIndex];
            },
            emphasis: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]
    };
    this.IncomeTableData = this.dataService.getIncomeObj(8, 1000, 100, this.alertIncomeTitle);
  }
  // 表格导出
  public incomeDateChange(e): void {
    this.incomeExportType.incomeDate = e.srcElement.value;
  }
  public incomeTypeChange(e): void {
    this.incomeExportType.incomeNumType = e.srcElement.options[e.srcElement.selectedIndex].innerText;
  }
  public incomeAreaChange(e): void {
    this.incomeExportType.incomeArea = e.srcElement.options[e.srcElement.selectedIndex].innerText;
  }
  public incomeExportClick(): void {
    if (!(this.incomeExportType.incomeDate === '')
      || !(this.incomeExportType.incomeNumType === '')
      || !(this.incomeExportType.incomeArea === '')) {
      this.incomeExcelShow = false;
      console.log(this.incomeExportType);
      // 导出表格数据初始化
      this.incomeExportType = {
        incomeNumType: '',
        incomeArea: '',
        incomeDate: ''
      };
    } else {
      window.alert('请把数据选择全在提交');
    }
  }
  public openIncomeExcel() {
    this.incomeExcelShow = true;
  }
  public closeincomeExcel() {
    this.incomeExcelShow = false;
  }

  /*********************************图表更新*****************************/
  public updataEcharts(): void {

    // 3D柱状图
    this.packOption3();
    //  高速服务区分布散点统计
    // this.centerMap();
    // this.centerMap1();

    /**************************中部****************************/
    // 地图
    this.centerMap2();
    // 事件
    this.initialize();
    // 办公
    this.officeTypes = this.dataService.officeTypes;
    // 个人
    this.personOfficeTypes = this.dataService.personOfficeTypes;

    // 业态经营数据前十排名
    this.backCrosswiseBar('revenue');

    // 车流监控
   /* this.vehicleAmountCountClean = setInterval(() => {

    }, 5000);*/
    this.vehicleAmountCount();
    this.CarTypes();

    // 收入监控
    this.incomeAmountCountClean = setInterval(() => {
    }, 5000);
    this.incomeAmountCount();
    this.IncomeTypes();

    // 实时客流
    this.personAmountCountClean = setInterval(() => {
    }, 5000);
    this.financeDataService.searchPersonTotal({id: 2}).subscribe(
      (val) => {
        // console.log(val.data.toString().split(''));
        this.localService.persons.next(val.data.toString().split(''));
      }
    );

    // 月度所有服务区车辆流量柱状图统计
    this.optionsCar = {
      title: {
        text: '月度车流量实时监控（辆）',
        left: 'center',
        textStyle: {
          color: 'white',
          fontWeight: 500,
          fontSize: 14
        }
      },
      tooltip: {
        trigger: 'axis'
      },
      dataZoom: [
        {
          type: 'inside'
        }
      ],
      grid: {
        left: '5%',
        top: '15%',
        bottom: '3%',
        right: '5%',
        containLabel: true
      },
      xAxis: {
        type: 'category',
        axisLine: {
          lineStyle: {
            color: 'white'
          }
        },
        data: ['1月', '2月', '3月', '4月', '5月', '6月']
      },
      yAxis: {
        name: '车辆数量',
        type: 'value',
        splitLine: {show: false},
        nameTextStyle: {
          color: 'white'
        },
        axisLine: {
          lineStyle: {
            color: 'white'
          }
        },
      },
      series: [
        {
          type: 'bar',
          name: '车辆数量',
          color: ['#d82c26'],
          smooth: true,
          data: [120, 200, 150, 80, 70, 110],
        }
      ]
    };
  }
}

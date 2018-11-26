import {
  Component, ElementRef, OnDestroy,
  OnInit, ViewEncapsulation,
} from '@angular/core';
import {Data3dService} from '../../common/services/data3d.service';
import {DiagramService} from '../../common/services/diagram.service';
import {ActivatedRoute} from '@angular/router';
import {DataService} from '../../common/services/data.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AttributeValue, EventListInfo, UploadEventInfoUp} from '../../common/model/service-data.model';
import {ServiceDataService} from '../../common/services/service-data.service';
import {LocalStorageService} from '../../common/services/local-storage.service';
import {Bar3dExportType, CarExportType, IncomeExportType} from '../../common/model/shared.model';
import {DatePipe} from '@angular/common';

declare let BMap;
declare let BMapLib;
declare let BMAP_SATELLITE_MAP;

@Component({
  selector: 'app-service-data',
  templateUrl: './service-data.component.html',
  styleUrls: ['./service-data.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ServiceDataComponent implements OnInit, OnDestroy {
  /***********************基础信息************************/
  public esDate: any;  // 时间初始化
    // 组件销毁后清除时钟任务
  public vehicleAmountCountClean: any;
  public incomeAmountCountClean: any;
  public personAmountCountClean: any;
  // 服务区名称
  public serviceZoneTitle: string;
  public citys = ['贵阳市', '遵义市', '六盘水市', '安顺市', '毕节市', '铜仁市', '黔东南苗族侗族自治州', '黔南布依族苗族自治州', '黔西南布依族苗族自治州'];
  public business = ['住宿', '汽修', '商超', '小吃', '西式快餐', '中式快餐'];
  /***********************左边************************/
    //  高速服液态数据3d统计
  public options3d = {};
  public options3dCopy = {};
  public options3dArray: any;

  // 3D柱状图弹窗
  public alertBarShow = false;
  public alertBarTitle: string;
  public options3dBar = {};
  public options3dBarInstance: any;
  public options3dLine = {};
  public colorList = [
    '#356981', '#356981', '#356981', '#356981', '#356981', '#356981',
    '#356981', '#356981', '#356981', '#356981', '#356981 ', '#356981'
  ];
  public bar3dExcelShow = false;
  public startTime3d: Date; // 时间选择器
  public endTime3d: Date; // 时间选择器

  // 车辆收入数值表现
  public vehicleAmount = [];

  // 服务区车型日分布分析
  public optionsCarModel = {};
  public alertCarShow = false;
  public carTableData: any;
  public carExcelShow = false;
  public arryCarPie = [];
  public alertCarTitle = '小车';
  public carStartTime: Date; // 时间选择器
  public carEndTime: Date; // 时间选择器

  /***********************中部************************/
  public incomeBottomData: any;
  public incomeTopData: any;

  // 服务区商家视频弹窗
  public videoAlertShow = false;
  public videoShopList = [];
  public videoAlertTitle: string;
  public videoBottomShopUrl: string;
  // 服务区商家信息弹窗
  public serviceShopShow = false;
  public serviceShopShowExport = false;
  public serviceShopInfo: any;
  public shopStartTime: Date; // 时间选择器
  public shopEndTime: Date; // 时间选择器
  // 服务区信息修改
  public selectFormModule: FormGroup;
  // 公共视频弹窗
  public videoPublicShow = false;
  public publicVideoTitle: string;
  public publicVideoList = [];
  public publicBottomVideoGroup = [];
  public publicTopVideoGroup = [];
  public videoTopOpen = [];
  public videoBottomOpen = [];
  // 事件弹窗
  public eventList: EventListInfo[];
  public eventListInfo: EventListInfo;
  public eventListProcess: EventListInfo[];
  public eventListNoProcess: EventListInfo[];
  public eventInfoUpTypes = [];
  public uploadEventInfoUp: UploadEventInfoUp = new UploadEventInfoUp();
  // public eventListInfoChildern: EventListInfo[];
  public eventAlertShow = false;
  public eventAlertListShow = true;
  public eventAlertInfoUp = false;
  public eventAlertInfoUpTitle: string;
  // 服务区厕所监控
  public serversToiletAlertShow = false;
  public waitTitle: string;

  /***********************右边************************/
    // 另外收入排名+表格导出
  public alertCrosswiseShow = false;
  public crosswiseExcelShow = false;
  public CrosswiseExportType: IncomeExportType = new IncomeExportType();

  // 服务区基本信息数据
  public serviceBasicAlert = true;
  public serviceBasicAlertTitle: string;
  public serviceInfo: any;
  public alterCommonAttributeValues = [];
  public alterUpAttributeValues = [];
  public alterDownAttributeValues = [];

  public shopEchartLine = {};
  public shopEchartArea = {};

  // 服务区基本信息之园区平面图
  public servicesPlan = false;
  public servicesMap = {};
  // 实时收入
  public incomeAmount = [];

  // 当日收入类型占比分析
  public optionsIncomeModel = {};
  // 收入类型弹窗
  public alertIncomeShow = false;
  public alertIncomeTypeShow = false;
  public alertIncomeTypeTitle: string;
  public alertIncomeTitle = '收入总数';
  public optionsIncomeTypes = {};
  public IncomeAreaName = '贵州省';
  public IncomeTableData: any;
  public storeList: any;
  public arryIncomePie = [];
  public incomeExcelShow = false;
  public incomeStartTime: Date; // 时间选择器
  public incomeEndTime: Date; // 时间选择器
  constructor(
    private fb: FormBuilder,
    private routerInfo: ActivatedRoute,
    private dataService: DataService,
    private serareaService: ServiceDataService,
    private localService: LocalStorageService,
    private datePipe: DatePipe
  ) {
  }

  ngOnInit() {
    console.log(this.localService.getObject('userDTO'));
    this.serareaService.searchSerAraItem(1).subscribe(
      (value) => {
        console.log(value.data);
        this.serviceInfo = value.data;
        value.data.commonAttributeValues.map((val, index) => {
          this.alterCommonAttributeValues.push(this.cloneValue(val));
        });
        value.data.upAttributeValues.attributeValues.map((val, index) => {
          this.alterUpAttributeValues.push(this.cloneValue(val));
        });
        value.data.downAttributeValues.attributeValues.map((val, index) => {
          this.alterDownAttributeValues.push(this.cloneValue(val));
        });
        console.log(this.alterCommonAttributeValues);
      }
    );
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
    // 视频弹窗时间选择表单
    this.selectFormModule = this.fb.group({
      videoDate: ['', [Validators.required]],
      videoTimeStart: ['', [Validators.required]],
      videoTimeFinish: ['', [Validators.required]],
      // weixin: ['', {disabled: true}, [Validators.required]],
    });
    // 路由接受参数
    this.routerInfo.params.subscribe(
      (params) => {
        this.serviceZoneTitle = params.name;
        this.localService.eventBus.next({title: this.serviceZoneTitle + '业态大数据', flagState: 'serzone', flagName: this.serviceZoneTitle});
        // this.serviceZonePoint = params.point.split(',');
        // console.log(this.serviceZonePoint);
      }
    );

    /*****************************数据更行**********************/
    this.upData();
  }

  ngOnDestroy(): void {
    clearInterval(this.vehicleAmountCountClean);
    clearInterval(this.incomeAmountCountClean);
    clearInterval(this.personAmountCountClean);
  }

  /************************左边***************************/
  // 3D柱状图图表配置
  public packOption3() {
    // 车流客流人流
    this.serareaService.search3DBar({id: 2, parameter: ['revenue', 'passenger', 'vehicle']}).subscribe(
      (val) => {
        console.log(val);
        const xdata = val.data.xdata;
        const yData = val.data.yData;
        const coordinate = val.data.coordinate;
        this.options3d = {
          tooltip: {
            show: true,
            trigger: 'item',
            axisPointer: {
              type: 'cross',
              axis: 'auto',
            },
            formatter: function (params) {
              let res = `<p>${xdata[params.value[0]]}:</p>`;
              res += `<p style='margin-left:3px'>${yData[params.value[1]]}:${params.value[3]}</p>`;
              return res;
            }
          },
          xAxis3D: {
            type: 'category',
            name: '月份',
            data: xdata,
            splitLine: {show: false},
            nameTextStyle: {
              color: 'transparent'
            },
            axisLine: {
              lineStyle: {
                color: 'white'
              }
            },
          },
          yAxis3D: {
            type: 'category',
            data: yData,
            name: '类型',
            splitLine: {show: false},
            nameTextStyle: {
              color: 'transparent'
            },
            axisLine: {
              lineStyle: {
                color: 'white'
              }
            },
          },
          zAxis3D: {
            type: 'value',
            name: '%',
            splitLine: {show: false},
            nameTextStyle: {
              top: '3%',
              left: '5%',
              show: false,
              color: 'transparent'
            },
            axisLine: {
              lineStyle: {
                color: 'white'
              }
            },
          },
          grid3D: {
            boxWidth: 200,
            boxDepth: 80,
            light: {
              main: {
                intensity: 1.2
              },
              ambient: {
                intensity: 0.3
              }
            },
            viewControl: {
              distance: 270,
            }
          },
          series: [
            {
              type: 'bar3D',
              barWidth: 30, // 柱图宽度
              // data: this.data3dS.data3dFac(), // 这种方式点击函数打不开
              /*data的两种的请求方式*/
              data: coordinate.map(function (item) {
                return {value: [item[0], item[1], item[2], item[3]]};
              }),
              // 柱状图阴影
              shading: 'lambert',
              label: {
                // 柱状图的数值是否显示
                show: false,
                textStyle: {
                  fontSize: 16,
                  borderWidth: 1
                }
              },
              // 柱状图主子的样式
              itemStyle: {
                opacity: 0.9,
                color: function (params) {
                  return ['#9B90D5', '#46E7E2', '#78F991', '#0B38D8', '#027405'][params.value[1]];
                },
              },
              emphasis: {
                label: {
                  textStyle: {
                    fontSize: 20,
                    color: '#002140'
                  }
                },
                itemStyle: {
                  color: '#FF2600'
                }
              }
            }
          ]
        };
      }
    );
    // 用电量用水量
    this.serareaService.search3DBar({id: 2, parameter: ['electric', 'water']}).subscribe(
      (val) => {
        console.log(val);
        const xdata = val.data.xdata;
        const yData = val.data.yData;
        const coordinate = val.data.coordinate;
        this.options3dCopy = {
          tooltip: {
            show: true,
            trigger: 'item',
            axisPointer: {
              type: 'cross',
              axis: 'auto',
            },
            formatter: function (params) {
              let res = `<p>${xdata[params.value[0]]}:</p>`;
              res += `<p style='margin-left:3px'>${yData[params.value[1]]}:${params.value[3]}</p>`;
              return res;
            }
          },
          xAxis3D: {
            type: 'category',
            name: '月份',
            data: val.data.xdata,
            splitLine: {show: false},
            nameTextStyle: {
              color: 'transparent'
            },
            axisLine: {
              lineStyle: {
                color: 'white'
              }
            },
          },
          yAxis3D: {
            type: 'category',
            data: val.data.yData,
            name: '类型',
            splitLine: {show: false},
            nameTextStyle: {
              color: 'transparent'
            },
            axisLine: {
              lineStyle: {
                color: 'white'
              }
            },
          },
          zAxis3D: {
            type: 'value',
            name: '%',
            splitLine: {show: false},
            nameTextStyle: {
              top: '3%',
              left: '5%',
              show: false,
              color: 'transparent'
            },
            axisLine: {
              lineStyle: {
                color: 'white'
              }
            },
          },
          grid3D: {
            boxWidth: 200,
            boxDepth: 80,
            light: {
              main: {
                intensity: 1.2
              },
              ambient: {
                intensity: 0.3
              }
            },
            viewControl: {
              distance: 270,
            }
          },
          series: [
            {
              type: 'bar3D',
              barWidth: 30, // 柱图宽度
              // data: this.data3dS.data3dFac(), // 这种方式点击函数打不开
              /*data的两种的请求方式*/
              data: coordinate.map(function (item) {
                return {value: [item[0], item[1], item[2], item[3]]};
              }),
              // 柱状图阴影
              shading: 'lambert',
              label: {
                // 柱状图的数值是否显示
                show: false,
                textStyle: {
                  fontSize: 16,
                  borderWidth: 1
                }
              },
              // 柱状图主子的样式
              itemStyle: {
                opacity: 0.9,
                color: function (params) {
                  return ['#D06052', '#E29F39', '#9B90D5', '#46E7E2', '#78F991'][params.value[1]];
                },
              },
              emphasis: {
                label: {
                  textStyle: {
                    fontSize: 20,
                    color: '#002140'
                  }
                },
                itemStyle: {
                  color: '#FF2600'
                }
              }
            }
          ]
        };
      }
    );
  }

  //  3D柱状图的相关点击事件
  public barClick(e): void {
    const that = this;
    this.alertBarShow = true;
    document.body.className = 'ui-overflow-hidden';
    const yType = ['经营收入', '客流量', '车流量'];
    const itemType = ['revenue', 'passenger', 'vehicle'];
    const timeType = ['', ''];
    const colorList = [
      '#356981', '#356981', '#356981', '#356981', '#356981', '#356981',
      '#356981', '#356981', '#356981', '#356981', '#356981 ', '#356981'
    ];
    colorList[e.data.value[0]] = '#D43839';
    const xAxis = e.data.value[0];
    const yAxis = e.data.value[1];
    const total = e.data.value[3];
    this.alertBarTitle = yType[yAxis];
    // 柱状图
    this.serareaService.search3DAlertBar({id: 1, types: itemType[yAxis]}).subscribe(
      (val) => {
        console.log(val);
        this.options3dBar = {
          title: [
            {
              text: `贵州省所有服务区年度${types(yAxis)}统计`,
              left: 'center',
              textStyle: {
                color: '#fff',
                fontSize: 16
              }
            },
          ],
          dataZoom: [
            {
              type: 'inside'
            }
          ],
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow'
            }
          },
          grid: {
            left: '5%',
            right: '3%',
            bottom: '10%'
          },
          xAxis: {
            type: 'category',
            data: val.data.xData,
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
          yAxis: {
            type: 'value',
            name: '数值',
            splitLine: {show: false},
            nameTextStyle: {
              align: 'left',
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
              data: val.data.coordinate,
              type: 'bar',
              label: {
                // 柱状图的数值是否显示
                show: true,
                textStyle: {
                  fontSize: 16,
                  borderWidth: 1
                }
              },
              itemStyle: {
                color: function (params) {
                  return colorList[params.dataIndex];
                },
              }
            }]
        };
      }
    );

    // 折线图
    this.serareaService.search3DAlertLineMonth({id: 1, types: timeType[yAxis]}).subscribe(
      (val) => {
        console.log(val);
        this.options3dBar = {
          title: [
            {
              text: `贵州省所有服务区年度${types(yAxis)}统计`,
              left: 'center',
              textStyle: {
                color: '#fff',
                fontSize: 16
              }
            },
          ],
          dataZoom: [
            {
              type: 'inside'
            }
          ],
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow'
            }
          },
          grid: {
            left: '5%',
            right: '3%',
            bottom: '10%'
          },
          xAxis: {
            type: 'category',
            data: val.data.xData,
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
          yAxis: {
            type: 'value',
            name: '数值',
            splitLine: {show: false},
            nameTextStyle: {
              align: 'left',
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
              data: val.data.coordinate,
              type: 'bar',
              label: {
                // 柱状图的数值是否显示
                show: true,
                textStyle: {
                  fontSize: 16,
                  borderWidth: 1
                }
              },
              itemStyle: {
                color: function (params) {
                  return colorList[params.dataIndex];
                },
              }
            }]
        };
      }
    );
    const xAxisData = ['00:00', '02:00', '04:00', '06:00', '08:00', '10:00', '12:00', '14:00', '16:00', '18:00', '20:00', '22:00'];
    const legendData = ['经营收入', '客流量', '车流量', '用水量', '用电量'];
    const title = '服务区业态数据变化';
    const serieData = [];
    const metaDate = [
      [120, 140, 100, 120, 300, 230, 130, 170, 140, 120, 300, 230],
      [200, 120, 300, 200, 170, 300, 200, 180, 200, 190, 300, 200],
      [100, 200, 140, 300, 200, 180, 100, 300, 230, 130, 100, 300],
      [152, 418, 89, 156, 200, 180, 100, 300, 230, 130, 145, 300],
      [56, 223, 140, 300, 200, 180, 283, 300, 230, 148, 100, 300]
    ];
    for (let v = 0; v < legendData.length; v++) {
      const serie = {
        name: legendData[v],
        type: 'line',
        symbol: 'circle',
        symbolSize: 10,
        data: metaDate[v]
      };
      serieData.push(serie);
    }
    const colors = ['#7C7CD4', '#36B9AB', '#6ACD72', '#0A30BF', '#027204'];
    this.options3dLine = {
      title: {
        text: title,
        x: 'center',
        textStyle: {
          color: '#fff',
          fontSize: 14
        }
      },
      legend: {
        show: true,
        left: '10%',
        data: legendData,
        y: '5%',
        itemWidth: 18,
        itemHeight: 12,
        textStyle: {color: '#fff', fontSize: 12},
      },
      color: colors,
      grid: {left: '2%', top: '12%', bottom: '5%', right: '5%', containLabel: true},
      tooltip: {trigger: 'axis', axisPointer: {type: 'shadow'}},
      xAxis: [
        {
          type: 'category',
          axisLine: {show: true, lineStyle: {color: '#6173A3'}},
          axisLabel: {interval: 'auto', textStyle: {color: '#fff', fontSize: 14}},
          axisTick: {show: false},
          data: xAxisData,
        },
      ],
      yAxis: [
        {
          axisTick: {show: false},
          splitLine: {show: false},
          axisLabel: {textStyle: {color: '#9ea7c4', fontSize: 14}},
          axisLine: {show: true, lineStyle: {color: '#6173A3'}},
        },
      ],
      series: serieData
    };

    function types(value): string {
      let typeValue = '';
      switch (value) {
        case 0:
          typeValue = yType[0];
          break;
        case 1:
          typeValue = yType[1];
          break;
        case 2:
          typeValue = yType[2];
          break;
        case 3:
          typeValue = yType[3];
          break;
        case 4:
          typeValue = yType[4];
          break;
      }
      return typeValue;
    }
  }

  public barCopyClick(e): void {
    this.alertBarShow = true;
    document.body.className = 'ui-overflow-hidden';
    const yType = ['用电量', '用水量'];
    const itemType = ['electric', 'water'];
    const timeType = ['', ''];
    const colorList = [
      '#356981', '#356981', '#356981', '#356981', '#356981', '#356981',
      '#356981', '#356981', '#356981', '#356981', '#356981 ', '#356981'
    ];
    colorList[e.data.value[0]] = '#D43839';
    const xAxis = e.data.value[0];
    const yAxis = e.data.value[1];
    const total = e.data.value[3];
    this.alertBarTitle = yType[yAxis];
    // 柱状图
    this.serareaService.search3DAlertBar({id: 2, types: itemType[yAxis]}).subscribe(
      (val) => {
        console.log(val);
        this.options3dBar = {
          title: [
            {
              text: `贵州省所有服务区年度${types(yAxis)}统计`,
              left: 'center',
              textStyle: {
                color: '#fff',
                fontSize: 16
              }
            },
          ],
          dataZoom: [
            {
              type: 'inside'
            }
          ],
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow'
            }
          },
          grid: {
            left: '5%',
            right: '3%',
            bottom: '10%'
          },
          xAxis: {
            type: 'category',
            data: val.data.xData,
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
          yAxis: {
            type: 'value',
            name: '数值',
            splitLine: {show: false},
            nameTextStyle: {
              align: 'left',
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
              data: val.data.coordinate,
              type: 'bar',
              label: {
                // 柱状图的数值是否显示
                show: true,
                textStyle: {
                  fontSize: 16,
                  borderWidth: 1
                }
              },
              itemStyle: {
                color: function (params) {
                  return colorList[params.dataIndex];
                },
              }
            }]
        };
      }
    );
    // 折线图
    this.serareaService.search3DAlertLineMonth({id: 1, types: timeType[yAxis]}).subscribe(
      (val) => {
        console.log(val);
        this.options3dBar = {
          title: [
            {
              text: `贵州省所有服务区年度${types(yAxis)}统计`,
              left: 'center',
              textStyle: {
                color: '#fff',
                fontSize: 16
              }
            },
          ],
          dataZoom: [
            {
              type: 'inside'
            }
          ],
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow'
            }
          },
          grid: {
            left: '5%',
            right: '3%',
            bottom: '10%'
          },
          xAxis: {
            type: 'category',
            data: val.data.xData,
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
          yAxis: {
            type: 'value',
            name: '数值',
            splitLine: {show: false},
            nameTextStyle: {
              align: 'left',
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
              data: val.data.coordinate,
              type: 'bar',
              label: {
                // 柱状图的数值是否显示
                show: true,
                textStyle: {
                  fontSize: 16,
                  borderWidth: 1
                }
              },
              itemStyle: {
                color: function (params) {
                  return colorList[params.dataIndex];
                },
              }
            }]
        };
      }
    );
    const xAxisData = ['00:00', '02:00', '04:00', '06:00', '08:00', '10:00', '12:00', '14:00', '16:00', '18:00', '20:00', '22:00'];
    const legendData = ['经营收入', '客流量', '车流量', '用水量', '用电量'];
    const title = '服务区业态数据变化';
    const serieData = [];
    const metaDate = [
      [120, 140, 100, 120, 300, 230, 130, 170, 140, 120, 300, 230],
      [200, 120, 300, 200, 170, 300, 200, 180, 200, 190, 300, 200],
      [100, 200, 140, 300, 200, 180, 100, 300, 230, 130, 100, 300],
      [152, 418, 89, 156, 200, 180, 100, 300, 230, 130, 145, 300],
      [56, 223, 140, 300, 200, 180, 283, 300, 230, 148, 100, 300]
    ];
    for (let v = 0; v < legendData.length; v++) {
      const serie = {
        name: legendData[v],
        type: 'line',
        symbol: 'circle',
        symbolSize: 10,
        data: metaDate[v]
      };
      serieData.push(serie);
    }
    const colors = ['#7C7CD4', '#36B9AB', '#6ACD72', '#0A30BF', '#027204'];
    this.options3dLine = {
      title: {
        text: title,
        x: 'center',
        textStyle: {
          color: '#fff',
          fontSize: 14
        }
      },
      legend: {
        show: true,
        left: '10%',
        data: legendData,
        y: '5%',
        itemWidth: 18,
        itemHeight: 12,
        textStyle: {color: '#fff', fontSize: 12},
      },
      color: colors,
      grid: {left: '2%', top: '12%', bottom: '5%', right: '5%', containLabel: true},
      tooltip: {trigger: 'axis', axisPointer: {type: 'shadow'}},
      xAxis: [
        {
          type: 'category',
          axisLine: {show: true, lineStyle: {color: '#6173A3'}},
          axisLabel: {interval: 'auto', textStyle: {color: '#fff', fontSize: 14}},
          axisTick: {show: false},
          data: xAxisData,
        },
      ],
      yAxis: [
        {
          axisTick: {show: false},
          splitLine: {show: false},
          axisLabel: {textStyle: {color: '#9ea7c4', fontSize: 14}},
          axisLine: {show: true, lineStyle: {color: '#6173A3'}},
        },
      ],
      series: serieData
    };

    function types(value): string {
      let typeValue = '';
      switch (value) {
        case 0:
          typeValue = yType[0];
          break;
        case 1:
          typeValue = yType[1];
          break;
        case 2:
          typeValue = yType[2];
          break;
        case 3:
          typeValue = yType[3];
          break;
        case 4:
          typeValue = yType[4];
          break;
      }
      return typeValue;
    }
  }

  public closeBarShow() {
    this.alertBarShow = false;
    document.body.className = '';
  }

  // 3D柱状图弹窗操作
  public options3dBarInit(ec) {
    this.options3dBarInstance = ec;
  }

  public options3dBarClick(e) {
    this.colorList = [
      '#356981', '#356981', '#356981', '#356981', '#356981', '#356981',
      '#356981', '#356981', '#356981', '#356981', '#356981 ', '#356981'
    ];
    this.colorList[e.dataIndex] = '#D43839';
    this.options3dBarInstance.setOption(this.options3dBar);
    /* this.arryPie = [];
     this.dataService.getrandomPie(9, 900, 50).map((val, index) => {
       this.arryPie.push({value: val, name: this.business[index]});
     });
     this.options3dPie = {
       title: {
         text: `${this.serviceZoneTitle}年度${e.name}类型占比统计`,
         x: 'center',
         textStyle: {
           color: '#fff',
           fontSize: 16
         }
       },
       tooltip: {
         trigger: 'item',
         formatter: '{b} : {d}%'
       },
       /!*legend: {
         orient: 'vertical',
         left: 'left',
         data: ['贵阳市', '遵义市', '六盘水市', '安顺市', '毕节市', '铜仁市', '黔东南苗族侗族自治州', '黔南布依族苗族自治州','黔西南布依族苗族自治州'],
         textStyle: {
           color: 'white'
         }
       },*!/
       series: [
         {
           name: `${e.name}总计：${e.value}`,
           type: 'pie',
           radius: '60%',
           center: ['50%', '50%'],
           data: this.arryPie,
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
     };*/
  }

  // 表格导出
  public bar3dExportClick() {
    const startTime = this.datePipe.transform(this.startTime3d, 'yyyyMMdd');
    const endTime = this.datePipe.transform(this.endTime3d, 'yyyyMMdd');
    if (this.startTime3d && this.endTime3d) {
      window.location.assign(`http://120.78.137.182:8888/highway-interactive/report/serviceArea/3d/1/startDate/${startTime}/endDate/${endTime}`);
    } else {
      window.alert('请把数据选择全在提交');
    }
  }

  public open3dBarExcel() {
    this.bar3dExcelShow = true;
  }

  // 选择时间
  public selsectDateClick(param): void {
    console.log(param.onFocus);
  }

  public close3dBarExcel() {
    this.bar3dExcelShow = false;
  }

  // 实时车流监控
  public vehicleAmountCount(): void {
    this.serareaService.searchCarTotal({id: 1}).subscribe(
      (value) => {
        console.log(value);
        if (value.data) {
          this.vehicleAmount = value.data.toString().split('');
        }
      }
    );
  }

  // 车辆类型占比图表配置
  public CarTypes() {
    this.serareaService.searchCarTotalPie({id: 1}).subscribe(
      (value) => {
        console.log(value);
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
    this.alertCarShow = true;
    document.body.className = 'ui-overflow-hidden';
    this.arryCarPie = [];
    this.dataService.getrandomPie(9, 900, 50).map((val, index) => {
      this.arryCarPie.push({value: val, name: this.citys[index]});
    });
    this.carTableData = this.dataService.getJsonObj(8, 1000, 100, this.alertCarTitle);
  }

  public closeCarShow(): void {
    document.body.className = '';
    this.alertCarShow = false;
  }

  public carBtnClick(e): void {
    if (e.srcElement.innerText === '小车') {
      this.alertCarTitle = '小车';
      this.arryCarPie = [];
      this.carTableData = [];
      this.dataService.getrandomPie(9, 900, 50).map((val, index) => {
        this.arryCarPie.push({value: val, name: this.citys[index]});
      });
      this.carTableData = this.dataService.getJsonObj(8, 1000, 100, this.alertCarTitle);
    } else if (e.srcElement.innerText === '总数') {
      this.alertCarTitle = '总数';
      this.arryCarPie = [];
      this.carTableData = [];
      this.dataService.getrandomPie(9, 900, 50).map((val, index) => {
        this.arryCarPie.push({value: val, name: this.citys[index]});
      });
      this.carTableData = this.dataService.getJsonObj(8, 1000, 100, this.alertCarTitle);
    } else if (e.srcElement.innerText === '客车') {
      this.alertCarTitle = '客车';
      this.arryCarPie = [];
      this.carTableData = [];
      this.dataService.getrandomPie(9, 900, 50).map((val, index) => {
        this.arryCarPie.push({value: val, name: this.citys[index]});
      });
      this.carTableData = this.dataService.getJsonObj(8, 1000, 100, this.alertCarTitle);
    } else if (e.srcElement.innerText === '货车') {
      this.alertCarTitle = '货车';
      this.arryCarPie = [];
      this.carTableData = [];
      this.dataService.getrandomPie(9, 900, 50).map((val, index) => {
        this.arryCarPie.push({value: val, name: this.citys[index]});
      });
      this.carTableData = this.dataService.getJsonObj(8, 1000, 100, this.alertCarTitle);
    }
  }

  // 表格导出
  public carExportClick() {
    const startTime = this.datePipe.transform(this.carStartTime, 'yyyyMMdd');
    const endTime = this.datePipe.transform(this.carEndTime, 'yyyyMMdd');
    if (this.carStartTime && this.carEndTime) {
      window.location.assign(`http://120.78.137.182:8888/highway-interactive/report/serviceArea/vihicle/1/startDate/${startTime}/endDate/${endTime}`);
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


  /************************中部***************************/
  // 中部服务区数据展示
  public backCenterDate() {
    // 店铺数据
    this.serareaService.getServiceShopVDate().subscribe(
      (value) => {
        this.serareaService.searchServiceShopIncome().subscribe(
          (val) => {
            console.log(val);
            let s = [];
            let x = [];
            value.data.map((item, index) => {
              if (item.flag === '2') {
                this.incomeTopData = item.storeInfoList;
                this.publicTopVideoGroup = item.cameraGroupList;
              } else if (item.flag === '3') {
                this.incomeBottomData = item.storeInfoList;
                this.publicBottomVideoGroup = item.cameraGroupList;
              }
            });
            val.data.map((item, index) => {
              if (item.flag === '2') {
                s = item.storeInfoList;
              } else if (item.flag === '3') {
                x = item.storeInfoList;
              }
            });
            if (s) {
              s.map((item, index) => {
                if (s[index].id = this.incomeTopData[index].id) {
                  this.incomeTopData[index].revenue = s[index].revenue;
                }
                console.log(item);
              });
            }
            if (x) {
              x.map((item, index) => {
                if (x[index].id = this.incomeBottomData[index].id) {
                  this.incomeBottomData[index].revenue = x[index].revenue;
                }
                console.log(item);
              });
            }
          }
        );
      }
    );
  }

  // 中部服务商家操作
  public closeMerchantVideo(): void {
    document.body.className = '';
    this.videoAlertShow = false;
  }

  public videoShopListClick(e): void {
    this.videoBottomShopUrl = '';
    if (e === null || e === '' || e === undefined) {
      document.getElementById('shopWindowShop').innerHTML = `<h1 class="text-center">暂时没安装摄像头</h1>`;
    } else {
      this.videoBottomShopUrl = this.videoBottomShopUrl + `
        <div class="video-play" style="height: 66vh">
           <object type='application/x-vlc-plugin' pluginspage="http://www.videolan.org/" id='vlc' events='false' width="100%" height="96%">
              <param name='mrl' value='${e}' />
              <param name='volume' value='50' />
              <param name='autoplay' value='true' />
              <param name='loop' value='false' />
              <param name='fullscreen' value='true' />
              <param name='controls' value='true' />
            </object>
</div>
      `;
      document.getElementById('shopWindowShop').innerHTML = this.videoBottomShopUrl;
    }
  }

  public closeServiceShop(): void {
    document.body.className = '';
    this.serviceShopShow = false;
  }

  // 商家信息/视频弹窗
  public openServiceShop(item): void {
    console.log(item);
    this.videoShopList = [];
    this.serviceShopInfo = item;
    this.serviceShopShow = true;
    document.body.className = 'ui-overflow-hidden';
    // 视频监控
    if (!item.cameraList.length) {
      setTimeout(() => {
        document.getElementById('shopVideo').innerHTML = `<p class="text-center" style="font-size: 1rem">此处暂无摄像头</p>`;
      }, 100);
    } else {
      this.videoShopList = item.cameraList;
      this.videoBottomShopUrl = `
       <object type='application/x-vlc-plugin' pluginspage="http://www.videolan.org/" id='vlc' events='false' width="100%" height="100%">
              <param name='mrl' value='${this.videoShopList[0].outUrl}' />
              <param name='volume' value='50' />
              <param name='autoplay' value='true' />
              <param name='loop' value='false' />
              <param name='fullscreen' value='true' />
              <param name='controls' value='true' />
            </object>
      `;
      setTimeout(() => {
        document.getElementById('shopVideo').innerHTML = this.videoBottomShopUrl;
      }, 100);
    }
    const title = '服务区业态数据变化';
    this.serareaService.searchServiceShopLine({id: item.id, yIndex: ['revenue', 'passenger', 'vehicle']}).subscribe(
      (val) => {
        console.log(val);
        if (val.status === '200') {
          // 折线图
          // const xAxisData = ['00:00', '02:00', '04:00', '06:00', '08:00', '10:00', '12:00', '14:00', '16:00', '18:00', '20:00', '22:00'];
          const legendData = [];
          const serieData = [];
          const metaDate = [];
          val.data.yData.map((param, index) => {
            legendData.push(param.name);
            metaDate.push(param.data);
          });
          console.log(metaDate);
          for (let v = 0; v < legendData.length; v++) {
            const serie = {
              name: legendData[v],
              type: 'line',
              symbol: 'circle',
              symbolSize: 10,
              data: metaDate[v]
            };
            serieData.push(serie);
          }
          const colors = ['#7C7CD4', '#36B9AB', '#6ACD72', '#0A30BF', '#027204'];
          this.shopEchartLine = {
            title: {
              text: title,
              x: 'center',
              textStyle: {
                color: '#fff',
                fontSize: 14
              }
            },
            legend: {
              show: true,
              left: '10%',
              data: legendData,
              y: '10%',
              itemWidth: 18,
              itemHeight: 12,
              textStyle: {color: '#fff', fontSize: 12},
            },
            color: colors,
            grid: {left: '2%', top: '12%', bottom: '5%', right: '5%', containLabel: true},
            tooltip: {trigger: 'axis', axisPointer: {type: 'shadow'}},
            xAxis: [
              {
                type: 'category',
                axisLine: {show: true, lineStyle: {color: '#6173A3'}},
                axisLabel: {interval: 'auto', textStyle: {color: '#fff', fontSize: 14}},
                axisTick: {show: false},
                data: val.data.xData,
              },
            ],
            yAxis: [
              {
                axisTick: {show: false},
                splitLine: {show: false},
                axisLabel: {textStyle: {color: '#9ea7c4', fontSize: 14}},
                axisLine: {show: true, lineStyle: {color: '#6173A3'}},
              },
            ],
            series: serieData
          };
        }
      }
    );

    this.serareaService.searchServiceShopArea(item.id).subscribe(
      (val) => {
        console.log(val);
        if (val.status === '200') {
          // 面积图
          const areaMouth = val.data.xData;
          const areaData = val.data.coordinate;
          console.log(areaData);
          // const areaData = function () {
          //   const a = [];
          //   areaMouth.map(() => {
          //     a.push((Math.random() * 10 + 1) * 2000);
          //   });
          //   return a;
          // };
          this.shopEchartArea = {
            title: {
              text: title,
              x: 'center',
              textStyle: {
                color: '#fff',
                fontSize: 14
              }
            },
            grid: {left: 0, top: '12%', bottom: '5%', right: '5%', containLabel: true},
            tooltip: {trigger: 'axis', axisPointer: {type: 'shadow'}},
            xAxis: {
              type: 'category',
              boundaryGap: false,
              axisLine: {show: true, lineStyle: {color: '#6173A3'}},
              axisLabel: {interval: 'auto', textStyle: {color: '#fff', fontSize: 14}},
              axisTick: {show: false},
              data: areaMouth
            },
            yAxis: {
              type: 'value',
              axisTick: {show: false},
              splitLine: {show: false},
              axisLabel: {textStyle: {color: '#9ea7c4', fontSize: 14}},
              axisLine: {show: true, lineStyle: {color: '#6173A3'}},
            },
            series: [{
              data: areaData,
              type: 'line',
              // smooth: 0.3, // 线条的平滑程度
              symbol: 'none', // 折线上的标记点
              itemStyle: {// 折线拐点标志的样式。
                color: 'transparent'
              },
              areaStyle: { // 区域填充样式
                color: {
                  type: 'linear',
                  x: 0,
                  y: 0,
                  x2: 0,
                  y2: 1,
                  colorStops: [
                    {
                      offset: 0, color: '#1876be' // 0% 处的颜色
                    },
                    {
                      offset: 0.3, color: '#1876be' // 0% 处的颜色
                    },
                    {
                      offset: 0.6, color: '#1876be' // 0% 处的颜色
                    },
                    {
                      offset: 1, color: 'transparent' // 100% 处的颜色
                    }],
                  globalCoord: false // 缺省为 false
                }
              },
            }]
          };
        }
      }
    );
  }
  public openMerchantVideo(item): void {
    this.videoBottomShopUrl = `
        <object type='application/x-vlc-plugin' pluginspage="http://www.videolan.org/" id='vlc' events='false' width="100%" height="96%">
              <param name='mrl' value='${item.outUrl}' />
              <param name='volume' value='50' />
              <param name='autoplay' value='true' />
              <param name='loop' value='false' />
              <param name='fullscreen' value='true' />
              <param name='controls' value='true' />
            </object>
      `;
    setTimeout(() => {
      document.getElementById('shopVideo').innerHTML = this.videoBottomShopUrl;
    }, 100);
  }
  public shopExportClick() {
    const startTime = this.datePipe.transform(this.shopStartTime, 'yyyyMMdd');
    const endTime = this.datePipe.transform(this.shopEndTime, 'yyyyMMdd');
    if (this.shopStartTime && this.shopEndTime) {
      window.location.assign(`http://120.78.137.182:8888/highway-interactive/report/serviceArea/store/1/startDate/${startTime}/endDate/${endTime}`);
    } else {
      window.alert('请把数据选择全在提交');
    }
  }

  // 服务区公共视频监控
  public openPublicVideo(e) {
    this.videoShopList = e;
    let videoUrlHtml = '';
    document.body.className = 'ui-overflow-hidden';
    this.videoPublicShow = true;
    this.publicVideoTitle = e.cameraName;
    videoUrlHtml = videoUrlHtml + `

<object type='application/x-vlc-plugin' pluginspage="http://www.videolan.org/" id='vlc' events='false' width="100%" height="99%">
              <param name='mrl' value='${e.outUrl}' />
              <param name='volume' value='50' />
              <param name='autoplay' value='true' />
              <param name='loop' value='false' />
              <param name='fullscreen' value='true' />
              <param name='controls' value='true' />
            </object>
    `;
    setTimeout(() => {
      if (e.outUrl === '' || e.outUrl === null || e.outUrl === undefined) {
        document.getElementById('publicVideo').innerHTML = `<p class="text-center" style="font-size: 1rem">此商店暂无摄像头</p>`;
        return;
      }
      document.getElementById('publicVideo').innerHTML = videoUrlHtml;
    }, 100);
  }

  public closePublicVideo() {
    document.body.className = '';
    this.videoPublicShow = false;
  }

  public publicTopVideoGroupOver(videoList, i): void {
    videoList.map(() => {
      this.videoTopOpen.push(false);
    });
    this.videoTopOpen[i] = true;
    console.log(this.videoTopOpen);
    if (videoList.length === 0) {
      this.publicVideoList = [];
      this.publicVideoList.push({cameraName: '该处暂无摄像头'});
    } else {
      this.publicVideoList = videoList;
    }
  }

  public publicTopVideoGroupLeave(i): void {
    this.videoTopOpen[i] = false;
  }

  public publicTopBottomGroupOver(videoList, i): void {
    videoList.map(() => {
      this.videoBottomOpen.push(false);
    });
    this.videoBottomOpen[i] = true;
    console.log(this.videoBottomOpen);
    if (videoList.length === 0) {
      this.publicVideoList = [];
      this.publicVideoList.push({cameraName: '该处暂无摄像头'});
    } else {
      this.publicVideoList = videoList;
    }
  }

  public publicTopBottomGroupLeave(i): void {
    this.videoBottomOpen[i] = false;
  }

  // 未处理事件统计
  public eventNotPoocess(): void {
    this.serareaService.searchNotPoocessEventsList({page: 1, nums: 1000}).subscribe(
      (value) => {
        console.log(value);
        if (value.status === '200') {
          this.eventList = value.data.contents;
        }
      }
    );
  }

  // 未处理事件弹窗
  public openEventAlert(item): void {
    document.body.className = 'ui-overflow-hidden';
    this.eventAlertShow = true;
    console.log(item);
    // 未处理
    this.serareaService.searchEventsTypeList({eventCategoryCode: item.eventCategoryCode, processState: 2, page: 1, nums: 1000}).subscribe(
      (value) => {
        console.log(value);
        if (value.status === '200') {
          this.eventListNoProcess = value.data.contents;
        }
      }
    );
    // 已处理
    this.serareaService.searchEventsTypeList({eventCategoryCode: item.eventCategoryCode, processState: 1, page: 1, nums: 1000}).subscribe(
      (value) => {
        console.log(value);
        if (value.status === '200') {
          this.eventListProcess = value.data.contents;
        }
      }
    );
    // this.eventListInfoChildern = item;
  }
  public closeEventAlert() {
    document.body.className = '';
    this.eventAlertShow = false;
  }
  // 未处理事件弹窗的tab切换
  public eventAlertListCtrlw(): void {
    this.eventAlertListShow = true;
  }
  public eventAlertListCtrly(): void {
    this.eventAlertListShow = false;
  }
  public eventListInfosClick(item): void {
    console.log(item);
    this.eventListInfo = item;
  }
  // 事件上报
  public eventInfoUpClick(e): void {
    console.log(e);
    if (e.eventCategoryName !== '经营类') {
      this.waitTitle = e.eventCategoryName;
      this.serversToiletAlertShow = true;
    } else {
      this.uploadEventInfoUp.eventCategoryCode = e.categoryCode;
      this.uploadEventInfoUp.eventCategoryName = e.eventCategoryName;
      this.eventAlertInfoUpTitle = e.eventCategoryName;
      this.eventAlertInfoUp = true;
    }
  }
  public closeEventInfoUpClick(): void {
    // document.body.className = '';
    this.eventAlertInfoUp = false;
  }
  public serviceInfoUpAlertClick() {
    document.body.className = '';
    this.eventAlertInfoUp = false;
    this.uploadEventInfoUp.administrativeAreaId = 2;
    this.uploadEventInfoUp.serviceAreaId = 1;
    this.uploadEventInfoUp.reportUserId = this.localService.getObject('userDTO').id;
    this.uploadEventInfoUp.reportUserName = this.localService.getObject('userDTO').realName;
    this.serareaService.searchEventsReported(this.uploadEventInfoUp).subscribe(
      (value) => {
        console.log(value);
        if (value === '200') {
          window.alert(value.message)
        }
      }
    );
  }
  // 卫生间及停车位弹窗
  public openServersToiletAlert(e) {
    document.body.className = 'ui-overflow-hidden';
    this.waitTitle = e;
    this.serversToiletAlertShow = true;
  }
  public closeServersToiletAlert() {
    document.body.className = '';
    this.serversToiletAlertShow = false;
  }

  /************************右边***************************/
  // 服务区基本信息之信息详情
  public openServiceBasicAlert(name) {
    document.body.className = 'ui-overflow-hidden';
    this.serviceBasicAlert = true;
    this.serviceBasicAlertTitle = name;
  }

  // 遍历修改后的数据，并把它赋值给car1
  public cloneValue(c: any): any {
    const car = {};
    for (const prop in c) {
      if (c) {
        car[prop] = c[prop];
      }
    }
    return car;
  }

  // 服务区信息修改
  public modifySerAraItemClick(): void {
    this.serareaService.modifySerAraItem(
      {
        administrativeAreaId: 3,
        administrativeAreaName: '贵阳市',
        chiefName: null,
        chiefPhone: null,
        chiefUserId: 1,
        commonAttributeValues: this.alterCommonAttributeValues,
        deptId: 5,
        deptName: '久长服务区',
        downAttributeValues: {
          attributeValues: this.alterDownAttributeValues,
          destination: '遵义',
          flag: '3',
          flagName: '下行',
          id: 2,
          source: '贵阳',
        },
        id: 1,
        organizationId: 1,
        organizationName: '贵州高投服务管理有限公司',
        serviceAreaName: '久长服务区',
        upAttributeValues: {
          attributeValues: this.alterUpAttributeValues,
          destination: '贵阳',
          flag: '2',
          flagName: '上行',
          id: 1,
          source: '遵义',
        },
      }
    ).subscribe(
      (data) => {
        console.log(data);
        if (data.status === '200') {
          window.alert(data.message);
          this.alterCommonAttributeValues = [];
          this.alterUpAttributeValues = [];
          this.alterDownAttributeValues = [];
          this.serareaService.searchSerAraItem(1).subscribe(
            (value) => {
              console.log(value.data);
              this.serviceInfo = value.data;
              value.data.commonAttributeValues.map((val, index) => {
                this.alterCommonAttributeValues.push(this.cloneValue(val));
              });
              value.data.upAttributeValues.attributeValues.map((val, index) => {
                this.alterUpAttributeValues.push(this.cloneValue(val));
              });
              value.data.downAttributeValues.attributeValues.map((val, index) => {
                this.alterDownAttributeValues.push(this.cloneValue(val));
              });
              console.log(this.alterCommonAttributeValues);
            }
          );
        }
      }
    );
  }

  // 服务区基本信息之园区平面图
  public openServicesPlan() {
    document.body.className = 'ui-overflow-hidden';
    this.servicesPlan = true;
    // 百度地图
    this.servicesMap = {
      legend: {
        orient: 'vertical',
        y: 'bottom',
        x: 'right',
        data: ['pm2.5'],
        textStyle: {
          color: '#fff'
        }
      },
      bmap: {
        center: [106.70604, 26.901521],
        zoom: 20,
        roam: true,
        mapStyle: {
          'styleJson': [
            {
              'featureType': 'background',
              'elementType': 'all',
              'stylers': {
                'color': '#273440'
              }
            }
          ]
        }
      },
    };
  }
  public closeServicesPlan() {
    document.body.className = '';
    this.servicesPlan = false;
  }

  // 服务期信息修改
  public crosswiseClick(): void {
    this.alertCrosswiseShow = true;
    document.body.className = 'ui-overflow-hidden';
  }
  public closeCrosswiseShow(): void {
    document.body.className = '';
    this.alertCrosswiseShow = false;
  }

  // 实时收入监控
  public incomeAmountCount(): void {
    this.serareaService.searchIncomeTotal({id: 1}).subscribe(
      (value) => {
        // console.log(value);
        if (value.data) {
          this.incomeAmount = Math.ceil(value.data).toString().split('');
        }
      }
    );
  }
  // 收入类型占比图表配置
  public IncomeTypes() {
    this.serareaService.searchIncomeTotalPie({id: 1}).subscribe(
      (value) => {
        console.log(value);
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
    document.body.className = 'ui-overflow-hidden';
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
    this.getIncomeTotal();
  }
  public getIncomeTotal(): void {
    this.serareaService.searchIncomeTypes().subscribe(
      (value) => {
        if (value.status === '200') {
          this.storeList = value.data;
          this.serareaService.searchIncomeTypesList({page: 1, nums: 1000, types: value.data}).subscribe(
            (incomeVal) => {
              this.IncomeTableData = incomeVal.data.contents;
            }
          );
        }
      }
    );
  }
  public getIncomeTypesSingle(item, storeList): void {
    const shopType = {
      '小吃': {
        'sequence': 1,
        'entryCode': '2'
      },
      '中式快餐': {
        'sequence': 2,
        'entryCode': '3',
      },
      '西式快餐': {
        'sequence': 3,
        'entryCode': '6',
      },
      '商超': {
        'sequence': 4,
        'entryCode': '1',
      },
      '住宿': {
        'sequence': 5,
        'entryCode': '4',
      },
      '汽修': {
        'sequence': 6,
        'entryCode': '5',
      },
    };
    const shopList = storeList.filter((prop, index) => {
      console.log(prop.entryCode === shopType[item].entryCode);
      return prop.entryCode === shopType[item].entryCode;
    });
    if (shopList) {
      console.log(shopList[0].storeList);
      this.serareaService.searchIncomeTypesItem({entryCode: shopType[item].entryCode, page: 1, nums: 1000, shopList: shopList[0].storeList}).subscribe(
        (value) => {
          if (value.status === '200') {
            console.log(value.data.contents);
            this.IncomeTableData = value.data.contents;
          }
        }
      );
    }
  }
  public closeIncomeShow(): void {
    document.body.className = '';
    this.alertIncomeShow = false;
  }

  // 收入类型弹窗
  public optionsIncomePieInit(ec): void {
    // this.optionsCarPieInstance = ec;
  }
  public optionsIncomePieClick(e) {
    this.IncomeAreaName = e.name;
    this.IncomeTableData = this.dataService.getIncomeObj(8, 1000, 100, this.alertIncomeTitle);
  }
  public IncomeBtnClick(e): void {
    if (e.srcElement.innerText === '收入总数') {
      this.alertIncomeTitle = '收入总数';
      this.alertIncomeTypeShow = false;
      this.arryIncomePie = [];
      this.getIncomeTotal();
    }
    else if (e.srcElement.innerText === '小吃') {
      this.alertIncomeTitle = '小吃';
      this.alertIncomeTypeTitle = '小吃';
      this.alertIncomeTypeShow = true;
      this.arryIncomePie = [];
      this.getIncomeTypesSingle(e.srcElement.innerText, this.storeList);
    }
    else if (e.srcElement.innerText === '中式快餐') {
      this.alertIncomeTitle = '中式快餐';
      this.alertIncomeTypeTitle = '中式快餐';
      this.alertIncomeTypeShow = true;
      this.arryIncomePie = [];
      this.getIncomeTypesSingle(e.srcElement.innerText, this.storeList);
    }
    else if (e.srcElement.innerText === '西式快餐') {
      this.alertIncomeTitle = '西式快餐';
      this.alertIncomeTypeTitle = '西式快餐';
      this.alertIncomeTypeShow = true;
      this.arryIncomePie = [];
      this.getIncomeTypesSingle(e.srcElement.innerText, this.storeList);
    }
    else if (e.srcElement.innerText === '商超') {
      this.alertIncomeTitle = '商超';
      this.alertIncomeTypeTitle = '商超';
      this.alertIncomeTypeShow = true;
      this.arryIncomePie = [];
      this.getIncomeTypesSingle(e.srcElement.innerText, this.storeList);
    }
    else if (e.srcElement.innerText === '住宿') {
      this.alertIncomeTitle = '住宿';
      this.alertIncomeTypeTitle = '住宿';
      this.alertIncomeTypeShow = true;
      this.arryIncomePie = [];
      this.getIncomeTypesSingle(e.srcElement.innerText, this.storeList);
    }
    else if (e.srcElement.innerText === '汽修') {
      this.alertIncomeTitle = '汽修';
      this.alertIncomeTypeTitle = '汽修';
      this.alertIncomeTypeShow = true;
      this.arryIncomePie = [];
      this.getIncomeTypesSingle(e.srcElement.innerText, this.storeList);
    }
  }

  // 表格导出
  public incomeExportClick() {
    const startTime = this.datePipe.transform(this.incomeStartTime, 'yyyyMMdd');
    const endTime = this.datePipe.transform(this.incomeEndTime, 'yyyyMMdd');
    if (this.incomeStartTime && this.incomeEndTime) {
      window.location.assign(`http://120.78.137.182:8888/highway-interactive/report/serviceArea/vihicle/1/startDate/${startTime}/endDate/${endTime}`);
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


  /*********************************其他*****************************/
  // 返回上级路由
  public goBack(): void {
    history.back();
  }
  // 数据更新加载
  public upData() {
    //  高速服液态数据3d统计
    this.packOption3();

    // 车流监控
    /* this.vehicleAmountCountClean = setInterval(() => {
       this.vehicleAmountCount();
       this.CarTypes();
     }, 5000);*/

    // 收入监控
    /*this.incomeAmountCountClean = setInterval(() => {
      this.incomeAmountCount();
      this.IncomeTypes();
    }, 5000);*/

    // 实时客流
    /*this.personAmountCountClean = setInterval(() => {
      this.serareaService.searchPersonTotal({id: 1}).subscribe(
        (val) => {
          console.log(val);
          if (val.val.data.total) {
            // this.localService.persons.next(val.data.total.toString().split(''));
          }
        }
      );
    }, 5000);*/


    // 事件列表
    this.backCenterDate();
    this.eventNotPoocess();
    // 事件上报类型
    this.serareaService.searchEventCategory().subscribe(
      (value) => {
        console.log(value);
        if (value.status === '200') {
          this.eventInfoUpTypes = value.data;
        }
      }
    );
  }
}

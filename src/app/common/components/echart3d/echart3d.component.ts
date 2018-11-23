import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {Bar3dExportType} from '../../model/shared.model';
import {Router} from '@angular/router';
import {NgxEchartsService} from 'ngx-echarts';

@Component({
  selector: 'app-echart3d',
  templateUrl: './echart3d.component.html',
  styleUrls: ['./echart3d.component.css']
})
export class Echart3dComponent implements OnInit, OnChanges {
  // 基础数据
  // public yType = ['经营收入', '客流量', '车流量', '用电量', '用水量'];
  public elementType = {
      '#9B90D5': ['经营收入', 'revenue'],
      '#46E7E2': ['客流量', 'passenger'],
      '#78F991': ['车流量', 'vehicle'],
      '#D06052': ['用电量', 'electric'],
      '#E29F39': ['用水量', 'water'],
  };
  // public itemType = ['revenue', 'passenger', 'vehicle', 'electric', 'water'];
  // 3D柱状图配置
  @Input() public options3dData: any;
  @Input() public color: [string];
  public options3d = {};
  // 3D柱状图弹窗
  public alertBarShow = false;
  public alertBarTitle: string;
  @Output() public outOptions3d = new EventEmitter<any>();
  // @Output() public outOptions3dPie = new EventEmitter<any>();
  @Input() public options3dBarData: any;
  @Input() public options3dPieData: any;
  public options3dBar = {};
  public options3dPie = {};
  public options3dBarInstance: any;
  public options3dPieInstance: any;
  public colorList = [
    '#29AAE3', '#29AAE3', '#29AAE3', '#29AAE3', '#29AAE3', '#29AAE3',
    '#29AAE3', '#29AAE3', '#29AAE3', '#29AAE3', '#29AAE3 ', '#29AAE3'
  ];
  public bar3dExcelShow = false;
  public arryPie = [];
  public bar3dExportType: Bar3dExportType = new Bar3dExportType;
  // 时间初始化
  public esDate: any;
  public value: Date; // 时间选择器
  public date6: Date;
  constructor(
    private router: Router,
    private es: NgxEchartsService,
  ) { }

  ngOnInit() {}
  ngOnChanges(changes: SimpleChanges): void {
    if (this.options3dData) {
      this.initializationData();
    }
  }
  public initializationData(): void {
   this.options3dOption();
  }

  public options3dOption(): void {
    const that = this;
    const xdata = this.options3dData.xdata;
    const yData = this.options3dData.yData;
    const coordinate = this.options3dData.coordinate;
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
              return that.color[params.value[1]];
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
  // 3D柱状图的相关点击事件
  public barClick(e): void {
    this.alertBarShow = true;
    document.body.className = 'ui-overflow-hidden';
    const xAxis = e.data.value[0];
    const yAxis = e.data.value[1];
    const total = e.data.value[3];
    const colorList = [
      '#356981', '#356981', '#356981', '#356981', '#356981', '#356981',
      '#356981', '#356981', '#356981', '#356981', '#356981 ', '#356981'
    ];
    colorList[e.data.value[0]] = '#D43839';
    this.alertBarTitle = this.elementType[e.color][0];
    this.outOptions3d.emit({
      bar: {types: this.elementType[e.color][1]},
      pie: {
        xType: xAxis,
        types: this.elementType[e.color][1]
      }
    });
    console.log(e);

   /* // 柱状图
    this.options3dBar = {
      title: [
        {
          text: `贵州省所有服务区年度${this.types(yAxis)}统计`,
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
        data: this.options3dBarData.xData,
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
          data: this.options3dBarData.coordinate,
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
    // 类型占比扇形图
    this.options3dPie = {
      title: {
        text: `贵州省各市所有服务区年度${this.types(yAxis)}类型占比统计`,
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
          name: `${this.types(yAxis)}总计：${total}`,
          type: 'pie',
          radius: '60%',
          center: ['50%', '50%'],
          data: this.options3dPieData,
          itemStyle: {
            color: function (params) {
              return ['#CE2D79', '#BDD139', '#78E77D', '#09D4D6', '#3C75B9',
                '#6769B1', '#FF8C9D', '#2796C4', '#E57D0D'][params.dataIndex];
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
  public closeBarShow() {
    document.body.className = '';
    this.alertBarShow = false;
  }
  // 3D柱状图弹窗操作
  public options3dBarInit(ec) {
    this.options3dBarInstance = ec;
  }
  public options3dPieInit(ec) {
    this.options3dPieInstance = ec;
  }
 /* public options3dBarClick(e) {
    this.colorList = [
      '#356981', '#356981', '#356981', '#356981', '#356981', '#356981',
      '#356981', '#356981', '#356981', '#356981', '#356981 ', '#356981'
    ];
    this.colorList[e.dataIndex] = '#D43839';
    this.options3dBarInstance.setOption(this.options3dBar);
    this.arryPie = [];
    this.outOptions3dCopy.emit({id: 2, xType: e.xAxis, types: this.itemType[e.yAxis]});
  }*/
  public options3dPieClick(e): void {
    if (e.name === '贵阳市') {
      this.router.navigate(['/home/city', {name: e.name}]);
    } else {
      window.alert (`很抱歉，${e.name}暂无数据`);
    }
  }
}

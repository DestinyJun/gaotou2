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
  public elementType = {
      '#9B90D5': ['经营收入', 'revenue'],
      '#46E7E2': ['客流量', 'passenger'],
      '#78F991': ['车流量', 'vehicle'],
      '#D06052': ['用电量', 'electric'],
      '#E29F39': ['用水量', 'water'],
  };
  // 3D柱状图配置
  @Input() public options3dData: any;
  @Input() public color: [string];
  @Output() public outOptions3d = new EventEmitter<any>();
  public options3d = {};
  constructor() { }

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
    const xAxis = e.data.value[0];
    const colorList = [
      '#356981', '#356981', '#356981', '#356981', '#356981', '#356981',
      '#356981', '#356981', '#356981', '#356981', '#356981 ', '#356981'
    ];
    colorList[e.data.value[0]] = '#D43839';
    this.outOptions3d.emit({
      bar: {types: this.elementType[e.color][1]},
      pie: {
        xType: xAxis,
        types: this.elementType[e.color][1]
      },
      alertBarTitle: this.elementType[e.color][0],
      total: e.data.value[3],
    });
  }



}

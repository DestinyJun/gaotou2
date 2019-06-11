import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-echarts-bar-double',
  templateUrl: './echarts-bar-double.component.html',
  styleUrls: ['./echarts-bar-double.component.less']
})
export class EchartsBarDoubleComponent implements OnInit {
  public barDouble: any = {};
  @Input() title = '速公路/客流统计';
  constructor() {
  }

  ngOnInit() {
    this.barDouble = {
      title: {
        text: this.title,
        textStyle: {
          color: '#ffffff',
          fontSize: 14
        },
        left: 'center'
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow',
        },
        position: 'top'
      },
      legend: {
        data: [
          {
            name: '收入',
            icon: 'circle',
            textStyle: {
              color: '#ffffff'
            }
          },
          {
            name: '客流',
            icon: 'circle',
            textStyle: {
              color: '#ffffff'
            }
          }
        ],
        top: '6%',
        textStyle: {
          color: '#fff'
        }
      },
      xAxis: [
        {
          type: 'category',
          data: ['一月', '二月', '三月', '四月', '五月', '六月'],
          axisPointer: {
            type: 'shadow'
          },
          axisLabel: {
            show: true,
            textStyle: {
              color: '#ffffff'
            }
          },
          axisLine: {
            show: true,
            lineStyle: {
              color: '#ffffff'
            }
          },
        }
      ],
      yAxis: [
        {
          type: 'value',
          name: '收入（万元）',
          nameTextStyle: {
            padding: [0, 0, 0, 30],
            color: '#ffffff'
          },
          min: 0,
          interval: 10,
          axisLabel: {
            show: true,
            textStyle: {
              color: '#ffffff'
            }
          },
          axisLine: {
            show: true,
            lineStyle: {
              color: '#ffffff'
            }
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: 'rgba(255,255,255,0.3)'
            }
          }
        },
        {
          type: 'value',
          name: '客流（人次）',
          nameTextStyle: {
            padding: [0, 30, 0, 0],
            color: '#ffffff'
          },
          show: true,
          axisLabel: {
            show: true,
            textStyle: {
              color: '#ffffff'
            }
          },
          axisLine: {
            show: true,
            lineStyle: {
              color: '#ffffff'
            }
          },
          splitLine: {
            show: false,
            lineStyle: {
              color: '#ffffff'
            }
          }
        }
      ],
      grid: {
        left: '6%',
        top: '15%',
        right: '6%',
        bottom: '9%',
      },
      series: [
        {
          name: '收入',
          type: 'bar',
          data: [4, 6, 36, 6, 8, 6],
          barWidth: 'auto',
          itemStyle: {
            normal: {
              color: {
                'type': 'linear',
                'x': 0,
                'y': 0,
                'x2': 0,
                'y2': 1,
                'colorStops': [
                  {
                    'offset': 0,
                    'color': 'rgba(255,37,117,0.7)'
                  },
                  {
                    'offset': 0.5,
                    'color': 'rgba(0,133,245,0.7)'
                  },
                  {
                    'offset': 1,
                    'color': 'rgba(0,133,245,0.3)'
                  }
                ],
                'globalCoord': false
              }
            }
          }
        },
        {
          'name': '客流',
          'type': 'bar',
          'yAxisIndex': 1,
          'data': [
            4,
            2,
            36,
            6,
            8,
            6
          ],
          'barWidth': 'auto',
          'itemStyle': {
            'normal': {
              'color': {
                'type': 'linear',
                'x': 0,
                'y': 0,
                'x2': 0,
                'y2': 1,
                'colorStops': [
                  {
                    'offset': 0,
                    'color': 'rgba(255,37,117,0.7)'
                  },
                  {
                    'offset': 0.5,
                    'color': 'rgba(0,255,252,0.7)'
                  },
                  {
                    'offset': 1,
                    'color': 'rgba(0,255,252,0.3)'
                  }
                ],
                'globalCoord': false
              }
            }
          },
          'barGap': '0'
        },
      ]
    };
  }

}

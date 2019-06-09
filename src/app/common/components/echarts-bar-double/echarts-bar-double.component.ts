import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-echarts-bar-double',
  templateUrl: './echarts-bar-double.component.html',
  styleUrls: ['./echarts-bar-double.component.less']
})
export class EchartsBarDoubleComponent implements OnInit {
  public barDouble: any = {};

  constructor() {
  }

  ngOnInit() {
    this.barDouble = {
      title: {
        text: '全省高速公路/客流统计',
        textStyle: {
          color: '#ffffff',
          fontSize: 14
        },
        left: 'center'
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
          crossStyle: {
            color: '#384757'
          }
        }
      },
      legend: {
        data: [
          {
            name: '待处理',
            icon: 'circle',
            textStyle: {
              color: '#7d838b'
            }
          },
          {
            name: '已处理',
            icon: 'circle',
            textStyle: {
              color: '#7d838b'
            }
          },
          {
            name: '完成率',
            icon: 'circle',
            textStyle: {
              color: '#7d838b'
            }
          }
        ],
        top: '10%',
        textStyle: {
          color: '#fff'
        }
      },
      xAxis: [
        {
          'type': 'category',
          'data': [
            '1街',
            '2街',
            '3街',
            '4街',
            '5街',
            '6街'
          ],
          'axisPointer': {
            'type': 'shadow'
          },
          'axisLabel': {
            'show': true,
            'textStyle': {
              'color': '#7d838b'
            }
          }
        }
      ],
      yAxis: [
        {
          'type': 'value',
          'name': '不文明现象',
          'nameTextStyle': {
            'color': '#7d838b'
          },
          'min': 0,
          'max': 50,
          'interval': 10,
          'axisLabel': {
            'show': true,
            'textStyle': {
              'color': '#7d838b'
            }
          },
          'axisLine': {
            'show': true
          },
          'splitLine': {
            'lineStyle': {
              'color': '#7d838b'
            }
          }
        },
        {
          'type': 'value',
          'name': '完成率',
          'show': true,
          'axisLabel': {
            'show': true,
            'textStyle': {
              'color': '#7d838b'
            }
          }
        }
      ],
      grid: {
        left: '6%',
        top: '10%',
        right: '6%',
        bottom: '30%',
      },
      series: [
        {
          'name': '待处理',
          'type': 'bar',
          'data': [
            4,
            6,
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
          'name': '已处理',
          'type': 'bar',
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
        {
          'name': '完成率',
          'type': 'line',
          'yAxisIndex': 1,
          'data': [
            100,
            33,
            100,
            100,
            100,
            100
          ],
          'itemStyle': {
            'normal': {
              'color': '#ffaa00'
            }
          },
          'smooth': true
        }
      ]
    };
  }

}

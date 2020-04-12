import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';

@Component({
  selector: 'app-echarts-area-chart',
  templateUrl: './echarts-area-chart.component.html',
  styleUrls: ['./echarts-area-chart.component.less']
})
export class EchartsAreaChartComponent implements OnInit, OnChanges {
  @Input() public option: any;
  @Input() public height: any;
  @Input() public width = 'auto';
  @Input() public title: any;
  @Input() public color: any;
  public areaChart = {};

  constructor() {
  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.option) {
      this.areaChartFun();
    }
  }

  // 统计图渲染
  public areaChartFun() {
    this.areaChart = {
      title: {
        text: this.title,
        left: 'center',
        top: '2%',
        textStyle: {
          color: '#fff',
          fontSize: 14
        }
      },
      grid: {
        top: '13%',
        left: '3%',
        right: '1%',
        bottom: '25%',
        containLabel: true,
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: this.option.xDate,
        axisLabel: {
          margin: 30,
          color: '#01FFFF'
        },
        axisTick: {
          show: true,
          length: 25,
          lineStyle: {
            color: 'rgba(255,255,255,0.1)'
          }
        },
        axisLine: {
          show: false
        },
        splitLine: {
          show: true,
          lineStyle: {
            color: 'rgba(255,255,255,0.1)'
          }
        }
      },
      yAxis: [
        {
          type: 'value',
          position: 'right',
          axisLabel: {
            margin: 20,
            color: '#01FFFF'
          },
          axisTick: {
            show: true,
            length: 15,
            lineStyle: {
              color: 'rgba(255,255,255,0.1)'
            }
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: 'rgba(255,255,255,0.1)'
            }
          },
          axisLine: {
            lineStyle: {
              color: '#fff',
              width: 2
            }
          }
        }
      ],
      animation: true,
      animationDuration: 3000,
      animationDurationUpdate: 3000,
      animationThreshold: 50000,
      series: [
        {
          name: '注册总量',
          type: 'line',
          smooth: true, // 是否平滑曲线显示
          showAllSymbol: true,
          symbol: 'circle',
          symbolSize: 6,
          lineStyle: {
            normal: {
              color: '#fff', // 线条颜色
            },
          },
          label: {
            show: true,
            position: 'top',
            textStyle: {
              color: '#fff',
            }
          },
          itemStyle: {
            color: 'red',
            borderColor: '#fff',
            borderWidth: 3
          },
          tooltip: {
            show: false
          },
          areaStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 0,
                color: this.color
              },
                {
                  offset: 1,
                  color: '#5F6679'
                }
              ], false),
            }
          },
          data: this.option.yDate,
        }
      ]
    };
  }
}

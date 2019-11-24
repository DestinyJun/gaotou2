import {Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';

@Component({
  selector: 'app-echarts-area-chart',
  templateUrl: './echarts-area-chart.component.html',
  styleUrls: ['./echarts-area-chart.component.less']
})
export class EchartsAreaChartComponent implements OnInit, OnChanges, OnDestroy {
  @Input() public option: any;
  @Input() public height: any;
  @Input() public width = 'auto';
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
    const serData = [];
    this.option.data.coordinate.map((val) => {
      serData.push(val[3]);
    });
    this.areaChart = {
      title: {
        text: `${this.option.title}年度${this.option.data.yData[0]}走势统计`,
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
        data: this.option.data.xdata,
        axisLabel: {
          margin: 30,
          color: '#01FFFF'
        },
        axisLine: {
          show: false
        },
        axisTick: {
          show: true,
          length: 25,
          lineStyle: {
            color: '#ffffff1f'
          }
        },
        splitLine: {
          show: true,
          lineStyle: {
            color: '#ffffff1f'
          }
        }
      },
      yAxis: [{
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
            color: '#ffffff1f',
          }
        },
        splitLine: {
          show: true,
          lineStyle: {
            color: '#ffffff1f'
          }
        },
        axisLine: {
          lineStyle: {
            color: '#fff',
            width: 2
          }
        }
      }],
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
                color: this.option.color
              },
                {
                  offset: 1,
                  color: '#3fbbff0d'
                }
              ], false),
            }
          },
          data: serData,
        }
      ]
    };
  }

  // 统计图点击事件
  public areaChartClick(e) {
  }

  ngOnDestroy(): void {
  }
}

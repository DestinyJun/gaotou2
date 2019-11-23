import {Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges} from '@angular/core';
import * as echarts from 'echarts';

@Component({
  selector: 'app-echarts-ring-pie',
  templateUrl: './echarts-ring-pie.component.html',
  styleUrls: ['./echarts-ring-pie.component.less']
})
export class EchartsRingPieComponent implements OnInit, OnChanges, OnDestroy {
  @Input() public option: any;
  @Input() public height: any;
  @Output() public pieClick = new EventEmitter<any>();
  public selectIndex: number;
  public optionsRing = {};
  public updateOptionsRose = {};
  public myChart: any;
  public nameList = [];
  public timer: any;
  public outTimer: any;

  constructor() {
  }

  ngOnInit() {
    this.selectIndex = 1;
    this.optionsRing = {
      series: [
        {
          type: 'pie',
          startAngle: 160,
          radius: [60, 70],
          center: ['center', 'center'],
          roseType: 'radius',
          color: ['#0098ec', '#01ffff', '#00c800', '#fcc000', '#c451ea', '#ff5252'],
          label: {
            formatter: (params) => {
              return params.name + params.percent + '% ';
            },
          },
          labelLine: {
            show: true,
          },
          data: []
        },
        {
          type: 'pie',
          z: 10,
          startAngle: 160,
          radius: [60, 70],
          silent: true,
          avoidLabelOverlap: false,
          center: ['center', 'center'],
          roseType: 'radius',
          color: ['#0098ec', '#01ffff', '#00c800', '#fcc000', '#c451ea', '#ff5252'],
          label: {
            show: false,
            position: 'center',
            color: '#EBE806',
            formatter: (params) => {
              return '{top|' + params.percent + '%}' + '\n' + '{bottom| ' + params.data.name + '}';

            },
            rich: {
              top: {
                color: '#EBE806',
                fontSize: 18,
                fontWeight: 400,
                fontFamily: 'PingFangSC'
              },
              bottom: {
                color: '#EBE806',
                fontSize: 18,
                fontWeight: 400,
                fontFamily: 'PingFangSC',
                padding: [0, 0, 10, 0]
              }
            }
          },
          emphasis: {
            label: {
              show: true
            },
            itemStyle: {}
          },
          data: []
        }
      ]
    };
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.option) {
      this.optionsPie(this.option);
    }
  }

  public optionsPie(option): void {
    const colors = ['#0098ec', '#01ffff', '#00c800', '#fcc000', '#c451ea', '#ff5252'];
    const lineDate = [];
    const barData = [];
    this.nameList = [];
    option.data.map((val, index) => {
      this.nameList.push(val.name);
      lineDate.push({
        name: val.name,
        value: val.value,
        labelLine: {
          lineStyle: {
            color: colors[index]
          }
        },
        itemStyle: {}
      });
      barData.push({
          value: val.value,
          name: val.name,
          labelLine: {
            lineStyle: {
              color: colors[index]
            }
          },
          itemStyle: {}
        });
    });
    this.updateOptionsRose = {
      series: [
        {
          data: barData
        }
      ]
    };
    this.optionsRing = {
      series: [
        {
          type: 'pie',
          startAngle: 160,
          radius: [60, 70],
          center: ['center', 'center'],
          silent: true,
          avoidLabelOverlap: false,
          roseType: 'radius',
          color: ['#0098ec', '#01ffff', '#00c800', '#fcc000', '#c451ea', '#ff5252'],
          label: {
            formatter: (params) => {
              return params.name + params.percent + '% ';
            },
          },
          labelLine: {
            show: true,
          },
          data: lineDate
        },
        {
          type: 'pie',
          z: 10,
          startAngle: 160,
          radius: [60, 70],
          silent: true,
          avoidLabelOverlap: false,
          center: ['center', 'center'],
          roseType: 'radius',
          color: ['#0098ec', '#01ffff', '#00c800', '#fcc000', '#c451ea', '#ff5252'],
          label: {
            show: false,
            position: 'center',
            color: '#EBE806',
            formatter: (params) => {
              return '{top|' + params.percent + '%}' + '\n' + '{bottom| ' + params.data.name + '}';

            },
            rich: {
              top: {
                color: '#EBE806',
                fontSize: 18,
                fontWeight: 400,
                fontFamily: 'PingFangSC'
              },
              bottom: {
                color: '#EBE806',
                fontSize: 18,
                fontWeight: 400,
                fontFamily: 'PingFangSC',
                padding: [0, 0, 10, 0]
              }
            }
          },
          emphasis: {
            label: {
              show: true
            },
            itemStyle: {}
          },
          data: barData
        }
      ]
    };
    this.outTimer = setTimeout(() => {
      this.startSelectAnimate(this.myChart, this.nameList[this.selectIndex], this.nameList);
    }, 300);
  }

  // 图形加载完毕后得到echarts对象
  public optionsRingPieInit(myChart: echarts.ECharts) {
    if (myChart) {
      this.myChart = myChart;
    }
  }

  // 图形点击数事件数据发射
  public optionsRingPieClick(e): void {
    this.pieClick.emit(e);
  }

  // 开启动画效果
  public startSelectAnimate(myChart, firstSelectName, names) {
    myChart.dispatchAction({
      type: 'highlight',
      name: firstSelectName
    });
    clearInterval(this.timer);
    this.timer = setInterval(() => {
      myChart.dispatchAction({
        type: 'downplay',
        seriesIndex: 1,
      });
      myChart.dispatchAction({
        type: 'highlight',
        name: names[this.selectIndex]
      });
      this.selectIndex++;
      if (this.selectIndex >= names.length) {
        this.selectIndex = 0;
      }
    }, 3000);
  }

  ngOnDestroy(): void {
    clearInterval(this.timer);
    clearInterval(this.outTimer);
  }

}

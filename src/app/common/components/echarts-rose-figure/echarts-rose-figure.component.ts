import {Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges} from '@angular/core';
import * as echarts from 'echarts';

@Component({
  selector: 'app-echarts-rose-figure',
  templateUrl: './echarts-rose-figure.component.html',
  styleUrls: ['./echarts-rose-figure.component.less']
})
export class EchartsRoseFigureComponent implements OnInit, OnChanges, OnDestroy {
  @Input() public option: any;
  @Input() public height: any;
  @Output() public pieClick = new EventEmitter<any>();
  public selectIndex: number;
  public optionsRose = {};
  public updateOptionsRose = {};
  public myChart: any;
  public nameList = [];
  public colors = ['#0098ec', '#01ffff', '#00c800', '#fcc000', '#c451ea', '#ff5252'];
  public timer: any;
  public outTimer: any;

  constructor() {
  }

  ngOnInit() {
    this.selectIndex = 1;
    this.optionsRose = {
      series: [
        {
          name: '访问来源',
          type: 'pie',
          radius: ['60', '80'],
          color: this.colors,
          silent: true,
          avoidLabelOverlap: false,
          label: {
            normal: {
              show: false,
              position: 'center',
              formatter: (params) => {
                return '{top| ' + params.percent + '%}\n' + '{bottom| ' + params.name + '}';
              },
              rich: {
                top: {
                  fontSize: 18,
                  color: '#EBE806',
                  fontWeight: 400,
                  fontFamily: 'PingFangSC'
                },
                bottom: {
                  fontSize: 18,
                  color: '#EBE806',
                  padding: [0, 0, 12, 0],
                  fontWeight: 400,
                  fontFamily: 'PingFangSC'
                }
              }
            }
          },
          emphasis: {
            label: {
              show: true
            }
          },
          labelLine: {
            normal: {
              show: false
            }
          },
          data: []
        }
      ]
    };
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.option) {
      this.optionsPie(this.option);
      // console.log(this.option);
    }
  }

  public optionsPie(option): void {
    const barData = [];
    this.nameList = [];
    option.map((val) => {
      this.nameList.push(val.vehicleTypeName);
      barData.push({
          value: val.totalVehicle,
          name: val.vehicleTypeName,
        });
    });
    this.updateOptionsRose = {
      series: [
        {
          data: barData
        }
      ]
    };
    this.optionsRose = {
      series: [
        {
          type: 'pie',
          radius: [60, 80],
          center: ['center', 'center'],
          color: this.colors,
          silent: true,
          avoidLabelOverlap: false,
          label: {
            normal: {
              show: false,
              position: 'center',
              formatter: (params) => {
                return '{top| ' + params.percent + '%}\n' + '{bottom| ' + params.name + '}';
              },
              rich: {
                top: {
                  fontSize: 18,
                  color: '#EBE806',
                  fontWeight: 400,
                  fontFamily: 'PingFangSC'
                },
                bottom: {
                  fontSize: 18,
                  color: '#EBE806',
                  padding: [0, 0, 12, 0],
                  fontWeight: 400,
                  fontFamily: 'PingFangSC'
                }
              }
            }
          },
          emphasis: {
            label: {
              show: true
            }
          },
          labelLine: {
            normal: {
              show: false
            }
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
  public optionsRosePieInit(myChart: echarts.ECharts) {
    if (myChart) {
      this.myChart = myChart;
    }
  }

  // 图形点击数事件数据发射
  public optionsRosePieClick(e): void {
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
         seriesIndex: 0,
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

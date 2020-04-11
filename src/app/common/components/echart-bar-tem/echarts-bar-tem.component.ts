import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';

@Component({
  selector: 'app-echarts-bar-tem',
  templateUrl: './echarts-bar-tem.component.html',
  styleUrls: ['./echarts-bar-tem.component.less']
})
export class EchartsBarTemComponent implements OnInit, OnChanges {
  @Input() option: any;
  public barTemOption: any = {};

  constructor() {
  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.option) {
      this.chartInit();
    }
  }

  public chartInit() {
    const myColor = ['#eb2100', '#eb3600', '#d0570e', '#d0a00e', '#34da62', '#00e9db', '#00c0e9', '#0096f3', '#33CCFF', '#33FFCC'];
    // const area = ['贵州', '云南', '四川', '重庆', '青海', '陕西', '宁夏', '江西', '安徽', '河南'];
    const area = [];
    const data = [];
    const data1 = [];
    const data2 = [];
    const data3 = [];
    const data4 = [];
    this.option.sort(function (a, b) {
      if (a.value < b.value) {
        return -1;
      } else if (a.value === b.value) {
        return 0;
      } else {
        return 1;
      }
    });
    for (let i = 0; i < 8; i++) {
      area.push(this.option[i].provinceName);
      data.push(this.option[i].number);
    }
    data.map((val, index) => {
      data1.push(data[0] - 1);
      data2.push(data[0]);
      data3.push(0);
      data4.push(index);
    });
    this.barTemOption = {
      /*title: {
        text: '全国省级收入排名TOP-10',
        textStyle: {
          color: '#ffffff',
          fontSize: 14
        },
        left: 'center'
      },*/
      grid: {
        left: '8%',
        top: '6%',
        right: '15%',
        bottom: '0',
        containLabel: true
      },
      animation: true,
      animationDuration: 3000,
      animationDurationUpdate: 3000,
      animationThreshold: 50000,
      xAxis: [
        {show: false}
      ],
      yAxis: [
        // 区域
        {
          axisTick: 'none',
          axisLine: 'none',
          offset: '27',
          axisLabel: {
            show: true,
            width: '36px',
            formatter: function (params) {
              let str = params.toString();
              const maxlength = 4;
              if (str.length > maxlength) {
                str = str.substring(0, maxlength - 1);
                if (str === '黔南布') {
                  str = '黔南州';
                }
                return str;
              } else {
                return str;
              }
            },
            textStyle: {
              color: '#ffffff',
              fontSize: '12',
            }
          },
          data: area.reverse()
        },
        // 排名
        {
          axisTick: 'none',
          axisLine: 'none',
          axisLabel: {
            show: false,
            textStyle: {
              color: '#ffffff',
              fontSize: '12',
            }
          },
          data: data4
        },
        // 收入
        {
          name: '收入TOP 10',
          nameGap: '50',
          nameTextStyle: {
            color: '#ffffff',
            fontSize: '12',
          },
          axisLine: {
            lineStyle: {
              color: 'rgba(0,0,0,0)'
            }
          },
          data: [],
        }
      ],
      series: [
        {
          name: '色条',
          type: 'bar',
          yAxisIndex: 0,
          data: data.reverse(),
          label: {
            normal: {
              show: true,
              position: 'right',
              textStyle: {
                color: '#ffffff',
                fontSize: '12',
              },
              formatter: function (param) {
                return param.value + '(人次)';
              }
            }
          },
          barWidth: 6,
          itemStyle: {
            normal: {
              color: function (params) {
                const num = myColor.length;
                return myColor[params.dataIndex % num];
              },
            }
          },
          z: 2
        },
        {
          name: '填充条',
          type: 'bar',
          yAxisIndex: 1,
          barGap: '-100%',
          data: data1,
          barWidth: 12,
          itemStyle: {
            normal: {
              color: '#0e2147',
              barBorderRadius: 5,
            }
          },
          z: 1
        },
        {
          name: '染色框',
          type: 'bar',
          yAxisIndex: 2,
          barGap: '-100%',
          data: data2,
          barWidth: 14,
          itemStyle: {
            normal: {
              color: function (params) {
                const num = myColor.length;
                return myColor[params.dataIndex % num];
              },
              barBorderRadius: 5,
            }
          },
          z: 0
        },
        {
          name: '外圆',
          type: 'scatter',
          hoverAnimation: false,
          data: data3,
          yAxisIndex: 2,
          symbolSize: 18,
          itemStyle: {
            normal: {
              color: function (params) {
                const num = myColor.length;
                return myColor[params.dataIndex % num];
              },
              opacity: 1,
            }
          },
          z: 2
        }
      ]
    };
  }
}

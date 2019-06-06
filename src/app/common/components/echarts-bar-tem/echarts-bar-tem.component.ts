import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-echarts-bar-tem',
  templateUrl: './echarts-bar-tem.component.html',
  styleUrls: ['./echarts-bar-tem.component.less']
})
export class EchartsBarTemComponent implements OnInit {
  public barTemOption: any = {};
  constructor() {
  }

  ngOnInit() {
    const myColor = ['#eb2100', '#eb3600', '#d0570e', '#d0a00e', '#34da62', '#00e9db', '#00c0e9', '#0096f3', '#33CCFF', '#33FFCC'];
    const area = ['贵州', '云南', '四川', '重庆', '青海', '陕西', '宁夏', '江西', '安徽', '河南'];
    this.barTemOption = {
      title: {
        text: '全国省级收入排名TOP-10',
        textStyle: {
          color: '#ffffff',
          fontSize: 14
        },
        left: 'center'
      },
      grid: {
        left: '8%',
        top: '6%',
        right: '0%',
        bottom: '0',
        containLabel: true
      },
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
          textStyle: {
            color: '#ffffff',
            fontSize: '12',
          }
        },
        data: area
      },
        // 排名
        {
        axisTick: 'none',
        axisLine: 'none',
        axisLabel: {
          textStyle: {
            color: '#ffffff',
            fontSize: '12',
          }
        },
        data: ['10', '9', '8', '7', '6', '5', '4', '3', '2', '1']
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
        data: [4, 13, 25, 29, 38, 44, 50, 52, 60, 72],
        label: {
          normal: {
            show: true,
            position: 'right',
            textStyle: {
              color: '#ffffff',
              fontSize: '12',
            },
            formatter: function (param) {
              return param.value + '(万元)';
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
        data: [99.5, 99.5, 99.5, 99.5, 99.5, 99.5, 99.5, 99.5, 99.5, 99.5],
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
        data: [100, 100, 100, 100, 100, 100, 100, 100, 100, 100],
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
          data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
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

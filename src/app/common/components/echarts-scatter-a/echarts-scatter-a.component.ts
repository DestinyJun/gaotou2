import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-echarts-scatter-a',
  templateUrl: './echarts-scatter-a.component.html',
  styleUrls: ['./echarts-scatter-a.component.less']
})
export class EchartsScatterAComponent implements OnInit {
  @Input() visualMapColor: any = ['#00E9DB', '#34DA62', '#D0A00E', '#EB3600', '#EB2100'];
  @Input() titleText: any = '全国省级收入/能耗对比分析（2019年）';
  @Input() yAxisName: any = '收入：单位(万元)';
  @Input() tooltipY: any = '营业收入';
  public scatterA: any = {};

  constructor() {
  }

  ngOnInit() {
    const that = this;
    const dataBJ = [
      '北京', '天津', '河北', '山西', '内蒙古', '辽宁', '吉林', '黑龙江',
      '上海', '江苏', '浙江', '安徽', '福建', '江西', '山东', '河南',
      '湖北', '湖南', '重庆', '四川', '贵州', '云南', '西藏', '陕西',
      '甘肃', '青海', '宁夏', '新疆', '广东', '广西', '海南', '台湾',
    ];
    const itemStyle = {
      normal: {
        opacity: 0.8,
        shadowBlur: 10,
        shadowOffsetX: 0,
        shadowOffsetY: 0,
        shadowColor: 'rgba(0, 0, 0, 0.5)'
      }
    };
    const scatterData = this.toolNumberAdd(dataBJ);
    this.scatterA = {
      title: {
        text: this.titleText,
        textStyle: {
          color: '#ffffff',
          fontSize: 14
        },
        left: 'center'
      },
      color: [
        '#dd4444'
      ],
     /* legend: {
        show: false,
        y: 'top',
        data: ['北京'],
        textStyle: {
          color: '#fff',
          fontSize: 16
        }
      },*/
      grid: {
        left: '7%',
        top: '12%',
        right: '5%',
        bottom: '10%',
      },
      tooltip: {
        padding: 10,
        backgroundColor: 'rgba(34,34,34,0.3)',
        borderColor: '#777',
        borderWidth: 1,
        formatter: function (obj) {
          const value = obj.value;
          return '<div style="border-bottom: 1px solid rgba(255,255,255,.3); font-size: 18px;padding-bottom: 7px;margin-bottom: 7px">'
            + '2019年' + value[2] + '：'
            + '</div>'
            + '综合能耗' + '：' + value[0] + '<br>'
            + `${that.tooltipY}` + '：' + value[1] + '<br>';
        }
      },
      xAxis: {
        type: 'value',
        name: '综合能耗',
        // data: scatterData,
        nameGap: 16,
        nameTextStyle: {
          color: '#fff',
          fontSize: 14,
          align: 'right',
          padding: [0, 0, 30, -60]
        },
        splitLine: {
          show: false
        },
        axisLine: {
          lineStyle: {
            color: '#eee'
          }
        }
      },
      yAxis: {
        type: 'value',
        name: this.yAxisName,
        nameLocation: 'end',
        nameGap: 20,
        nameTextStyle: {
          color: '#fff',
          fontSize: 12,
          padding: [0, 0, 0, 40]
        },
        axisLine: {
          lineStyle: {
            color: '#eee'
          }
        },
        splitLine: {
          show: false
        }
      },
      visualMap: [
        {
          left: 'right',
          top: '10%',
          dimension: 1,
          min: 0,
          show: false,
          itemWidth: 30,
          itemHeight: 120,
          calculable: true,
          precision: 0.1,
          text: ['圆形大小：收入'],
          textGap: 30,
          textStyle: {
            color: '#fff'
          },
          inRange: {
            symbolSize: [10, 70]
          },
          outOfRange: {
            symbolSize: [10, 70],
            color: ['rgba(255,255,255,.2)']
          },
          controller: {
            inRange: {
              color: ['#c23531']
            },
            outOfRange: {
              color: ['#444']
            }
          }
        },
        {
          left: 'right',
          bottom: '5%',
          dimension: 1,
          show: false,
          min: 0,
          itemHeight: 120,
          calculable: true,
          precision: 0.1,
          text: ['明暗：收入'],
          textGap: 30,
          textStyle: {
            color: '#fff'
          },
          inRange: {
            color: this.visualMapColor
          },
        }
      ],
      series: [
        {
          name: '省',
          type: 'scatter',
          itemStyle: itemStyle,
          data: scatterData.map(function (item, index) {
            return item;
          })
        },
      ]
    };
  }
  public toolNumberAdd(num: Array<any>): any {
    const a = [];
    let b = 10;
    for (let i = 0; i < num.length; i++) {
      b = b + 5;
      a.push([b, Math.random() * 200, num[i]]);
    }
    return a;
  }
}

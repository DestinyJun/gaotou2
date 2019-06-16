import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-echart-gauge-a',
  templateUrl: './echart-gauge-a.component.html',
  styleUrls: ['./echart-gauge-a.component.less']
})
export class EchartGaugeAComponent implements OnInit {
  @Input() classify: any = '男厕所';
  @Input() total: any = 100;
  @Input() amount: any = 50;
  public gaugeA: any = {};

  constructor() {
  }

  ngOnInit() {
    const that = this;
    const tickColor = ['#BC090E', '#CA6F0E', '#722291', '#17A2B8', '#254EC9', '#34A835', '#2BDAD2', '#64D41D'];
    const startAngle = 225;
    const endAngle = -45;
    const splitWidth = 15;
    const splitNumber = 5;
    const series = getSeries(this.amount).concat(getAxisTick());
    // .concat(getAxisTick())
    function getSeries(data) {
      return [
        {
          name: '数据',
          type: 'gauge',
          startAngle: startAngle,
          endAngle: endAngle,
          radius: '50%',
          center: ['50%', '55%'],
          min: 0,
          max: 100,
          splitNumber: splitNumber,
          axisLine: {
            lineStyle: {
              width: 2,
              color: [[1, '#fff']]
            }
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            show: true,
            distance: -70,
            fontSize: 10
          },
          splitLine: {
            lineStyle: {
              width: 0
            }
          },
          pointer: {
            show: true,
            length: '100%',
            width: 3
          },
          itemStyle: {
            color: '#04A4CE'
          },
          detail: {
            offsetCenter: [0, '150%'],
            textStyle: {
              fontSize: 12,
              color: '#04A4CE'
            },
            formatter: `已用{value}% \n${that.classify}总数：${that.amount}个`
          },
          data: [{
            name: '',
            value: data
          }]
        }
      ];
    }
    function getAxisTick() {
      const tickWidth = (startAngle - endAngle - (splitNumber - 1) * splitWidth) / splitNumber;
      const ticks = [];
      for (let i = 0; i < splitNumber; i++) {
        ticks.push(
          {
          name: '刻度',
          type: 'gauge',
          radius: '70%',
          startAngle: startAngle - i * (tickWidth + splitWidth),
          endAngle: startAngle - tickWidth - i * (tickWidth + splitWidth),
          splitNumber: 1,
          center: ['50%', '55%'],
          axisLine: {
            show: false,
            lineStyle: {
              width: 0,
              shadowBlur: 0
            }
          },
          axisTick: {
            show: true,
            lineStyle: {
              color: tickColor[i],
              width: 1
            },
            length: '10%',
            splitNumber: 10
          },
          splitLine: {
            show: true,
            length: '12%',
            lineStyle: {
              width: 2,
              color: tickColor[i]
            }
          },
          axisLabel: {
            show: false
          },
          detail: {
            show: false
          },
          markPoint: {
            symbol: 'circle',
            symbolSize: 3,
            itemStyle: {
              color: '#fff'
            },
            data: [
              {
                x: '50%',
                y: '55%'
              }
            ]
          }
        });
      }

      return ticks;
    }
    this.gaugeA = {
      /*title: {
        text: '仪表盘',
        textStyle: {
          color: '#fff',
          fontSize: 14
        },
        x: 'center'
      },*/
      series: series
    };
  }

}

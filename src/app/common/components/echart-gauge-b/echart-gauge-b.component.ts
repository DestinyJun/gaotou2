import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-echart-gauge-b',
  templateUrl: './echart-gauge-b.component.html',
  styleUrls: ['./echart-gauge-b.component.less']
})
export class EchartGaugeBComponent implements OnInit {
  public gaugeB: any = {};

  constructor() {
  }

  ngOnInit() {
    const targetValue = 200;
    const realValue = 88;
    const data = {
      title: '仪表盘',
      value: parseInt((100 * realValue / targetValue).toFixed(2), 10),
      color: {
        pieMini: '#ffca1c', // 小圆形颜色
        pieMiniMini: '#fff', // 小小圆形颜色
        piePlus: '#5DD1FA', // 大圆形颜色
        value: '#03A8F6', // 底部数值颜色
      },
    };
    this.gaugeB = {
      title: [
        {
          text: '小车',
          top: '100%',
          left: '16.5%',
          padding: [-30, 0],
          textStyle: {
            color: '#fff',
            fontSize: 14,
            align: 'center'
          }
        },
        {
          text: '大车',
          left: 'center',
          top: '100%',
          padding: [-30, 0],
          textStyle: {
            color: '#fff',
            fontSize: 14,
            align: 'center'
          }
        },
        {
          text: '客车',
          top: '100%',
          left: '78.7%',
          padding: [-30, 0],
          textStyle: {
            color: '#fff',
            fontSize: 14,
            align: 'center'
          }
        }
      ],
      series: [
        {
          name: '小车刻度',
          type: 'gauge',
          center: ['20%', '50%'],
          radius: '50%',
          min: 0, //最小刻度
          max: 100, //最大刻度
          splitNumber: 10, // 刻度数量
          startAngle: 225,
          endAngle: -45,
          axisLine: {
            show: true,
            lineStyle: {
              width: 1,
              color: [[1, 'rgba(0,0,0,0)']]
            }
          }, //仪表盘轴线
          axisLabel: {
            show: true,
            color: '#FFF',
            distance: -15,
            formatter: function (v) {
              switch (v + '') {
                case '0' :
                  return '0';
                case '10' :
                  return '10';
                case '20' :
                  return '20';
                case '30' :
                  return '30';
                case '40' :
                  return '40';
                case '50' :
                  return '50';
                case '60' :
                  return '60';
                case '70' :
                  return '70';
                case '80' :
                  return '80';
                case '90' :
                  return '90';
                case '100' :
                  return '100';
              }
            }
          }, //刻度标签。
          axisTick: {
            show: true,
            splitNumber: 7,
            lineStyle: {
              color: '#FFF',  //用颜色渐变函数不起作用
              width: 1,
            },
            length: -8
          }, //刻度样式
          splitLine: {
            show: true,
            length: -10,
            lineStyle: {
              color: '#FFFF',  //用颜色渐变函数不起作用
            }
          }, //分隔线样式
          detail: {
            show: false
          },
          pointer: {
            show: false
          }
        },
        {
          name: '小车仪表盘',
          type: 'gauge',
          center: ['20%', '50%'],
          radius: '48%',
          splitNumber: 10,
          axisLine: {
            lineStyle: {
              color: [
                [data.value / 100, '#F86110'],
                [1, '#4B215A']
              ],
              width: 3
            }
          },
          axisLabel: {
            show: false,
          },
          axisTick: {
            show: false,
          },
          splitLine: {
            show: false,
          },
          itemStyle: {
            color: '#F86110'
          },
          detail: {
            formatter: function (value) {
              if (value !== 0) {
                const num = Math.round(value);
                return num.toFixed(0) + '%';
              } else {
                return 0;
              }
            },
            offsetCenter: [0, '150%'],
            textStyle: {
              padding: [0, 0, 80, 0],
              fontSize: 12,
              fontWeight: '700',
              color: data.color.value || '#83af98'
            }
          },
          title: {
            color: '#fff',
            'fontSize': 10,
            'offsetCenter': [0, '5%']
          },
          data: [{
            name: '总数：' + targetValue + '个',
            value: data.value,
          }],
          pointer: {
            show: true,
            length: '75%',
            width: 5, //指针粗细
          },
        },

        {
          name: '大车刻度',
          type: 'gauge',
          radius: '50%',
          min: 0, //最小刻度
          max: 100, //最大刻度
          splitNumber: 10, //刻度数量
          startAngle: 225,
          endAngle: -45,
          axisLine: {
            show: true,
            lineStyle: {
              width: 1,
              color: [[1, 'rgba(0,0,0,0)']]
            }
          }, //仪表盘轴线
          axisLabel: {
            show: true,
            color: '#FFF',
            distance: -15,
            formatter: function (v) {
              switch (v + '') {
                case '0' :
                  return '0';
                case '10' :
                  return '10';
                case '20' :
                  return '20';
                case '30' :
                  return '30';
                case '40' :
                  return '40';
                case '50' :
                  return '50';
                case '60' :
                  return '60';
                case '70' :
                  return '70';
                case '80' :
                  return '80';
                case '90' :
                  return '90';
                case '100' :
                  return '100';
              }
            }
          }, //刻度标签。
          axisTick: {
            show: true,
            splitNumber: 7,
            lineStyle: {
              color: '#FFF',  //用颜色渐变函数不起作用
              width: 1,
            },
            length: -8
          }, //刻度样式
          splitLine: {
            show: true,
            length: -10,
            lineStyle: {
              color: '#FFF',  //用颜色渐变函数不起作用
            }
          }, //分隔线样式
          detail: {
            show: false
          },
          pointer: {
            show: false
          }
        },
        {
          name: '大车仪表盘',
          type: 'gauge',
          radius: '48%',
          splitNumber: 10,
          axisLine: {
            lineStyle: {
              color: [
                [data.value / 100, '#F86110'],
                [1, '#4B215A']
              ],
              width: 3
            }
          },
          axisLabel: {
            show: false,
          },
          axisTick: {
            show: false,
          },
          splitLine: {
            show: false,
          },
          itemStyle: {
            color: '#F86110'
          },
          detail: {
            'formatter': function (value) {
              if (value !== 0) {
                const num = Math.round(value);
                return num.toFixed(0) + '%';
              } else {
                return 0;
              }
            },
            offsetCenter: [0, '150%'],
            'textStyle': {
              padding: [0, 0, 80, 0],
              'fontSize': 12,
              fontWeight: '700',
              'color': data.color.value || '#83af98'
            }
          },
          title: {
            color: '#fff',
            fontSize: 10,
            offsetCenter: [0, '5%']
          },
          data: [{
            name: '总数：' + targetValue + '个',
            value: data.value,
          }],
          pointer: {
            show: true,
            length: '75%',
            width: 5, //指针粗细
          },
        },

        {
          name: '客车刻度',
          type: 'gauge',
          center: ['80%', '50%'],
          radius: '50%',
          min: 0, //最小刻度
          max: 100, //最大刻度
          splitNumber: 10, //刻度数量
          startAngle: 225,
          endAngle: -45,
          axisLine: {
            show: true,
            lineStyle: {
              width: 1,
              color: [[1, 'rgba(0,0,0,0)']]
            }
          }, // 仪表盘轴线
          axisLabel: {
            show: true,
            color: '#FFF',
            distance: -15,
            formatter: function (v) {
              switch (v + '') {
                case '0' :
                  return '0';
                case '10' :
                  return '10';
                case '20' :
                  return '20';
                case '30' :
                  return '30';
                case '40' :
                  return '40';
                case '50' :
                  return '50';
                case '60' :
                  return '60';
                case '70' :
                  return '70';
                case '80' :
                  return '80';
                case '90' :
                  return '90';
                case '100' :
                  return '100';
              }
            }
          }, // 刻度标签。
          axisTick: {
            show: true,
            splitNumber: 7,
            lineStyle: {
              color: '#FFF',  //用颜色渐变函数不起作用
              width: 1,
            },
            length: -8
          }, //刻度样式
          splitLine: {
            show: true,
            length: -10,
            lineStyle: {
              color: '#FFF',  //用颜色渐变函数不起作用
            }
          }, //分隔线样式
          detail: {
            show: false
          },
          pointer: {
            show: false
          }
        },
        {
          name: '客车仪表盘',
          type: 'gauge',
          center: ['80%', '50%'],
          radius: '48%',
          splitNumber: 10,
          axisLine: {
            lineStyle: {
              color: [
                [data.value / 100, '#F86110'],
                [1, '#4B215A']
              ],
              width: 3
            }
          },
          axisLabel: {
            show: false,
          },
          axisTick: {
            show: false,
          },
          splitLine: {
            'show': false,
          },
          itemStyle: {
            color: '#F86110'
          },
          detail: {
            formatter: function (value) {
              if (value !== 0) {
                const num = Math.round(value);
                return num.toFixed(0) + '%';
              } else {
                return 0;
              }
            },
            offsetCenter: [0, '150%'],
            textStyle: {
              padding: [0, 0, 80, 0],
              fontSize: 12,
              fontWeight: '700',
              color: data.color.value || '#83af98'
            }
          },
          title: {
            color: '#fff',
            fontSize: 10,
            offsetCenter: [0, '5%']
          },
          data: [{
            name: '总数：' + targetValue + '个',
            value: data.value,
          }],
          pointer: {
            show: true,
            length: '75%',
            width: 5, //指针粗细
          },
        },
      ]
    };
  }

}

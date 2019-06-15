import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-echart-pie-circle-a',
  templateUrl: './echart-pie-circle-a.component.html',
  styleUrls: ['./echart-pie-circle-a.component.less']
})
export class EchartPieCircleAComponent implements OnInit {
  public pieCircleA: any = {};
  @Input() title = '突发事件处理概况';
  constructor() {
  }

  ngOnInit() {
    this.pieCircleA = {
      color: ['#22c2f0', '#28f19b', '#fcfa3c', '#f44061'],
      title: [
        {
          text: this.title,
          textStyle: {
            color: '#f2f2f2',
            fontSize: 15,
          },
          subtextStyle: {
            fontSize: 15,
            color: ['#ff9d19'],
            y: 'top',
          },
          x: 'center',
          y: 'top',
        },
        {
          text: '总数：260',
          textStyle: {
            color: '#f2f2f2',
            fontSize: 15,
          },
          subtextStyle: {
            fontSize: 15,
            color: ['#ff9d19'],
            y: 'top',
          },
          x: 'center',
          y: 'center',
        }
      ],
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b}: {c} ({d}%)'
      },
      legend: {
        orient: 'horizontal',
        icon: 'circle',
        bottom: 6,
        x: 'center',
        textStyle: {
          color: '#fff'
        },
        data: ['已处理', '未处理', '处理中']
      },
      series: [
        {
          name: '',
          type: 'gauge',
          radius: '50%',
          startAngle: 0,
          endAngle: 359.9,
          splitNumber: 70,
          axisTick: {
            show: false
          },
          splitLine: {
            length: 139,
            lineStyle: {
              width: 4,
              color: '#031845'
            }
          },
          axisLabel: {
            show: false
          },
          pointer: {
            show: false
          },
          axisLine: {
            lineStyle: {
              opacity: 0
            }
          },
          detail: {
            show: false
          },
          data: [{
            value: 0,
            name: ''
          }]
        },
        {
          name: '处理来源',
          type: 'pie',
          radius: ['40%', '50%'],
          silent: true,
          center: ['50%', '50%'],
          z: 0,
          label: {
            normal: {
              formatter: '{b|{b}：}{c|{c}}',
              position: 'top',
              rich: {
                b: {
                  fontSize: 14,
                  color: '#fff',
                  verticalAlign: 'top',
                  // paddingBottom: 30,
                  x: 70
                },
                c: {
                  fontSize: 14,
                  verticalAlign: 'top',
                  color: '#30c7ee',
                  align: 'left',
                  // padding: 4
                },
              }
            }
          },
          labelLine: {
            normal: {
              show: true,
              length: 0,
              length2: 70,
              lineStyle: {
                type: 'solid',
                width: 1
              }
            }
          },
          data: [
            {
            value: 120,
            name: '已处理'
            },
            {
              value: 80,
              name: '未处理'
            },
            {
              value: 60,
              name: '处理中'
            }
          ]
        },
        {
          name: '',
          type: 'pie',
          radius: ['37%', '38%'],
          silent: true,
          label: {
            normal: {
              show: false,
              position: 'center'
            }
          },
          labelLine: {
            normal: {
              show: false
            }
          },
          z: 2,
          zlevel: 0,
          data: [{
            value: 60.5,
            name: '',
            label: {
              normal: {
                show: false
              }
            },
            itemStyle: {
              normal: {
                color: '#274f2d'
              }
            }
          },
            {
              value: 90.6,
              name: '',
              label: {
                normal: {
                  show: false
                }
              },
              itemStyle: {
                normal: {
                  color: '#ed0f33'
                }
              }
            },
            {
              value: 90.6,
              name: '',
              label: {
                normal: {
                  show: false
                }
              },
              itemStyle: {
                normal: {
                  color: '#795b21'
                }
              }
            }
          ]
        }
      ]
    };
  }

}

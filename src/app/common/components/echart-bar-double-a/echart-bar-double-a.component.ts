import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-echart-bar-double-a',
  templateUrl: './echart-bar-double-a.component.html',
  styleUrls: ['./echart-bar-double-a.component.less']
})
export class EchartBarDoubleAComponent implements OnInit {
  public barDoubleA: any = {};
  @Input() yAxisName: any = '车辆（单位/辆）';
  @Input() data: any =  [
    {
      name: '小车',
      type: 'bar',
      stack: '上行',
      data: [
        {name: '上行', value: 120},
        {name: '上行', value: 132},
        {name: '上行', value: 101},
        {name: '上行', value: 134},
        {name: '上行', value: 90},
        {name: '上行', value: 230},
        {name: '上行', value: 210},
      ]
    },
    {
      name: '客车',
      type: 'bar',
      stack: '上行',
      data: [
        {name: '上行', value: 220},
        {name: '上行', value: 182},
        {name: '上行', value: 191},
        {name: '上行', value: 234},
        {name: '上行', value: 290},
        {name: '上行', value: 330},
        {name: '上行', value: 310},
      ]
    },
    {
      name: '货车',
      type: 'bar',
      stack: '上行',
      data: [
        {name: '上行', value: 150},
        {name: '上行', value: 232},
        {name: '上行', value: 201},
        {name: '上行', value: 154},
        {name: '上行', value: 190},
        {name: '上行', value: 330},
        {name: '上行', value: 410},
      ]
    },
    {
      name: '危品车',
      type: 'bar',
      stack: '上行',
      data: [
        {name: '上行', value: 150},
        {name: '上行', value: 232},
        {name: '上行', value: 201},
        {name: '上行', value: 154},
        {name: '上行', value: 190},
        {name: '上行', value: 330},
        {name: '上行', value: 410},
      ]
    },
    {
      name: '畜牧车',
      type: 'bar',
      stack: '上行',
      data: [
        {name: '上行', value: 150},
        {name: '上行', value: 232},
        {name: '上行', value: 201},
        {name: '上行', value: 154},
        {name: '上行', value: 190},
        {name: '上行', value: 330},
        {name: '上行', value: 410},
      ]
    },
    {
      name: '小车',
      type: 'bar',
      stack: '下行',
      data: [
        {name: '下行', value: 120},
        {name: '下行', value: 132},
        {name: '下行', value: 101},
        {name: '下行', value: 134},
        {name: '下行', value: 90},
        {name: '下行', value: 230},
        {name: '下行', value: 210},
      ]
    },
    {
      name: '客车',
      type: 'bar',
      stack: '下行',
      data: [
        {name: '下行', value: 220},
        {name: '下行', value: 182},
        {name: '下行', value: 191},
        {name: '下行', value: 234},
        {name: '下行', value: 290},
        {name: '下行', value: 330},
        {name: '下行', value: 310},
      ]
    },
    {
      name: '货车',
      type: 'bar',
      stack: '下行',
      data: [
        {name: '下行', value: 150},
        {name: '下行', value: 232},
        {name: '下行', value: 201},
        {name: '下行', value: 154},
        {name: '下行', value: 190},
        {name: '下行', value: 330},
        {name: '下行', value: 410},
      ]
    },
    {
      name: '危品车',
      type: 'bar',
      stack: '下行',
      data: [
        {name: '下行', value: 150},
        {name: '下行', value: 232},
        {name: '下行', value: 201},
        {name: '下行', value: 154},
        {name: '下行', value: 190},
        {name: '下行', value: 330},
        {name: '下行', value: 410},
      ]
    },
    {
      name: '畜牧车',
      type: 'bar',
      stack: '下行',
      data: [
        {name: '下行', value: 150},
        {name: '下行', value: 232},
        {name: '下行', value: 201},
        {name: '下行', value: 154},
        {name: '下行', value: 190},
        {name: '下行', value: 330},
        {name: '下行', value: 410},
      ]
    },
  ];
  constructor() {
  }

  ngOnInit() {
    this.barDoubleA = {
      tooltip: {
        trigger: 'axis',
        axisPointer: {            // 坐标轴指示器，坐标轴触发有效
          type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
        },
        formatter: function (param) {
          const paramLength = param.length;
          const sArray = param.slice(0, (paramLength / 2));
          const xArray = param.slice(paramLength / 2);
          let sHtml = ``;
          let xHtml = ``;
          sArray.map((val) => {
            sHtml = sHtml +  `<p style="text-indent: 1em;height: 16px;line-height: 16px">
<span style="background-color: ${val.color};display:inline-block;width: 10px;height: 10px;border-radius: 50%"></span>
${val.seriesName}：${val.value}（辆）</p>`;
          });
          xArray.map((val) => {
            xHtml = xHtml +  `<p style="text-indent: 1em;height: 16px;line-height: 16px">
<span style="background-color: ${val.color};display:inline-block;width: 10px;height: 10px;border-radius: 50%"></span>
${val.seriesName}：${val.value}（辆）</p>`;
          });
          return `
                  <p style="text-align: center">${param[0].axisValue}</p>
                  <p>${sArray[0].name}</p>
                  ${sHtml}
                  <p>${xArray[0].name}</p>
                   ${xHtml}
          `;
        }
      },
      legend: {
        textStyle: {
          color: '#ffffff'
        }
      },
      grid: {
        left: '1%',
        right: '1%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: [
        {
          type: 'category',
          data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
          axisLabel: {
            color: '#ffffff'
          },
          axisLine: {
            lineStyle: {
              color: '#fff'
            }
          },
        }
      ],
      yAxis: [
        {
          type: 'value',
          name: this.yAxisName,
          nameTextStyle: {
            color: '#ffffff'
          },
          axisLabel: {
            color: '#ffffff'
          },
          axisLine: {
            lineStyle: {
              color: '#fff'
            }
          },
          splitLine: {
            show: false
          }
        }
      ],
      color: ['#37A2DA', '#FFDB5C', '#32C5E9', '#FF9F7F', '#E7BCF3', '#663D84'],
      series: this.data
    };
  }

}

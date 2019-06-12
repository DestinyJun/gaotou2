import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-echart-pie-circle-b',
  templateUrl: './echart-pie-circle-b.component.html',
  styleUrls: ['./echart-pie-circle-b.component.less']
})
export class EchartPieCircleBComponent implements OnInit {
  public pieCircleB: any = {};

  constructor() {
  }

  ngOnInit() {
    const ydata = [
      {
        name: '危品车',
        value: 80
      },
      {
        name: '货车',
        value: 180
      },
      {
        name: '客车',
        value: 220
      },
      {
        name: '畜牧车',
        value: 25
      },
      {
        name: '小车',
        value: 255
      }];
    let total = 0;
    const legData = [];
    for (let i = 0, len = ydata.length; i < len; i++) {
      total += ydata[i].value;
      legData.push(ydata[i].name);
    }
    const color = ['#0098ec', '#01ffff', '#00c800', '#fcc000', '#ff5252'];
    this.pieCircleB = {
      color: color,
      title: {
        text: `总计：${total}辆`,
        textStyle: {
          color: '#fff',
          fontSize: 18,
          align: 'center'
        },
        x: 'center',
        y: '52%',
      },
      legend: {
        orient: 'horizontal',
        // bottom: 20,
        y: 'top',
        x: 'center',
        // width: '32%',
        itemWidth: 14,
        itemHeight: 14,
        // align: 'left',
        textStyle: {
          color: '#fff'
        },
        itemGap: 20,
        formatter: function (name) {
          for (let i = 0, len = legData.length; i < len; i++) {
            if (legData[i] == name) {
              return name + ' - ' + ((ydata[i].value / total) * 100).toFixed(1) + '%';
            }
          }
        }
      },
      series: [
        {
        name: '车辆分类',
        type: 'pie',
        center: ['50%', '55%'],
        radius: ['30%', '50%'],
        label: {
          normal: {
            show: false,
            formatter: '{text|{b}}\n{value|{d}%}',
            rich: {
              text: {
                color: '#fff',
                fontSize: 24,
                align: 'center',
                verticalAlign: 'middle',
                padding: 5
              },
              value: {
                fontSize: 24,
                align: 'center',
                verticalAlign: 'middle',
              },
            }
          },
          emphasis: {
            show: true
          }
        },
        data: ydata
      }]
    };
  }
}

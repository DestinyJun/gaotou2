import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-echarts-line-broken',
  templateUrl: './echarts-line-broken.component.html',
  styleUrls: ['./echarts-line-broken.component.css']
})
export class EchartsLineBrokenComponent implements OnInit {
  @Input() public option: any;
  @Input() public width: any;
  @Input() public height: any;
  public optionsLine = {};
  constructor() { }

  ngOnInit() {
    if (this.option) {
      this.initializeLine();
    }
  }
  public initializeLine (): void {

  }
  public onClick (params): void {
      console.log(params);
    const yType = ['经营收入', '客流量', '车流量'];
    const itemType = ['revenue', 'passenger', 'vehicle'];
    const timeType = ['', ''];
    const xAxisData = ['00:00', '02:00', '04:00', '06:00', '08:00', '10:00', '12:00', '14:00', '16:00', '18:00', '20:00', '22:00'];
    const legendData = ['经营收入', '客流量', '车流量', '用水量', '用电量'];
    const title = '服务区业态数据变化';
    const serieData = [];
    const metaDate = [
      [120, 140, 100, 120, 300, 230, 130, 170, 140, 120, 300, 230],
      [200, 120, 300, 200, 170, 300, 200, 180, 200, 190, 300, 200],
      [100, 200, 140, 300, 200, 180, 100, 300, 230, 130, 100, 300],
      [152, 418, 89, 156, 200, 180, 100, 300, 230, 130, 145, 300],
      [56, 223, 140, 300, 200, 180, 283, 300, 230, 148, 100, 300]
    ];
    for (let v = 0; v < legendData.length; v++) {
      const serie = {
        name: legendData[v],
        type: 'line',
        symbol: 'circle',
        symbolSize: 10,
        data: metaDate[v]
      };
      serieData.push(serie);
    }
    const colors = ['#7C7CD4', '#36B9AB', '#6ACD72', '#0A30BF', '#027204'];
    this.optionsLine = {
      title: {
        text: title,
        x: 'center',
        textStyle: {
          color: '#fff',
          fontSize: 14
        }
      },
      legend: {
        show: true,
        left: '10%',
        data: legendData,
        y: '5%',
        itemWidth: 18,
        itemHeight: 12,
        textStyle: {color: '#fff', fontSize: 12},
      },
      color: colors,
      grid: {left: '2%', top: '12%', bottom: '5%', right: '5%', containLabel: true},
      tooltip: {trigger: 'axis', axisPointer: {type: 'shadow'}},
      xAxis: [
        {
          type: 'category',
          axisLine: {show: true, lineStyle: {color: '#6173A3'}},
          axisLabel: {interval: 'auto', textStyle: {color: '#fff', fontSize: 14}},
          axisTick: {show: false},
          data: xAxisData,
        },
      ],
      yAxis: [
        {
          axisTick: {show: false},
          splitLine: {show: false},
          axisLabel: {textStyle: {color: '#9ea7c4', fontSize: 14}},
          axisLine: {show: true, lineStyle: {color: '#6173A3'}},
        },
      ],
      series: serieData
    };
    function types(value): string {
      let typeValue = '';
      switch (value) {
        case 0:
          typeValue = yType[0];
          break;
        case 1:
          typeValue = yType[1];
          break;
        case 2:
          typeValue = yType[2];
          break;
        case 3:
          typeValue = yType[3];
          break;
        case 4:
          typeValue = yType[4];
          break;
      }
      return typeValue;
    }
  }
}

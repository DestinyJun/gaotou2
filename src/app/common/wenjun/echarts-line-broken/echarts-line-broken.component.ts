import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';

@Component({
  selector: 'app-echarts-line-broken',
  templateUrl: './echarts-line-broken.component.html',
  styleUrls: ['./echarts-line-broken.component.css']
})
export class EchartsLineBrokenComponent implements OnInit, OnChanges {
  @Input() public option: any;
  @Input() public width: any;
  @Input() public height: any;
  public optionsLine = {};
  constructor() { }

  ngOnInit() {}
  ngOnChanges(changes: SimpleChanges): void {
    if (this.option) {
      this.initializeLine();
    }
  }
  public initializeLine (): void {
    const legendData = [];
    const serieData = [];
    const metaDate = [];
    this.option.data.yData.map((param, index) => {
      legendData.push(param.name);
      metaDate.push(param.data);
    });
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
    this.optionsLine = {
      title: {
        text: this.option.title,
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
      color: this.option.color,
      grid: {left: '2%', top: '12%', bottom: '5%', right: '5%', containLabel: true},
      tooltip: {trigger: 'axis', axisPointer: {type: 'shadow'}},
      xAxis: [
        {
          type: 'category',
          axisLine: {show: true, lineStyle: {color: '#6173A3'}},
          axisLabel: {interval: 'auto', textStyle: {color: '#fff', fontSize: 14}},
          axisTick: {show: false},
          data: this.option.data.xData,
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
  }
  public onClick (params): void {
      // console.log(params);
  }
}

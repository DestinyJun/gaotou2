import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';

@Component({
  selector: 'app-echart-line-area',
  templateUrl: './echart-line-area.component.html',
  styleUrls: ['./echart-line-area.component.css']
})
export class EchartLineAreaComponent implements OnInit, OnChanges {
  @Input() public option: any;
  @Input() public width = 'auto';
  @Input() public height: any;
  public optionsLine = {};
  constructor() { }

  ngOnInit() {
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (this.option) {
      this.initializeLine();
    }
  }
  public initializeLine (): void {
    const areaMouth = this.option.data.xDate;
    const areaData = this.option.data.yDate;
    this.optionsLine = {
      title: {
        text: `${this.option.title}`,
        x: 'center',
        textStyle: {
          color: '#fff',
          fontSize: 14
        }
      },
      grid: {left: 0, top: '12%', bottom: '5%', right: '5%', containLabel: true},
      tooltip: {trigger: 'axis', axisPointer: {type: 'shadow'}},
      xAxis: {
        type: 'category',
        name: '日期（单位/日）',
        nameLocation: 'start',
        nameTextStyle: {
          color: 'r#fff'
        },
        boundaryGap: false,
        axisLine: {show: true, lineStyle: {color: '#6173A3'}},
        axisLabel: {interval: 'auto', textStyle: {color: '#BCC4D6', fontSize: 14}},
        axisTick: {show: false},
        data: areaMouth
      },
      yAxis: {
        type: 'value',
        axisTick: {show: false},
        splitLine: {show: false},
        axisLabel: {textStyle: {color: '#9ea7c4', fontSize: 14}},
        axisLine: {show: true, lineStyle: {color: '#6173A3'}},
      },
      series: [{
        data: areaData,
        type: 'line',
        // smooth: 0.3, // 线条的平滑程度
        symbol: 'none', // 折线上的标记点
        itemStyle: {// 折线拐点标志的样式。
          color: 'transparent'
        },
        areaStyle: { // 区域填充样式
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              {
                offset: 0, color: '#1876be' // 0% 处的颜色
              },
              {
                offset: 0.3, color: '#1876be' // 0% 处的颜色
              },
              {
                offset: 0.6, color: '#1876be' // 0% 处的颜色
              },
              {
                offset: 1, color: 'transparent' // 100% 处的颜色
              }],
            globalCoord: false // 缺省为 false
          }
        },
      }]
    };
  }
}

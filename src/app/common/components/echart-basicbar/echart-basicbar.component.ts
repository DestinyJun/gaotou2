import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
@Component({
  selector: 'app-echart-basicbar',
  templateUrl: './echart-basicbar.component.html',
  styleUrls: ['./echart-basicbar.component.css']
})
export class EchartBasicbarComponent implements OnInit, OnChanges {
  @Input() public option: any;
  @Input() public height: any;
  @Input() public width = 'auto';
  @Output() public outOptions3dBar = new EventEmitter<any>();
  public options3dBar = {};
  public options3dBarInstance: any;
  public colorList = [
    '#356981', '#356981', '#356981', '#356981', '#356981', '#356981',
    '#356981', '#356981', '#356981', '#356981', '#356981 ', '#356981',
    '#356981', '#356981', '#356981', '#356981', '#356981 ', '#356981',
    '#356981', '#356981', '#356981', '#356981', '#356981 ', '#356981',
    '#356981', '#356981', '#356981', '#356981', '#356981 ', '#356981',
    '#356981', '#356981', '#356981', '#356981', '#356981 ', '#356981'
  ];
  constructor() { }

  ngOnInit() {
    /*this.options3dBarInstance.on('click', (event) => {
      console.log(event);
    });*/
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (this.option) {
       if (this.option.data) {
         this.optionsBar();
       }
    }
  }
  public optionsBar(): void {
    const that = this;
    this.colorList = [
      '#356981', '#356981', '#356981', '#356981', '#356981', '#356981',
      '#356981', '#356981', '#356981', '#356981', '#356981 ', '#356981',
      '#356981', '#356981', '#356981', '#356981', '#356981 ', '#356981',
      '#356981', '#356981', '#356981', '#356981', '#356981 ', '#356981',
      '#356981', '#356981', '#356981', '#356981', '#356981 ', '#356981',
      '#356981', '#356981', '#356981', '#356981', '#356981 ', '#356981'
    ];
    this.colorList[this.option.xType] = '#D43839';
    this.options3dBar = {
      title: [
        {
          text: `${this.option.title}`,
          left: 'center',
          textStyle: {
            color: '#fff',
            fontSize: 16
          }
        },
      ],
      dataZoom: [
        {
          type: 'inside'
        }
      ],
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        }
      },
      grid: {
        left: '8%',
        right: '3%',
        bottom: '10%'
      },
      xAxis: {
        show: true,
        type: 'category',
        data: this.option.data.xData,
        splitLine: {show: false},
        nameTextStyle: {
          color: 'white'
        },
        triggerEvent: true,
        axisLine: {
          lineStyle: {
            color: 'white'
          }
        },
        axisTick: {
          interval: 0,
        },
        axisLabel: {
          interval: 0
        }
      },
      yAxis: {
        type: 'value',
        name: '数值',
        splitLine: {show: false},
        nameTextStyle: {
          align: 'left',
          color: 'white'
        },
        axisLine: {
          lineStyle: {
            color: 'white'
          }
        },
      },
      series: [
        {
          data: this.option.data.coordinate,
          type: 'bar',
          label: {
            // 柱状图的数值是否显示
            show: true,
            textStyle: {
              fontSize: 12,
              borderWidth: 1
            }
          },
          itemStyle: {
            color: function (params) {
              return that.colorList[params.dataIndex];
            },
          }
        }]
    };
  }
  // 车型日分布类型占比饼状图弹窗
  public options3dBarInit(ec): void {
    this.options3dBarInstance = ec;
  }
  public options3dBarClick(e): void {
    if (e.dataIndex === undefined) {
      this.outOptions3dBar.emit({
        name: e.name,
        timeType: this.option.timeType,
        xType: this.option.data.xData.indexOf(e.value),
        total: e.data,
      });
      return;
    }
    this.colorList = [
      '#356981', '#356981', '#356981', '#356981', '#356981', '#356981',
      '#356981', '#356981', '#356981', '#356981', '#356981 ', '#356981',
      '#356981', '#356981', '#356981', '#356981', '#356981 ', '#356981',
      '#356981', '#356981', '#356981', '#356981', '#356981 ', '#356981',
      '#356981', '#356981', '#356981', '#356981', '#356981 ', '#356981',
      '#356981', '#356981', '#356981', '#356981', '#356981 ', '#356981'
    ];
    this.colorList[e.dataIndex] = '#D43839';
    this.options3dBarInstance.setOption(this.options3dBar);
    this.outOptions3dBar.emit({
      name: e.name,
      timeType: this.option.timeType,
      xType: e.dataIndex,
      total: e.data,
    });
 }
}

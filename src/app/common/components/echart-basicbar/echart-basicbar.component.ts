import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
@Component({
  selector: 'app-echart-basicbar',
  templateUrl: './echart-basicbar.component.html',
  styleUrls: ['./echart-basicbar.component.css']
})
export class EchartBasicbarComponent implements OnInit, OnChanges {
  @Input() public options3dBarData: any;
  @Output() public outOptions3dBar = new EventEmitter<any>();
  public options3dBar = {};
  public options3dBarInstance: any;
  public colorList = [
    '#356981', '#356981', '#356981', '#356981', '#356981', '#356981',
    '#356981', '#356981', '#356981', '#356981', '#356981 ', '#356981'
  ];
  constructor() { }

  ngOnInit() {}
  ngOnChanges(changes: SimpleChanges): void {
    if (this.options3dBarData) {
       if (this.options3dBarData.data) {
         this.optionsBar();
       }
    }
  }
  public optionsBar(): void {
    const that = this;
    this.colorList = [
      '#356981', '#356981', '#356981', '#356981', '#356981', '#356981',
      '#356981', '#356981', '#356981', '#356981', '#356981 ', '#356981'
    ];
    this.colorList[this.options3dBarData.xType] = '#D43839';
    this.options3dBar = {
      title: [
        {
          text: `${this.options3dBarData.title}`,
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
        left: '5%',
        right: '3%',
        bottom: '10%'
      },
      xAxis: {
        type: 'category',
        data: this.options3dBarData.data.xData,
        splitLine: {show: false},
        nameTextStyle: {
          color: 'white'
        },
        axisLine: {
          lineStyle: {
            color: 'white'
          }
        },
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
          data: this.options3dBarData.data.coordinate,
          type: 'bar',
          label: {
            // 柱状图的数值是否显示
            show: true,
            textStyle: {
              fontSize: 16,
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
    console.log(e);
    this.colorList = [
      '#356981', '#356981', '#356981', '#356981', '#356981', '#356981',
      '#356981', '#356981', '#356981', '#356981', '#356981 ', '#356981'
    ];
    this.colorList[e.dataIndex] = '#D43839';
    this.options3dBarInstance.setOption(this.options3dBar);
    this.outOptions3dBar.emit({
      xType: e.dataIndex,
      total: e.data,
    });
 }
}

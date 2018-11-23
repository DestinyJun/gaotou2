import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {NgxEchartsService} from 'ngx-echarts';

@Component({
  selector: 'app-echart-basicbar',
  templateUrl: './echart-basicbar.component.html',
  styleUrls: ['./echart-basicbar.component.css']
})
export class EchartBasicbarComponent implements OnInit, OnChanges {
  @Input() public options3dBarData: any;
  public options3dBar = {};
  public options3dBarInstance: any;
  constructor(
    private es: NgxEchartsService,
  ) { }

  ngOnInit() {}
  ngOnChanges(changes: SimpleChanges): void {
    this.optionsBar();
  }
  public optionsBar(): void {
    const colorList = [
      '#356981', '#356981', '#356981', '#356981', '#356981', '#356981',
      '#356981', '#356981', '#356981', '#356981', '#356981 ', '#356981'
    ];
    this.options3dBar = {
     /* title: [
        {
          text: `贵州省所有服务区年度${this.types(yAxis)}统计`,
          left: 'center',
          textStyle: {
            color: '#fff',
            fontSize: 16
          }
        },
      ],*/
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
        data: this.options3dBarData.xData,
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
          data: this.options3dBarData.coordinate,
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
              return colorList[params.dataIndex];
            },
          }
        }]
    };
  }
  public options3dBarClick(e): void {
   const colorList = [
     '#356981', '#356981', '#356981', '#356981', '#356981', '#356981',
     '#356981', '#356981', '#356981', '#356981', '#356981 ', '#356981'
   ];
   colorList[e.dataIndex] = '#D43839';
   this.options3dBarInstance.setOption(this.options3dBar);
   /*this.arryPie = [];
   this.outOptions3dCopy.emit({id: 2, xType: e.xAxis, types: this.itemType[e.yAxis]});*/
 }
  public options3dBarInit(ec): void {
    this.options3dBarInstance = ec;
  }

}

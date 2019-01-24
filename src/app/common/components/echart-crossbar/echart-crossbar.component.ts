import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-echart-crossbar',
  templateUrl: './echart-crossbar.component.html',
  styleUrls: ['./echart-crossbar.component.css']
})
export class EchartCrossbarComponent implements OnInit, OnChanges {
  @Input() public option: any;
  @Input() public height: any;
  @Input() public width = 'auto';
  public crosswiseBar = {};
  public serviceZoneId = [];
  public title = '';
  constructor(
    private router: Router
  ) { }

  ngOnInit() {}
  ngOnChanges(changes: SimpleChanges): void {
    if (JSON.stringify(this.option) !== '{}') {
      if (this.option.title) {
        this.title = this.option.title;
      }
      this.backCrosswiseBar();
    }
  }
  // 统计图渲染
  public backCrosswiseBar() {
    const barData = [];
    const barArea = [];
    this.option.data.yAxis.map((val, index) => {
      this.serviceZoneId.push(val.serviceAreaId);
      barArea.push(val.serviceName);
    });
    // console.log(this.serviceZoneId);
    // console.log(this.option.data.yAxis);
    this.option.data.barDatas.map((val, index) => {
      barData.push(
        {
          name: val.title,
          type: 'bar',
          stack: '总量',
          color: this.option.color[index],
          label: {
            normal: {
              show: true,
            }
          },
          data: val.datas,
        }
      );
    });
    this.crosswiseBar = {
      title: {
        text: `${this.title}`,
        x: '3%',
        textStyle: {
          color: '#fff',
          fontSize: 14
        }
      },
      tooltip : {
        trigger: 'axis',
        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
          type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
        }
      },
      grid: {
        top: '10%',
        left: '2%',
        right: '5%',
        bottom: '10%',
        containLabel: true
      },
      xAxis: {
        type: 'value',
        splitLine: {show: false},
        axisLabel: {
          formatter: '{value}'
        },
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
        type: 'category',
        // name: '万元/辆/人次',
        inverse: false,
        splitLine: {show: false},
        data: barArea,
        axisLabel: {
          margin: 20,
        },
        nameTextStyle: {
          color: 'white'
        },
        axisLine: {
          lineStyle: {
            color: 'white'
          }
        },
      },
      series: barData
    };
  }
  /*统计图点击事件*/
  public rankingClick(e) {
   /* console.log(this.serviceZoneId[e.dataIndex]);
    console.log(e.name);*/
    this.router.navigate(['/home/serzone', {id: this.serviceZoneId[e.dataIndex], name: e.name}]);
  }
}

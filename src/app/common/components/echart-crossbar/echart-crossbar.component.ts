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
  @Input() public color: any;
  @Input() public name: any;
  @Input() public width = 'auto';
  public crosswiseBar = {};
  public serviceZoneId = [];
  public setServiceAreaId: any;
  constructor(
    private router: Router
  ) { }

  ngOnInit() {}
  ngOnChanges(changes: SimpleChanges): void {
    if (this.option) {
      this.backCrosswiseBar();
    }
  }
  // 统计图渲染
  public backCrosswiseBar() {
    const yAxisData  = [];
    const barData = [];
    this.option = this.option.reverse();
    this.option.map((val) => {
      yAxisData .push(val.name);
      barData.push({value: val.values, serviceAreaId: val.serviceAreaId, name: val.name});
    });
    this.crosswiseBar = {
      tooltip : {
        trigger: 'axis',
        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
          type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
        }
      },
      grid: {
        top: '5%',
        left: '1%',
        right: '5%',
        bottom: '5%',
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
        inverse: false,
        splitLine: {show: false},
        data: yAxisData ,
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
      animation: true,
      animationDuration: 4000,
      animationDurationUpdate: 4000,
      series: [
        {
          name: this.name,
          type: 'bar',
          stack: '总量',
          color: this.color,
          label: {
            normal: {
              show: true,
            }
          },
          data: barData,
        }
      ]
    };
  }
  /*统计图点击事件*/
  public rankingClick(e) {
    this.router.navigate(['/home/serzone', {id: e.data.serviceAreaId, name: e.data.name}]);
    return;
  }
}

import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-echart-crossbar',
  templateUrl: './echart-crossbar.component.html',
  styleUrls: ['./echart-crossbar.component.css']
})
export class EchartCrossbarComponent implements OnInit, OnChanges {
  @Input() public crosswiseBarData: any;
  @Input() public height: any;
  @Input() public width = 'auto';
  public crosswiseBar = {};
  constructor(
    private router: Router
  ) { }

  ngOnInit() {}
  ngOnChanges(changes: SimpleChanges): void {
    if (JSON.stringify(this.crosswiseBarData) !== '{}') {
      this.backCrosswiseBar('revenue');
    }
  }
  /*等候数据调试*/
  public rankingClick(e) {
    this.router.navigate(['/home/serzone', {name: e.name}]);
  }
  public backCrosswiseBar(type) {
    const colors = ['#2307EF', '#3B78B1', '#04A6BB'];
    const barData = [];
    const barArea = [];
    this.crosswiseBarData.yAxis.map((val, index) => {
      barArea.push(val.serviceName);
    });
    this.crosswiseBarData.barDatas.map((val, index) => {
      barData.push(
        {
          name: val.title,
          type: 'bar',
          stack: '总量',
          color: colors[index],
          label: {
            normal: {
              show: true,
              position: 'insideRight'
            }
          },
          data: val.datas,
        }
      );
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
}

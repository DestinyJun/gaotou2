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
  public setServiceAreaId: any; // 获取争取服务区id，路由传输
  constructor(
    private router: Router
  ) { }

  ngOnInit() {}
  ngOnChanges(changes: SimpleChanges): void {
    if (JSON.stringify(this.option) !== '{}') {
      this.backCrosswiseBar('revenue');
    }
  }
  // 统计图渲染
  public backCrosswiseBar(type) {
    const barData = [];
    const barArea = [];
    this.option.data.yAxis.map((val, index) => {
      console.log(val.serviceAreaId);
      // if ()
      this.serviceZoneId.push(val);
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
  /*统计图点击事件*/
  public rankingClick(e) {
   /* console.log(this.serviceZoneId[e.dataIndex]);
    console.log(e.name);*/
   this.serviceZoneId.forEach( v => {
     // console.log(v);
     if (e.name === v.serviceName) {
       this.setServiceAreaId = v.serviceAreaId;
     }
   });
   // console.log(this.serviceAreaId);
    this.router.navigate(['/home/serzone', {id: this.setServiceAreaId, name: e.name}]);
  }
}

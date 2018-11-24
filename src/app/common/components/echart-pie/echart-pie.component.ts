import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {NgxEchartsService} from 'ngx-echarts';
import {Router} from '@angular/router';

@Component({
  selector: 'app-echart-pie',
  templateUrl: './echart-pie.component.html',
  styleUrls: ['./echart-pie.component.css']
})
export class EchartPieComponent implements OnInit, OnChanges {
  @Input() public options3dPieData: any;
  public options3dPie = {};
  public options3dPieInstance: any;
  constructor(
    private es: NgxEchartsService,
    private router: Router,
  ) { }

  ngOnInit() {}
  ngOnChanges(changes: SimpleChanges): void {
    if (this.options3dPieData) {
      this.optionsPie();
    }
  }
  public optionsPie(): void {
    this.options3dPie = {
      title: {
        text: `贵州省各市所有服务区年度${this.options3dPieData.title}类型占比统计`,
        x: 'center',
        textStyle: {
          color: '#fff',
          fontSize: 16
        }
      },
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c} ({d}%)'
      },
      series: [
        {
          name: `总计：${this.options3dPieData.total}`,
          type: 'pie',
          radius: '60%',
          center: ['50%', '50%'],
          data: this.options3dPieData.data,
          itemStyle: {
            color: function (params) {
              return ['#CE2D79', '#BDD139', '#78E77D', '#09D4D6', '#3C75B9',
                '#6769B1', '#FF8C9D', '#2796C4', '#E57D0D'][params.dataIndex];
            },
            emphasis: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]
    };
  }
  public options3dPieInit(ec) {
    this.options3dPieInstance = ec;
  }
  public options3dPieClick(e): void {
    if (e.name === '贵阳市') {
      this.router.navigate(['/home/city', {name: e.name}]);
    } else {
      window.alert (`很抱歉，${e.name}暂无数据`);
    }
  }
}

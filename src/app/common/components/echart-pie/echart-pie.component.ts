import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
@Component({
  selector: 'app-echart-pie',
  templateUrl: './echart-pie.component.html',
  styleUrls: ['./echart-pie.component.css']
})
export class EchartPieComponent implements OnInit, OnChanges {
  @Input() public option: any;
  @Input() public height: any;
  @Output() public pieClick = new EventEmitter<any>();
  public options3dPie = {};
  public options3dPieInstance: any;
  constructor() { }

  ngOnInit() {}
  ngOnChanges(changes: SimpleChanges): void {
    if (this.option) {
      console.log(this.option);
      this.optionsPie();
    }
  }
  public optionsPie(): void {
    const that = this;
    if (this.option.title === '') {
      this.options3dPie = {
        tooltip: {
          trigger: 'item',
          formatter: '{b} : {c} ({d}%)'
        },
        series: [
          {
            type: 'pie',
            radius: '55%',
            center: ['50%', '50%'],
            color: this.option.color,
            label: {
              show: true,
              position: 'outside',
              formatter: '{b}: {d}%',
              color: 'white',
              align: 'center',
              emphasis: {
                show: true,
                textStyle: {
                  fontSize: 12
                }
              }
            },
            data: this.option.data,
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      };
    } else {
      this.options3dPie = {
        title: {
          text: `${this.option.title}`,
          x: 'center',
          textStyle: {
            color: '#fff',
            fontSize: 16
          }
        },
        tooltip: {
          trigger: 'item',
          formatter: '{b} : {c} ({d}%)'
        },
        series: [
          {
            type: 'pie',
            radius: '55%',
            center: ['50%', '50%'],
            color: this.option.color,
            label: {
              show: true,
              position: 'outside',
              formatter: '{b}: {d}%',
              align: 'center',
              emphasis: {
                show: true,
                textStyle: {
                  fontSize: 12
                }
              }
            },
            data: this.option.data,
            itemStyle: {
              color: function (params) {
                return that.option.color[params.dataIndex];
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
  }
  public options3dPieInit(ec) {
    this.options3dPieInstance = ec;
  }
  public options3dPieClick(e): void {
    this.pieClick.emit(e);
  }
}

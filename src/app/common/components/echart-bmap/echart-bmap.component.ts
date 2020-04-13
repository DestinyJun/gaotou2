import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {NgxEchartsService} from 'ngx-echarts';
import {Router} from '@angular/router';
class Option {
  minZoom = 5; // 地图最小级别
  maxZoom = 19; // 地图最大级别
  center = [116.402288, 40.131121]; // 地图中心点
  zoom = 12; // 地图默认级别
  area = ''; // 地图默认级别
}
@Component({
  selector: 'app-echart-bmap',
  templateUrl: './echart-bmap.component.html',
  styleUrls: ['./echart-bmap.component.css']
})
export class EchartBmapComponent implements OnInit, OnChanges {
  @Input() public option: Option = new Option();
  @Input() public width: any;
  @Input() public height: any;
  @Input() public points: any = null;
  @Output() public cityClick = new EventEmitter<any>();
  @Output() public areaClick = new EventEmitter<any>();
  public areaName: any;
  public options: any;
  public updateOptions: any = {};
  constructor(
    private es: NgxEchartsService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.options = {
      tooltip: {
        show: true,
        formatter: '{b}',
      },
      geo: {
        show: true,
        map: this.option.area,
        roam: true,
        width: '90%',
        zoom: 0.5,
        scaleLimit: {
          min: 0.3,
          max: 2
        },
        itemStyle: {
          color: 'rgb(5,101,123)',
          opacity: 1,
          borderWidth: 0.8,
          borderColor: 'rgb(62,215,213)'
        },
        label: {
          show: false,
          textStyle: {
            color: '#fff', // 地图初始化区域字体颜色
            fontSize: 14,
            opacity: 1,
            backgroundColor: 'rgba(0,0,0,0)'
            // backgroundColor: 'rgba(53,171,199,0)'
          },
        },
        emphasis: {
          label: {
            show: false,
          },
          itemStyle: {
            color: '#071D3B',
          }
        },
      },
      series: [
        {
          type: 'map',
          map: this.option.area,
          roam: true,
          geoIndex: 0,
          data: [],
          zlevel: 1,
        },
        {
          name: '区域名称',
          type: 'scatter',
          coordinateSystem: 'geo',
          data: [],
          symbolSize: function () {
            return 3;
          },
          label: {
            formatter: '{b}',
            position: 'left',
            show: true,
            color: '#FFDD00',
          },
          itemStyle: {
            normal: {
              color: 'transparent'
            }
          },
          zlevel: 2,
        },
        {
          name: '服务区',
          type: 'scatter',
          coordinateSystem: 'geo',
          data: [],
          symbolSize: function () {
            return 10;
          },
          label: {
            formatter: '{b}',
            position: 'right',
            show: false
          },
          itemStyle: {
            normal: {
              color: '#15E178'
            }
          },
          zlevel: 2,
        },
      ]
    };
  }
  ngOnChanges(changes: SimpleChanges): void {
     if (this.points) {
       this.echartsMapInitialize();
     }
  }
  public echartsMapInitialize() {
    // 服务区点
    const pointDatas = [];
    this.points.map((item) => {
      const a = [];
      a.push(item.longitude);
      a.push(item.latitude);
      if (a) {
        a.push(150);
        a.push(item.serviceAreaId);
      }
      pointDatas.push({name: item.serviceAreaName, value: a});
    });
    /*获取地图数据*/
    const geoCoordMap = {};
    const datas = [];
    const convertData = function (data) {
      const res = [];
      for (let i = 0; i < data.length; i++) {
        const geoCoord = geoCoordMap[data[i].name];
        if (geoCoord) {
          res.push({
            name: data[i].name,
            value: geoCoord.concat(data[i].value)
          });
        }
      }
      return res;
    };
    this.updateOptions = {
      geo: {
        map: this.option.area,
      },
      series: [
        {
          map: this.option.area,
          data: datas
        },
        {
          data: convertData(datas),
        },
        {
          data: pointDatas,
        }
      ]
    };
  }
  public echartMapClick (event): void {
    if (event.componentSubType === 'scatter') {
      this.router.navigate(['/home/serzone', {id: event.data.value[3], name: event.data.name}]);
      return;
    }
    if (event.componentSubType === 'map') {
      this.router.navigate(['/home/city', {id: event.data.id, name: event.data.name}]);
      return;
    }
  }
}

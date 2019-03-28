import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {NgxEchartsService} from 'ngx-echarts';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
class Option {
  area = ''; // 地图默认级别
}
@Component({
  selector: 'app-echarts-city-bmap',
  templateUrl: './echarts-city-bmap.component.html',
  styleUrls: ['./echarts-city-bmap.component.css']
})

export class EchartsCityBmapComponent implements OnInit, OnChanges {
  @Input() public option: Option = new Option();
  @Input() public width: any;
  @Input() public height: any;
  @Input() public points: any = null;
  @Output() public cityClick = new EventEmitter<any>();
  @Output() public areaClick = new EventEmitter<any>();
  public citys: any = {
    '贵阳市': '520100',
    '六盘水市': '520200',
    '遵义市': '520300',
    '安顺市': '520400',
    '铜仁市': '522200',
    '黔西南布依族苗族自治州': '522300',
    '毕节市': '522400',
    '黔东南苗族侗族自治州': '522600',
    '黔南布依族苗族自治州': '522700',
  };
  public areaName: any;
  public options: any;
  public updateOptions: any = {};
  constructor(
    private es: NgxEchartsService,
    private http: HttpClient,
    private router: Router,
  ) { }

  ngOnInit() {
    this.options = {
      /* title: {
    text: '全国行政区划3D地图',
    x: 'center',
    top: '20',
    textStyle: {
      color: 'white',
      fontSize: 24
    }
  },*/
      tooltip: {
        show: true,
        formatter: '{b}',
      },
      geo3D: {
        map: this.option.area,
        left: 'auto',
        right: 'auto',
        top: 'auto',
        bottom: 'auto',
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
          // 当鼠标放上去  地区区域是否显示名称
          label: {
            show: false,
            textStyle: {
              color: '#fff',
              fontSize: 16,
              backgroundColor: 'rgba(0,23,11,0)'
            }
          },
          itemStyle: {
            color: '#071D3B',
          }
        },
        // shading: 'lambert',
        light: { // 光照阴影
          main: {
            color: '#fff', // 光照颜色
            intensity: 1.2, // 光照强度
            // shadowQuality: 'high', // 阴影亮度
            shadow: false, // 是否显示阴影
            alpha: 55,
            beta: 10
          },
          ambient: {
            intensity: 0.3
          }
        },
        viewControl: {
          distance: 155,
          minDistance: 50,
          maxDistance: 300,
          zoomSensitivity: 5
        }
      },
      series: [
        {
          name: '散点',
          type: 'scatter3D',
          coordinateSystem: 'geo3D',
          data: [],
          symbolSize: function () {
            return 10;
          },
          label: {
            normal: {
              formatter: '{b}',
              position: 'left',
              show: true
            },
            emphasis: {
              show: true
            }
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
          type: 'scatter3D',
          coordinateSystem: 'geo3D',
          data: [],
          symbolSize: function () {
            return 10;
          },
          label: {
            normal: {
              formatter: '{b}',
              position: 'right',
              show: false
            },
            emphasis: {
              show: false
            }
          },
          itemStyle: {
            normal: {
              color: 'red'
            }
          },
          zlevel: 2,
        },
        // 画线
        /*{
          type: 'lines3D',

          coordinateSystem: 'geo3D',

          effect: {
            show: true,
            trailWidth: 4,
            trailOpacity: 0.5,
            trailLength: 0.3,
            constantSpeed: 5
          },

          blendMode: 'lighter',

          lineStyle: {
            width: 0.2,
            opacity: 0.05
          },
          data: alirl
        }*/
      ]
    };
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (this.points) {
      this.echartsCityInitialize();
    }
  }
  // map clikc
  public echartMapClick (event): void {
    if (event.componentSubType === 'scatter3D') {
      this.router.navigate(['/home/serzone', {id: event.data.value[3], name: event.data.name}]);
      return;
    }
  }
  public echartsCityInitialize() {
    this.http.get(`/assets/data/${this.citys[this.option.area]}.json`)
      .subscribe((geoJson) => {
        this.es.registerMap(this.option.area, geoJson);
        // 服务区点
        const pointDatas = [];
        this.points.map((val, index1) => {
          const a = [];
          val.attributeValueList.map((item, index2) => {
            if (item.attributeDesc === '经度') {
              a.push(item.attributeValue);
            } else if (item.attributeDesc === '纬度') {
              a.push(item.attributeValue);
            }
          });
          if (a) {
            a.push(150);
            a.push(val.id);
          }
          pointDatas.push({name: val.name, value: a});
        });
        /*获取地图数据*/
        const geoCoordMap = {};
        const datas = [];
        const mapFeatures = this.es.getMap(this.option.area).geoJson.features;
        mapFeatures.forEach(function(v) {
          // 地区名称
          const name = v.properties.name;
          // 地区经纬度
          geoCoordMap[name] = v.properties.centroid;
          datas.push({name: v.properties.name, value: 150});
        });
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
          geo3D: {
            map: this.option.area,
          },
          series: [
            {
              data: convertData(datas),
            },
            {
              data: pointDatas,
            }
          ]
        };
  });
  }
}

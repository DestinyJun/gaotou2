import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {LocalStorageService} from '../../common/services/local-storage.service';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {NgxEchartsService} from 'ngx-echarts';
@Component({
  selector: 'app-whole-data',
  templateUrl: './whole-data.component.html',
  styleUrls: ['./whole-data.component.less']
})
export class WholeDataComponent implements OnInit, OnChanges {
  // 全国、省级数据切换
  public dataToggle = '全国';
  // 弹出框的标题及显影控制
  public alertBarTitle: string;
  // 省市联动数据及状态
  public province: any;
  public flag: string;
  // echarts
  public options: any = {};

  constructor(
    private http: HttpClient,
    private router: Router,
    private localService: LocalStorageService,
    private es: NgxEchartsService,
  ) {}

  ngOnInit() {
    // 发射实时客流
    this.getPerson();
    // 发射业太数据名称
    this.localService.eventBus.next({title: this.dataToggle + '高速业态大数据', flagState: 'whole', flagName: this.dataToggle});
    this.updataEcharts();
  }

  ngOnChanges(changes: SimpleChanges): void {
  }

  // 数据更新
  public updataEcharts(): void {
    // this.centerMap2();
    this.echartsMap();
  }

  // 客流
  public getPerson(): void {
    this.localService.persons.next({
      total: [],
      province: [],
      city: []
    });
  }

  /**********************************图表配置*****************************/
  // echarts map
  public echartsMap(): void {
    /*获取地图数据*/
    const geoCoordMap = {};
    const mapFeatures = this.es.getMap('china').geoJson.features;
    // const a = this.es.getMap('G60').geoJson.features;
    // console.log(a);
    mapFeatures.forEach(function(v) {
      // 地区名称
      const name = v.properties.name;
      // 地区经纬度
      geoCoordMap[name] = v.properties.cp;
    });
    geoCoordMap['台湾'] = [121.058785, 23.82262];
    const datas = [
      {name: '北京', value: 177},
      {name: '天津', value: 42},
      {name: '河北', value: 102},
      {name: '山西', value: 81},
      {name: '内蒙古', value: 47},
      {name: '辽宁', value: 67},
      {name: '吉林', value: 82},
      {name: '黑龙江', value: 66},
      {name: '上海', value: 50},
      {name: '江苏', value: 92},
      {name: '浙江', value: 114},
      {name: '安徽', value: 109},
      {name: '福建', value: 116},
      {name: '江西', value: 91},
      {name: '山东', value: 119},
      {name: '河南', value: 137},
      {name: '湖北', value: 116},
      {name: '湖南', value: 114},
      {name: '重庆', value: 91},
      {name: '四川', value: 125},
      {name: '贵州', value: 62},
      {name: '云南', value: 83},
      {name: '西藏', value: 50},
      {name: '陕西', value: 80},
      {name: '甘肃', value: 56},
      {name: '青海', value: 50},
      {name: '宁夏', value: 50},
      {name: '新疆', value: 67},
      {name: '广东', value: 123},
      {name: '广西', value: 59},
      {name: '海南', value: 50},
      {name: '台湾', value: 50},
    ];
    const alirl = [
      [
        [121.15, 31.89],
        [109.781327, 39.608266]
      ],
      [
        [120.38, 37.35],
        [122.207216, 29.985295]
      ],
      [
        [123.97, 47.33],
        [120.13, 33.38]
      ],
      [
        [118.87, 42.28],
        [120.33, 36.07]
      ],
      [
        [121.52, 36.89],
        [117.93, 40.97]
      ],
      [
        [102.188043, 38.520089],
        [122.1, 37.5]
      ],
      [
        [118.58, 24.93],
        [101.718637, 26.582347]
      ],
      [
        [120.53, 36.86],
        [121.48, 31.22]
      ],
      [
        [119.46, 35.42],
        [122.05, 37.2]
      ],
      [
        [119.97, 35.88],
        [116.1, 24.55]
      ],
      [
        [121.05, 32.08],
        [112.02, 22.93]
      ],
      [
        [91.11, 29.97],
        [118.1, 24.46]
      ]
    ];
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
    this.options = {
     /* title: {
        text: '全国行政区划3D地图',
        x: 'center',
        top: '20',
        textStyle: {
          color: '#000',
          fontSize: 24
        }
      },*/
      tooltip: {
        show: true,
        formatter: '{b}',
      },
      geo: {
        map: 'china',
        width: '90%',
        roam: true,
        scaleLimit: {
          min: 0.5,
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
          },
        },
        emphasis: {
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
      },
      series: [
        {
          name: '散点',
          type: 'effectScatter',
          coordinateSystem: 'geo',
          data: convertData(datas),
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
              color: '#F2E725'
            }
          },
          zlevel: 2,
        },
        /* {
          type: 'map',
          map: 'china',
          label: {
            show: false,
          },
          itemStyle: {
            color: 'red',
            opacity: 1,
            borderWidth: 0.8,
            borderColor: 'rgb(62,215,213)'
          },
         /!* viewControl: {
            minDistance: 90,
            maxDistance: 120,
            zoomSensitivity: 5
          },*!/
          data: datas,
          zlevel: 1,
        },*/
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
  // map clikc
  public wholeMapClick (event): void {
    if (event.name === '贵州') {
      this.router.navigate(['/home/province', {id: 2, name: event.name + '省'}]);
    } else {
      this.router.navigate(['/home/province', {id: 6, name: event.name + '省'}]);
      // window.alert(addComp.province + '暂无数据，敬请期待');
    }
  }
}

import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {LocalStorageService} from '../../common/services/local-storage.service';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {environment} from '../../../environments/environment';
import {NgxEchartsService} from 'ngx-echarts';

declare let BMap;

@Component({
  selector: 'app-whole-data',
  templateUrl: './whole-data.component.html',
  styleUrls: ['./whole-data.component.css']
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
  ) {
  }

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
  // 百度地图画省边界外
  public centerMap2() {
    const that = this;
    const map = new BMap.Map('center_map', {minZoom: 5});
    map.setMapStyle({
      styleJson: [
        // 城市名字的颜色
        /*{
            "featureType": "city",
            "elementType": "labels.text.fill",
            "stylers": {
                "color": "#aedce2ff",
                "visibility": "on"
            }
        },*/
        // 地图背景颜色
        {
          'featureType': 'background',
          'elementType': 'all',
          'stylers': {
            'color': '#002240'
          }
        },
        // 高速配置
        {
          'featureType': 'highway',
          'elementType': 'all',
          'stylers': {
            'color': '#0045C4',
            'visibility': 'on'
          }
        },
        {
          'featureType': 'highway',
          'elementType': 'geometry',
          'stylers': {
            'color': '#0045C4',
            'weight': '0.1',
            'visibility': 'on'
          }
        },
        {
          'featureType': 'local',
          'elementType': 'all',
          'stylers': {
            'visibility': 'on'
          }
        },
        {
          'featureType': 'railway',
          'elementType': 'all',
          'stylers': {
            'visibility': 'off'
          }
        },
        // 配置区县不显示
        {
          'featureType': 'district',
          'elementType': 'all',
          'stylers': {
            'visibility': 'off'
          }
        }
      ]
    });
    map.centerAndZoom(new BMap.Point(108.625087, 31.826263), 5);
    map.enableScrollWheelZoom(false);
    map.disableDoubleClickZoom(false);
    // 创建一个右键菜单
    const menu = new BMap.ContextMenu();
    // 定义右键菜单的内容
    const txtMenuItem = [
      {
        text: '放大',
        callback: function () {
          console.log('地图放大');
        }
      },
      {
        text: '缩小',
        callback: function () {
          console.log('地图缩小');
        }
      }
    ];
    // 给右键菜单里面添加东西
    for (let i = 0; i < txtMenuItem.length; i++) {
      // 右键菜单里面添加的内容格式是一个MenuItem类
      menu.addItem(new BMap.MenuItem(txtMenuItem[i].text, txtMenuItem[i].callback, 100));
    }

    // 控制地图显示范围
    /* const b = new BMap.Bounds(new BMap.Point(105.75777, 24.618423), new BMap.Point(109.400435, 30.469081));
     try {
       BMapLib.AreaRestriction.setBounds(map, b);
     } catch (e) {
       alert(e);
     }*/

    // 编写自定义函数,创建标注
    /* const pointsMarket = [
       [106.626806, 26.683542, '贵阳服务区', 80],
       [104.842269, 26.625681, '遵义服务区', 150],
       [105.293002, 27.301609, '六盘水服务区', 300],
       [106.93956, 27.760846, '毕节服务区', 781],
       [106.994752, 26.0953, '安顺服务区', 198]
     ];*/


    // 添加5标注
    /* for (let i = 0; i < pointsMarket.length; i++) {
       const points = new BMap.Point(pointsMarket[i][0], pointsMarket[i][1]);
       addMarker(points, pointsMarket[i][2], pointsMarket[i][3]);
     }*/

    // 绘制边线轮廓
    const provinces = [
      '北京市',
      '上海市',
      '天津市',
      '重庆市',
      '河北省',
      '山西省',
      '内蒙古自治区',
      '辽宁省',
      '吉林省',
      '黑龙江省',
      '江苏省',
      '浙江省',
      '安徽省',
      '福建省',
      '江西省',
      '山东省',
      '河南省',
      '湖北省',
      '湖南省',
      '广东省',
      '广西壮族自治区',
      '海南省',
      '四川省',
      '贵州省',
      '云南省,',
      '西藏自治区',
      '陕西省">陕西省',
      '甘肃省',
      '宁夏回族自治区',
      '青海省',
      '新疆',
      '香港特别行政区',
      '澳门特别行政区',
      '台湾省'];

    function getBoundary(name) {
      const bdary = new BMap.Boundary();

      function randomRgbColor() { // 随机生成RGB颜色
        const r = Math.floor(Math.random() * 256); // 随机生成256以内r值
        const g = Math.floor(Math.random() * 256); // 随机生成256以内g值
        const b = Math.floor(Math.random() * 256); // 随机生成256以内b值
        return `rgb(${r},${g},${b})`; // 返回rgb(r,g,b)格式颜色
      }

      const colors = randomRgbColor();
      bdary.get(name, function (rs) {       // 获取行政区域
        for (let i = 0; i < rs.boundaries.length; i++) {
          const ply = new BMap.Polygon(rs.boundaries[i], {
            strokeWeight: 1,
            strokeColor: colors,
            fillColor: colors,
            fillOpacity: 0.3
          }); // 建立多边形覆盖物
          map.addOverlay(ply);  // 添加覆盖物
          // map.setViewport(ply.getPath());    //调整视野
        }
      });
    }

    for (let i = 0; i <= provinces.length; i++) {
      getBoundary(provinces[i]);
    }

    // getBoundary('贵阳',"#F9EB08");
    // getBoundary('遵义',"#00FF00");
    // getBoundary('毕节',"#00FF00");
    /* getBoundary('安顺市',"#01D867");
     getBoundary('铜仁地区',"#00FF00");

     getBoundary('六盘市',"#00FF00");

     getBoundary('黔西南布依族苗族自治州',"#00FF00");
     getBoundary('黔东南苗族侗族自治州',"#00FF00");
     getBoundary('黔南布依族苗族自治州',"#00FF00");*/

    // 地图事件，逆地址解析
    const geoc = new BMap.Geocoder();
    map.addEventListener('click', function (e) {
      const pt = e.point;
      geoc.getLocation(pt, function (rs) {
        const addComp = rs.addressComponents;
        if (addComp.province === '贵州省') {
          that.router.navigate(['/home/province', {id: 2, name: addComp.province}]);
        } else {
          that.router.navigate(['/home/province', {id: 6, name: addComp.province}]);
          // window.alert(addComp.province + '暂无数据，敬请期待');
        }
      });
    });
  }

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
      title: {
        text: '全国行政区划3D地图',
        x: 'center',
        top: '20',
        textStyle: {
          color: '#000',
          fontSize: 24
        }
      },
      tooltip: {
        show: true,
        formatter: '{b}',
      },
      geo3D: {
        map: 'china',
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
          minDistance: 90,
          maxDistance: 120,
          zoomSensitivity: 5
        }
      },
      series: [
        {
          type: 'map3D',
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
          data: datas,
          zlevel: 1,
        },
        {
          name: '散点',
          type: 'scatter3D',
          coordinateSystem: 'geo3D',
          data: convertData(datas),
          symbolSize: function () {
            return 10;
          },
          label: {
            normal: {
              formatter: '{b}',
              position: 'right',
              show: true
            },
            emphasis: {
              show: true
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
  // map clikc
  public wholeMapClick (event): void {
      console.log(event);
  }
}

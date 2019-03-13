import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
declare let BMap;
class Option {
  minZoom = 5; // 地图最小级别
  maxZoom = 19; // 地图最大级别
  center = [116.402288, 40.131121]; // 地图中心点
  zoom = 12; // 地图默认级别
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
  constructor() { }

  ngOnInit() {}
  ngOnChanges(changes: SimpleChanges): void {
     if (this.points) {
       this.mapinitialize();
     }
  }
  public mapinitialize() {
    const that = this;
    const map = new BMap.Map('bmap', {minZoom: this.option.minZoom, maxZoom: this.option.maxZoom});
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
            'color': '#B3BDC6',
            'weight': '0.6',
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
    map.centerAndZoom(new BMap.Point(this.option.center[0], this.option.center[1]), this.option.zoom);
    map.enableScrollWheelZoom(true);
    map.disableDoubleClickZoom(false);
    // 编写自定义函数,创建标注
    if (this.points) {
      const pointsMarket = [];
      this.points.map((val, index1) => {
        console.log(val);
        const a = [];
        val.attributeValueList.map((item, index2) => {
          if (item.attributeDesc === '经度') {
            a.push(item.attributeValue);
          } else if (item.attributeDesc === '纬度') {
            a.push(item.attributeValue);
          }
        });
        if (a) {
          a.push(val.name);
        }
        pointsMarket.push(a);
      });
      if (pointsMarket) {
        for (let i = 0; i < pointsMarket.length; i++) {
          const points = [pointsMarket[i][0], pointsMarket[i][1]];
          addMarker(points, pointsMarket[i][2]);
        }
      }
      /*this.financeDataService.getServiceNamePoint().subscribe(
        (val) => {
          if (val.status === '200') {
            val.data.map((val1, index1) => {
              const a = [];
              val1.attributeValueList.map((val2, index2) => {
                if (val2.attributeDesc === '经度') {
                  a.push(val2.attributeValue);
                } else if (val2.attributeDesc === '纬度') {
                  a.push(val2.attributeValue);
                }
              });
              if (a) {
                a.push(val1.name);
              }
              pointsMarket.push(a);
            });
          }
          if (pointsMarket) {
            for (let i = 0; i < pointsMarket.length; i++) {
              const points = [pointsMarket[i][0], pointsMarket[i][1]];
              addMarker(points, pointsMarket[i][2]);
            }
          }
        });*/
    }
    function addMarker(point, name) {
      const myIcon = new BMap.Icon('assets/images/s1.png', new BMap.Size(10, 10), {
        offset: new BMap.Size(0, 10),
      });
      const points = new BMap.Point(point[0], point[1]);
      const marker = new BMap.Marker(points, {icon: myIcon});
      map.addOverlay(marker);
      // market事件
      marker.addEventListener('mouseover', function () {
        // 信息窗口
        const sContent = `<div><h5>${name}</h5></div>`;
        const infoWindow = new BMap.InfoWindow(sContent, {enableCloseOnClick: true});
        this.openInfoWindow(infoWindow);
      });
      marker.addEventListener('click', function (e) {
        // that.areaClick.emit({name: name, flag: 'point'});
        that.areaName = name;
      });
    }
    // 绘制边线轮廓rankingClick
    const citys = [
      '贵州省',
      '贵阳市',
      '遵义市',
      '毕节市',
      '铜仁市',
      '安顺市',
      '六盘水市',
      '贵阳市',
      '黔西南布依族苗族自治州',
      '黔东南苗族侗族自治州',
      '黔南布依族苗族自治州',
    ];
    function getBoundary(name) {
      const bdary = new BMap.Boundary();

      function randomRgbColor() { // 随机生成RGB颜色
        const r = Math.floor(Math.random() * 256); // 随机生成256以内r值
        const g = Math.floor(Math.random() * 256); // 随机生成256以内g值
        const b = Math.floor(Math.random() * 256); // 随机生成256以内b值
        return `rgb(${r},${g},${b})`; // 返回rgb(r,g,b)格式颜色
      }

      const colors = randomRgbColor();
      if (name === '贵州省') {
        bdary.get(name, function (rs) {       // 获取行政区域
          for (let i = 0; i < rs.boundaries.length; i++) {
            const ply = new BMap.Polygon(rs.boundaries[i], {
              strokeWeight: 3,
              strokeColor: 'white',
              fillColor: '',
              fillOpacity: 0
            }); // 建立多边形覆盖物
            map.addOverlay(ply);  // 添加覆盖物
            // map.setViewport(ply.getPath());    // 调整视野
          }
        });
      }
      bdary.get(name, function (rs) {       // 获取行政区域
        for (let i = 0; i < rs.boundaries.length; i++) {
          const ply = new BMap.Polygon(rs.boundaries[i], {
            strokeWeight: 1,
            strokeColor: colors,
            fillColor: colors,
            fillOpacity: 0.1
          }); // 建立多边形覆盖物
          map.addOverlay(ply);  // 添加覆盖物
          // map.setViewport(ply.getPath());    // 调整视野
        }
      });
    }
    for (let i = 0; i <= citys.length; i++) {
      getBoundary(citys[i]);
    }
    // 地图事件，逆地址解析
    const geoc = new BMap.Geocoder();
    map.addEventListener('click', function (e) {
      const pt = e.point;
      if (!e.overlay.Bc) {
        geoc.getLocation(pt, function (rs) {
          const addComp = rs.addressComponents;
          that.cityClick.emit({areaName: that.areaName, cityName: addComp.city});
        });
      }
    });
  }

}

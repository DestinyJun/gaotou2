import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {LocalStorageService} from '../../common/services/local-storage.service';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
declare let BMap;
@Component({
  selector: 'app-whole-data',
  templateUrl: './whole-data.component.html',
  styleUrls: ['./whole-data.component.css']
})
export class WholeDataComponent implements OnInit, OnChanges {
  // 实时客流量
  public persons = [];
  // 全国、省级数据切换
  public dataToggle = '全国';
  // 弹出框的标题及显影控制
  public alertBarTitle: string;
  // 服务区地图分布
  public mapName = 'china';
  public mapCenter = [101.74, 36.56];
  public mapZoom = 0.8;
  public mapLeft = '';
  public mapRight = '';
  // 省市联动数据及状态
  public selectDate = '全国';
  public province: any;
  public city: any;
  public citeDate: string;
  public provinceShow = false;
  public cityShow = false;
  public flag: string;

  constructor(
    private http: HttpClient,
    private router: Router,
    private localService: LocalStorageService
  ) {
  }
  ngOnInit() {
    // 发射实时客流
    this.localService.persons.next(this.persons);
    // 发射业太数据名称
    this.localService.eventBus.next({title: this.dataToggle + '高速业态大数据',  flagState: 'whole', flagName: this.dataToggle});
    this.updataEcharts();
    // 全屏点击事件
    window.document.addEventListener('click', (e) => {
      this.flag = e.srcElement.parentElement.className;
      if ((this.provinceShow || this.cityShow) && !(this.flag === 'location')) {
        this.provinceShow = false;
        this.cityShow = false;
      }
    });
  }
  ngOnChanges(changes: SimpleChanges): void {}
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
          that.router.navigate(['/home/finance', {name: addComp.province}]);
        } else {
          window.alert(addComp.province + '暂无数据，敬请期待');
        }
      });
    });
  }
  // 图表更新
  public updataEcharts(): void {
    this.centerMap2();
  }
  // 省市联动
  public provinceClick() {
    this.provinceShow = true;
    this.http.get('assets/data/province.json').subscribe(
      (res) => {
        this.province = res;
      }
    );
  }
  public provinceMouseEnter(item) {
    if (item === '全国') {
      this.cityShow = false;
      return;
    } else if (item === '贵州省') {
      this.cityShow = true;
      this.http.get('assets/data/guizhoucity.json').subscribe(
        (res) => {
          this.city = res[0].children;
          this.citeDate = res[0].province;
        }
      );
    } else if (item === '云南省') {
      this.cityShow = true;
      this.http.get('assets/data/yunnancity.json').subscribe(
        (res) => {
          this.city = res[0].children;
          this.citeDate = res[0].province;
        }
      );
    } else {
      this.cityShow = true;
      this.city = [{city: '暂未开通'}];
      this.citeDate = '暂未开通';
    }
  }
  public provinceDataClick(item) {
    this.selectDate = item.province;
    if (item.name === '全国') {
      this.dataToggle = '全国';
    } else if (item.name === '贵州') {
      this.dataToggle = '贵州';
      this.router.navigate(['/home/finance']);
      // this.centerMap1();
    } else {
      window.confirm('此地区暂未开通');
    }
  }
  public cityDataClick(item) {
    if (item.name === 'china') {
      this.mapName = 'china';
      this.mapCenter = [117.98561551896913, 31.205000490896193];
      this.mapZoom = 0.8;
      this.mapLeft = '5%';
      this.mapRight = '15%';
    } else {
      this.mapName = '贵州';
      this.mapLeft = '5%';
      this.mapRight = '0%';
      this.mapCenter = [106.682234, 26.626655];
      this.mapZoom = 0.5;
    }
    this.selectDate = this.citeDate + item.city;
    this.provinceShow = false;
    this.cityShow = false;
  }
}

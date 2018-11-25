import {Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {Router} from '@angular/router';
import {DataService} from '../../common/services/data.service';
import {ConfigModule, WenjunAlertService} from '../../common/wenjun';
import {FinanceDataService} from '../../common/services/finance-data.service';
import {LocalStorageService} from '../../common/services/local-storage.service';
import {Bar3dExportType, CarExportType, IncomeExportType} from '../../common/model/shared.model';
import {C} from '@angular/core/src/render3';
declare let BMap;
@Component({
  selector: 'app-finance-data',
  templateUrl: './finance-data.component.html',
  styleUrls: ['./finance-data.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class FinanceDataComponent implements OnInit, OnDestroy {
  /***********************基础信息************************/
    // 组件销毁后清除时钟任务
  public vehicleAmountCountClean: any;
  public incomeAmountCountClean: any;
  public personAmountCountClean: any;
  /****************************左边***************************/
    // 3D柱状图配置
  public options3d: any;
  public options3dCopy: any;
  public alertBarShow = false;  // 3D柱状图弹窗
  public alertBarTitle: string;
  public options3dBar = {};
  public options3dPie = {};
  public outOptions3d: any; // 3D图组件传出来的值
  public bar3dExcelShow = false;  // 3D图统计的表格导出
  public bar3dExportType: Bar3dExportType = new Bar3dExportType;
  // 车辆监控
  public vehicleAmount: any;
  public optionsCarModel = {};
  public alertCarShow = false;
  public alertCarTitle = '';
  public optionsCarType = {};
  public arryCarPie = [];
  public carTableData: any;
  public carAreaName = '贵州省';
  public carExcelShow = false;
  public carExportType: CarExportType = new CarExportType();

  /*****************************中部**************************/
    // 省市联动
  public dataToggle = '贵州省';
  public selectDate = '贵州省';
  public province: any;
  public city: any;
  public citeDate: string;
  public provinceShow = false;
  public cityShow = false;
  public flag: string;
  // 事件类型
  public eventTypes: any;
  public eventConfig: ConfigModule;
  // 办公类事件
  public officeTypes: any;
  public alertOfficeShow = false;
  // 个人类事件
  public personOfficeTypes: any;
  public alertPersonShow = false;

  /*****************************右边***************************/
    // 全国业态经营数据前十排名
  public crosswiseBar = {};
  public barStatus1 = true;
  public barStatus2 = false;
  public barStatus3 = false;
  public dataStatus = '业态收入/万元';
  // 收入监控
  public incomeAmount: any;
  public optionsIncomeModel = {};
  public alertIncomeShow = false;
  public alertIncomeTitle = '';
  public optionsIncomeTypes = {};
  public IncomeTableData: any;
  public arryIncomePie = [];
  public incomeExcelShow = false;
  public incomeExportType: IncomeExportType = new IncomeExportType();

  /**********************基础数据部分**********************/
  public esDate: any;  // 时间初始化
  public value: Date; // 时间选择器
  public date6: Date;
  constructor(
    private dataService: DataService,
    private router: Router,
    private wenJunAlertService: WenjunAlertService,
    private financeDataService: FinanceDataService,
    private localService: LocalStorageService
  ) {}

  ngOnInit() {
    // 实时数据
    this.vehicleAmountCount();
    this.CarTypes();
    this.incomeAmountCount();
    this.IncomeTypes();
    // 时间初始化
    this.esDate = {
      firstDayOfWeek: 0,
      dayNames: ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'],
      dayNamesShort: ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'],
      dayNamesMin: ['周日', '周一', '周二', '周三', '周四', '周五', '周六'],
      monthNames: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
      monthNamesShort: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
      today: '今天',
      clear: '清除'
    };
    // 发射也太数据名称
    this.localService.eventBus.next({title: '贵州省高速业态大数据',  flagState: 'finance', flagName: this.dataToggle});
    // 图表更行
    this.updataEcharts();
    // 全屏点击事件
    window.document.addEventListener('click', (e) => {
      this.flag = e.srcElement.parentElement.className;
      if ((this.provinceShow || this.cityShow) && !(this.flag === 'location')) {
        this.provinceShow = false;
        this.cityShow = false;
      }
    });
    window.addEventListener('resize', function (e) {
    });
  }
  ngOnDestroy(): void {
    clearInterval(this.vehicleAmountCountClean);
    clearInterval(this.incomeAmountCountClean);
    clearInterval(this.personAmountCountClean);
  }

  /**********************************左边*****************************/
  // 3D柱状图
  public packOption3() {
    // 车流客流人流
    this.financeDataService.search3DBar({id: 2, parameter: ['revenue', 'passenger', 'vehicle']}).subscribe(
      (val) => {
        this.options3d = val.data;
      }
    );
    // 用电量用水量
    this.financeDataService.search3DBar({id: 2, parameter: ['electric', 'water']}).subscribe(
      (val) => {
        this.options3dCopy = val.data;
      }
    );
  }
  public onOutOptions3d(e): void {
    this.outOptions3d = e;
    document.body.className = 'ui-overflow-hidden';
    this.alertBarShow = true;
    this.alertBarTitle = this.outOptions3d.alertBarTitle;
    // 柱状图
    this.financeDataService.search3DAlertBar({id: 2, types: this.outOptions3d.bar.types}).subscribe(
      (val) => {
        if (val.status === '200') {
          this.options3dBar = {
            data: val.data,
            xType: this.outOptions3d.pie.xType,
            title: `贵州省所有服务区年度${this.outOptions3d.alertBarTitle}统计`
          };
        }
      }
    );
    // 类型占比扇形图
    this.financeDataService.search3DAlertPie({id: 2, xType: this.outOptions3d.pie.xType, types: this.outOptions3d.pie.types}).subscribe(
      (val) => {
        if (val.status === '200') {
          this.options3dPie = {
            data: val.data,
            title: `贵州省所有服务区年度${this.outOptions3d.alertBarTitle}类型占比统计`,
            total: this.outOptions3d.total,
            color: ['#CE2D79', '#BDD139', '#78E77D', '#09D4D6', '#3C75B9',
              '#6769B1', '#FF8C9D', '#2796C4', '#E57D0D']
          };
        }
      }
    );
  }
  public onOutOptions3dBar(e): void {
    // 类型占比扇形图
    this.financeDataService.search3DAlertPie({id: 2, xType: e.xType, types: this.outOptions3d.pie.types}).subscribe(
      (val) => {
        if (val.status === '200') {
          this.options3dPie = {
            data: val.data,
            title: `贵州省所有服务区年度${this.outOptions3d.alertBarTitle}类型占比统计`,
            total: e.data,
            color: ['#CE2D79', '#BDD139', '#78E77D', '#09D4D6', '#3C75B9',
              '#6769B1', '#FF8C9D', '#2796C4', '#E57D0D']
          };
        }
      }
    );
  }
  public onOptions3dPie(e): void {
    if (e.name === '贵阳市') {
     this.router.navigate(['/home/city', {name: e.name}]);
   } else {
     window.alert (`很抱歉，${e.name}暂无数据`);
   }
  }
  public closeBarShow() {
    document.body.className = '';
    this.alertBarShow = false;
  }
  // 3D柱状图：表格导出
  public bar3dDateChange(e) {
    this.bar3dExportType.Bar3dDate = e.srcElement.value;
  }
  public bar3dTypeChange(e) {
    this.bar3dExportType.Bar3dNumType = e.srcElement.options[e.srcElement.selectedIndex].innerText;
  }
  public bar3dAreaChange(e) {
    this.bar3dExportType.Bar3dArea = e.srcElement.options[e.srcElement.selectedIndex].innerText;
    console.log(this.bar3dExportType.Bar3dArea);
  }
  public bar3dExportClick() {
    if (!(this.bar3dExportType.Bar3dDate === '')
      || !(this.bar3dExportType.Bar3dNumType === '')
      || !(this.bar3dExportType.Bar3dArea === '')) {
      this.bar3dExcelShow = false;
      console.log(this.bar3dExportType);
      // 导出表格数据初始化
      this.bar3dExportType = {
        Bar3dNumType: '',
        Bar3dArea: '',
        Bar3dDate: ''
      };
    } else {
      window.alert('请把数据选择全在提交');
    }
  }
  public open3dBarExcel() {
    this.bar3dExcelShow = true;
  }
  public close3dBarExcel() {
    this.bar3dExcelShow = false;
  }

  // 车流监控
  public vehicleAmountCount(): void {
    this.financeDataService.searchCarTotal({id: 2}).subscribe(
      (value) => {
        this.vehicleAmount = {
          number: value.data,
          unitsL: '辆'
        };
      }
    );
  }
  public CarTypes() {
    this.financeDataService.searchCarTotalPie({id: 2}).subscribe(
      (value) => {
        this.optionsCarModel = {
          data: value.data,
          title: '',
          total: '',
          color: ['#00CAE2', '#2307EF', '#4791D8']
        };
      }
    );
  }
  public parkClick(e): void {
    this.alertCarTitle = e.name + '车辆分布统计';
    this.alertCarShow = true;
    document.body.className = 'ui-overflow-hidden';
    this.arryCarPie = [];
    this.carDistribution(e);
  }
  public carDistribution(e): void {
    // 表格
    this.financeDataService.searchCarAlertTable({id: 2, types: e.name}).subscribe(
      (val) => {
        this.carTableData = val.data.contents;
      }
    );
    // 饼状图
    this.financeDataService.searchCarAlertPie({id: 2, types: e.name}).subscribe(
      (value) => {
        const arryCarPie = [];
        value.data.map((val, index) => {
          arryCarPie.push({value: 1, name: val.name});
        });
        this.optionsCarType = {
          data: arryCarPie,
          title: `贵州省各市所有服务区今日${e.name}占比统计`,
          total: '',
          color: ['#CE2D79', '#BDD139', '#78E77D', '#09D4D6', '#3C75B9',
            '#6769B1', '#FF8C9D', '#2796C4', '#E57D0D']
        };
      }
    );
  }
  public closeCarShow(): void {
    document.body.className = '';
    this.alertCarShow = false;
  }
  public optionsCarPieClick(e) {
    if (e.name === '贵阳市') {
      this.router.navigate(['/home/city', {name: e.name}]);
    } else {
      window.alert (`很抱歉，${e.name}暂无数据`);
    }
  }
  public carBtnClick(e): void {
    if (e.srcElement.innerText === '小车') {
      this.alertCarTitle = '小车' + '车辆分布统计';
      this.arryCarPie = [];
      this.carTableData = [];
      this.carDistribution({name: e.srcElement.innerText });
    }  else if (e.srcElement.innerText === '客车') {
      this.alertCarTitle = '客车' + '车辆分布统计';
      this.arryCarPie = [];
      this.carTableData = [];
      this.carDistribution({name: e.srcElement.innerText });
    } else if (e.srcElement.innerText === '货车') {
      this.alertCarTitle = '货车' + '车辆分布统计';
      this.arryCarPie = [];
      this.carTableData = [];
      this.carDistribution({name: e.srcElement.innerText });
    }
  }
  public carTableClick(e) {
    this.router.navigate(['/home/serzone', {name: e}]);
  }
  // 车流监控：表格导出
  public carDateChange(e) {
    this.carExportType.carDate = e.srcElement.value;
  }
  public carTypeChange(e) {
    this.carExportType.carNumType = e.srcElement.options[e.srcElement.selectedIndex].innerText;
  }
  public carAreaChange(e) {
    this.carExportType.carArea = e.srcElement.options[e.srcElement.selectedIndex].innerText;
  }
  public carExportClick() {
    if (!(this.carExportType.carDate === '') || !(this.carExportType.carNumType === '') || !(this.carExportType.carArea === '')) {
      this.carExcelShow = false;
      console.log(this.carExportType);
      // 导出表格数据初始化
      this.carExportType = {
        carNumType: '',
        carArea: '',
        carDate: ''
      };
    } else {
      window.alert('请把数据选择全在提交');
    }
  }
  public openCarExcel() {
    this.carExcelShow = true;
  }
  public closeCarExcel() {
    this.carExcelShow = false;
  }

  /*********************************中部*****************************/
  // 中部百度地图画省边界外
  public centerMap2() {
    const that = this;
    const map = new BMap.Map('center_map', {minZoom: 7, maxZoom: 9});
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
    map.centerAndZoom(new BMap.Point(106.640265, 26.653005), 8);
    map.enableScrollWheelZoom(true);
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
    /*  const b = new BMap.Bounds(new BMap.Point(105.75777, 24.618423), new BMap.Point(109.400435, 30.469081));
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
      [106.994752, 26.0953, '安顺服务区', 198],
      [106.706049, 26.901505, '贵州久长高速服务区', 230],
    ];*/
    const pointsMarket = [];
    this.financeDataService.getServiceNamePoint().subscribe(
      (val) => {
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
        if (pointsMarket) {
          // console.log(pointsMarket);
          for (let i = 0; i < pointsMarket.length; i++) {
            const points = [pointsMarket[i][0], pointsMarket[i][1]];
            // addMarker(points, pointsMarket[i][2], pointsMarket[i][3]);
            addMarker(points, pointsMarket[i][2]);
          }
        }
      });
   /* function addMarker(point, name, num) {
      const myIcon = new BMap.Icon('http://lbsyun.baidu.com/jsdemo/img/fox.gif', new BMap.Size(200, 130));
      const points = new BMap.Point(point[0], point[1]);
      const marker = new BMap.Marker(points);
      map.addOverlay(marker);

      // 跳动的动画
      // marker.setAnimation(BMAP_ANIMATION_BOUNCE);

      // market事件
      marker.addEventListener('mouseover', function () {
        // 信息窗口
        const sContent = `<div><h5>${name}</h5><p>驻车量：${num}辆</p></div>`;
        const infoWindow = new BMap.InfoWindow(sContent, {enableCloseOnClick: true});
        this.openInfoWindow(infoWindow);
      });
      marker.addEventListener('click', function (e) {
          if (name === '贵州久长高速服务区') {
            that.router.navigate(['/home/serzone', {name: name, point: point}]);
          } else {
            window.alert('此服务区暂无数据');
          }
        that.router.navigate(['/home/serzone', {name: name, point: point}]);
      });
    }*/
    function addMarker(point, name) {
      // const myIcon = new BMap.Icon('http://lbsyun.baidu.com/jsdemo/img/fox.gif', new BMap.Size(200, 130));
      const myIcon = new BMap.Icon('assets/images/s1.png', new BMap.Size(10, 10), {
        offset: new BMap.Size(0, 10),
      });
      const points = new BMap.Point(point[0], point[1]);
      const marker = new BMap.Marker(points, {icon: myIcon});
      map.addOverlay(marker);

      // 跳动的动画
      // marker.setAnimation(BMAP_ANIMATION_BOUNCE);

      // market事件
      marker.addEventListener('mouseover', function () {
        // 信息窗口
        // const sContent = `<div><h5>${name}</h5><p>驻车量：${num}辆</p></div>`;
        const sContent = `<div><h5>${name}</h5></div>`;
        const infoWindow = new BMap.InfoWindow(sContent, {enableCloseOnClick: true});
        this.openInfoWindow(infoWindow);
      });
      marker.addEventListener('click', function (e) {
        if (name === '久长服务区') {
          that.router.navigate(['/home/serzone', {name: name, point: point}]);
        } else {
          window.alert('此服务区暂无数据');
        }
        // that.router.navigate(['/home/serzone', {name: name, point: point}]);
      });
    }

    // 添加5标注
    /*for (let i = 0; i < pointsMarket.length; i++) {
      const points = [pointsMarket[i][0], pointsMarket[i][1]];
      // addMarker(points, pointsMarket[i][2], pointsMarket[i][3]);
      addMarker(points, pointsMarket[i][2]);
    }*/

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
        if (!e.overlay.Bc) {
          geoc.getLocation(pt, function (rs) {
         const addComp = rs.addressComponents;
         // alert(addComp.city);
         if (addComp.city === '贵阳市') {
           that.router.navigate(['/home/city']);
         } else {
           window.alert('很抱歉' + addComp.city + '暂无数据');
         }
       });
        }


    });
  }

  // 事件类型统计
  public initialize(): void {
    this.financeDataService.searchEventCategory().subscribe(
      (value) => {
        if (value.status === '200') {
          this.financeDataService.searchEventCategoryCount({id: 2, list: value.data}).subscribe(
            (item) => {
              if (item.status === '200') {
                this.eventTypes = item.data;
              }
            }
          );
        }
      }
    );
  }
  public tableEventClick(item): void {
    // 弹窗配置
    this.eventConfig = {
      alertTitle: item.eventCategoryName,
      width: 80,
      height: 60,
    };
    if (item.eventCategoryName === '经营类') {
      this.wenJunAlertService.openAlertShow();
    } else {
      this.alertOfficeShow = true;
    }
  }

  // 办公室信息处理函数
  public tableOfficeClick(): void {
    this.alertOfficeShow = true;
  }
  public closeOfficeShow() {
    this.alertOfficeShow = false;
  }

  // 个人信息处理
  public tablePersonClick() {
    this.alertPersonShow = true;
  }
  public closePersonShow() {
    this.alertPersonShow = false;
  }

  /*********************************右边*****************************/
  // 业态经营数据前十排名相关操作
  public backCrosswiseBar(type): void {
    this.financeDataService.searchTop10Bar({id: 2, type: type}).subscribe(
      (value) => {
        this.crosswiseBar = value.data;
      }
    );
  }
  public clickBtn(e): void {
    const types = ['revenue', 'vehicle', 'passenger'];
    const type1 = ['收入', '车流', '客流'];
    if (e.srcElement.innerText === '业态收入/万元') {
      this.dataStatus = '业态收入/万元';
      this.barStatus1 = true;
      this.barStatus2 = false;
      this.barStatus3 = false;
      this.backCrosswiseBar(types[0]);
    } else if (e.srcElement.innerText === '车流量/辆') {
      this.dataStatus = '车流量/辆';
      this.barStatus1 = false;
      this.barStatus2 = true;
      this.barStatus3 = false;
      this.backCrosswiseBar(types[1]);
    } else {
      this.dataStatus = '客流量/人次';
      this.barStatus1 = false;
      this.barStatus2 = false;
      this.barStatus3 = true;
      this.backCrosswiseBar(types[2]);
    }
  }
  // 收入监控
  public incomeAmountCount(): void {
    this.financeDataService.searchIncomeTotal({id: 2}).subscribe(
      (value) => {
        this.incomeAmount = {
          number: value.data,
          unitsL: '元'
        };
      }
    );
  }
  public IncomeTypes() {
    this.financeDataService.searchIncomeTotalPie({id: 2}).subscribe(
      (value) => {
        this.optionsIncomeModel = {
          data: value.data,
          title: '',
          total: '',
          color: ['#00CAE2', '#2307EF', '#4791D8']
        };
      }
    );
  }
  public incomeDistribution(e): void {
    // 表格
    this.financeDataService.searchIncomeAlertTable({id: 2, types: e.name}).subscribe(
      (val) => {
        this.IncomeTableData = val.data.contents;
      }
    );
    // 饼状图
    this.financeDataService.searchIncomeAlertPie({id: 2, types: e.name}).subscribe(
      (value) => {
        this.optionsIncomeTypes = {
          data: value.data,
          title: `贵州省各市所有服务区今日${e.name}占比统计`,
          total: '',
          color: ['#CE2D79', '#BDD139', '#78E77D', '#09D4D6', '#3C75B9',
            '#6769B1', '#FF8C9D', '#2796C4', '#E57D0D']
        };
      }
    );
  }
  // 收入类型相关操作
  public incomeClick(e): void {
    this.alertIncomeShow = true;
    this.alertIncomeTitle = e.name + '收入分布统计';
    document.body.className = 'ui-overflow-hidden';
    this.incomeDistribution(e);
  }
  public closeIncomeShow(): void {
    document.body.className = '';
    this.alertIncomeShow = false;
  }
  // 收入类型弹窗
  public optionsIncomePieClick(e) {
    if (e.name === '贵阳市') {
      this.router.navigate(['/home/city', {name: e.name}]);
    } else {
      window.alert (`很抱歉，${e.name}暂无数据`);
    }
  }
  public IncomeBtnClick(e): void {
    if (e.srcElement.innerText === '小吃') {
      this.alertIncomeTitle = '小吃收入分布统计';
      this.arryIncomePie = [];
      this.incomeDistribution({name: e.srcElement.innerText });
    } else if (e.srcElement.innerText === '中式快餐') {
      this.alertIncomeTitle = '中式快餐收入分布统计';
      this.arryIncomePie = [];
      this.incomeDistribution({name: e.srcElement.innerText });
    } else if (e.srcElement.innerText === '西式快餐') {
      this.alertIncomeTitle = '西式快餐收入分布统计';
      this.arryIncomePie = [];
      this.incomeDistribution({name: e.srcElement.innerText });
    } else if (e.srcElement.innerText === '商超') {
      this.alertIncomeTitle = '商超收入分布统计';
      this.arryIncomePie = [];
      this.incomeDistribution({name: e.srcElement.innerText });
    } else if (e.srcElement.innerText === '住宿') {
      this.alertIncomeTitle = '住宿收入分布统计';
      this.arryIncomePie = [];
      this.incomeDistribution({name: e.srcElement.innerText });
    } else if (e.srcElement.innerText === '汽修') {
      this.alertIncomeTitle = '汽修收入分布统计';
      this.arryIncomePie = [];
      this.incomeDistribution({name: e.srcElement.innerText });
    }
  }
  public IncomeTableClick(e): void {
    this.router.navigate(['/home/serzone', {name: e}]);
  }
  // 表格导出
  public incomeDateChange(e): void {
    this.incomeExportType.incomeDate = e.srcElement.value;
  }
  public incomeTypeChange(e): void {
    this.incomeExportType.incomeNumType = e.srcElement.options[e.srcElement.selectedIndex].innerText;
  }
  public incomeAreaChange(e): void {
    this.incomeExportType.incomeArea = e.srcElement.options[e.srcElement.selectedIndex].innerText;
  }
  public incomeExportClick(): void {
    if (!(this.incomeExportType.incomeDate === '')
      || !(this.incomeExportType.incomeNumType === '')
      || !(this.incomeExportType.incomeArea === '')) {
      this.incomeExcelShow = false;
      console.log(this.incomeExportType);
      // 导出表格数据初始化
      this.incomeExportType = {
        incomeNumType: '',
        incomeArea: '',
        incomeDate: ''
      };
    } else {
      window.alert('请把数据选择全在提交');
    }
  }
  public openIncomeExcel() {
    this.incomeExcelShow = true;
  }
  public closeincomeExcel() {
    this.incomeExcelShow = false;
  }

  /*********************************图表更新*****************************/
  public updataEcharts(): void {
    // 3D柱状图
    this.packOption3();
    /**************************中部****************************/
    // 地图
    this.centerMap2();
    // 事件
    this.initialize();
    // 办公
    this.officeTypes = this.dataService.officeTypes;
    // 个人
    this.personOfficeTypes = this.dataService.personOfficeTypes;

    // 业态经营数据前十排名
    this.backCrosswiseBar('revenue');

    // 车流监控
   /* this.vehicleAmountCountClean = setInterval(() => {

    }, 5000);*/
    this.vehicleAmountCount();
    this.CarTypes();

    // 收入监控
    this.incomeAmountCountClean = setInterval(() => {
    }, 5000);
    this.incomeAmountCount();
    this.IncomeTypes();

    // 实时客流
    this.personAmountCountClean = setInterval(() => {
    }, 5000);
    this.financeDataService.searchPersonTotal({id: 2}).subscribe(
      (val) => {
        // console.log(val.data.toString().split(''));
        this.localService.persons.next(val.data.toString().split(''));
      }
    );
  }
}

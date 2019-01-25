import {Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {DataService} from '../../common/services/data.service';
import {FormBuilder} from '@angular/forms';
import {EventListInfo, IncomeManualAddIncome, UploadEventInfoUp} from '../../common/model/service-data.model';
import {ServiceDataService} from '../../common/services/service-data.service';
import {LocalStorageService} from '../../common/services/local-storage.service';
import {DatePipe} from '@angular/common';
import {number} from 'ng4-validators/src/app/number/validator';

@Component({
  selector: 'app-service-data',
  templateUrl: './service-data.component.html',
  styleUrls: ['./service-data.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ServiceDataComponent implements OnInit, OnDestroy {
  /***********************基础信息************************/
  public esDate: any;  // 时间初始化
  public carTimeSelect = [
    {name: '时', code: 'hour'},
    {name: '天', code: 'day'},
    {name: '周', code: 'week'},
    {name: '月', code: 'month'},
    {name: '年', code: 'year'},
  ];
  // 组件销毁后清除时钟任务
  public vehicleAmountCountClean: any;
  public incomeAmountCountClean: any;
  public personAmountCountClean: any;
  public incomeShopInfoClean: any;
  public serviceZoneTitle: string;  // 服务区名称
  public serviceZoneID: string;   // 服务区ID
  /***********************左边************************/
    //  3D柱状图配置
  public options3d: any;
  public options3dCopy: any;
  public alertBarShow = false;   // 3D柱状图弹窗
  public alertBarTitle: string;
  public options3dBar: any;
  public options3dLine: any;
  public outOptions3d: any; // 3D图组件传出来的值
  public bar3dExcelShow = false;
  public startTime3d: Date; // 时间选择器
  public endTime3d: Date; // 时间选择器
  // 车辆监控
  public vehicleAmount: any;
  public optionsCarModel: any; // 车辆饼状图
  public alertCarShow = false;
  public carTableData: any;
  public carExcelShow = false;
  public carStartTime: Date; // 时间选择器
  public carEndTime: Date; // 时间选择器
  public carTimeTypes: any;
  /***********************中部************************/
    // 商家、视频及方向
  public incomeTopData: any;
  public incomeBottomData: any;
  // 服务区商家视频弹窗
  public videoShopList = [];
  public videoBottomShopUrl: string;
  // 服务区商家信息弹窗
  public iconImages = [
    'icon-Chinese-food',
    'icon-Chinese-restaurant-',
    'icon-fast-food',
    'icon-shop-one',
    'fa fa-bed',
    'fa fa-car'];
  public serviceShopShow = false;
  public serviceShopShowExport = false;
  public serviceShopInfo: any;
  public shopStartTime: Date; // 时间选择器
  public shopEndTime: Date; // 时间选择器
  // 公共视频弹窗
  public videoPublicShow = false;
  public publicVideoTitle: string;
  public publicVideoList = [];
  public publicTopVideoGroup = [];
  public publicBottomVideoGroup = [];
  public videoTopOpen = [];
  public videoBottomOpen = [];
  // 事件弹窗
  public eventList: EventListInfo[];
  public eventListInfo: EventListInfo;
  public eventListProcess: EventListInfo[];
  public eventListNoProcess: EventListInfo[];
  public eventInfoUpTypes = [];
  public uploadEventInfoUp: UploadEventInfoUp = new UploadEventInfoUp();
  // public eventListInfoChildern: EventListInfo[];
  public eventAlertShow = false;
  public eventAlertListShow = true;
  public eventAlertInfoUp = false;
  public eventAlertInfoUpTitle: string;
  // 服务区厕所监控
  public serversToiletAlertShow = false;
  public waitTitle: string;

  /***********************右边************************/
    // 服务区基本信息
  public alertCrosswiseShow = false;
  public serviceInfo: any;
  public alterCommonAttributeValues = [];
  public alterUpAttributeValues = [];
  public alterDownAttributeValues = [];
  public shopEchartLine: any;
  public shopEchartArea: any;
  public servicesPlan = false;
  public servicesMap = {};
  // 收入监控
  public incomeAmount: any;
  public optionsIncomeModel: any;
  public alertIncomeShow = false;
  public alertIncomeTypeShow = false;
  public alertIncomeTypeTitle: string;
  public alertIncomeTitle = '收入总数';
  public IncomeTableData: any;
  public IncomeTimeTypes: any;
  public storeList: any;
  public arryIncomePie = [];
  public IncomeOptionType: any;
  public incomeExcelShow = false;
  public incomeManualShow = false;
  public incomeManualDirectionSelect = [];
  public incomeManualStoreShow = false;
  public incomeManualStoreSelect = [
    {name: '请选择店铺......', code: '-1'}
  ];
  public incomeManualAddIncome = new IncomeManualAddIncome();
  public incomeStartTime: Date; // 时间选择器
  public incomeEndTime: Date; // 时间选择器
  constructor(
    private fb: FormBuilder,
    private routerInfo: ActivatedRoute,
    private dataService: DataService,
    private serareaService: ServiceDataService,
    private localService: LocalStorageService,
    private datePipe: DatePipe
  ) {
  }

  ngOnInit() {
    // 路由接受参数
    this.routerInfo.params.subscribe(
      (params) => {
        this.serviceZoneTitle = params.name;
        this.serviceZoneID = params.id;
        this.localService.eventBus.next({title: this.serviceZoneTitle + '业态大数据', flagState: 'serzone', flagName: this.serviceZoneTitle});
      }
    );
    this.serareaService.searchSerAraItem(this.serviceZoneID).subscribe(
      (value) => {
        this.serviceInfo = value.data;
        value.data.commonAttributeValues.map((val, index) => {
          this.alterCommonAttributeValues.push(this.cloneValue(val));
        });
        value.data.upAttributeValues.attributeValues.map((val, index) => {
          this.alterUpAttributeValues.push(this.cloneValue(val));
        });
        value.data.downAttributeValues.attributeValues.map((val, index) => {
          this.alterDownAttributeValues.push(this.cloneValue(val));
        });
      }
    );
    // 实时数据
    this.vehicleAmountCount();
    this.CarTypes();
    this.incomeAmountCount();
    this.IncomeTypes();
    this.getPerson();
    this.getIncomeTotalTypes();
    this.backCenterDate();
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
    // 数据初始化
    this.upData();
  }

  ngOnDestroy(): void {
    clearInterval(this.vehicleAmountCountClean);
    clearInterval(this.incomeAmountCountClean);
    clearInterval(this.personAmountCountClean);
    clearInterval(this.incomeShopInfoClean);
  }

  /*************数据初始化****************/
  public upData() {
    // 查询服务区方向
    this.serareaService.searchServiceDirection(1).subscribe(
      (val) => {
        if (val.status === '200') {
          this.incomeManualDirectionSelect = [
            {name: `请选择服务区方向......`, code: '-1'},
            {name: `${val.data[0].source}——>${val.data[1].destination}`, code: val.data[0].orientaionId},
            {name: `${val.data[1].source}——>${val.data[1].destination}`, code: val.data[1].orientaionId}
          ];
        }
      }
    );
    //  3d图统计
    this.packOption3();
    // 车流监控
    this.vehicleAmountCountClean = setInterval(() => {
      this.vehicleAmountCount();
      this.CarTypes();
    }, 3000);
    // 收入监控
    this.incomeAmountCountClean = setInterval(() => {
      this.incomeAmountCount();
      this.IncomeTypes();
    }, 3000);
    // 实时客流
    this.personAmountCountClean = setInterval(() => {
      this.getPerson();
    }, 3000);
    // 实时店铺信息
    this.incomeShopInfoClean = setInterval(() => {
      this.backCenterDate();
    }, 3000);
    // 事件列表
    this.eventNotPoocess();
    // 事件上报类型
    this.serareaService.searchEventCategory().subscribe(
      (value) => {
        if (value.status === '200') {
          this.eventInfoUpTypes = value.data;
        }
      }
    );
  }

  // 客流
  public getPerson(): void {
    let total: any;
    let province: any;
    let city: any;
    this.serareaService.searchPersonTotal({id: this.serviceZoneID}).subscribe(
      (totalVal) => {
        if (totalVal.status === '200') {
          total = totalVal.data;
          if (!(total === 0)) {
            this.serareaService.searchPersonProvince({id: this.serviceZoneID}).subscribe(
              (provinceVal) => {
                if (provinceVal.status === '200') {
                  province = provinceVal.data;
                  this.serareaService.searchPersonCity({id: this.serviceZoneID}).subscribe(
                    (cityVal) => {
                      if (cityVal.status === '200') {
                        city = cityVal.data;
                        this.localService.persons.next({
                          total: total.toString().split(''),
                          province: province,
                          city: city
                        });
                      }
                    }
                  );
                }
              }
            );
          } else {
            this.localService.persons.next({
              total: [],
              province: [],
              city: []
            });
          }
        }
      }
    );
  }

  /************************左边***************************/
  // 3D柱状图图表配置及表格导出
  public packOption3() {
    // 车流客流人流
    this.serareaService.search3DBar({id: this.serviceZoneID, parameter: ['revenue', 'passenger', 'vehicle']}).subscribe(
      (val) => {
        if (val.status === '200') {
          this.options3d = val.data;
        }
      }
    );
    // 用电量用水量
    this.serareaService.search3DBar({id: this.serviceZoneID, parameter: ['electric', 'water', 'washing_out']}).subscribe(
      (val) => {
        if (val.status === '200') {
          this.options3dCopy = val.data;
        }
      }
    );
  }

  public onOutOptions3d(e): void {
    const defaultMonth = new Date().getMonth() + 1;
    this.outOptions3d = e;
    document.body.className = 'ui-overflow-hidden';
    this.alertBarShow = true;
    this.alertBarTitle = this.outOptions3d.alertBarTitle;
    // 柱状图
    this.serareaService.search3DAlertBar({id: this.serviceZoneID, types: this.outOptions3d.bar.types}).subscribe(
      (val) => {
       /* if (e.bar.types === 'pollution') {
          const a = {
            xData: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
            coordinate: [22918, 188612, 223787, 225436, 254298, 233201, 124071, 80720, 313150, 80775, 97796, 204784]
          };
          this.options3dBar = {
            data: a,
            xType: this.outOptions3d.pie.xType,
            title: `贵州省久长服务区年度${this.outOptions3d.alertBarTitle}统计`
          };
          return;
        }*/
        if (val.status === '200') {
          this.options3dBar = {
            data: val.data,
            xType: this.outOptions3d.pie.xType,
            title: `贵州省久长服务区年度${this.outOptions3d.alertBarTitle}统计`
          };
        }
      }
    );
   /* if (e.bar.types === 'electric' || e.bar.types === 'water' || e.bar.types === 'pollution') {
      // 折线图
      this.serareaService.search3DAlertLineMonth(
        {id: this.serviceZoneID, month: defaultMonth, types: ['revenue', 'passenger', 'vehicle', 'electric', 'water']}).subscribe(
        (val) => {
          if (val.status === '200') {
            val.data.yData.push({
              code: 'pollution',
              data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
              name: '排污量'
            });
            this.options3dLine = {
              title: `贵州省久长服务区${this.options3d.xdata[defaultMonth - 1]}业态走势图`,
              data: val.data,
              color: ['#7C7CD4', '#36B9AB', '#6ACD72', '#0A30BF', '#027204', '#E36E57']
            };
          }
        }
      );
      return;
    }*/
    // 折线图
    this.serareaService.search3DAlertLineMonth(
      {
        id: this.serviceZoneID, month: defaultMonth,
        types: ['revenue', 'passenger', 'vehicle', 'electric', 'water', 'washing_out']}).subscribe(
      (val) => {
        if (val.status === '200') {
          this.options3dLine = {
            title: `贵州省久长服务区${this.options3d.xdata[defaultMonth - 1]}业态走势图`,
            data: val.data,
            color: ['#7C7CD4', '#36B9AB', '#6ACD72', '#0A30BF', '#027204', '#E36E57']
          };
        }
      }
    );
  }

  public onOutOptions3dBar(e): void {
    // 折线图
    this.serareaService.search3DAlertLineMonth(
      {
        id: this.serviceZoneID, month: e.xType + 1,
        types: ['revenue', 'passenger', 'vehicle', 'electric', 'water', 'washing_out']}).subscribe(
      (val) => {
        if (val.status === '200') {
          this.options3dLine = {
            title: `贵州省久长服务区${this.options3d.xdata[e.xType]}业态走势图`,
            data: val.data,
            color: ['#7C7CD4', '#36B9AB', '#6ACD72', '#0A30BF', '#027204', '#E36E57']
          };
        }
      }
    );
  }

  public closeBarShow() {
    this.alertBarShow = false;
    document.body.className = '';
  }

  public bar3dExportClick() {
    const startTime = this.datePipe.transform(this.startTime3d, 'yyyyMMdd');
    const endTime = this.datePipe.transform(this.endTime3d, 'yyyyMMdd');
    if (this.startTime3d && this.endTime3d) {
      window.open(`http://120.78.137.182:8888/highway-interactive/report/serviceArea/3d/1/startDate/${startTime}/endDate/${endTime}`);
    } else {
      window.alert('请把数据选择全在提交');
    }
  }

  // 车辆监控及表格导出
  public vehicleAmountCount(): void {
    this.serareaService.searchCarTotal({id: this.serviceZoneID}).subscribe(
      (value) => {
        if (value.status === '200') {
          this.vehicleAmount = {
            number: value.data,
            units: '辆'
          };
        }
      }
    );
  }

  public CarTypes() {
    this.serareaService.searchCarTotalPie({id: this.serviceZoneID}).subscribe(
      (value) => {
        if (value.status === '200') {
          this.optionsCarModel = {
            data: value.data,
            title: '',
            total: '',
            color: ['#00CAE2', '#2307EF', '#4791D8']
          };
        }
      }
    );
  }

  public parkClick(e): void {
    this.alertCarShow = true;
    document.body.className = 'ui-overflow-hidden';
    this.carTimeTypes = 'hour';
    this.carDistribution(1, this.carTimeTypes);
  }

  public carSelectTime(event): void {
    this.carTimeTypes = event.code;
    // 表格
    this.carDistribution(1, this.carTimeTypes);
  }

  public carDistribution(e, time): void {
    /*const carTypes = {
      '总数': 'total',
      '小车': 1,
      '客车': 2,
      '货车': 3,
    };*/
    // 表格
    this.serareaService.searchCarAlertTable({dateType: time, id: this.serviceZoneID, page: e, nums: 10}).subscribe(
      (val) => {
        if (val.status === '200') {
          console.log(val.data);
          this.carTableData = val.data;
        }
      }
    );
  }

  public closeCarShow(): void {
    document.body.className = '';
    this.alertCarShow = false;
  }

  /*public carBtnClick(e): void {
    if (e.srcElement.innerText === '小车') {
      this.alertCarTitle = '小车';
      this.arryCarPie = [];
      this.carTableData = [];
      this.carTableData = this.dataService.getJsonObj(8, 1000, 100, this.alertCarTitle);
    } else if (e.srcElement.innerText === '总数') {
      this.alertCarTitle = '总数';
      this.arryCarPie = [];
      this.carTableData = [];
      this.carTableData = this.dataService.getJsonObj(8, 1000, 100, this.alertCarTitle);
    } else if (e.srcElement.innerText === '客车') {
      this.alertCarTitle = '客车';
      this.arryCarPie = [];
      this.carTableData = [];
      this.carTableData = this.dataService.getJsonObj(8, 1000, 100, this.alertCarTitle);
    } else if (e.srcElement.innerText === '货车') {
      this.alertCarTitle = '货车';
      this.arryCarPie = [];
      this.carTableData = [];
      this.carTableData = this.dataService.getJsonObj(8, 1000, 100, this.alertCarTitle);
    }
  }*/
  public carExportClick() {
    const startTime = this.datePipe.transform(this.carStartTime, 'yyyyMMdd');
    const endTime = this.datePipe.transform(this.carEndTime, 'yyyyMMdd');
    if (this.carStartTime && this.carEndTime) {
      window.open(`http://120.78.137.182:8888/highway-interactive/report/serviceArea/vihicle/1/startDate/${startTime}/endDate/${endTime}`);
    } else {
      window.alert('请把数据选择全在提交');
    }
  }

  /************************中部***************************/
  // 店铺、视频及方向
  public backCenterDate() {
    this.serareaService.getServiceShopVDate().subscribe(
      (value) => {
        if (value.status === '200') {
          this.serareaService.searchServiceShopIncome().subscribe(
            (val) => {
              if (val.status === '200') {
                let s = [];
                let x = [];
                value.data.map((item, index) => {
                  if (item.flag === '2') {
                    item.storeInfoList.map((prop) => {
                      prop.categoryCode = parseInt(prop.categoryCode, 10);
                    });
                    this.incomeTopData = item.storeInfoList;
                    this.publicTopVideoGroup = item.cameraGroupList;
                  } else if (item.flag === '3') {
                    item.storeInfoList.map((prop) => {
                      prop.categoryCode = parseInt(prop.categoryCode, 10);
                    });
                    this.incomeBottomData = item.storeInfoList;
                    this.publicBottomVideoGroup = item.cameraGroupList;
                  }
                });
                val.data.map((item, index) => {
                  if (item.flag === '2') {
                    s = item.storeInfoList;
                  } else if (item.flag === '3') {
                    x = item.storeInfoList;
                  }
                });
                if (s) {
                  s.map((item, index) => {
                    if (s[index].id = this.incomeTopData[index].id) {
                      this.incomeTopData[index].revenue = s[index].revenue;
                    }
                  });
                }
                if (x) {
                  x.map((item, index) => {
                    if (x[index].id = this.incomeBottomData[index].id) {
                      this.incomeBottomData[index].revenue = x[index].revenue;
                    }
                  });
                }
              }
            }
          );
        }
      }
    );
  }

  public closeServiceShop(): void {
    document.body.className = '';
    this.serviceShopShow = false;
  }

  // 服务区商家
  public openServiceShop(item): void {
    console.log(item);
    this.videoShopList = [];
    this.serviceShopInfo = item;
    this.serviceShopShow = true;
    document.body.className = 'ui-overflow-hidden';
    if (item.cameraList.length > 0) {
      this.addShopVideo(this.serviceShopInfo);
    }
    // 折线图
    this.serareaService.searchServiceShopLine({
      id: item.id,
      yIndex: ['revenue', 'passenger', 'electric', 'water', 'washing_out']}).subscribe(
      (val) => {
        if (val.status === '200') {
        /*  val.data.yData.push({
            code: 'pollution',
            data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            name: '排污量'
          });*/
          this.shopEchartLine = {
            data: val.data,
            title: `${item.storeName}今日业态数据走势分析`,
            color: ['#36B9AB', '#6ACD72', '#0A30BF', '#027204', '#E36E57']
          };
        }
      }
    );
    // 面积图
    this.serareaService.searchServiceShopArea(item.id).subscribe(
      (val) => {
        if (val.status === '200') {
          this.shopEchartArea = {
            data: val.data,
            title: `${item.storeName}业态数据面积图分析`,
          };
        }
      }
    );
  }

  public openMerchantVideo(item): void {
    this.videoBottomShopUrl = `
       <object classid="clsid:9BE31822-FDAD-461B-AD51-BE1D1C159921"
            id="vlc${item.id}" codebase="" width="100%" height="100%" events="True">
        <param name="mrl" value=""/>
        <param name="src" value=""/>
        <param name="controls" value="false"/>
        <param name="ShowDisplay" value="true"/>
        <param name="AutoLoop" value="false"/>
        <param name="autoplay" value="true"/>
        <param name="Time" value="True"/>
        <param name='volume' value='30'/>
        <param value="transparent" name="wmode">
        <embed pluginspage="http://www.videolan.org"
               type="application/x-vlc-plugin"
               version="VideoLAN.VLCPlugin.2"
               width="100%"
               height="100%"
               text="Waiting for video"
               name="vlc${item.id}"
        />
    </object>
      `;
    setTimeout(() => {
      document.getElementById('shopVideo').innerHTML = this.videoBottomShopUrl;
      setTimeout(() => {
        const vlc = window.document[`vlc${item.id}`];
        const mrl = item.outUrl;
        const options = ['rtsp-tcp=true', ' network-caching=500'];
        const itemId = vlc['playlist'].add(mrl, 'asd', options);
        vlc['playlist'].playItem(itemId);
      }, 100);
    }, 100);
  }

  public shopExportClick() {
    const startTime = this.datePipe.transform(this.shopStartTime, 'yyyyMMdd');
    const endTime = this.datePipe.transform(this.shopEndTime, 'yyyyMMdd');
    if (this.shopStartTime && this.shopEndTime) {
      window.open(`http://120.78.137.182:8888/highway-interactive/report/serviceArea/store/1/startDate/${startTime}/endDate/${endTime}`);
    } else {
      window.alert('请把数据选择全在提交');
    }
  }

  public shopImageZoom(e): void {
    if (e) {
      document.getElementById('shopVideo').innerHTML = ``;
    } else {
      this.addShopVideo(this.serviceShopInfo);
    }
  }

  public addShopVideo(item) {
    // 视频监控
    if (!item.cameraList.length) {
      setTimeout(() => {
        document.getElementById('shopVideo').innerHTML = `<p class="text-center" style="font-size: 1rem">此处暂无摄像头</p>`;
      }, 100);
    } else {
      this.videoShopList = item.cameraList;
      this.videoBottomShopUrl = `
        <object classid="clsid:9BE31822-FDAD-461B-AD51-BE1D1C159921"
            id="vlc${this.videoShopList[0].id}" codebase="" width="100%" height="100%" events="True">
        <param name="mrl" value=""/>
        <param name="src" value=""/>
        <param name="controls" value="false"/>
        <param name="ShowDisplay" value="true"/>
        <param name="AutoLoop" value="false"/>
        <param name="autoplay" value="true"/>
        <param name="Time" value="True"/>
        <param name='volume' value='30'/>
        <param value="transparent" name="wmode">
        <embed pluginspage="http://www.videolan.org"
               type="application/x-vlc-plugin"
               version="VideoLAN.VLCPlugin.2"
               width="100%"
               height="100%"
               text="Waiting for video"
               name="vlc${this.videoShopList[0].id}"
               wmode="opaque"
        />
    </object>
      `;
      setTimeout(() => {
        document.getElementById('shopVideo').innerHTML = this.videoBottomShopUrl;
        setTimeout(() => {
          const vlc = window.document[`vlc${this.videoShopList[0].id}`];
          const mrl = this.videoShopList[0].outUrl;
          const options = ['rtsp-tcp=true', ' network-caching=500'];
          const itemId = vlc['playlist'].add(mrl, 'asd', options);
          vlc['playlist'].playItem(itemId);
        }, 100);
      }, 100);
    }
  }

  public cancelserviceShopVideo(): void {
    this.videoBottomShopUrl = ``;
    setTimeout(() => {
      document.getElementById('shopVideo').innerHTML = this.videoBottomShopUrl;
    }, 100);
  }

  // 公共视频监控
  public openPublicVideo(e) {
    this.videoShopList = e;
    let videoUrlHtml = '';
    document.body.className = 'ui-overflow-hidden';
    this.videoPublicShow = true;
    this.publicVideoTitle = e.cameraName;
    videoUrlHtml = videoUrlHtml + `
        <object classid="clsid:9BE31822-FDAD-461B-AD51-BE1D1C159921"
            id="vlc${e.id}" codebase="" width="100%" height="100%" events="True">
        <param name="mrl" value=""/>
        <param name="src" value=""/>
        <param name="controls" value="false"/>
        <param name="ShowDisplay" value="true"/>
        <param name="AutoLoop" value="false"/>
        <param name="autoplay" value="true"/>
        <param name="Time" value="True"/>
        <param name='volume' value='30'/>
        <param value="transparent" name="wmode">
        <embed pluginspage="http://www.videolan.org"
               type="application/x-vlc-plugin"
               version="VideoLAN.VLCPlugin.2"
               width="100%"
               height="100%"
               text="Waiting for video"
               name="vlc${e.id}"
        />
    </object>
    `;
    setTimeout(() => {
      if (e.outUrl === '' || e.outUrl === null || e.outUrl === undefined) {
        document.getElementById('publicVideo').innerHTML = `<p class="text-center" style="font-size: 1rem">此商店暂无摄像头</p>`;
        return;
      }
      document.getElementById('publicVideo').innerHTML = videoUrlHtml;
      setTimeout(() => {
        const vlc = window.document[`vlc${e.id}`];
        const mrl = e.outUrl;
        console.log(mrl);
        const options = ['rtsp-tcp=true', ' network-caching=500'];
        const itemId = vlc['playlist'].add(mrl, 'asd', options);
        vlc['playlist'].playItem(itemId);
      }, 100);
    }, 100);
  }

  public closePublicVideo() {
    document.body.className = '';
    this.videoPublicShow = false;
  }

  public publicTopVideoGroupOver(videoList, i): void {
    videoList.map(() => {
      this.videoTopOpen.push(false);
    });
    this.videoTopOpen[i] = true;
    if (videoList.length === 0) {
      this.publicVideoList = [];
      this.publicVideoList.push({cameraName: '该处暂无摄像头'});
    } else {
      this.publicVideoList = videoList;
    }
  }

  public publicTopVideoGroupLeave(i): void {
    this.videoTopOpen[i] = false;
  }

  public publicTopBottomGroupOver(videoList, i): void {
    videoList.map(() => {
      this.videoBottomOpen.push(false);
    });
    this.videoBottomOpen[i] = true;
    if (videoList.length === 0) {
      this.publicVideoList = [];
      this.publicVideoList.push({cameraName: '该处暂无摄像头'});
    } else {
      this.publicVideoList = videoList;
    }
  }

  public publicTopBottomGroupLeave(i): void {
    this.videoBottomOpen[i] = false;
  }

  // 未处理事件统计
  public eventNotPoocess(): void {
    this.serareaService.searchNotPoocessEventsList({page: 1, nums: 1000}).subscribe(
      (value) => {
        if (value.status === '200') {
          this.eventList = value.data.contents;
        }
      }
    );
  }

  public openEventAlert(item): void {
    document.body.className = 'ui-overflow-hidden';
    this.eventAlertShow = true;
    // 未处理
    this.serareaService.searchEventsTypeList({eventCategoryCode: item.eventCategoryCode, processState: 2, page: 1, nums: 1000}).subscribe(
      (value) => {
        if (value.status === '200') {
          this.eventListNoProcess = value.data.contents;
        }
      }
    );
    // 已处理
    this.serareaService.searchEventsTypeList({eventCategoryCode: item.eventCategoryCode, processState: 1, page: 1, nums: 1000}).subscribe(
      (value) => {
        if (value.status === '200') {
          this.eventListProcess = value.data.contents;
        }
      }
    );
  }

  public closeEventAlert() {
    document.body.className = '';
    this.eventAlertShow = false;
  }

  public eventAlertListCtrlw(): void {
    this.eventAlertListShow = true;
  }

  public eventAlertListCtrly(): void {
    this.eventAlertListShow = false;
  }

  public eventListInfosClick(item): void {
    console.log(item);
    this.eventListInfo = item;
  }

  // 事件上报
  public eventInfoUpClick(e): void {
    if (e.eventCategoryName !== '经营类') {
      this.waitTitle = e.eventCategoryName;
      this.serversToiletAlertShow = true;
    } else {
      this.uploadEventInfoUp.eventCategoryCode = e.categoryCode;
      this.uploadEventInfoUp.eventCategoryName = e.eventCategoryName;
      this.eventAlertInfoUpTitle = e.eventCategoryName;
      this.eventAlertInfoUp = true;
    }
  }

  public closeEventInfoUpClick(): void {
    // document.body.className = '';
    this.eventAlertInfoUp = false;
  }

  public serviceInfoUpAlertClick() {
    document.body.className = '';
    this.eventAlertInfoUp = false;
    this.uploadEventInfoUp.administrativeAreaId = 2;
    this.uploadEventInfoUp.serviceAreaId = 1;
    this.uploadEventInfoUp.reportUserId = this.localService.getObject('userDTO').id;
    this.uploadEventInfoUp.reportUserName = this.localService.getObject('userDTO').realName;
    this.serareaService.searchEventsReported(this.uploadEventInfoUp).subscribe(
      (value) => {
        if (value === '200') {
          window.alert(value.message);
        }
      }
    );
  }

  // 卫生间及停车位弹窗
  public openServersToiletAlert(e) {
    document.body.className = 'ui-overflow-hidden';
    this.waitTitle = e;
    this.serversToiletAlertShow = true;
  }

  public closeServersToiletAlert() {
    document.body.className = '';
    this.serversToiletAlertShow = false;
  }

  /************************右边***************************/
  // 遍历修改后的数据，并把它赋值给car1
  public cloneValue(c: any): any {
    const car = {};
    for (const prop in c) {
      if (c) {
        car[prop] = c[prop];
      }
    }
    return car;
  }

  // 服务区信息修改
  public crosswiseClick(): void {
    this.alertCrosswiseShow = true;
    document.body.className = 'ui-overflow-hidden';
  }
  public closeCrosswiseShow(): void {
    document.body.className = '';
    this.alertCrosswiseShow = false;
  }
  public modifySerAraItemClick(): void {
    this.serareaService.modifySerAraItem(
      {
        administrativeAreaId: 3,
        administrativeAreaName: '贵阳市',
        chiefName: null,
        chiefPhone: null,
        chiefUserId: 1,
        commonAttributeValues: this.alterCommonAttributeValues,
        deptId: 5,
        deptName: '久长服务区',
        downAttributeValues: {
          attributeValues: this.alterDownAttributeValues,
          destination: '遵义',
          flag: '3',
          flagName: '下行',
          id: 2,
          source: '贵阳',
        },
        id: 1,
        organizationId: 1,
        organizationName: '贵州高投服务管理有限公司',
        serviceAreaName: '久长服务区',
        upAttributeValues: {
          attributeValues: this.alterUpAttributeValues,
          destination: '贵阳',
          flag: '2',
          flagName: '上行',
          id: 1,
          source: '遵义',
        },
      }
    ).subscribe(
      (data) => {
        if (data.status === '200') {
          window.alert(data.message);
          this.alterCommonAttributeValues = [];
          this.alterUpAttributeValues = [];
          this.alterDownAttributeValues = [];
          this.serareaService.searchSerAraItem(1).subscribe(
            (value) => {
              this.serviceInfo = value.data;
              value.data.commonAttributeValues.map((val, index) => {
                this.alterCommonAttributeValues.push(this.cloneValue(val));
              });
              value.data.upAttributeValues.attributeValues.map((val, index) => {
                this.alterUpAttributeValues.push(this.cloneValue(val));
              });
              value.data.downAttributeValues.attributeValues.map((val, index) => {
                this.alterDownAttributeValues.push(this.cloneValue(val));
              });
            }
          );
        }
      }
    );
  }

  // 平面图
  public openServicesPlan() {
    document.body.className = 'ui-overflow-hidden';
    this.servicesPlan = true;
    // 百度地图
    this.servicesMap = {
      bmap: {
        center: [106.70458, 26.90214],
        zoom: 20,
        roam: true,
        mapStyle: {
          'styleJson': [
            {
              'featureType': 'background',
              'elementType': 'all',
              'stylers': {
                'color': '#273440'
              }
            }
          ]
        }
      },
    };
  }
  public closeServicesPlan() {
    document.body.className = '';
    this.servicesPlan = false;
  }

  // 业态输入
  public openIncomeManual (): void {
      this.incomeManualShow = true;
  }
  public incomeManualDirectionClick (item): void {
    if (item.code !== '-1') {
      this.incomeManualStoreSelect = [
        {name: '请选择店铺......', code: '-1'}
      ];
      this.incomeManualStoreShow = true;
      this.serareaService.searchServiceNoCashShop(item.code).subscribe(
        (val) => {
          if (val.status === '200') {
            console.log(val.data);
            val.data.map((prop) => {
              this.incomeManualStoreSelect.push(
                {name: `${prop.storeName}`, code: prop}
              );
            });
          }
        });
    }
  }
  public incomeManualShopClick (item): void {
    this.incomeManualAddIncome.storeId = item.code.id;
    this.incomeManualAddIncome.serviceAreaId = item.code.serviceAreaId;
    this.incomeManualAddIncome.serviceAreaName = item.code.serviceAreaName;
    this.incomeManualAddIncome.orientationId = item.code.saOrientationId;
    this.incomeManualAddIncome.storeName = item.code.storeName;
    this.incomeManualAddIncome.categoryCode = item.code.categoryCode;
  }
  public incomeManualUpClick (): void {
    this.serareaService.addNoCashShopIncome(this.incomeManualAddIncome).subscribe(
      (val) => {
        if (val.status === '200') {
          this.incomeManualShow = false;
          window.alert('上传成功');
          return;
        }
        this.incomeManualShow = false;
        window.alert('添加失败');
      }
    );
  }
  // 服务区合同下载
  public servicesPactDown(): void {
    if (this.serviceInfo.contractUrl === null) {
      window.alert('合同暂未上传');
      return;
      // console.log(this.serviceInfo.contractUrlPrefix + this.serviceInfo.contractUrl);
    }
    window.open(`${this.serviceInfo.contractUrlPrefix}${this.serviceInfo.contractUrl}`);
  }

  // 收入监控
  public incomeAmountCount(): void {
    this.serareaService.searchIncomeTotal({id: this.serviceZoneID}).subscribe(
      (value) => {
        if (value.status === '200') {
          this.incomeAmount = {
            number: value.data,
            units: '元'
          };
        }
      }
    );
  }
  public IncomeTypes() {
    this.serareaService.searchIncomeTotalPie({id: this.serviceZoneID}).subscribe(
      (value) => {
        if (value.status === '200') {
          this.optionsIncomeModel = {
            data: value.data,
            title: '',
            total: '',
            color: ['#00CAE2', '#2307EF', '#4791D8', '#F86110', '#0096A4', '#F0B801']
          };
        }
      }
    );
  }
  public incomeClick(e): void {
    this.alertIncomeTypeShow = true;
    this.alertIncomeShow = true;
    document.body.className = 'ui-overflow-hidden';
    this.alertIncomeTitle = e.name;
    this.alertIncomeTypeTitle = e.name;
    this.IncomeTimeTypes = 'hour';
    this.getIncomeTypesSingle(1, this.alertIncomeTitle, this.storeList, this.IncomeTimeTypes);
  }
  public getIncomeTotalTypes(): void {
    this.serareaService.searchIncomeTypes().subscribe(
      (value) => {
        if (value.status === '200') {
          this.storeList = value.data;
        }
      }
    );
  }
  public getIncomeTotal(time, pageNums): void {
    this.serareaService.searchIncomeTypesList({dateType: time, id: this.serviceZoneID, page: pageNums, nums: 15}).subscribe(
      (incomeVal) => {
        if (incomeVal.status === '200') {
          this.IncomeTableData = incomeVal.data;
        }
      }
    );
  }
  public getIncomeTypesSingle(pageNums, item, storeList, time): void {
    const shopType = {
      '小吃': {
        'sequence': 1,
        'entryCode': '1'
      },
      '中式快餐': {
        'sequence': 2,
        'entryCode': '2',
      },
      '西式快餐': {
        'sequence': 3,
        'entryCode': '3',
      },
      '商超': {
        'sequence': 4,
        'entryCode': '4',
      },
      '住宿': {
        'sequence': 5,
        'entryCode': '5',
      },
      '汽修': {
        'sequence': 6,
        'entryCode': '6',
      },
    };
    this.IncomeOptionType = item;
    const shopList = storeList.filter((prop, index) => {
      return prop.entryCode === shopType[this.IncomeOptionType].entryCode;
    });
    if (shopList) {
      this.serareaService.searchIncomeTypesItem(
        {dateType: time, id: this.serviceZoneID, entryCode: shopType[this.IncomeOptionType].entryCode, page: pageNums, nums: 10}).subscribe(
        (value) => {
          if (value.status === '200') {
            this.IncomeTableData = value.data;
          }
        }
      );
    }
  }
  public IncomeSelectTime(event): void {
    this.IncomeTimeTypes = event.code;
    if (!this.alertIncomeTypeShow) {
      this.getIncomeTotal(this.IncomeTimeTypes, 1);
      return;
    }
    this.getIncomeTypesSingle(1, this.alertIncomeTitle, this.storeList, this.IncomeTimeTypes);
  }
  public getIncomeTypesSinglePaging(page, item, storeList, time): void {
    if (!this.alertIncomeTypeShow) {
      this.getIncomeTotal(time, page);
      return;
    }
    this.getIncomeTypesSingle(page, item, storeList, time);
  }
  public closeIncomeShow(): void {
    document.body.className = '';
    this.alertIncomeShow = false;
  }
  public IncomeBtnClick(e): void {
    if (e.srcElement.innerText === '收入总数') {
      this.alertIncomeTitle = '收入总数';
      this.alertIncomeTypeShow = false;
      this.arryIncomePie = [];
      this.getIncomeTotal(this.IncomeTimeTypes, 1);
    } else if (e.srcElement.innerText === '小吃') {
      this.alertIncomeTitle = '小吃';
      this.alertIncomeTypeTitle = '小吃';
      this.alertIncomeTypeShow = true;
      this.arryIncomePie = [];
      this.getIncomeTypesSingle(1, e.srcElement.innerText, this.storeList, this.IncomeTimeTypes);
    } else if (e.srcElement.innerText === '中式快餐') {
      this.alertIncomeTitle = '中式快餐';
      this.alertIncomeTypeTitle = '中式快餐';
      this.alertIncomeTypeShow = true;
      this.arryIncomePie = [];
      this.getIncomeTypesSingle(1, e.srcElement.innerText, this.storeList, this.IncomeTimeTypes);
    } else if (e.srcElement.innerText === '西式快餐') {
      this.alertIncomeTitle = '西式快餐';
      this.alertIncomeTypeTitle = '西式快餐';
      this.alertIncomeTypeShow = true;
      this.arryIncomePie = [];
      this.getIncomeTypesSingle(1, e.srcElement.innerText, this.storeList, this.IncomeTimeTypes);
    } else if (e.srcElement.innerText === '商超') {
      this.alertIncomeTitle = '商超';
      this.alertIncomeTypeTitle = '商超';
      this.alertIncomeTypeShow = true;
      this.arryIncomePie = [];
      this.getIncomeTypesSingle(1, e.srcElement.innerText, this.storeList, this.IncomeTimeTypes);
    } else if (e.srcElement.innerText === '住宿') {
      this.alertIncomeTitle = '住宿';
      this.alertIncomeTypeTitle = '住宿';
      this.alertIncomeTypeShow = true;
      this.arryIncomePie = [];
      this.getIncomeTypesSingle(1, e.srcElement.innerText, this.storeList, this.IncomeTimeTypes);
    } else if (e.srcElement.innerText === '汽修') {
      this.alertIncomeTitle = '汽修';
      this.alertIncomeTypeTitle = '汽修';
      this.alertIncomeTypeShow = true;
      this.arryIncomePie = [];
      this.getIncomeTypesSingle(1, e.srcElement.innerText, this.storeList, this.IncomeTimeTypes);
    }
  }
  public incomeExportClick() {
    const startTime = this.datePipe.transform(this.incomeStartTime, 'yyyyMMdd');
    const endTime = this.datePipe.transform(this.incomeEndTime, 'yyyyMMdd');
    if (this.incomeStartTime && this.incomeEndTime) {
      window.open(`http://120.78.137.182:8888/highway-interactive/report/serviceArea/revenue/1/startDate/${startTime}/endDate/${endTime}`);
    } else {
      window.alert('请把数据选择全在提交');
    }
  }
}

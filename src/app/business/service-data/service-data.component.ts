import {Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {DataService} from '../../common/services/data.service';
import {FormBuilder} from '@angular/forms';
import {EventListInfo, UploadEventInfoUp} from '../../common/model/service-data.model';
import {ServiceDataService} from '../../common/services/service-data.service';
import {LocalStorageService} from '../../common/services/local-storage.service';
import {DatePipe} from '@angular/common';
@Component({
  selector: 'app-service-data',
  templateUrl: './service-data.component.html',
  styleUrls: ['./service-data.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ServiceDataComponent implements OnInit, OnDestroy {
  /***********************基础信息************************/
  public esDate: any;  // 时间初始化
    // 组件销毁后清除时钟任务
  public vehicleAmountCountClean: any;
  public incomeAmountCountClean: any;
  public personAmountCountClean: any;
  // 服务区名称
  public serviceZoneTitle: string;
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
  /***********************中部************************/
  // 商家、视频及方向
  public incomeTopData: any;
  public incomeBottomData: any;
  // 服务区商家视频弹窗
  public videoShopList = [];
  public videoBottomShopUrl: string;
  // 服务区商家信息弹窗
  public images = [];
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
  public storeList: any;
  public arryIncomePie = [];
  public incomeExcelShow = false;
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
    // 实时数据
    this.vehicleAmountCount();
    this.CarTypes();
    this.incomeAmountCount();
    this.IncomeTypes();
    this.getPerson();
    this.getIncomeTotalTypes();
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
    // 路由接受参数
    this.routerInfo.params.subscribe(
      (params) => {
        this.serviceZoneTitle = params.name;
        this.localService.eventBus.next({title: this.serviceZoneTitle + '业态大数据', flagState: 'serzone', flagName: this.serviceZoneTitle});
      }
    );
    // 数据初始化
    this.upData();
  }
  ngOnDestroy(): void {
    clearInterval(this.vehicleAmountCountClean);
    clearInterval(this.incomeAmountCountClean);
    clearInterval(this.personAmountCountClean);
  }
  /*************数据初始化****************/
  public upData() {
    //  3d图统计
    this.packOption3();
    // 车流监控
     this.vehicleAmountCountClean = setInterval(() => {
       this.vehicleAmountCount();
       this.CarTypes();
     }, 5000);
    // 收入监控
    this.incomeAmountCountClean = setInterval(() => {
      this.incomeAmountCount();
      this.IncomeTypes();
    }, 5000);
    // 实时客流
    this.personAmountCountClean = setInterval(() => {
      this.getPerson();
    }, 5000);
    // 事件列表
    this.backCenterDate();
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
    this.serareaService.searchPersonTotal({id: 1}).subscribe(
      (val) => {
        if (JSON.stringify(val.data) !== '{}') {
          this.localService.persons.next({
            total: val.data.total.toString().split(''),
            // totalDistribute: val.data.passengerDistribute
          });
        }
      }
    );
  }

  /************************左边***************************/
  // 3D柱状图图表配置及表格导出
  public packOption3() {
    // 车流客流人流
    this.serareaService.search3DBar({id: 1, parameter: ['revenue', 'passenger', 'vehicle']}).subscribe(
      (val) => {
        if (val.status === '200') {
          this.options3d = val.data;
        }
      }
    );
    // 用电量用水量
    this.serareaService.search3DBar({id: 1, parameter: ['electric', 'water']}).subscribe(
      (val) => {
        if (val.status === '200') {
          this.options3dCopy = val.data;
        }
      }
    );
  }
  public onOutOptions3d(e): void {
    this.outOptions3d = e;
    document.body.className = 'ui-overflow-hidden';
    this.alertBarShow = true;
    this.alertBarTitle = this.outOptions3d.alertBarTitle;
    // 柱状图
    this.serareaService.search3DAlertBar({id: 1, types: this.outOptions3d.bar.types}).subscribe(
      (val) => {
        if (val.status === '200') {
          this.options3dBar = {
            data: val.data,
            xType: this.outOptions3d.pie.xType,
            title: `贵州省久长服务区年度${this.outOptions3d.alertBarTitle}统计`
          };
        }
      }
    );
    // 折线图
    this.serareaService.search3DAlertLineMonth({id: 1, types: [0, 1, 2, 3, 4]}).subscribe(
      (val) => {
        if (val.status === '200') {
          this.options3dLine = {
            title: '贵州省久长服务区月度业态走势图',
            data: val.data,
            color: ['#7C7CD4', '#36B9AB', '#6ACD72', '#0A30BF', '#027204']
          };
        }
      }
    );
  }
  public onOutOptions3dBar(e): void {}
  public closeBarShow() {
    this.alertBarShow = false;
    document.body.className = '';
  }
  public bar3dExportClick() {
    const startTime = this.datePipe.transform(this.startTime3d, 'yyyyMMdd');
    const endTime = this.datePipe.transform(this.endTime3d, 'yyyyMMdd');
    if (this.startTime3d && this.endTime3d) {
      window.location.assign(`http://120.78.137.182:8888/highway-interactive/report/serviceArea/3d/1/startDate/${startTime}/endDate/${endTime}`);
    } else {
      window.alert('请把数据选择全在提交');
    }
  }
  // 车辆监控及表格导出
  public vehicleAmountCount(): void {
    this.serareaService.searchCarTotal({id: 1}).subscribe(
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
    this.serareaService.searchCarTotalPie({id: 1}).subscribe(
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
    this.carDistribution(e);
  }
  public carDistribution(e): void {
    const carTypes = {
      '总数': 'total',
      '小车': 1,
      '客车': 2,
      '货车': 3,
    };
    // 表格
    this.serareaService.searchCarAlertTable({id: 1, type: carTypes[e.name], page: 1, nums: 1000}).subscribe(
      (val) => {
        if (val.status === '200') {
          this.carTableData = val.data.contents;
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
      window.location.assign(`http://120.78.137.182:8888/highway-interactive/report/serviceArea/vihicle/1/startDate/${startTime}/endDate/${endTime}`);
    } else {
      window.alert('请把数据选择全在提交');
    }
  }
  /************************中部***************************/
  // 店铺、视频及方向
  public backCenterDate() {
    this.serareaService.getServiceShopVDate().subscribe(
      (value) => {
        this.serareaService.searchServiceShopIncome().subscribe(
          (val) => {
            let s = [];
            let x = [];
            value.data.map((item, index) => {
              if (item.flag === '2') {
                this.incomeTopData = item.storeInfoList;
                this.publicTopVideoGroup = item.cameraGroupList;
              } else if (item.flag === '3') {
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
        );
      }
    );
  }
  public closeServiceShop(): void {
    document.body.className = '';
    this.serviceShopShow = false;
  }
  // 服务区商家
  public openServiceShop(item): void {
    this.videoShopList = [];
    this.serviceShopInfo = item;
    this.serviceShopShow = true;
    document.body.className = 'ui-overflow-hidden';
    this.addShopVideo(item);
    // 折线图
    this.serareaService.searchServiceShopLine({id: item.id, yIndex: ['revenue', 'passenger', 'vehicle', 'electric', 'water']}).subscribe(
      (val) => {
        if (val.status === '200') {
          this.shopEchartLine = {
            data: val.data,
            title: `${item.storeName}业态数据走势分析`,
            color: ['#7C7CD4', '#36B9AB', '#6ACD72', '#0A30BF', '#027204']
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
    /*this.videoBottomShopUrl = `
        <object type='application/x-vlc-plugin' pluginspage="http://www.videolan.org/" id='vlc' events='false' width="100%" height="96%">
              <param name='mrl' value='${item.outUrl}' />
              <param name='volume' value='50' />
              <param name='autoplay' value='true' />
              <param name='loop' value='false' />
              <param name='fullscreen' value='true' />
              <param name='controls' value='true' />
            </object>
      `; */
    this.videoBottomShopUrl = `
        <object type='application/x-vlc-plugin'
            id='vlc' width="100%" height="100%" events='True' pluginspage="http://www.videolan.org"
            codebase="http://downloads.videolan.org/pub/videolan/vlc-webplugins/2.2.1/npapi-vlc-2.2.1.tar.xz">
                  <param name='mrl' value='${item.outUrl}'/>
                  <param name='volume' value='30'/>
                  <param name='autoplay' value='true'/>
                  <param name='loop' value='false'/>
                  <param value="transparent" name="wmode">
                  <embed id='vlc1' wmode="transparent" type="application/x-vlc-plugin"
                         width="100%" height="100%" pluginspage="http://www.videolan.org"
                         allownetworking="internal" allowscriptaccess="always" quality="high"
                         src='${item.outUrl}'>
                </object>
      `;
    setTimeout(() => {
      document.getElementById('shopVideo').innerHTML = this.videoBottomShopUrl;
    }, 100);
  }
  public shopExportClick() {
    const startTime = this.datePipe.transform(this.shopStartTime, 'yyyyMMdd');
    const endTime = this.datePipe.transform(this.shopEndTime, 'yyyyMMdd');
    if (this.shopStartTime && this.shopEndTime) {
      window.location.assign(`http://120.78.137.182:8888/highway-interactive/report/serviceArea/store/1/startDate/${startTime}/endDate/${endTime}`);
    } else {
      window.alert('请把数据选择全在提交');
    }
  }
  public shopImageZoom (e): void {
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
      /*this.videoBottomShopUrl = `
       <object type='application/x-vlc-plugin' pluginspage="http://www.videolan.org/" id='vlc' events='false' width="100%" height="100%">
              <param name='mrl' value='${this.videoShopList[0].outUrl}' />
              <param name='volume' value='50' />
              <param name='autoplay' value='true' />
              <param name='loop' value='false' />
              <param name='fullscreen' value='true' />
              <param name='controls' value='true' />
            </object>
      `;*/
      this.videoBottomShopUrl = `<object type='application/x-vlc-plugin'
            id='vlc' width="100%" height="100%" events='True' pluginspage="http://www.videolan.org"
            codebase="http://downloads.videolan.org/pub/videolan/vlc-webplugins/2.2.1/npapi-vlc-2.2.1.tar.xz">
                  <param name='mrl' value='${this.videoShopList[0].outUrl}'/>
                  <param name='volume' value='30'/>
                  <param name='autoplay' value='true'/>
                  <param name='loop' value='false'/>
                  <param value="transparent" name="wmode">
                  <embed id='vlc1' wmode="transparent" type="application/x-vlc-plugin"
                         width="100%" height="100%" pluginspage="http://www.videolan.org"
                         allownetworking="internal" allowscriptaccess="always" quality="high"
                         src='${this.videoShopList[0].outUrl}'>
                </object>
      `;
      setTimeout(() => {
        document.getElementById('shopVideo').innerHTML = this.videoBottomShopUrl;
      }, 100);
    }
  }

  // 公共视频监控
  public openPublicVideo(e) {
    this.videoShopList = e;
    let videoUrlHtml = '';
    document.body.className = 'ui-overflow-hidden';
    this.videoPublicShow = true;
    this.publicVideoTitle = e.cameraName;
   /* videoUrlHtml = videoUrlHtml + `

<object type='application/x-vlc-plugin' pluginspage="http://www.videolan.org/" id='vlc' events='false' width="100%" height="99%">
              <param name='mrl' value='${e.outUrl}' />
              <param name='volume' value='50' />
              <param name='autoplay' value='true' />
              <param name='loop' value='false' />
              <param name='fullscreen' value='true' />
              <param name='controls' value='true' />
            </object>
    `; */
    videoUrlHtml = videoUrlHtml + `
         <object type='application/x-vlc-plugin'
            id='vlc' width="100%" height="100%" events='True' pluginspage="http://www.videolan.org"
            codebase="http://downloads.videolan.org/pub/videolan/vlc-webplugins/2.2.1/npapi-vlc-2.2.1.tar.xz">
                  <param name='mrl' value='${e.outUrl}'/>
                  <param name='volume' value='30'/>
                  <param name='autoplay' value='true'/>
                  <param name='loop' value='false'/>
                  <param value="transparent" name="wmode">
                  <embed id='vlc1' wmode="transparent" type="application/x-vlc-plugin"
                     width="100%" height="100%" pluginspage="http://www.videolan.org"
                     allownetworking="internal" allowscriptaccess="always" quality="high" src='${e.outUrl}'>
         </object>
    `;
    setTimeout(() => {
      if (e.outUrl === '' || e.outUrl === null || e.outUrl === undefined) {
        document.getElementById('publicVideo').innerHTML = `<p class="text-center" style="font-size: 1rem">此商店暂无摄像头</p>`;
        return;
      }
      document.getElementById('publicVideo').innerHTML = videoUrlHtml;
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
  // 服务区合同下载
  public servicesPactDown (): void {
  window.open(`${this.serviceInfo.contractUrlPrefix}${this.serviceInfo.contractUrl}`);
}
  // 收入监控
  public incomeAmountCount(): void {
    this.serareaService.searchIncomeTotal({id: 1}).subscribe(
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
    this.serareaService.searchIncomeTotalPie({id: 1}).subscribe(
      (value) => {
        if (value.status === '200') {
          this.optionsIncomeModel = {
            data: value.data,
            title: '',
            total: '',
            color: ['#00CAE2', '#2307EF', '#4791D8']
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
    this.getIncomeTypesSingle(e.name, this.storeList);
  }
  public getIncomeTotalTypes (): void {
    this.serareaService.searchIncomeTypes().subscribe(
      (value) => {
        if (value.status === '200') {
          this.storeList = value.data;
        }
      }
    );
  }
  public getIncomeTotal(): void {
    this.serareaService.searchIncomeTypesList({page: 1, nums: 1000, types: this.storeList}).subscribe(
      (incomeVal) => {
        if (incomeVal.status === '200') {
          this.IncomeTableData = incomeVal.data.contents;
        }
      }
    );
  }
  public getIncomeTypesSingle(item, storeList): void {
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
    const shopList = storeList.filter((prop, index) => {
      return prop.entryCode === shopType[item].entryCode;
    });
    if (shopList) {
      this.serareaService.searchIncomeTypesItem({entryCode: shopType[item].entryCode, page: 1, nums: 1000, shopList: shopList[0].storeList}).subscribe(
        (value) => {
          console.log(value);
          console.log(value);
          if (value.status === '200') {
            this.IncomeTableData = value.data.contents;
          }
        }
      );
    }
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
      this.getIncomeTotal();
    }
    else if (e.srcElement.innerText === '小吃') {
      this.alertIncomeTitle = '小吃';
      this.alertIncomeTypeTitle = '小吃';
      this.alertIncomeTypeShow = true;
      this.arryIncomePie = [];
      this.getIncomeTypesSingle(e.srcElement.innerText, this.storeList);
    }
    else if (e.srcElement.innerText === '中式快餐') {
      this.alertIncomeTitle = '中式快餐';
      this.alertIncomeTypeTitle = '中式快餐';
      this.alertIncomeTypeShow = true;
      this.arryIncomePie = [];
      this.getIncomeTypesSingle(e.srcElement.innerText, this.storeList);
    }
    else if (e.srcElement.innerText === '西式快餐') {
      this.alertIncomeTitle = '西式快餐';
      this.alertIncomeTypeTitle = '西式快餐';
      this.alertIncomeTypeShow = true;
      this.arryIncomePie = [];
      this.getIncomeTypesSingle(e.srcElement.innerText, this.storeList);
    }
    else if (e.srcElement.innerText === '商超') {
      this.alertIncomeTitle = '商超';
      this.alertIncomeTypeTitle = '商超';
      this.alertIncomeTypeShow = true;
      this.arryIncomePie = [];
      this.getIncomeTypesSingle(e.srcElement.innerText, this.storeList);
    }
    else if (e.srcElement.innerText === '住宿') {
      this.alertIncomeTitle = '住宿';
      this.alertIncomeTypeTitle = '住宿';
      this.alertIncomeTypeShow = true;
      this.arryIncomePie = [];
      this.getIncomeTypesSingle(e.srcElement.innerText, this.storeList);
    }
    else if (e.srcElement.innerText === '汽修') {
      this.alertIncomeTitle = '汽修';
      this.alertIncomeTypeTitle = '汽修';
      this.alertIncomeTypeShow = true;
      this.arryIncomePie = [];
      this.getIncomeTypesSingle(e.srcElement.innerText, this.storeList);
    }
  }
  public incomeExportClick() {
    const startTime = this.datePipe.transform(this.incomeStartTime, 'yyyyMMdd');
    const endTime = this.datePipe.transform(this.incomeEndTime, 'yyyyMMdd');
    if (this.incomeStartTime && this.incomeEndTime) {
      window.location.assign(`http://120.78.137.182:8888/highway-interactive/report/serviceArea/revenue/1/startDate/${startTime}/endDate/${endTime}`);
    } else {
      window.alert('请把数据选择全在提交');
    }
  }
}

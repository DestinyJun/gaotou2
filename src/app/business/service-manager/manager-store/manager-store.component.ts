import {Component, OnDestroy, OnInit} from '@angular/core';
import {ServiceDataService} from '../../../common/services/service-data.service';
import {LocalStorageService} from '../../../common/services/local-storage.service';
import {DatePipe} from '@angular/common';
import {FormBuilder} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {DataService} from '../../../common/services/data.service';

@Component({
  selector: 'app-manager-store',
  templateUrl: './manager-store.component.html',
  styleUrls: ['./manager-store.component.css']
})
export class ManagerStoreComponent implements OnInit, OnDestroy {
  /***********************基础信息************************/
  public alterCommonAttributeValues = [];
  public alterUpAttributeValues = [];
  public alterDownAttributeValues = [];
  public serviceZoneTitle: string;  // 服务区名称
  public serviceZoneID: string;   // 服务区ID
  public esDate: any;  // 时间初始化
  public incomeShopInfoClean: any;
  public incomeManualDirectionSelect = [];
  public shopEchartLine: any;
  public shopEchartArea: any;
  public serviceInfo: any;
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
  constructor(
    private fb: FormBuilder,
    private routerInfo: ActivatedRoute,
    private serareaService: ServiceDataService,
    private localService: LocalStorageService,
    private datePipe: DatePipe
  ) { }

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
    clearInterval(this.incomeShopInfoClean);
  }
  public upData() {
    // 查询服务区方向
    this.serareaService.searchServiceDirection(1).subscribe(
      (val) => {
        if (val.status === '200') {
          this.incomeManualDirectionSelect = [
            {name: `请选择服务区方向......`, code: '-1'},
            {name: `${val.data[0].source}——>${val.data[0].destination}`, code: val.data[0].orientaionId},
            {name: `${val.data[1].source}——>${val.data[1].destination}`, code: val.data[1].orientaionId}
          ];
        }
      }
    );
    // 实时店铺信息
    this.incomeShopInfoClean = setInterval(() => {
      this.backCenterDate();
    }, 3000);
  }
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
}

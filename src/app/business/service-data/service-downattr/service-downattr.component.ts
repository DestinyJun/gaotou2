import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {DatePipe} from '@angular/common';
import {SelectVideoItem} from '../service-data.component';
import {ServiceDataService} from '../../../common/services/service-data.service';
import {environment} from '../../../../environments/environment';
import {LocalStorageService} from '../../../common/services/local-storage.service';

@Component({
  selector: 'app-service-downattr',
  templateUrl: './service-downattr.component.html',
  styleUrls: ['./service-downattr.component.less']
})
export class ServiceDownattrComponent implements OnInit {
  @Input() public incomeBottomData: any;
  @Input() public publicBottomVideoGroup = [];
  @Input() public serviceInfo: any = null;
  @Input() public esDate: any;
  // store time
  public storeInfoSelect = [
    {name: '天', code: 'day'},
    {name: '周', code: 'week'},
    {name: '月', code: 'month'},
    {name: '年', code: 'year'},
  ];
  public publicVideoList = [];
  public videoBottomOpen = [];
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
  public shopEchartLine: any;
  public shopEchartArea: any;
  public selectedCar2 = {
    value: '请选择视频...',
    id: null,
    outUrl: null
  };
  public videoShopList = [];
  public videoBottomShopUrl: string;
  public shopStartTime: Date; // 时间选择器
  public shopEndTime: Date; // 时间选择器
  // 服务区商家视频弹窗
  public cars: SelectVideoItem[] = [];
  // 公共视频弹窗
  public videoPublicShow = false;
  public publicVideoTitle: string;
  constructor(
    private datePipe: DatePipe,
    private serviceSrv: ServiceDataService,
    private localService: LocalStorageService,
  ) { }

  ngOnInit() {
  }

  public addShopVideo(item) {
    this.videoShopList = [];
    // 视频监控
    if (!item.cameraList.length) {
      setTimeout(() => {
        document.getElementById('shopVideo').innerHTML = `<p class="text-center" style="font-size: 1rem">此处暂无摄像头</p>`;
      }, 100);
    } else {
      this.videoShopList = item.cameraList;
      this.cars.unshift({label: '请选择视频...', value: null, outUrl: null});
      this.videoShopList.map((val) => {
        this.cars.push({label: val.cameraName, value: {outUrl: val.outUrl, id: val.id}, outUrl: val.outUrl});
      });
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

  // 服务区合同下载
  public servicesPactDown(): void {
    if (this.serviceInfo.contractUrl === null) {
      window.alert('合同暂未上传');
      return;
    }
    window.open(`${this.serviceInfo.contractUrlPrefix}${this.serviceInfo.contractUrl}`);
  }

  public closePublicVideo() {
    document.body.className = '';
    this.videoPublicShow = false;
    this.localService.windowVideoShow.next(true);
  }
  public closeServiceShop(): void {
    document.body.className = '';
    this.serviceShopShow = false;
    this.localService.windowVideoShow.next(true);
  }

  public openMerchantVideo(): void {
    this.videoBottomShopUrl = `
       <object classid="clsid:9BE31822-FDAD-461B-AD51-BE1D1C159921"
            id="vlc${this.selectedCar2.id}" codebase="" width="100%" height="100%" events="True">
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
               name="vlc${this.selectedCar2.id}"
        />
    </object>
      `;
    setTimeout(() => {
      document.getElementById('shopVideo').innerHTML = this.videoBottomShopUrl;
      setTimeout(() => {
        const vlc = window.document[`vlc${this.selectedCar2.id}`];
        const mrl = this.selectedCar2.outUrl;
        const options = ['rtsp-tcp=true', ' network-caching=500'];
        const itemId = vlc['playlist'].add(mrl, 'asd', options);
        vlc['playlist'].playItem(itemId);
      }, 100);
    }, 100);
  }
  public storeSelectTime (event): void {
    // console.log(event);
  }

  public shopExportClick() {
    const startTime = this.datePipe.transform(this.shopStartTime, 'yyyyMMdd');
    const endTime = this.datePipe.transform(this.shopEndTime, 'yyyyMMdd');
    if (this.shopStartTime && this.shopEndTime) {
      window.open(`${environment.urlc}/report/serviceArea/store/1/startDate/${startTime}/endDate/${endTime}`);
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
  // 公共视频监控
  public openPublicVideo(e) {
    this.videoShopList = e;
    let videoUrlHtml = '';
    document.body.className = 'ui-overflow-hidden';
    this.videoPublicShow = true;
    this.localService.windowVideoShow.next(false);
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
        const options = ['rtsp-tcp=true', ' network-caching=500'];
        const itemId = vlc['playlist'].add(mrl, 'asd', options);
        vlc['playlist'].playItem(itemId);
      }, 100);
    }, 100);
  }
  // 服务区商家
  public openServiceShop(item): void {
    this.videoShopList = [];
    this.cars = [];
    this.serviceShopInfo = item;
    this.serviceShopShow = true;
    this.localService.windowVideoShow.next(false);
    document.body.className = 'ui-overflow-hidden';
    if (item.cameraList !== undefined) {
      this.addShopVideo(this.serviceShopInfo);
    }
    // 折线图
    this.serviceSrv.searchServiceShopLine({
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
    this.serviceSrv.searchServiceShopArea(item.id).subscribe(
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
}

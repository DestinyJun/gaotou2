import {Component, Input, OnInit} from '@angular/core';
import {LocalStorageService} from '../../../common/services/local-storage.service';
import {ApiService} from '../../../common/services/api.service';
interface SelectVideoItem {
  label?: string;
  value: any;
  styleClass?: string;
  icon?: string;
  title?: string;
  disabled?: boolean;
  outUrl?: string;
}
@Component({
  selector: 'app-service-downattr',
  templateUrl: './service-downattr.component.html',
  styleUrls: ['./service-downattr.component.less']
})
export class ServiceDownattrComponent implements OnInit {
  @Input() public downShopData: any;
  @Input() public downVideoList = [];
  public videoList = [];
  public videoOpen = [];
  public publicVideoTitle: string;
  public videoShow = false;
  public iconImages = [
    'icon-Chinese-food',
    'icon-Chinese-restaurant-',
    'icon-fast-food',
    'icon-shop-one',
    'fa fa-bed',
    'fa fa-car'];
  // 服务区商家视频弹窗
  public cars: SelectVideoItem[];
  public selectedCar2 = {
    value: '请选择视频...',
    id: null,
    outUrl: null
  };
  public storeInfoSelect = [
    {name: '天', code: 'day'},
    {name: '周', code: 'week'},
    {name: '月', code: 'month'},
    {name: '年', code: 'year'},
  ];
  public videoShopList = [];
  public shopEchartLine: any;
  public shopEchartArea: any;
  public serviceShopInfo: any;
  public serviceShopShow = false;
  public videoBottomShopUrl: string;
  public serviceShopShowExport = false;
  constructor(
    private localService: LocalStorageService,
    private apiSrv: ApiService
  ) { }

  ngOnInit() {}
  public videoListMouseover(item, i): void {
    if (!item || item.length === 0) {
      this.videoList = [];
      this.videoOpen = [];
    } else {
      item.map(() => {
        this.videoOpen.push(false);
      });
      this.videoOpen[i] = true;
      this.videoList = item;
    }
  }
  public videoListMouseout(i): void {
    this.videoOpen[i] = false;
  }
  public openVideo(e) {
    let videoUrlHtml = '';
    document.body.className = 'ui-overflow-hidden';
    this.videoShow = true;
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
  public closeVideo() {
    document.body.className = '';
    this.videoShow = false;
    this.localService.windowVideoShow.next(true);
  }
  // 服务区店铺详情
  public openServiceShop(item): void {
    this.apiSrv.getStoreInfo({storeId: item.storeId}).subscribe((res) => {
      this.serviceShopInfo = {...res.date, revenue: item.value };
      this.shopEchartArea = {
        data: res.date.dataTrend,
        title: `${item.storeName}业态数据面积图分析`,
      };
      this.shopEchartLine = {
        data: res.date.dataTrend,
        title: `${item.storeName}今日业态数据走势分析`,
        color: ['#36B9AB', '#6ACD72', '#0A30BF', '#027204', '#E36E57']
      };
      this.videoShopList = [];
      this.cars = [];
      this.serviceShopShow = true;
      this.localService.windowVideoShow.next(false);
      document.body.className = 'ui-overflow-hidden';
      if (this.serviceShopInfo.cameraList !== undefined) {
        this.addShopVideo(this.serviceShopInfo);
      }
    });
    /* // 折线图
     this.serviceSrv.searchServiceShopLine({
       id: item.id,
       yIndex: ['revenue', 'passenger', 'electric', 'water', 'washing_out']}).subscribe(
       (val) => {
         if (val.status === '200') {
           /!*  val.data.yData.push({
               code: 'pollution',
               data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
               name: '排污量'
             });*!/
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
     );*/
  }
  public addShopVideo(item) {
    this.videoShopList = [];
    // 视频监控
    if (!item.cameraList.length) {
      setTimeout(() => {
        document.getElementById('shopVideo').innerHTML = `<p class="text-center" style="font-size: 1rem">此处暂无摄像头</p>`;
      }, 100);
    }
    else {
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
    console.log(event);
  }
  public cancelserviceShopVideo(): void {
    this.videoBottomShopUrl = ``;
    setTimeout(() => {
      document.getElementById('shopVideo').innerHTML = this.videoBottomShopUrl;
    }, 100);
  }
  // 服务区合同下载
  public servicesPactDown(): void {
   /* if (this.serviceInfo.contractUrl === null) {
      window.alert('合同暂未上传');
      return;
    }
    window.open(`${this.serviceInfo.contractUrlPrefix}${this.serviceInfo.contractUrl}`);*/
  }
  public shopImageZoom(e): void {
    if (e) {
      document.getElementById('shopVideo').innerHTML = ``;
    } else {
      this.addShopVideo(this.serviceShopInfo);
    }
  }
}

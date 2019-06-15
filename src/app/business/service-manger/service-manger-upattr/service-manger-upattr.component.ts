import {Component, Input, OnInit} from '@angular/core';
import {ServiceDataService} from '../../../common/services/service-data.service';
import {DatePipe} from '@angular/common';
import {SelectVideoItem} from '../../../common/model/service-data.model';

@Component({
  selector: 'app-service-manger-upattr',
  templateUrl: './service-manger-upattr.component.html',
  styleUrls: ['./service-manger-upattr.component.less']
})
export class ServiceMangerUpattrComponent implements OnInit {
  @Input() public publicTopVideoGroup = [];
  // store time
  public serviceShopInfo: any;
  public publicVideoTitle: string;
  public videoTopOpen = [];
  public videoBottomShopUrl: string;
  // 服务区商家视频弹窗
  public cars: SelectVideoItem[];
  public publicVideoList = [];
  public videoShopList = [];
  constructor(
    private serviceSrv: ServiceDataService,
    private datePipe: DatePipe
  ) { }

  ngOnInit() {
  }
  // 公共视频监控
  public openPublicVideo(e) {
    this.videoShopList = e;
    let videoUrlHtml = '';
    document.body.className = 'ui-overflow-hidden';
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
}

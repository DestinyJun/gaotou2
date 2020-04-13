import {Component, Input, OnInit} from '@angular/core';
import {LocalStorageService} from '../../../common/services/local-storage.service';

@Component({
  selector: 'app-service-downattr',
  templateUrl: './service-downattr.component.html',
  styleUrls: ['./service-downattr.component.less']
})
export class ServiceDownattrComponent implements OnInit {
  @Input() public downShopData: any;
  @Input() public downVideoList = [];
  @Input() public serviceInfo: any = null;
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
  constructor(private localService: LocalStorageService) { }

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
}

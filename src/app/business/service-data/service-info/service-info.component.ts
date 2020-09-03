import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {LocalStorageService} from '../../../common/services/local-storage.service';

@Component({
  selector: 'app-service-info',
  templateUrl: './service-info.component.html',
  styleUrls: ['./service-info.component.less'],
})
export class ServiceInfoComponent implements OnInit, OnChanges {
  @Input() serviceId: any;
  @Input() serviceName: any;
  @Input() serviceInfo: any = null;
  public alterServiceInfo = false;
  public video1 = null;
  public video2 = null;
  public commonAttributeValues = []; // 公共属性
  public upAttributeValues = []; // 上行属性
  public downAttributeValues = []; // 下行属性
  constructor(private localService: LocalStorageService) { }
  ngOnInit() {
    this.localService.windowVideoShow.subscribe((value) => {
      if (value) {
        this.openInfoVideo();
      } else {
        this.closeInfoVideo();
      }
    });
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (this.serviceInfo) {
      this.upAttributeValues = this.serviceInfo.fieldTreeList[1].field;
      this.downAttributeValues = this.serviceInfo.fieldTreeList[2].field;
      this.commonAttributeValues = this.serviceInfo.fieldTreeList[3].field;
      const arr = this.commonAttributeValues.filter((item) => item.fieldId === 38  || item.fieldId === 39);
      if (arr.length >= 2) {
        this.video1 = arr[0].fieldValues;
        this.video2 = arr[1].fieldValues;
      }
      this.openInfoVideo();
    }
  }
  public openServiceInfo(): void {
    this.alterServiceInfo = true;
    this.closeInfoVideo();
  }
  public openInfoVideo(): void {
    if (!this.video1) {
      return;
    }
    const infoVideo1Url = `
       <object classid="clsid:9BE31822-FDAD-461B-AD51-BE1D1C159921"
            id="infoVideo1Url" codebase="" width="100%" height="100%" events="True">
        <param name="mrl" value=""/>
        <param name="src" value=""/>
        <param name="controls" value="false"/>
        <param name="ShowDisplay" value="true"/>
        <param name="AutoLoop" value="false"/>
        <param name="autoplay" value="true"/>
        <param name="Time" value="True"/>
        <param name='volume' value='1'/>
        <param value="transparent" name="wmode">
        <embed pluginspage="http://www.videolan.org"
               type="application/x-vlc-plugin"
               version="VideoLAN.VLCPlugin.2"
               width="100%"
               height="100%"
               volume="false"
               controls="false"
               text="Waiting for video"
               name="infoVideo1Url"
        />
    </object>
      `;
    const infoVideo2Url = `
       <object classid="clsid:9BE31822-FDAD-461B-AD51-BE1D1C159921"
            id="infoVideo1Ur2" codebase="" width="100%" height="100%" events="True">
        <param name="mrl" value=""/>
        <param name="src" value=""/>
        <param name="controls" value="false"/>
        <param name="ShowDisplay" value="true"/>
        <param name="AutoLoop" value="false"/>
        <param name="autoplay" value="true"/>
        <param name="Time" value="True"/>
        <param name='volume' value='0'/>
        <param value="transparent" name="wmode">
        <embed pluginspage="http://www.videolan.org"
               type="application/x-vlc-plugin"
               version="VideoLAN.VLCPlugin.2"
               width="100%"
               height="100%"
               volume="false"
               controls="false"
               text="Waiting for video"
               name="infoVideo1Ur2"
        />
    </object>
      `;
    setTimeout(() => {
      document.getElementById('infoVideo1').innerHTML = infoVideo1Url;
      document.getElementById('infoVideo2').innerHTML = infoVideo2Url;
      setTimeout(() => {
        const options = ['rtsp-tcp=true', ' network-caching=500'];
        // 视频1
        const vlc1 = window.document[`infoVideo1Url`];
        const mrl1 = this.video1;
        const itemIda = vlc1['playlist'].add(mrl1, 'asd', options);
        vlc1['playlist'].playItem(itemIda);
        // 视频2
        const vlc2 = window.document[`infoVideo1Ur2`];
        const mrl2 = this.video2;
        const itemIdb = vlc2['playlist'].add(mrl2, 'asd', options);
        vlc2['playlist'].playItem(itemIdb);
      }, 100);
    }, 100);
  }
  public closeInfoVideo(): void {
    document.getElementById('infoVideo1').innerHTML = '';
    document.getElementById('infoVideo2').innerHTML = '';
  }
}

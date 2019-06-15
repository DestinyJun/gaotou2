import {Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';

@Component({
  selector: 'app-service-manger-video',
  templateUrl: './service-manger-video.component.html',
  styleUrls: ['./service-manger-video.component.less']
})
export class ServiceMangerVideoComponent implements OnInit, OnChanges {
  @ViewChild('videoWindow') videoWindow: ElementRef;
  @Input() videoList: any = [];
  public videoUrl1: string;
  public videoUrl2: string;
  public videoUrl3: string;
  public videoUrl4: string;
  public videoUrl5: string;
  public videoUrl6: string;
  constructor() { }

  ngOnInit() {}
  ngOnChanges(changes: SimpleChanges): void {
    if (this.videoList.length > 0) {
      this.videoList.map((val) => {
        this.videoLocation(val.url, val.location);
      });
    }
  }
// video play
  public videoLocation(url: string, location: number): void {
    if (location === 1) {
      this.videoUrl1 = url;
      this.videoWindow.nativeElement.children[location - 1].innerHTML = this.addHtmlVideo1('window1');
      setTimeout(() => {
        const vlc = window.document[`vlcwindow1`];
        const mrl = url;
        const options = ['rtsp-tcp=true', ' network-caching=500'];
        const itemId = vlc['playlist'].add(mrl, 'asd', options);
        vlc['playlist'].playItem(itemId);
      }, 500);
      return;
    }
    if (location === 2) {
      this.videoUrl2 = url;
      this.videoWindow.nativeElement.children[location - 1].innerHTML = this.addHtmlVideo1('window2');
      setTimeout(() => {
        const vlc = window.document[`vlcwindow2`];
        const mrl = url;
        const options = ['rtsp-tcp=true', ' network-caching=500'];
        const itemId = vlc['playlist'].add(mrl, 'asd', options);
        vlc['playlist'].playItem(itemId);
      }, 500);
      return;
    }
    if (location === 3) {
      this.videoUrl3 = url;
      this.videoWindow.nativeElement.children[location - 1].innerHTML = this.addHtmlVideo1('window3');
      // 开始播放
      setTimeout(() => {
        const vlc = window.document[`vlcwindow3`];
        const mrl = url;
        const options = ['rtsp-tcp=true', ' network-caching=500'];
        const itemId = vlc['playlist'].add(mrl, 'asd', options);
        vlc['playlist'].playItem(itemId);
      }, 500);
      return;
    }
    if (location === 4) {
      this.videoUrl4 = url;
      this.videoWindow.nativeElement.children[location - 1].innerHTML = this.addHtmlVideo1('window4');
      // 开始播放
      setTimeout(() => {
        const vlc = window.document[`vlcwindow4`];
        const mrl = url;
        const options = ['rtsp-tcp=true', ' network-caching=500'];
        const itemId = vlc['playlist'].add(mrl, 'asd', options);
        vlc['playlist'].playItem(itemId);
      }, 500);
      return;
    }
   /* if (location === 5) {
      this.videoUrl5 = url;
      this.videoWindow.nativeElement.children[location - 1].innerHTML = this.addHtmlVideo1('window5');
      // 开始播放
      setTimeout(() => {
        const vlc = window.document[`vlcwindow5`];
        const mrl = url;
        const options = ['rtsp-tcp=true', ' network-caching=500'];
        const itemId = vlc['playlist'].add(mrl, 'asd', options);
        vlc['playlist'].playItem(itemId);
      }, 500);
      return;
    }
    if (location === 6) {
      this.videoUrl6 = url;
      this.videoWindow.nativeElement.children[location - 1].innerHTML = this.addHtmlVideo1('window6');
      // 开始播放
      setTimeout(() => {
        const vlc = window.document[`vlcwindow6`];
        const mrl = url;
        const options = ['rtsp-tcp=true', ' network-caching=500'];
        const itemId = vlc['playlist'].add(mrl, 'asd', options);
        vlc['playlist'].playItem(itemId);
      }, 500);
      return;
    }*/
  }
  public addHtmlVideo1(flag: string): string {
    const html = `
            <object classid="clsid:9BE31822-FDAD-461B-AD51-BE1D1C159921"
            id="vlc${flag}" codebase="" width="100%" height="100%" events="True">
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
               name="vlc${flag}"
        />
    </object>
`;
    return html;
  }
}

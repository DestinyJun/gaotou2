import {Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {VideoWindowService} from '../../common/services/video-window.service';
import {LocalStorageService} from '../../common/services/local-storage.service';
import {TreeNode} from '../../common/model/video-window.model';
@Component({
  selector: 'app-video-window',
  templateUrl: './video-window.component.html',
  styleUrls: ['./video-window.component.css'],
})
export class VideoWindowComponent implements OnInit, OnDestroy {
  // 实时客流量
  public videoRecord = [0, 0, 0, 0];
  public showNumber: number; // 监视窗的位置
  public videoInfo: any;
  public videoUrl1: string;
  public videoUrl2: string;
  public videoUrl3: string;
  public videoUrl4: string;
  public videoLocation1: any;
  public videoLocation2: any;
  public videoLocation3: any;
  public videoLocation4: any;
  /************** 区域树************/
  public areas = [];
  public trees: TreeNode[];
  public areaTree1: TreeNode[];
  public areaTree2: TreeNode[];
  public areaTree3: TreeNode[];
  public areaTree4: TreeNode[];
  public areaTree: TreeNode;
  public loading: boolean;

  constructor(
    private videoWindowService: VideoWindowService,
    private localService: LocalStorageService,
  ) {
  }

  ngOnInit() {
    this.videoWindowService.getVideosUrl(this.localService.getObject('userDTO').id).subscribe(
      (val) => {
        if (val.data) {
          this.videoInitialize(val.data);
        }
      }
    );
    // 发射实时客流
    this.getPerson();
    // 发射业太数据名称
    this.localService.eventBus.next({title: '全国高速视频监控大数据', flagState: false, flagName: '全国'});
    this.getUploadDate();
    this.localService.videoShow.subscribe(
      (value) => {
        if (value) {
          document.querySelector('#window1').innerHTML = '';
          document.querySelector('#window2').innerHTML = '';
          document.querySelector('#window3').innerHTML = '';
          document.querySelector('#window4').innerHTML = '';
        } else {
          if (this.videoInfo) {
            this.videoLocation(this.videoInfo.outUrl, this.videoInfo.label, this.videoInfo.showLocation);
          }
        }
      });
  }
  ngOnDestroy(): void {
    // console.log(this.videoRecord);
  }
  // 客流
  public getPerson(): void {
    this.localService.persons.next({
      total: [],
      province: [],
      city: []
    });
  }
  public getUploadDate() {
    this.loading = true;
    this.videoWindowService.searchAreaList().subscribe(
      (val) => {
        if (val.status === '200') {
          this.areas = val.data;
          this.areaTree1 = this.initializeTree(val.data);
          this.areaTree2 = this.initializeTree(val.data);
          this.areaTree3 = this.initializeTree(val.data);
          this.areaTree4 = this.initializeTree(val.data);
          this.trees = [{
            label: '全国高速视频监控',
            children: [
              {label: '一号监视窗口', children: this.areaTree1, showNumber: 1},
              {label: '二号监视窗口', children: this.areaTree2, showNumber: 2},
              {label: '三号监视窗口', children: this.areaTree3, showNumber: 3},
              {label: '四号监视窗口', children: this.areaTree4, showNumber: 4},
            ]
          }];
          this.loading = false;
        }
      }
    );
  }
  // 选择树结构
  public nodeExpand (event): void {
    if (event.node.label === '一号监视窗口') {
      this.showNumber = 1;
    } else if (event.node.label === '二号监视窗口') {
      this.showNumber = 2;
    } else if (event.node.label === '三号监视窗口') {
      this.showNumber = 3;
    } else if (event.node.label === '四号监视窗口') {
      this.showNumber = 4;
    }
    if (event.node.children[0].level === 2) {
      for (let i = 0; i < event.node.children.length; i++) {
        this.videoWindowService.searchServiceAreaList(event.node.children[i].id).subscribe(
          (value) => {
            if (value.status === '200') {
              event.node.children[i].children = this.initializeServiceAreaTree(value.data);
            }
          }
        );
      }
      return;
    }
    if (event.node.children[0].level === 4) {
      for (let i = 0; i < event.node.children.length; i++) {
        this.videoWindowService.searchVideosList(event.node.children[i].id).subscribe(
          (value) => {
            if (value.status === '200') {
              event.node.children[i].children = this.initializeSourceDesTree(value.data, this.showNumber);
            }
          }
        );
      }
      return;
    }
  }
  public nodeSelect(event): void {
    if (event.node.level === 6) {
      console.log(event.node);
      this.videoInfo = event.node;
      this.videoLocation(event.node.outUrl, event.node.label, event.node.showLocation);
      if (event.node.showLocation === 1) {
        this.videoRecord[0] = event.node.id;
        this.videoWindowService.saveVideosUrl(this.localService.getObject('userDTO').id, this.videoRecord).subscribe(
          (val) => {
            console.log(val);
          }
        );
        return;
      }
      if (event.node.showLocation === 2) {
        this.videoRecord[1] = event.node.id;
        this.videoWindowService.saveVideosUrl(this.localService.getObject('userDTO').id, this.videoRecord).subscribe(
          (val) => {
            console.log(val);
          }
        );
        return;
      }
      if (event.node.showLocation === 3) {
        this.videoRecord[2] = event.node.id;
        this.videoWindowService.saveVideosUrl(this.localService.getObject('userDTO').id, this.videoRecord).subscribe(
          (val) => {
            console.log(val);
          }
        );
        return;
      }
      if (event.node.showLocation === 4) {
        this.videoRecord[3] = event.node.id;
        this.videoWindowService.saveVideosUrl(this.localService.getObject('userDTO').id, this.videoRecord).subscribe(
          (val) => {
            console.log(val);
          }
        );
        return;
      }
    }
  }
  // 视频初始化
  public videoInitialize (item): void {
    for (let i = 0; i < item.length; i++) {
      if (item[i].showLocation === 1) {
        this.videoRecord[0] = item[i].id;
        this.videoLocation(item[i].outUrl, item[i].cameraName, item[i].showLocation);
      }
      if (item[i].showLocation === 2) {
        this.videoRecord[1] = item[i].id;
        this.videoLocation(item[i].outUrl, item[i].cameraName, item[i].showLocation);
      }
      if (item[i].showLocation === 3) {
        this.videoRecord[2] = item[i].id;
        this.videoLocation(item[i].outUrl, item[i].cameraName, item[i].showLocation);
      }
      if (item[i].showLocation === 4) {
        this.videoRecord[3] = item[i].id;
        this.videoLocation(item[i].outUrl, item[i].cameraName, item[i].showLocation);
      }
    }
  }
  // 视频播放
  public videoLocation(url: string, name: string, location: number): void {
   if (location === 1) {
     this.videoLocation1 = name;
     this.videoUrl1 = url;
     document.querySelector('#window1').innerHTML = this.addHtmlVideo1('window1');
     setTimeout(() => {
       const vlc = window.document[`vlcwindow1`];
       const mrl = url;
       const options = ['rtsp-tcp=true', ' network-caching=500'];
       const itemId = vlc['playlist'].add(mrl, 'asd', options);
       vlc['playlist'].playItem(itemId);
     }, 500);
   } else if (location === 2) {
     this.videoLocation2 = name;
     document.querySelector('#window2').innerHTML = this.addHtmlVideo1('window2');
     setTimeout(() => {
       const vlc = window.document[`vlcwindow2`];
       const mrl = url;
       const options = ['rtsp-tcp=true', ' network-caching=500'];
       const itemId = vlc['playlist'].add(mrl, 'asd', options);
       vlc['playlist'].playItem(itemId);
     }, 500);
     this.videoUrl2 = url;
   } else if (location === 3) {
     this.videoLocation3 = name;
     this.videoUrl3 = url;
     document.querySelector('#window3').innerHTML = this.addHtmlVideo1('window3');
     // 开始播放
     setTimeout(() => {
       const vlc = window.document[`vlcwindow3`];
       const mrl = url;
       const options = ['rtsp-tcp=true', ' network-caching=500'];
       const itemId = vlc['playlist'].add(mrl, 'asd', options);
       vlc['playlist'].playItem(itemId);
     }, 500);
   } else if (location === 4) {
     this.videoLocation4 = name;
     this.videoUrl4 = url;
     document.querySelector('#window4').innerHTML = this.addHtmlVideo1('window4');
     // 开始播放
     setTimeout(() => {
       const vlc = window.document[`vlcwindow4`];
       const mrl = url;
       const options = ['rtsp-tcp=true', ' network-caching=500'];
       const itemId = vlc['playlist'].add(mrl, 'asd', options);
       vlc['playlist'].playItem(itemId);
     }, 500);
   }
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
  /**************************数据格式化**************************/
  // 区域树数据格式化
  public initializeTree(data): any {
    const oneChild = [];
    for (let i = 0; i < data.length; i++) {
      const childnode =  new TreeNode();
      childnode.label = data[i].areaName;
      childnode.id = data[i].id;
      childnode.areaCode = data[i].areaCode;
      childnode.parentId = data[i].parentId;
      childnode.enabled = data[i].enabled;
      childnode.cityType = data[i].cityType;
      childnode.level = data[i].level;
      if (data[i].administrativeAreaList === null) {
        childnode.children = [];
      } else {
        childnode.children = this.initializeTree(data[i].administrativeAreaList);
      }
      oneChild.push(childnode);
    }
    return oneChild;
  }
  // 服务区树数据格式化
  public initializeServiceAreaTree(data): any {
    const oneChild = [];
    for (let i = 0; i < data.length; i++) {
      const childnode =  new TreeNode();
      childnode.label = data[i].name;
      childnode.id = data[i].id;
      childnode.children = [];
      childnode.level = 4;
      oneChild.push(childnode);
    }
    return oneChild;
  }
  // 上下行树数据格式化
  public initializeSourceDesTree(data, locationNumber): any {
    // console.log(data);
    // console.log(locationNumber);
    data.map((item, i) => {
      item.cameraList = item.cameraList.filter((prop, j) => {
        return prop.showLocation === locationNumber;
      });
    });
    const oneChild = [];
    for (let i = 0; i < data.length; i++) {
      const childnode =  new TreeNode();
      childnode.label = data[i].source + '—>' + data[i].destination;
      childnode.id = data[i].id;
      childnode.children = this.initializeVideoTree(data[i].cameraList);
      childnode.level = 5;
      oneChild.push(childnode);
    }
    return oneChild;
  }
  // 视频树数据格式化
  public initializeVideoTree(data): any {
    const oneChild = [];
    for (let i = 0; i < data.length; i++) {
      const childnode =  new TreeNode();
      childnode.label = data[i].cameraName;
      childnode.id = data[i].id;
      childnode.outUrl = data[i].outUrl;
      childnode.showLocation = data[i].showLocation;
      childnode.level = 6;
      oneChild.push(childnode);
    }
    return oneChild;
  }
}

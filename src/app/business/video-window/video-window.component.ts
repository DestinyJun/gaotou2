import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {VideoWindowService} from '../../common/services/video-window.service';
import {LocalStorageService} from '../../common/services/local-storage.service';
import {TreeNode} from '../../common/model/video-window.model';
@Component({
  selector: 'app-video-window',
  templateUrl: './video-window.component.html',
  styleUrls: ['./video-window.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class VideoWindowComponent implements OnInit {
  // 实时客流量
  public persons = [];
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
  public areaTrees: TreeNode[];
  public areaTree: TreeNode;
  public loading: boolean;

  constructor(
    private videoWindowService: VideoWindowService,
    private localService: LocalStorageService
  ) {
  }

  ngOnInit() {
    // 发射实时客流
    this.getPerson();
    // 发射业太数据名称
    this.localService.eventBus.next({title: '全国高速视频监控大数据', flagState: 'window', flagName: '全国'});
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
  // 客流
  public getPerson(): void {
    this.localService.persons.next({
      total: [],
      totalDistribute: []
    });
  }
  public getUploadDate() {
    this.loading = true;
    this.videoWindowService.searchAreaList().subscribe(
      (val) => {
        if (val.status === '200') {
          this.areas = val.data;
          this.areaTrees = this.initializeTree(val.data);
          this.trees = [{
            label: '全国高速视频监控',
            children: [
              {label: '一号监视窗口', children: this.areaTrees, showNumber: 1},
              {label: '二号监视窗口', children: this.areaTrees, showNumber: 2},
              {label: '三号监视窗口', children: this.areaTrees, showNumber: 3},
              {label: '四号监视窗口', children: this.areaTrees, showNumber: 4},
            ]
          }];
          this.loading = false;
        }
      }
    );
  }
  // 选择树结构
  public nodeSelect(event): void {
    if (event.node.level === 2) {
      this.videoWindowService.searchServiceAreaList(event.node.id).subscribe(
      (value) => {
        if (value.status === '200') {
          event.node.children = this.initializeServiceAreaTree(value.data);
        }
      }
    );
    } else if (event.node.level === 4) {
      this.videoWindowService.searchVideosList(event.node.id).subscribe(
        (value) => {
          console.log(value);
          console.log(event.node);
          if (value.status === '200') {
            event.node.children = this.initializeSourceDesTree(value.data);
          }
        }
      );
    } else if (event.node.level === 6) {
      console.log(event.node);
      this.videoInfo = event.node;
      this.videoLocation(event.node.outUrl, event.node.label, event.node.showLocation);
    }
  }
  public nodeUnselect(event) {
    // console.log('2');
  }
  // 视频播放
  public videoLocation(url: string, name: string, location: number): void {
   if (location === 1) {
     this.videoLocation1 = name;
     this.videoUrl1 = url;
     document.querySelector('#window1').innerHTML = this.addHtmlVideo1(url);
   } else if (location === 2) {
     this.videoLocation2 = name;
     document.querySelector('#window2').innerHTML = this.addHtmlVideo1(url);
     this.videoUrl2 = url;
   } else if (location === 3) {
     this.videoLocation3 = name;
     this.videoUrl3 = url;
     document.querySelector('#window3').innerHTML = this.addHtmlVideo1(url);
   } else if (location === 4) {
     this.videoLocation4 = name;
     this.videoUrl4 = url;
     document.querySelector('#window4').innerHTML = this.addHtmlVideo1(url);
   }
 }
  public addHtmlVideo1(url: string): string {
    const html = `
            <object type='application/x-vlc-plugin'
            pluginspage="http://www.videolan.org/" id='vlc' events='false' width="100%" height="98%">
              <param name='mrl' value='${url}' />
              <param name='volume' value='50' />
              <param name='autoplay' value='true' />
              <param name='loop' value='false' />
              <param name='fullscreen' value='true' />
              <param name='controls' value='true' />
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
  public initializeSourceDesTree(data): any {
   /* console.log(data);
    data.map((item, i) => {
      console.log(item.cameraList);
      item.cameraList = item.cameraList.filter((prop, j) => {
        return prop.showLocation === 1;
      });
    });*/
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
      childnode.outUrl = data[i].outUrl;
      childnode.showLocation = data[i].showLocation;
      childnode.level = 6;
      oneChild.push(childnode);
    }
    return oneChild;
  }
}

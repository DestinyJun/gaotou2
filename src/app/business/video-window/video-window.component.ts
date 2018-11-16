import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {VideoWindowService} from '../../common/services/video-window.service';
import {LocalStorageService} from '../../common/services/local-storage.service';
import {ServiceAreaNode, TreeNode} from '../../common/model/video-window.model';


@Component({
  selector: 'app-video-window',
  templateUrl: './video-window.component.html',
  styleUrls: ['./video-window.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class VideoWindowComponent implements OnInit {
  // 实时客流量
  public persons = [];
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
  public areaTrees: TreeNode[];
  public areaTree: TreeNode;
  public serAreas: any;
  public loading: boolean;

  constructor(
    private videoWindowService: VideoWindowService,
    private localService: LocalStorageService
  ) {
  }

  ngOnInit() {
    // 发射实时客流
    this.localService.persons.next(this.persons);
    // 发射业太数据名称
    this.localService.eventBus.next('全国高速视频监控大数据');
    this.localService.eventBus.next({title: '全国高速视频监控大数据', flagState: 'window', flagName: '全国'});
    this.videoLocation1 = '';
    this.videoLocation2 = '';
    this.videoLocation3 = '';
    this.videoLocation4 = '';
    this.getUploadDate();
  }
  public getUploadDate() {
    this.loading = true;
    this.videoWindowService.searchAreaList().subscribe(
      (val) => {
        if (val.status === '200') {
          this.areas = val.data;
          this.areaTrees = this.initializeTree(val.data);
          this.loading = false;
        }
      }
    );
  }
  // 选选择树结构
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
          console.log(event.node);
          if (value.status === '200') {
            event.node.children = this.initializeSourceDesTree(value.data);
          }
        }
      );
    } else if (event.node.level === 6) {
      console.log(event.node.outUrl);
      this.videoLocation(event.node.outUrl, event.node.label, event.node.showLocation);
    }
  }
  public nodeUnselect(event) {
    console.log('2');
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
    const oneChild = [];
    for (let i = 0; i < data.length; i++) {
      const childnode =  new TreeNode();
      childnode.label = data[i].flagName;
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

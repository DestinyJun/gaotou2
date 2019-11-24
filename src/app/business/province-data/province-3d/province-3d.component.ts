import {Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {Router} from '@angular/router';
import {FinanceDataService} from '../../../common/services/finance-data.service';
import {LocalStorageService} from '../../../common/services/local-storage.service';
import {DatePipe} from '@angular/common';
import {ExampleDataService} from '../../../common/services/example-data.service';
import {environment} from '../../../../environments/environment';

@Component({
  selector: 'app-province-3d',
  templateUrl: './province-3d.component.html',
  styleUrls: ['./province-3d.component.less']
})
export class Province3dComponent implements OnInit, OnChanges, OnDestroy {
  @Input() public provinceId: any;
  @Input() public provinceName: any;
  @Input() public esDate: any;  // 时间初始化
  // 3D柱状图配置
  public options3d: any;
  public options3dCopy: any;
  public alertBarShow = false;
  public alertBarTitle: string;
  public options3dBar = {};
  public options3dPie = {};
  public outOptions3d: any; // 3D图组件传出来的值
  public bar3dExcelShow = false;  // 3D图统计的表格导出
  public startTime3d: Date; // 时间选择器
  public endTime3d: Date; // 时间选择器
  // 视频配置
  public video1: any;
  public video2: any;
  public timer: any;
  constructor(
    private router: Router,
    private financeDataService: FinanceDataService,
    private localService: LocalStorageService,
    private datePipe: DatePipe,
    private exampleService: ExampleDataService
  ) { }

  ngOnInit() {
    this.videoChange();
    this.localService.windowVideoShow.subscribe((value) => {
      if (value) {
        this.openInfoVideo();
      } else {
        this.closeInfoVideo();
      }
    });
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.packOption3();
  }

  // 3D柱状图
  public packOption3() {
    // 车流客流人流
    this.financeDataService.search3DBar({id: this.provinceId, parameter: ['revenue', 'passenger', 'vehicle']}).subscribe(
      (val) => {
        if (val.status === '200') {
          this.options3d = val.data;
        }
      }
    );
    // 用电量用水量
    this.financeDataService.search3DBar({id: this.provinceId, parameter: ['electric', 'water']}).subscribe(
      (val) => {
        if (val.status === '200') {
          this.options3dCopy = val.data;
        }
      }
    );
  }
  public onOutOptions3d(e): void {
    this.outOptions3d = e;
    document.body.className = 'ui-overflow-hidden';
    this.alertBarShow = true;
    this.alertBarTitle = this.outOptions3d.alertBarTitle;
    // 柱状图
    this.options3dBar = {
      timeType: 'month',
      data: this.exampleService.getProvinceBarMonthData(),
      xType: this.outOptions3d.pie.xType,
      title: `贵州省本年度服务区${this.outOptions3d.alertBarTitle}统计`
    };
    this.financeDataService.search3DAlertBar({id: this.provinceId, types: this.outOptions3d.bar.types}).subscribe(
      (val) => {
        if (val.status === '200') {
          this.options3dBar = {
            data: val.data,
            xType: this.outOptions3d.pie.xType,
            title: `贵州省所有服务区年度${this.outOptions3d.alertBarTitle}统计`
          };
        }
      }
    );
    // 类型占比扇形图
    this.financeDataService.search3DAlertPie({
      id: this.provinceId,
      xType: this.outOptions3d.pie.xType,
      types: this.outOptions3d.pie.types}).subscribe(
      (val) => {
        if (val.status === '200') {
          this.options3dPie = {
            data: val.data,
            title: `贵州省所有服务区年度${this.outOptions3d.alertBarTitle}类型占比统计`,
            total: this.outOptions3d.total,
            color: ['#CE2D79', '#BDD139', '#78E77D', '#09D4D6', '#3C75B9',
              '#6769B1', '#FF8C9D', '#2796C4', '#E57D0D']
          };
        }
      }
    );
  }
  public onOutOptions3dBar(e): void {
    // 类型占比扇形图
    this.financeDataService.search3DAlertPie({id: this.provinceId, xType: e.xType, types: this.outOptions3d.pie.types}).subscribe(
      (val) => {
        if (val.status === '200') {
          this.options3dPie = {
            data: val.data,
            title: `贵州省所有服务区年度${this.outOptions3d.alertBarTitle}类型占比统计`,
            total: e.data,
            color: ['#CE2D79', '#BDD139', '#78E77D', '#09D4D6', '#3C75B9',
              '#6769B1', '#FF8C9D', '#2796C4', '#E57D0D']
          };
        }
      }
    );
  }
  public onOptions3dPie(e): void {
    this.router.navigate(['/home/city', {id: e.data.id, name: e.name}]);
  }
  public closeBarShow() {
    document.body.className = '';
    this.alertBarShow = false;
  }
  public bar3dExportClick() {
    const startTime = this.datePipe.transform(this.startTime3d, 'yyyyMMdd');
    const endTime = this.datePipe.transform(this.endTime3d, 'yyyyMMdd');
    if (this.startTime3d && this.endTime3d) {
      window.open(`${environment.urlc}/report/province/3d/2/startDate/${startTime}/endDate/${endTime}`);
    } else {
      window.alert('请把数据选择全在提交');
    }
  }
  // 视频加载与清空
  public openInfoVideo(): void {
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
  public videoChange() {
    const videlUrls = [
      'rtsp://admin:Hik12345+@117.187.60.146:563',
      'rtsp://admin:Hik12345+@117.187.60.146:558',
      'rtsp://admin:Hik12345+@117.187.60.146:561',
      'rtsp://admin:Hik12345+@117.187.60.146:569',
      'rtsp://admin:Hik12345+@117.187.60.146:571',
      'rtsp://admin:Hik12345+@117.187.60.138:564',
      'rtsp://admin:a12345678@117.187.60.138:617'
    ];
    const number1 = Math.floor(Math.random() * (6));
    const number2 = Math.floor(Math.random() * (6));
    this.video1 = videlUrls[number1];
    this.video2 = videlUrls[number2];
    this.openInfoVideo();
  }
  ngOnDestroy(): void {
    clearInterval(this.timer);
  }
}

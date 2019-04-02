import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Router} from '@angular/router';
import {LocalStorageService} from '../../../common/services/local-storage.service';
import {DatePipe} from '@angular/common';
import {ServiceDataService} from '../../../common/services/service-data.service';

@Component({
  selector: 'app-service-3d',
  templateUrl: './service-3d.component.html',
  styleUrls: ['./service-3d.component.less']
})
export class Service3dComponent implements OnInit, OnChanges {
  @Input() public serviceId: any;
  @Input() public serviceName: any;
  @Input() public esDate: any;  // 时间初始化
  // 3D柱状图配置
  public options3d: any;
  public options3dCopy: any;
  public alertBarShow = false;
  public alertBarTitle: string;
  public options3dBar = {};
  public options3dLine: any;
  public outOptions3d: any; // 3D图组件传出来的值
  public bar3dExcelShow = false;  // 3D图统计的表格导出
  public startTime3d: Date; // 时间选择器
  public endTime3d: Date; // 时间选择器
  constructor(
    private router: Router,
    private serviceDataSrv: ServiceDataService,
    private localService: LocalStorageService,
    private datePipe: DatePipe,
  ) { }
  ngOnInit() {}
  ngOnChanges(changes: SimpleChanges): void {
    this.packOption3();
  }
  // 3D柱状图
  public packOption3() {
    // 车流客流人流
    this.serviceDataSrv.search3DBar({id: this.serviceId, parameter: ['revenue', 'passenger', 'vehicle']}).subscribe(
      (val) => {
        if (val.status === '200') {
          this.options3d = val.data;
        }
      }
    );
    // 用电量用水量
    this.serviceDataSrv.search3DBar({id: this.serviceId, parameter: ['electric', 'water', 'washing_out']}).subscribe(
      (val) => {
        if (val.status === '200') {
          this.options3dCopy = val.data;
        }
      }
    );
  }

  public onOutOptions3d(e): void {
    const defaultMonth = new Date().getMonth() + 1;
    this.outOptions3d = e;
    document.body.className = 'ui-overflow-hidden';
    this.alertBarShow = true;
    this.alertBarTitle = this.outOptions3d.alertBarTitle;
    // 柱状图
    this.serviceDataSrv.search3DAlertBar({id: this.serviceId, types: this.outOptions3d.bar.types}).subscribe(
      (val) => {
        if (val.status === '200') {
          this.options3dBar = {
            data: val.data,
            xType: this.outOptions3d.pie.xType,
            title: `贵州省久长服务区年度${this.outOptions3d.alertBarTitle}统计`
          };
        }
      }
    );
    // 折线图
    this.serviceDataSrv.search3DAlertLineMonth(
      {
        id: this.serviceId, month: defaultMonth,
        types: ['revenue', 'passenger', 'vehicle', 'electric', 'water', 'washing_out']}).subscribe(
      (val) => {
        if (val.status === '200') {
          this.options3dLine = {
            title: `贵州省久长服务区${this.options3d.xdata[defaultMonth - 1]}业态走势图`,
            data: val.data,
            color: ['#7C7CD4', '#36B9AB', '#6ACD72', '#0A30BF', '#027204', '#E36E57']
          };
        }
      }
    );
  }

  public onOutOptions3dBar(e): void {
    // 折线图
    this.serviceDataSrv.search3DAlertLineMonth(
      {
        id: this.serviceId, month: e.xType + 1,
        types: ['revenue', 'passenger', 'vehicle', 'electric', 'water', 'washing_out']}).subscribe(
      (val) => {
        if (val.status === '200') {
          this.options3dLine = {
            title: `贵州省久长服务区${this.options3d.xdata[e.xType]}业态走势图`,
            data: val.data,
            color: ['#7C7CD4', '#36B9AB', '#6ACD72', '#0A30BF', '#027204', '#E36E57']
          };
        }
      }
    );
  }

  public closeBarShow() {
    this.alertBarShow = false;
    document.body.className = '';
  }

  public bar3dExportClick() {
    const startTime = this.datePipe.transform(this.startTime3d, 'yyyyMMdd');
    const endTime = this.datePipe.transform(this.endTime3d, 'yyyyMMdd');
    if (this.startTime3d && this.endTime3d) {
      window.open(`http://120.78.137.182:8888/highway-interactive/report/serviceArea/3d/1/startDate/${startTime}/endDate/${endTime}`);
    } else {
      window.alert('请把数据选择全在提交');
    }
  }
}

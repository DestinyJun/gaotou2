import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {EventListInfo, UploadEventInfoUp} from '../../../common/model/service-data.model';
import {ServiceDataService} from '../../../common/services/service-data.service';
import {LocalStorageService} from '../../../common/services/local-storage.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-manager-office',
  templateUrl: './manager-office.component.html',
  styleUrls: ['./manager-office.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ManagerOfficeComponent implements OnInit {
  public serviceZoneTitle: string;  // 服务区名称
  public serviceZoneID: string;   // 服务区ID
// 事件弹窗
  public serviceInfo: any;
  public eventList: EventListInfo[];
  public eventListInfo: EventListInfo;
  public eventListProcess: EventListInfo[];
  public eventListNoProcess: EventListInfo[];
  public alterCommonAttributeValues = [];
  public alterUpAttributeValues = [];
  public alterDownAttributeValues = [];
  public uploadEventInfoUp: UploadEventInfoUp = new UploadEventInfoUp();
  public eventAlertShow = false;
  public eventAlertListShow = true;
  public eventAlertInfoUp = false;
  public eventAlertInfoUpTitle: string;
  public eventInfoUpTypes = [];
  // 服务区厕所监控
  public serversToiletAlertShow = false;
  public waitTitle: string;
  constructor(
    private serareaService: ServiceDataService,
    private localService: LocalStorageService,
    private routerInfo: ActivatedRoute,
  ) { }

  ngOnInit() {
    // 路由接受参数
    this.routerInfo.params.subscribe(
      (params) => {
        this.serviceZoneTitle = params.name;
        this.serviceZoneID = params.id;
        this.localService.eventBus.next({title: this.serviceZoneTitle + '业态大数据', flagState: 'serzone', flagName: this.serviceZoneTitle});
      }
    );
    this.serareaService.searchSerAraItem(this.serviceZoneID).subscribe(
      (value) => {
        this.serviceInfo = value.data;
        value.data.commonAttributeValues.map((val, index) => {
          this.alterCommonAttributeValues.push(this.cloneValue(val));
        });
        value.data.upAttributeValues.attributeValues.map((val, index) => {
          this.alterUpAttributeValues.push(this.cloneValue(val));
        });
        value.data.downAttributeValues.attributeValues.map((val, index) => {
          this.alterDownAttributeValues.push(this.cloneValue(val));
        });
      }
    );
    // 事件列表
    this.eventNotPoocess();
    // 事件上报类型
    this.serareaService.searchEventCategory().subscribe(
      (value) => {
        if (value.status === '200') {
          this.eventInfoUpTypes = value.data;
        }
      }
    );
  }
  // 未处理事件统计
  public eventNotPoocess(): void {
    this.serareaService.searchNotPoocessEventsList({page: 1, nums: 1000}).subscribe(
      (value) => {
        if (value.status === '200') {
          this.eventList = value.data.contents;
        }
      }
    );
  }
  public openEventAlert(item): void {
    document.body.className = 'ui-overflow-hidden';
    this.eventAlertShow = true;
    // 未处理
    this.serareaService.searchEventsTypeList({eventCategoryCode: item.eventCategoryCode, processState: 2, page: 1, nums: 1000}).subscribe(
      (value) => {
        if (value.status === '200') {
          this.eventListNoProcess = value.data.contents;
        }
      }
    );
    // 已处理
    this.serareaService.searchEventsTypeList({eventCategoryCode: item.eventCategoryCode, processState: 1, page: 1, nums: 1000}).subscribe(
      (value) => {
        if (value.status === '200') {
          this.eventListProcess = value.data.contents;
        }
      }
    );
  }
  public closeEventAlert() {
    document.body.className = '';
    this.eventAlertShow = false;
  }
  public eventAlertListCtrlw(): void {
    this.eventAlertListShow = true;
  }
  public eventAlertListCtrly(): void {
    this.eventAlertListShow = false;
  }
  public eventListInfosClick(item): void {
    console.log(item);
    this.eventListInfo = item;
  }
  // 事件上报
  public eventInfoUpClick(e): void {
    if (e.eventCategoryName !== '经营类') {
      this.waitTitle = e.eventCategoryName;
      this.serversToiletAlertShow = true;
    } else {
      this.uploadEventInfoUp.eventCategoryCode = e.categoryCode;
      this.uploadEventInfoUp.eventCategoryName = e.eventCategoryName;
      this.eventAlertInfoUpTitle = e.eventCategoryName;
      this.eventAlertInfoUp = true;
    }
  }
  public closeEventInfoUpClick(): void {
    // document.body.className = '';
    this.eventAlertInfoUp = false;
  }
  public serviceInfoUpAlertClick() {
    document.body.className = '';
    this.eventAlertInfoUp = false;
    this.uploadEventInfoUp.administrativeAreaId = 2;
    this.uploadEventInfoUp.serviceAreaId = 1;
    this.uploadEventInfoUp.reportUserId = this.localService.getObject('userDTO').id;
    this.uploadEventInfoUp.reportUserName = this.localService.getObject('userDTO').realName;
    this.serareaService.searchEventsReported(this.uploadEventInfoUp).subscribe(
      (value) => {
        if (value === '200') {
          window.alert(value.message);
        }
      }
    );
  }
  // 卫生间及停车位弹窗
  public openServersToiletAlert(e) {
    document.body.className = 'ui-overflow-hidden';
    this.waitTitle = e;
    this.serversToiletAlertShow = true;
  }
  public closeServersToiletAlert() {
    document.body.className = '';
    this.serversToiletAlertShow = false;
  }
  // 遍历修改后的数据，并把它赋值给car1
  public cloneValue(c: any): any {
    const car = {};
    for (const prop in c) {
      if (c) {
        car[prop] = c[prop];
      }
    }
    return car;
  }
}

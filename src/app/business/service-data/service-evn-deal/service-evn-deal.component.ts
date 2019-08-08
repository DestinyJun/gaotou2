import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {EventListInfo} from '../../../common/model/service-data.model';
import {ServiceDataService} from '../../../common/services/service-data.service';

@Component({
  selector: 'app-service-evn-deal',
  templateUrl: './service-evn-deal.component.html',
  styleUrls: ['./service-evn-deal.component.less']
})
export class ServiceEvnDealComponent implements OnInit, OnChanges {
  @Input() public serviceId: any = null;
  public eventList: EventListInfo[];
  public eventListInfo: EventListInfo;
  public eventListNoProcess: EventListInfo[];
  public eventListProcess: EventListInfo[];
  // 事件弹窗
  public eventAlertListShow = true;
  public eventAlertShow = false;
  constructor(
    private serviceSrv: ServiceDataService,
  ) { }

  ngOnInit() {}
  ngOnChanges(changes: SimpleChanges): void {
    if (this.serviceId) {
      // 事件列表
      this.eventNotPoocess();
    }
  }
  public openEventAlert(item): void {
    document.body.className = 'ui-overflow-hidden';
    this.eventAlertShow = true;
    // 未处理
    this.serviceSrv.searchEventsTypeList(
      {id: this.serviceId, eventCategoryCode: item.eventCategoryCode, processState: 2, page: 1, nums: 1000}).subscribe(
      (value) => {
        if (value.status === '200') {
          this.eventListNoProcess = value.data.contents;
        }
      }
    );
    // 已处理
    this.serviceSrv.searchEventsTypeList({eventCategoryCode: item.eventCategoryCode, processState: 1, page: 1, nums: 1000}).subscribe(
      (value) => {
        if (value.status === '200') {
          this.eventListProcess = value.data.contents;
        }
      }
    );
  }
  // 未处理事件统计
  public eventNotPoocess(): void {
    this.serviceSrv.searchNotPoocessEventsList({id: this.serviceId, page: 1, nums: 1000}).subscribe(
      (value) => {
        if (value.status === '200') {
          this.eventList = value.data.contents;
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
    this.eventListInfo = item;
  }

}

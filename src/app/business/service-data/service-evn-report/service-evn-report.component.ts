import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {UploadEventInfoUp} from '../../../common/model/service-data.model';
import {LocalStorageService} from '../../../common/services/local-storage.service';
import {ServiceDataService} from '../../../common/services/service-data.service';

@Component({
  selector: 'app-service-evn-report',
  templateUrl: './service-evn-report.component.html',
  styleUrls: ['./service-evn-report.component.less']
})
export class ServiceEvnReportComponent implements OnInit, OnChanges {
  public eventInfoUpTypes = [];
  public uploadEventInfoUp: UploadEventInfoUp = new UploadEventInfoUp();
  public eventAlertInfoUp = false;
  public eventAlertInfoUpTitle: string;
  constructor(
    private localSrv: LocalStorageService,
    private serviceSrv: ServiceDataService,
  ) { }

  ngOnInit() {
    // 事件上报类型
    this.serviceSrv.searchEventCategory().subscribe(
      (value) => {
        if (value.status === '200') {
          this.eventInfoUpTypes = value.data;
        }
      }
    );
  }
  ngOnChanges(changes: SimpleChanges): void {}
  public closeEventInfoUpClick(): void {
    this.eventAlertInfoUp = false;
  }
  public serviceInfoUpAlertClick() {
    this.eventAlertInfoUp = false;
    document.body.className = '';
    this.uploadEventInfoUp.administrativeAreaId = 2;
    this.uploadEventInfoUp.serviceAreaId = 1;
    this.uploadEventInfoUp.reportUserId = this.localSrv.getObject('userDTO').id;
    this.uploadEventInfoUp.reportUserName = this.localSrv.getObject('userDTO').realName;
    console.log(this.uploadEventInfoUp);
    this.serviceSrv.searchEventsReported(this.uploadEventInfoUp).subscribe(
      (value) => {
        if (value === '200') {
          window.alert(value.message);
        }
      }
    );
  }
  // 事件上报
  public eventInfoUpClick(e): void {
    document.body.className = 'ui-overflow-hidden';
    this.uploadEventInfoUp.eventCategoryCode = e.categoryCode;
    this.uploadEventInfoUp.eventCategoryName = e.eventCategoryName;
    this.eventAlertInfoUpTitle = e.eventCategoryName;
    this.eventAlertInfoUp = true;
  }
}

import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {FinanceDataService} from '../../../common/services/finance-data.service';

@Component({
  selector: 'app-province-evnstat',
  templateUrl: './province-evnstat.component.html',
  styleUrls: ['./province-evnstat.component.less']
})
export class ProvinceEvnstatComponent implements OnInit, OnChanges {
  @Input() provinceId: any;
  @Input() provinceName: any;
  // 事件类型
  public eventTypes: any;
  public eventTypesTitle: any;
  public eventListNoProcess: any;
  public eventListProcess: any;
  public eventTypesShow = false;
  constructor(
    private provinceSrv: FinanceDataService,
  ) { }

  ngOnInit() {
  }
  ngOnChanges(changes: SimpleChanges): void {
    // 事件
    this.initialize();
  }
  // 事件类型统计
  public initialize(): void {
    this.provinceSrv.searchEventCategory().subscribe(
      (value) => {
        console.log(value);
        if (value.status === '200') {
          this.provinceSrv.searchEventCategoryCount({id: this.provinceId, list: value.data}).subscribe(
            (item) => {
              if (item.status === '200') {
                console.log(item);
                this.eventTypes = item.data;
              }
            }
          );
        }
      }
    );
  }
  public tableEventClick(item): void {
   this.eventTypesTitle = item.eventCategoryName;
    this.eventTypesShow = true;
  }
  public getEventsTypeList (item): void {
    // 未处理
    this.provinceSrv.searchEventsTypeList(
      {eventCategoryCode: item.categoryCode, processState: 2, page: 1, nums: 1000}).subscribe(
      (val) => {
        if (val.status === '200') {
          this.eventListNoProcess = val.data.contents;
        }
      }
    );
    // 已处理
    this.provinceSrv.searchEventsTypeList(
      {eventCategoryCode: item.categoryCode, processState: 1, page: 1, nums: 1000}).subscribe(
      (value) => {
        if (value.status === '200') {
          this.eventListProcess = value.data.contents;
        }
      }
    );
  }
  public closeOfficeShow() {
    this.eventTypesShow = false;
  }
}

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
    /*this.provinceSrv.searchEventCategory().subscribe(
      (value) => {
        if (value.status === '200') {
          this.provinceSrv.searchEventCategoryCount({id: this.provinceId, list: value.data}).subscribe(
            (item) => {
              if (item.status === '200') {
                this.eventTypes = item.data;
              }
            }
          );
        }
      }
    );*/
  }
  public tableEventClick(item): void {
   this.eventTypesTitle = item.eventCategoryName;
    this.eventTypesShow = true;
  }
  public closeOfficeShow() {
    this.eventTypesShow = false;
  }
}

import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {CityDataService} from '../../../common/services/city-data.service';

@Component({
  selector: 'app-city-evnstat',
  templateUrl: './city-evnstat.component.html',
  styleUrls: ['./city-evnstat.component.less']
})
export class CityEvnstatComponent implements OnInit, OnChanges {
  @Input() cityId: any;
  @Input() cityName: any;
  // 事件类型
  public eventTypes: any;
  public eventTypesTitle: any;
  public eventTypesShow = false;
  constructor(
    private citySrv: CityDataService,
  ) { }

  ngOnInit() {
  }
  ngOnChanges(changes: SimpleChanges): void {
    // 事件
    this.initialize();
  }
  // 事件类型统计
  public initialize(): void {
    this.citySrv.searchEventCategory().subscribe(
      (value) => {
        if (value.status === '200') {
          this.citySrv.searchEventCategoryCount({id: this.cityId, list: value.data}).subscribe(
            (item) => {
              if (item.status === '200') {
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
  public closeOfficeShow() {
    this.eventTypesShow = false;
  }
}

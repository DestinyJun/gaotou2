import {Component, Input, OnInit} from '@angular/core';
import {DataService} from '../../../common/services/data.service';

@Component({
  selector: 'app-city-evnoffice',
  templateUrl: './city-evnoffice.component.html',
  styleUrls: ['./city-evnoffice.component.less']
})
export class CityEvnofficeComponent implements OnInit {
  @Input() cityId: any;
  @Input() cityName: any;
  // 办公类事件
  public officeTypes: any;
  public eventOfficeShow = false;
  constructor(
    private dataService: DataService,
  ) { }

  ngOnInit() {
    // 办公
    this.officeTypes = this.dataService.officeTypes;
  }
  // 办公室信息处理函数
  public tableOfficeClick(): void {
    this.eventOfficeShow = true;
  }
  public closeOfficeShow() {
    this.eventOfficeShow = false;
  }

}

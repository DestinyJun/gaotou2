import {Component, Input, OnInit} from '@angular/core';
import {DataService} from '../../../common/services/data.service';

@Component({
  selector: 'app-province-evnoffice',
  templateUrl: './province-evnoffice.component.html',
  styleUrls: ['./province-evnoffice.component.less']
})
export class ProvinceEvnofficeComponent implements OnInit {
  @Input() provinceId: any;
  @Input() provinceName: any;
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

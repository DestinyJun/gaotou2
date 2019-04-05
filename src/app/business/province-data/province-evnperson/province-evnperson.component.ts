import {Component, Input, OnInit} from '@angular/core';
import {DataService} from '../../../common/services/data.service';

@Component({
  selector: 'app-province-evnperson',
  templateUrl: './province-evnperson.component.html',
  styleUrls: ['./province-evnperson.component.less']
})
export class ProvinceEvnpersonComponent implements OnInit {
  @Input() provinceId: any;
  @Input() provinceName: any;
  // 个人类事件
  public personOfficeTypes: any;
  public eventPersonShow = false;
  constructor(
    private dataService: DataService,
  ) { }

  ngOnInit() {
    // 个人
    this.personOfficeTypes = this.dataService.personOfficeTypes;
  }
  // 个人信息处理
  public tablePersonClick() {
    this.eventPersonShow = true;
  }
  public closePersonShow() {
    this.eventPersonShow = false;
  }
}

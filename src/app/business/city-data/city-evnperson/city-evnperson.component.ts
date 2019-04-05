import {Component, Input, OnInit} from '@angular/core';
import {DataService} from '../../../common/services/data.service';

@Component({
  selector: 'app-city-evnperson',
  templateUrl: './city-evnperson.component.html',
  styleUrls: ['./city-evnperson.component.less']
})
export class CityEvnpersonComponent implements OnInit {
  @Input() cityId: any;
  @Input() cityName: any;
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

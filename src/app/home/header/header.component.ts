import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {LocalStorageService} from '../../common/services/local-storage.service';
import {NgxEchartsService} from 'ngx-echarts';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  // 路由状态及名称
  public flagState: string;
  public flagName: string;
  // 时间
  public dataTime = new Date();
  // 顶部标题
  public headerTitle: string;
  // 客流量
  public persons = [];
  public personNum = [];
  // 弹窗
  public serviceZonePersonAlert = false;
  public cityPersonAlert = false;
  public cityOptions = {};
  public cityParentOptions = {};
  constructor(
    private routerInfo: ActivatedRoute,
    private localService: LocalStorageService,
  ) { }

  ngOnInit() {
    // 时间
    setInterval(() => {
      this.dataTime = new Date();
    });
    // 订阅title以及车流事件
    this.localService.eventBus.subscribe((value) => {
      this.headerTitle = value.title;
      this.flagState = value.flagState;
      this.flagName = value.flagName;
    });
    this.localService.persons.subscribe((value) => {
      this.persons = value;
      this.persons.map((val, index) => {
        this.personNum.push({number: val});
      });
    });
  }
  // 客流量弹窗
  public personClick() {
    if (this.flagState === 'serzone') {
      this.serviceZonePersonAlert = true;
    } else {
      this.cityPersonAlert = true;
    }
  }
  public closePersonAlert() {
      this.serviceZonePersonAlert = false;
      this.cityPersonAlert = false;
  }
}

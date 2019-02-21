import {Component, OnInit, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'app-service-manager',
  templateUrl: './service-manager.component.html',
  styleUrls: ['./service-manager.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class ServiceManagerComponent implements OnInit {
  public vehicleAmount: any; // 车辆监控
  public incomeAmount: any; // 收入监控
  public images: any[];

  constructor() {
  }

  ngOnInit() {
    this.vehicleAmount = {
      number: 1982,
      units: '辆'
    };
    this.incomeAmount = {
      number: 9864,
      units: '元'
    };
    this.images = [];
    this.images.push({source: 'assets/showcase/images/demo/galleria/galleria1.jpg', alt: '久长服务区视频监控点', title: '机房监控点'});
    this.images.push({source: 'assets/showcase/images/demo/galleria/galleria2.jpg', alt: '久长服务区视频监控点', title: '德克士外场休息区'});
    this.images.push({source: 'assets/showcase/images/demo/galleria/galleria3.jpg', alt: '久长服务区视频监控点', title: '服务区出口云台'});
    this.images.push({source: 'assets/showcase/images/demo/galleria/galleria4.jpg', alt: '久长服务区视频监控点', title: '中石油加油站'});
    this.images.push({source: 'assets/showcase/images/demo/galleria/galleria5.jpg', alt: '久长服务区视频监控点', title: '小圆满厨房'});
    this.images.push({source: 'assets/showcase/images/demo/galleria/galleria6.jpg', alt: '久长服务区视频监控点', title: '围墙后面'});
  }
}

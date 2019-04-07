import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-service-toilet',
  templateUrl: './service-toilet.component.html',
  styleUrls: ['./service-toilet.component.less']
})
export class ServiceToiletComponent implements OnInit {
  @Input() public serviceInfo: any;
  public serversToiletAlertShow = false;
  public waitTitle: string;
  constructor() { }

  ngOnInit() {}
  public openServersToiletAlert(e) {
    document.body.className = 'ui-overflow-hidden';
    this.waitTitle = e;
    this.serversToiletAlertShow = true;
  }
  public closeServersToiletAlert() {
    document.body.className = '';
    this.serversToiletAlertShow = false;
  }

}

import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {LocalStorageService} from '../../services/local-storage.service';

@Component({
  selector: 'app-manager-event',
  templateUrl: './manager-event.component.html',
  styleUrls: ['./manager-event.component.less'],
  encapsulation: ViewEncapsulation.None
})
export class ManagerEventComponent implements OnInit {
  public eventTitle: any;
  public eventShow = false;
  constructor(
    private localService: LocalStorageService,
  ) {}
  ngOnInit() {}
  public closeEventHide() {
    this.eventShow = false;
    this.localService.windowVideoShow.next(true);
  }
  public closeEventShow() {
    this.eventShow = true;
    this.localService.windowVideoShow.next(false);
  }
}

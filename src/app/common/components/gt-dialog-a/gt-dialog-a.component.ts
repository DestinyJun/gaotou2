import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-gt-dialog-a',
  templateUrl: './gt-dialog-a.component.html',
  styleUrls: ['./gt-dialog-a.component.less']
})
export class GtDialogAComponent implements OnInit {
  @Output() closeClick: EventEmitter<any> = new EventEmitter();
  @Input() title: any = '弹窗标题';
  constructor() { }

  ngOnInit() {
  }
  public iconCloseClick(): void {
    this.closeClick.next();
  }
}

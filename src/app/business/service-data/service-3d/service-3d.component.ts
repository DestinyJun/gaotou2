import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
@Component({
  selector: 'app-service-3d',
  templateUrl: './service-3d.component.html',
  styleUrls: ['./service-3d.component.less']
})
export class Service3dComponent implements OnInit, OnChanges {
  @Input() public personAmount: any;
  public persons: any;
  public personTitle = '全国';
  constructor() { }
  ngOnInit() {}
  ngOnChanges(changes: SimpleChanges): void {
    if (this.personAmount) {
      this.persons = this.personAmount;
    }
  }
}

import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
@Component({
  selector: 'app-province-3d',
  templateUrl: './province-3d.component.html',
  styleUrls: ['./province-3d.component.less']
})
export class Province3dComponent implements OnInit, OnChanges {
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

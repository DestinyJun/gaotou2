import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';

@Component({
  selector: 'app-city-3d',
  templateUrl: './city-3d.component.html',
  styleUrls: ['./city-3d.component.less']
})
export class City3dComponent implements OnInit, OnChanges {
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

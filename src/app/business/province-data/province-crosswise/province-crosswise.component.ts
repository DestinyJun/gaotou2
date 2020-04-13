import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';

@Component({
  selector: 'app-province-crosswise',
  templateUrl: './province-crosswise.component.html',
  styleUrls: ['./province-crosswise.component.less']
})
export class ProvinceCrosswiseComponent implements OnInit, OnChanges {
  @Input() provinceName: any;
  @Input() data: any;
  @Input() type: any;
  public top10Type = {
    revenue: ['业态收入排名', '#22C2F0'],
    vehicle: ['车流量排名', '#4AE2D5'],
    passenger: ['客流量排名', '#CB427B']
  };
  public top10Title = null;
  public top10Color = null;
  public crosswiseBar: any;

  constructor() {
  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if ('type' in changes) {
      this.top10Title = this.top10Type[this.type][0];
      this.top10Color = this.top10Type[this.type][1];
    }
    if (this.data) {
      this.crosswiseBar = this.data;
    }
  }
}

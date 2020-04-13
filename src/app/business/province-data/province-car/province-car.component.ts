import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import { CountUpOptions } from 'countup.js';

@Component({
  selector: 'app-province-car',
  templateUrl: './province-car.component.html',
  styleUrls: ['./province-car.component.less']
})
export class ProvinceCarComponent implements OnInit, OnChanges {
  @Input() public provinceName: any;
  @Input() public data: any;
  public carNumber: number;
  public carNumberOption: CountUpOptions = {
    useGrouping: false,
    duration: 3,
    suffix: '<small style="color: white;font-size: 1rem;">辆</small>'
  };
  public optionsCarModel: any;
  constructor() { }

  ngOnInit() {}
  ngOnChanges(changes: SimpleChanges): void {
    if (this.data) {
      this.carNumber = this.data.totalVehicle;
      this.optionsCarModel = this.data.vehicleTypeNumList;
    }
  }
}

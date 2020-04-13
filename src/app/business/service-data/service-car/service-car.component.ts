import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import { CountUpOptions } from 'countup.js';
@Component({
  selector: 'app-service-car',
  templateUrl: './service-car.component.html',
  styleUrls: ['./service-car.component.less']
})
export class ServiceCarComponent implements OnInit, OnChanges {
  @Input() public serviceName: any;
  @Input() public data: any;
  public carNumber: number;
  public carNumberOption: CountUpOptions = {
    useGrouping: false,
    duration: 3,
    suffix: '<small style="color: white;font-size: 1rem;">辆</small>'
  };
  public optionsCarModel: any; // 车辆饼状图
  constructor() { }

  ngOnInit() {}
  ngOnChanges(changes: SimpleChanges): void {
    if (this.data) {
      this.carNumber = this.data.totalVehicle;
      this.optionsCarModel = this.data.vehicleTypeNumList;
    }
  }
}

import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import { CountUpOptions } from 'countup.js';

@Component({
  selector: 'app-city-income',
  templateUrl: './city-income.component.html',
  styleUrls: ['./city-income.component.less']
})
export class CityIncomeComponent implements OnInit, OnChanges {
  @Input() cityName: any;
  @Input() data: any;
  public incomeNumber: number;
  public incomeNumberOption: CountUpOptions = {
    useGrouping: false,
    duration: 3,
    suffix: '<small style="color: white;font-size: 1rem;">元</small>'
  };
  public optionsIncomeModel: any;
  constructor() { }

  ngOnInit() {
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (this.data) {
      this.incomeNumber = this.data.total;
      this.optionsIncomeModel = this.data.storeTypeIncomeList;
    }
  }
}

import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
@Component({
  selector: 'app-number-show',
  templateUrl: './number-show.component.html',
  styleUrls: ['./number-show.component.css']
})

export class NumberShowComponent implements OnInit, OnChanges {
  @Input() public option: any;
  public optionData: any;
  constructor() { }

  ngOnInit() {}
  ngOnChanges(changes: SimpleChanges): void {
    if (JSON.stringify(this.option) !== undefined) {
      this.optionData = {
        number: this.option.number.toString().split(''),
        units: this.option.units
      };
    }
  }

}

import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewEncapsulation} from '@angular/core';
@Component({
  selector: 'app-event-statistic',
  templateUrl: './event-statistic.component.html',
  styleUrls: ['./event-statistic.component.css'],
})
export class EventStatisticComponent implements OnInit, OnChanges {
  @Input() public option: any;
  @Input() public height: any;
  @Input() public width: any;
  @Output() public eventStatisticClick = new EventEmitter<any>();
  public cars: any;
  public cols: any[];
  constructor() { }

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges): void {
    this.cols = [
      { field: 'type', header: '类型' },
      { field: 'status', header: '状态' },
    ];
    this.cars = [
      {type: '001', status: '2018'}
    ];
     if (this.option !== undefined) {
       // console.log(this.option);
     }
  }
  public eventClick(item): void {
    this.eventStatisticClick.emit(item);
  }

}

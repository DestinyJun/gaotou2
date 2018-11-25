import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';

@Component({
  selector: 'app-event-statistic',
  templateUrl: './event-statistic.component.html',
  styleUrls: ['./event-statistic.component.css']
})
export class EventStatisticComponent implements OnInit, OnChanges {
  @Input() public option: any;
  @Output() public eventStatisticClick = new EventEmitter<any>();
  constructor() { }

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges): void {
     if (this.option !== undefined) {
       console.log(this.option);
     }
  }
  public eventClick(item): void {
    this.eventStatisticClick.emit(item);
  }

}

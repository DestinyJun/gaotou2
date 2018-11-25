import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'app-event-statistic',
  templateUrl: './event-statistic.component.html',
  styleUrls: ['./event-statistic.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class EventStatisticComponent implements OnInit, OnChanges {
  @Input() public option: any;
  @Input() public height: any;
  @Input() public width: any;
  @Output() public eventStatisticClick = new EventEmitter<any>();
  constructor() { }

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges): void {
     if (this.option !== undefined) {
       // console.log(this.option);
     }
  }
  public eventClick(item): void {
    this.eventStatisticClick.emit(item);
  }

}

import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';

@Component({
  selector: 'app-event-office',
  templateUrl: './event-office.component.html',
  styleUrls: ['./event-office.component.css'],
})
export class EventOfficeComponent implements OnInit, OnChanges {
  @Input() public option: any;
  @Input() public height: any;
  @Input() public width: any;
  @Output() public eventOfficeClick = new EventEmitter<any>();
  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
  }
  public eventClick (item): void {
      this.eventOfficeClick.emit(item);
  }
}

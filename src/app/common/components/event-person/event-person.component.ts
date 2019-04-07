import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'app-event-person',
  templateUrl: './event-person.component.html',
  styleUrls: ['./event-person.component.css'],
})
export class EventPersonComponent implements OnInit, OnChanges {
  @Input() public option: any;
  @Input() public height: any;
  @Input() public width: any;
  @Output() public eventPersonClick = new EventEmitter<any>();
  constructor() { }

  ngOnInit() {
  }
  ngOnChanges(changes: SimpleChanges): void {
  }
  public eventClick (item): void {
    this.eventPersonClick.emit(item);
  }
}

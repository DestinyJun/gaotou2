import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.css'],
})
export class EventListComponent implements OnInit, OnChanges {
  @Input() public option: any;
  @Input() public height: any;
  @Input() public width: any;
  @Output() public eventListClick = new EventEmitter<any>();
  constructor() { }
  ngOnInit() {}
  ngOnChanges(changes: SimpleChanges): void {}
  public eventClick (item): void {
    this.eventListClick.emit(item);
  }

}

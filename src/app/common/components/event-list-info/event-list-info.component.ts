import {Component, Input, OnChanges, OnInit, SimpleChanges, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'app-event-list-info',
  templateUrl: './event-list-info.component.html',
  styleUrls: ['./event-list-info.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class EventListInfoComponent implements OnInit, OnChanges {
  @Input() public option: any;
  @Input() public height: any;
  @Input() public width: any;
  constructor() { }

  ngOnInit() {
  }
  ngOnChanges(changes: SimpleChanges): void {}

}

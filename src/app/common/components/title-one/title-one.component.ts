import {Component, Input, OnChanges, OnInit, SimpleChanges, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'app-title-one',
  templateUrl: './title-one.component.html',
  styleUrls: ['./title-one.component.less'],
})
export class TitleOneComponent implements OnInit, OnChanges {
  @Input() public option = {
    title: '这是默认标题',
  };
  @Input() public width = 'auto';
  @Input() public height: any;
  constructor() { }

  ngOnInit() {}
  ngOnChanges(changes: SimpleChanges): void {}

}

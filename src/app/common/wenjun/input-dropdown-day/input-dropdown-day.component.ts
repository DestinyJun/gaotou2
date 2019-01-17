import {Component, EventEmitter, HostListener, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {DropList} from './input-dropdown-day.model';

@Component({
  selector: 'app-input-dropdown-day',
  templateUrl: './input-dropdown-day.component.html',
  styleUrls: ['./input-dropdown-day.component.css']
})
export class InputDropdownDayComponent implements OnInit, OnChanges {
  @Input() public option: DropList[];
  @Input() public height = '3vh';
  @Input() public background = '#1a2128';
  @Input() public dropdownBackground = 'rgba(26,33,40,0.8)';
  @Input() public hover = '#5595D5';
  @Output() public dropdownClick = new EventEmitter<any>();
  public selectCity = '请选择日';
  public uiShow = false;
  public dayChinese = ['01号', '02号', '03号', '04号', '05号', '06号', '07号', '08号',
  '09号', '10号', '11号', '12号', '13号', '14号', '15号', '16号', '17号', '18号', '19号',
    '20号', '21号', '22号', '23号', '24号', '25号', '26号', '28号', '29号', '30号', '31号'
  ];
  @HostListener('click', ['$event.target']) onClick(element: HTMLElement) {
    this.uiShow = !this.uiShow;
  }
  constructor() { }

  ngOnInit() {}
  ngOnChanges(changes: SimpleChanges): void {
    if (this.option) {
      // this.selectCity = this.dayChinese[this.option[0].name - 1];
    }
  }
  public boxLiClick (item, event): void {
    event.stopPropagation();
    this.uiShow = false;
    this.dropdownClick.next(item);
    this.selectCity = this.dayChinese[item.name - 1];
  }


}

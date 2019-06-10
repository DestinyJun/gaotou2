import {Component, EventEmitter, HostListener, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {DropList} from './input-dropdown.model';

@Component({
  selector: 'app-input-dropdown',
  templateUrl: './input-dropdown.component.html',
  styleUrls: ['./input-dropdown.component.css']
})
export class InputDropdownComponent implements OnInit, OnChanges {
  @Input() public option: DropList[];
  @Input() public height = '3vh';
  @Input() public width = '5vw';
  @Input() public background = '#1a2128';
  @Input() public dropdownBackground = 'rgba(26,33,40,0.8)';
  @Input() public hover = '#5595D5';
  @Output() public dropdownClick = new EventEmitter<any>();
  public selectCity: any;
  public uiShow = false;
  @HostListener('click', ['$event.target']) onClick(element: HTMLElement) {
    this.uiShow = !this.uiShow;
  }
  constructor() { }

  ngOnInit() {}
  ngOnChanges(changes: SimpleChanges): void {
    if (this.option) {
      this.selectCity = this.option[0].name;
    }
  }
  public boxLiClick (item, event): void {
    event.stopPropagation();
    this.uiShow = false;
    this.dropdownClick.next(item);
    this.selectCity = item.name;
  }


}

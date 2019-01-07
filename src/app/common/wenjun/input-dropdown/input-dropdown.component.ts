import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {DropList} from './input-dropdown.model';

@Component({
  selector: 'app-input-dropdown',
  templateUrl: './input-dropdown.component.html',
  styleUrls: ['./input-dropdown.component.css']
})
export class InputDropdownComponent implements OnInit, OnChanges {
  @Input() public option: DropList[];
  @Output() public dropdownClick = new EventEmitter<any>();
  // public city: DropList[];
  public selectCity: any;
  public uiShow = false;
  constructor() { }

  ngOnInit() {
    /*this.city = */
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (this.option) {
      this.selectCity = this.option[0].name;
    }
  }
  public boxClick (): void {
    this.uiShow = !this.uiShow;
  }
  public boxLiClick (item, event): void {
    event.stopPropagation();
    this.uiShow = false;
    this.dropdownClick.next(item);
    this.selectCity = item.name;
  }


}

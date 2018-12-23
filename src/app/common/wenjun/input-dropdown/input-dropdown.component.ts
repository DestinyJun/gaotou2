import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-input-dropdown',
  templateUrl: './input-dropdown.component.html',
  styleUrls: ['./input-dropdown.component.css']
})
export class InputDropdownComponent implements OnInit {
  @Output() public dropdownClick = new EventEmitter<any>();
  public city: any;
  public selectCity: any;
  public uiShow = false;
  constructor() { }

  ngOnInit() {
    this.city = [
      {name: '时', code: 'hour'},
      {name: '天', code: 'day'},
      {name: '周', code: 'week'},
      {name: '月', code: 'month'},
      {name: '年', code: 'year'},
    ];
    this.selectCity = this.city[0].name;
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

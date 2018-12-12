import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';

@Component({
  selector: 'app-image-zoom',
  templateUrl: './image-zoom.component.html',
  styleUrls: ['./image-zoom.component.css']
})
export class ImageZoomComponent implements OnInit, OnChanges {
  @Input() public option: any;
  @Input() public height: any;
  @Input() public width = 'auto';
  @Input() public zoom = false;
  @Output() public eventClick = new EventEmitter<any>();
  public acceptHeight: any;
  public closeFlag = false;
  constructor() { }

  ngOnInit() {}
  ngOnChanges(changes: SimpleChanges): void {
    if (this.height) {
      this.acceptHeight = this.height;
    }
  }
  public openClick (e): void {
    if (this.zoom) {
      this.closeFlag = true;
      e.target.parentElement.className = 'max';
      this.height = '80vh';
      this.eventClick.emit(true);
    }
  }
  public onClose (e): void {
    e.stopPropagation();
    e.target.parentElement.parentElement.className = '';
    this.height = this.acceptHeight;
    this.closeFlag = false;
    this.eventClick.emit(false);
  }
}

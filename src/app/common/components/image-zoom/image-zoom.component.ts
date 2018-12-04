import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';

@Component({
  selector: 'app-image-zoom',
  templateUrl: './image-zoom.component.html',
  styleUrls: ['./image-zoom.component.css']
})
export class ImageZoomComponent implements OnInit, OnChanges {
  @Input() public height: any;
  @Input() public width = 'auto';
  public acceptHeight: any;
  constructor() { }

  ngOnInit() {
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (this.height) {
      this.acceptHeight = this.height;
    }
  }
  public onClick (e): void {
    e.target.parentElement.className = 'max';
    this.height = '80vh';
  }
  public onClose (e): void {
    
      
  }
}

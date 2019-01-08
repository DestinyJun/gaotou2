import {Directive, ElementRef, HostListener, Input} from '@angular/core';

@Directive({
  selector: '[appInputDropdownHover]'
})
export class InputDropdownHoverDirective {
  @Input() public hoverColor: string;
  constructor(private el: ElementRef) { }
  // 监听鼠标移上事件
  @HostListener('mouseenter') onMoiseEnter() {
    this.el.nativeElement.style.backgroundColor = this.hoverColor;
    // this.highlight(this.highlightColor);
  }
  // 监听鼠标离开事件
  @HostListener('mouseleave') onMouseLeave() {
    this.el.nativeElement.style.backgroundColor = '';
  }
}

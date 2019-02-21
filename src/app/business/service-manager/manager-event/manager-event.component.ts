import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'app-manager-event',
  templateUrl: './manager-event.component.html',
  styleUrls: ['./manager-event.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ManagerEventComponent implements OnInit {
  tbody: any = [];
  @Input() url; // 将地址变成组件的一个参数，也就是输入属性
  // @ViewChild('scroller') scrollerRef: ElementRef;  // 控制滚动的元素
  timer: any;
  freshData: any;

  pageNow = 1; // pageNow是当前数据的页码，初始化为1
  constructor() {
  }

  ngOnInit() {
    // 初始化拿到native
    // const scroller: HTMLElement = this.scrollerRef.nativeElement;
    /*this.http.sendRequest(this.url).subscribe((data: any[]) => {
      this.tbody = data.concat(data);
    });*/
    // 开启定时器
    // this.timer = this.go(scroller);
  }

  getFreshData() {
    // 每次请求数据时，pageNow自增1
   /* this.http.sendRequest(`${this.url}?pageNow=${++this.pageNow}`).subscribe((data: any[]) => {
      if (data.length < 10) {
        // 数据丢弃，pageNow重置为1
        this.pageNow = 1;
      }
      this.freshData = data;
    });*/
  }

  go(scroller) {
    let moved = 0;
    const step = -50;
    const timer = null;
    const task = () => {
      const style = document.defaultView.getComputedStyle(scroller, null);
      const top = parseInt(style.top, 10);
      if (moved < 10) {
        if (moved === 0) {
          this.getFreshData();
        }
        scroller.style.transition = 'top 0.5s ease';
        moved ++;
        scroller.style.top = top + step + 'px';

      } else {
        // 重置top，moved，清除定时器
        clearInterval(timer);
        moved = 0;
        scroller.style.transition = 'none';
        scroller.style.top = '0px';
        // 更新数据
        this.tbody = this.tbody.slice(10).concat(this.freshData);
        // this.timer = setInterval(task, 1000);
      }
    };
    // this.timer = setInterval(task, 1000);
  }

}

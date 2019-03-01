import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {NavList, NavListChild} from '../../common/model/home.model';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  public navLists: NavList[] = [
    new NavList('首页', 'fa fa-home',  false, [], true),
    new NavList('生产监视', 'fa fa-laptop', false, [
      new NavListChild('感知数据即时监视', false, 'monitor/sensor'),
      new NavListChild('视频数据即时监视', false, 'monitor/video'),
      new NavListChild('事件数据监视', false, 'monitor/event/1'),
      new NavListChild('温度数据即时监视', false, 'monitor/temperature'),
      new NavListChild('厚度数据即时监视', false, 'monitor/thickness')
    ] , true),
    new NavList('设备运行', 'fa fa-th-large', false, [
      new NavListChild('感知历史数据', false, 'equipment/devhis'),
      new NavListChild('设备信息', false, 'equipment/devnew/1'),
      new NavListChild('设备巡检', false, 'equipment/inspection/1'),
    ] , true),
    new NavList('生产排程', 'fa fa-outdent', false, [
      new NavListChild('订单信息', false, 'schedule/ordque/1'),
      new NavListChild('营销订单审核', false, 'schedule/ordmar/1'),
      new NavListChild('生产工艺审核', false, 'schedule/ordcra/1'),
      new NavListChild('任务调排', false, 'schedule/ordadj/1'),
    ] , true),
    new NavList('原材料管理', 'fa fa-sitemap', false, [
      new NavListChild('原材料信息', false, 'material/matche/1'),
      new NavListChild('原材料审核', false, 'material/matmes/1'),
      new NavListChild('原材料已审核', false, 'material/checked/1'),
      new NavListChild('原材料审核失败', false, 'material/failed/1'),
    ] , true),
    new NavList('成品管理', 'fa fa-hdd-o', false, [
      new NavListChild('待入库成品', false, 'product/proenting/1'),
      new NavListChild('待出库成品', false, 'product/procent/1'),
      new NavListChild('已出库成品', false, 'product/procout/1'),
    ] , true),
    new NavList('策略分析', 'fa fa-graduation-cap', false, [
      new NavListChild('地图策略分析', false, 'tactics/tacmap'),
      new NavListChild('订单策略分析', false, 'tactics/tacord'),
      new NavListChild('营销策略分析', false, 'tactics/tacmark'),
    ] , true),
    new NavList('安卓', 'glyphicon glyphicon-download-alt', false, [] , true),
  ];
  public slidinghight: number;
  public slidingTop: number;
  public difulHeight: number;
  constructor(private router: Router) {
    this.slidinghight = 0;
    this.slidingTop = -120;
    this.difulHeight = 0;
  }
  ngOnInit() {}
  PullName(name, event) {
    event.stopPropagation();
  }
  onMouseleave() {
    this.slidingTop = -120;
  }
  mainLiMouseEnter(element) {
    this.slidingTop =  element.offsetTop;
    this.slidinghight = element.offsetHeight;
  }
  mainLiClick(mainul, element, list) {
    this.difulHeight = 0;
    /*if (!(list.children.length > 0)) {
        console.log(list);
        if (list.title === '首页') {
          this.router.navigate(['/home/true']);
          this.Name.set('positionName', '首页');
        } else {
          this.router.navigate(['/home/true/android']);
          this.Name.set('positionName', '安卓');
        }
      for (let i = 0; i < mainul.children.length; i++) {
        mainul.children[i].children[1].style.height = '0px';
      }
      this.navLists.forEach((item) => {
        item.open = true;
        item.clsstate = false;
        item.children.forEach((itemchild) => {
          itemchild.setState = false;
        });
      });
      list.clsstate = true;
      return;
    }*/
    if (element.offsetHeight === 0) {
      this.navLists.forEach((item) => {
        item.open = true;
      });
      list.open = false;
      for (let i = 0; i < mainul.children.length; i++) {
        mainul.children[i].children[1].style.height = '0px';
      }
      for (let i = 0; i < list.children.length; i++) {
        this.difulHeight = this.difulHeight + 40;
      }
      element.style.height = this.difulHeight.toString() + 'px';
    } else {
      list.open = true;
      this.difulHeight = 0;
      element.style.height = this.difulHeight.toString() + 'px';
      setTimeout(() => {
        list.open = true;
      }, 200);
    }

  }
  menuliMouseEnter(element) {
    this.slidingTop =  element.offsetTop;
    this.slidinghight = element.offsetHeight;
    element.setState = true;
  }
  menuliClick(element) {
    this.navLists.forEach((item) => {
      item.clsstate = false;
      item.children.forEach((itemchild) => {
        itemchild.setState = false;
      });
    });
    element.setState = true;
  }
}

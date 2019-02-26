import {Component, HostListener, OnInit, ViewEncapsulation} from '@angular/core';
import {Router} from '@angular/router';
import {LocalStorageService} from '../../common/services/local-storage.service';
import {MenuItem} from 'primeng/api';
/*export interface MenuItem {
  label?: string;
  icon?: string;
  command?: (event?: any) => void;
  url?: string;
  routerLink?: any;
  queryParams?: {
    [k: string]: any;
  };
  items?: MenuItem[] | MenuItem[][] | MenuItem[][][];
  expanded?: boolean;
  disabled?: boolean;
  visible?: boolean;
  target?: string;
  routerLinkActiveOptions?: any;
  separator?: boolean;
  badge?: string;
  badgeStyleClass?: string;
  style?: any;
  styleClass?: string;
  title?: string;
  id?: string;
  automationId?: any;
}*/


@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class NavComponent implements OnInit {
  items: MenuItem[];
  public visibleSidebar2: true;
  public urlList: any;
  public urlIcon = {
    whole: 'fa fa-area-chart',
    province: 'fa fa-bar-chart',
    city: 'fa fa-line-chart',
    serzone: 'fa fa-pie-chart',
    camera: 'fa fa-video-camera',
    };
  public urlClass = [];
  public navOpacity = '0.4';
  public navHeight = '50px';
  @HostListener('mouseenter') onMouserEnter() {
    this.navOpacity = '1';
    this.navHeight = 'auto';
  }
  @HostListener('mouseleave') onMouserLeave() {
    this.navOpacity = '0.4';
    this.navHeight = '50px';
  }
  @HostListener('mouseenter') onClick() {
    if (this.navOpacity === '1') {
      this.navOpacity = '0.4';
      this.navHeight = '50px';
    } else if (this.navOpacity === '0.4') {
      this.navOpacity = '1';
      this.navHeight = 'auto';
    }
  }
  constructor(
    private router: Router,
    private localSessionStorage: LocalStorageService,
  ) {}

  ngOnInit() {
    this.items = [
      {
        label: '全国大数据',
        icon: 'pi pi-pw pi-file',
        items: [
          {
          label: '贵州省大数据',
          icon: 'pi pi-fw pi-plus',
          items: [
            {
              label: '贵阳市大数据',
              icon: 'pi pi-fw pi-user-plus',
              items: [
                {label: '久长服务区大数据',  icon: 'pi pi-fw pi-user-plus'},
                {label: '安顺服务区大数据',  icon: 'pi pi-fw pi-user-plus'},
              ]
            },
            {label: '遵义市大数据', icon: 'pi pi-fw pi-filter'},
            {label: '安顺市大数据', icon: 'pi pi-fw pi-filter'},
          ]
        },
          {label: '云南省大数据', icon: 'pi pi-fw pi-external-link'},
          {label: '湖南省大数据', icon: 'pi pi-fw pi-times'}
        ]
      }
    ];
    this.urlList = this.localSessionStorage.getObject('urlList');
    this.urlClass = this.localSessionStorage.getObject('urlClass');
  }
  public wholeClick(): void {
    this.router.navigate(['home/whole']);
  }
  public financeClick(): void {
    this.router.navigate(['home/finance']);
  }
  public cityClick(): void {
    this.router.navigate(['home/city']);
  }
  public serzoneClick(): void {
    this.router.navigate(['home/serzone', {name: '久长服务区', point: [116.39737, 39.935076]}]);
  }
  public videowClick(): void {
    this.router.navigate(['home/videow']);
  }
}

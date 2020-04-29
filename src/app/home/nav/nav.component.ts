import {Component, HostListener, OnInit, ViewEncapsulation} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import {LocalStorageService} from '../../common/services/local-storage.service';
import {ApiService} from '../../common/services/api.service';

export interface TreeNode {
  id?: any;
  label?: string;
  data?: any;
  icon?: any;
  expandedIcon?: any;
  collapsedIcon?: any;
  children?: TreeNode[];
  leaf?: boolean;
  expanded?: boolean;
  type?: string;
  parent?: TreeNode;
  partialSelected?: boolean;
  styleClass?: string;
  draggable?: boolean;
  droppable?: boolean;
  selectable?: boolean;
  parentId?: boolean;
  dataLevel?: any;
  router?: string;
}


@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class NavComponent implements OnInit {
  filesTree2: TreeNode[] = [
    /* {
       'label': 'Documents',
       'data': 'Documents Folder',
       'expandedIcon': 'fa fa-folder-open',
       'collapsedIcon': 'fa fa-area-chart',
       'children': [
         {
         'label': 'Work',
         'data': 'Work Folder',
         'expandedIcon': 'fa fa-folder-open',
         'collapsedIcon': 'fa fa-folder',
         'children': [{'label': 'Expenses.doc', 'icon': 'fa fa-file-word-o', 'data': 'Expenses Document'}, {
           'label': 'Resume.doc',
           'icon': 'fa fa-file-word-o',
           'data': 'Resume Document'
         }]
       },
         {
           'label': 'Home',
           'data': 'Home Folder',
           'expandedIcon': 'fa fa-folder-open',
           'collapsedIcon': 'fa fa-folder',
           'children': [{'label': 'Invoices.txt', 'icon': 'fa fa-file-word-o', 'data': 'Invoices for this month'}]
         }]
     },
     {
       'label': 'Pictures',
       'data': 'Pictures Folder',
       'expandedIcon': 'fa fa-folder-open',
       'collapsedIcon': 'fa fa-bar-chart',
       'children': [
         {'label': 'barcelona.jpg', 'icon': 'fa fa-file-image-o', 'data': 'Barcelona Photo'},
         {'label': 'logo.jpg', 'icon': 'fa fa-file-image-o', 'data': 'PrimeFaces Logo'},
         {'label': 'primeui.png', 'icon': 'fa fa-file-image-o', 'data': 'PrimeUI Logo'}]
     },
     {
       'label': 'Movies',
       'data': 'Movies Folder',
       'expandedIcon': 'fa fa-folder-open',
       'collapsedIcon': 'fa fa-line-chart',
       'children': [
         {
           'label': 'Al Pacino', 'data': 'Pacino Movies',
           'children': [
           {'label': 'Scarface', 'icon': 'fa fa-file-video-o', 'data': 'Scarface Movie'},
           {'label': 'Serpico', 'icon': 'fa fa-file-video-o', 'data': 'Serpico Movie'
         }]
       },
         {
           'label': 'Robert De Niro',
           'data': 'De Niro Movies',
           'children': [{'label': 'Goodfellas', 'icon': 'fa fa-file-video-o', 'data': 'Goodfellas Movie'}, {
             'label': 'Untouchables',
             'icon': 'fa fa-file-video-o',
             'data': 'Untouchables Movie'
           }]
         }]
     }*/
  ];
  public navDirection = 'left';
  selectedFile: TreeNode;
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
    private apiSrv: ApiService
  ) {
  }

  ngOnInit() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        if (event.url.includes('/home/camera')) {
          this.navDirection = 'right';
        } else {
          this.navDirection = 'left';
        }
      }
      });
    this.apiSrv.getRouter({companyId: this.localSessionStorage.get('companyId')}).subscribe((res) => {
      const arr = [
        {
          label: '全国',
          expandedIcon: 'fa fa-globe',
          collapsedIcon:  'fa fa-globe',
          router:  '/home/whole',
          children: res.date.provinceList
        },
        {
          label: '视频监控',
          expandedIcon: 'fa fa-play',
          collapsedIcon:  'fa fa-play',
          router:  '/home/camera',
          children: []
        }
      ];
      this.filesTree2 = this.tableTreeInitialize(arr);
    });
  }

  // 递归调用重组数据结构
  public tableTreeInitialize(data): any {
    const oneChild: TreeNode[] = [];
    data.forEach((item, index) => {
      const childnode: TreeNode = {};
      if (Object.keys(item).includes('label')) {
        childnode.label = item.label;
        childnode.expandedIcon = item.expandedIcon;
        childnode.collapsedIcon = item.collapsedIcon;
        childnode.router = item.router;
        if (!(item.children)) {
          childnode.children = [];
        }
        else {
          childnode.children = this.tableTreeInitialize(item.children);
        }
      }
      if (Object.keys(item).includes('provinceName')) {
        childnode.label = item.provinceName;
        childnode.id = item.provinceId;
        childnode.expandedIcon = 'fa fa-bar-chart';
        childnode.collapsedIcon = 'fa fa-bar-chart';
        childnode.router = '/home/province';
        if (!(item.areaList)) {
          childnode.children = [];
        }
        else {
          childnode.children = this.tableTreeInitialize(item.areaList);
        }
      }
      if (Object.keys(item).includes('areaName')) {
        childnode.label = item.areaName;
        childnode.id = item.areaCode;
        childnode.expandedIcon = 'fa fa-line-chart';
        childnode.collapsedIcon = 'fa fa-line-chart';
        childnode.router = '/home/city';
        if (!(item.serviceAreaList)) {
          childnode.children = [];
        } else {
          childnode.children = this.tableTreeInitialize(item.serviceAreaList);
        }
      }
      if (Object.keys(item).includes('serviceAreaName')) {
        childnode.label = item.serviceAreaName;
        childnode.id = item.serviceAreaId;
        childnode.expandedIcon = 'fa fa-free-code-camp';
        childnode.collapsedIcon = 'fa fa-free-code-camp';
        childnode.router = '/home/serzone';
        childnode.children = [];
      }
      oneChild.push(childnode);
    });
    return oneChild;
  }

  public nodeSelect(event) {
    this.router.navigate([`${event.node.router}`, {id: event.node.id, name: event.node.label}]);
  }

  public nodeUnselect(e) {
    // console.log(e);
  }

  public nodeExpand(event) {
    if (event.node) {
      /*this.logins.getChildrenRouter({menuId: event.node.parentId, dataModelId: event.node.id, dataLevel: event.node.dataLevel}).subscribe(
        (val) => {
          event.node.children = this.tableTreeInitialize(val.data);
        }
      );*/
    }
  }
}

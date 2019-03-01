import {Component, HostListener, OnInit, ViewEncapsulation} from '@angular/core';
import {Router} from '@angular/router';
import {LocalStorageService} from '../../common/services/local-storage.service';
import {TreeNode} from 'primeng/api';

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
  ) {
  }

  ngOnInit() {
    this.urlList = this.localSessionStorage.getObject('urlList');
    console.log(this.urlList);
    this.urlClass = this.localSessionStorage.getObject('urlClass');
    this.filesTree2 = this.tableTreeInitialize(this.urlList);
  }
  // 递归调用重组数据结构
  public tableTreeInitialize(data): any {
    const oneChild: TreeNode[] = [];
    for (let i = 0; i < data.length; i++) {
      const childnode: TreeNode = {};
      /*childnode.data = {
        areaName: data[i].areaName,
        areaCode: data[i].areaCode,
        id: data[i].id,
        idt: data[i].idt,
        udt: data[i].udt,
        level: this.areaService.levelEnu[data[i].level],
        parentId: data[i].parentId,
        pids: data[i].pids,
      };*/
      childnode.label = data[i]['menuName'];
      childnode.data = data[i]['url'];
      childnode.leaf = data[i]['isLeaf'];
      if (!data[i].menu) {
        childnode.children = [];
      } else {
        childnode.children = this.tableTreeInitialize(data[i].menu);
      }
      oneChild.push(childnode);
    }
    console.log(oneChild);
    return oneChild;
  }

  public nodeSelect(event) {
    console.log(event);
    // this.messageService.add({severity: 'info', summary: 'Node Selected', detail: event.node.label});
  }

  public nodeUnselect(e) {
    console.log(e);
  }
}

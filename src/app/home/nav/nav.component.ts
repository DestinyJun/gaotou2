import {Component, HostListener, OnInit, ViewEncapsulation} from '@angular/core';
import {Router} from '@angular/router';
import {LocalStorageService} from '../../common/services/local-storage.service';
import {LoginService} from '../../common/services/login.service';

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
    private logins: LoginService
  ) {
  }

  ngOnInit() {
    this.urlList = this.localSessionStorage.getObject('urlList');
    this.urlClass = this.localSessionStorage.getObject('urlClass');
    this.filesTree2 = this.tableTreeInitialize(this.urlList);
  }

  // 递归调用重组数据结构
  public tableTreeInitialize(data): any {
    const oneChild: TreeNode[] = [];
    for (let i = 0; i < data.length; i++) {
      if (data[i]['isData']) {
        for (let j = 0; j < data[i]['dataModels'].length; j++) {
          const childnode: TreeNode = {};
          childnode.leaf = true;
          if (data[i].menuName === '全国大数据业态') {
            childnode.expandedIcon = 'fa fa-globe';
            childnode.collapsedIcon = 'fa fa-globe';
          }
          if (data[i].menuName === '省大数据业态') {
            childnode.expandedIcon = 'fa fa-bar-chart';
            childnode.collapsedIcon = 'fa fa-bar-chart';
          }
          if (data[i].menuName === '市大数据业态') {
            childnode.expandedIcon = 'fa fa-line-chart';
            childnode.collapsedIcon = 'fa fa-line-chart';
          }
          if (data[i].menuName === '服务区大数据业态') {
            childnode.expandedIcon = 'fa fa-free-code-camp';
            childnode.collapsedIcon = 'fa fa-free-code-camp';
          }
          childnode.label = data[i]['dataModels'][j]['name'];
          childnode.data = data[i]['url'];
          childnode.leaf = data[i]['isLeaf'];
          childnode.id = data[i]['dataModels'][j]['id'];
          childnode.parentId = data[i]['id'];
          childnode.dataLevel = data[i]['dataLevel'];
          if (!data[i].menu) {
            childnode.children = [];
          } else {
            childnode.children = this.tableTreeInitialize(data[i].menu);
          }
          oneChild.push(childnode);
        }
      } else {
        const childnode: TreeNode = {};
        childnode.leaf = true;
        if (data[i].menuName === '视频监控') {
          childnode.expandedIcon = 'fa fa-camera-retro';
          childnode.collapsedIcon = 'fa fa-camera-retro';
        }
        if (data[i].menuName === '个人信息') {
          childnode.expandedIcon = 'fa fa-user-circle-o';
          childnode.collapsedIcon = 'fa fa-user-circle-o';
        }
        childnode.label = data[i]['menuName'];
        childnode.data = data[i]['url'];
        childnode.leaf = data[i]['isLeaf'];
        childnode.id = data[i]['id'];
        if (!data[i].menu) {
          childnode.children = [];
        } else {
          childnode.children = this.tableTreeInitialize(data[i].menu);
        }
        oneChild.push(childnode);
      }
    }
    return oneChild;
  }

  public nodeSelect(event) {
    this.router.navigate([`${event.node.data}`, {id: event.node.id, name: event.node.label}]);
    // console.log(event);
    // this.messageService.add({severity: 'info', summary: 'Node Selected', detail: event.node.label});
  }

  public nodeUnselect(e) {
    // console.log(e);
  }

  public nodeExpand(event) {
    if (event.node) {
      this.logins.getChildrenRouter({menuId: event.node.parentId, dataModelId: event.node.id, dataLevel: event.node.dataLevel}).subscribe(
        (val) => {
          event.node.children = this.tableTreeInitialize(val.data);
        }
      );
    }
  }
}

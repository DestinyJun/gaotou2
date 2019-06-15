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
  filesTree2: TreeNode[] = [];
  selectedFile: TreeNode;
  public visibleSidebar2: true;
  public urlList: any;
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
    const a = {
      dataLevel: null,
      dataModels: [],
      id: 1,
      isData: false,
      isLeaf: true,
      isRoot: true,
      isSHow: true,
      isSelected: null,
      level: 1,
      menuCode: 'business:sermanger',
      menuName: '久长服务区',
      menus: [],
      permissionCode: 'business:sermanger:show',
      pid: 0,
      priority: 450,
      url: '/home/sermanger',
    };
    this.urlList.push(a);
    this.filesTree2 = this.tableTreeInitialize(this.urlList);
  }

  // nav tree
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
        if (data[i].menuName === '服务区管理') {
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

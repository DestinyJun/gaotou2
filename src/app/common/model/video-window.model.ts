// 区域树泛型
export class TreeNode {
  id?: number;
  label?: string;
  areaCode?: string;
  level?: number;
  enabled?: boolean;
  parentId?: number;
  children?: TreeNode[];
  cityType?: string;
  pids?: string;
  administrativeAreaId?: number;
  status?: boolean;
  parent?: TreeNode;
  icon?: any;
  expandedIcon?: any;
  collapsedIcon?: any;
  styleClass?: string;
  draggable?: boolean;
  droppable?: boolean;
  cameraName?: string;
  outUrl: string;
  showLocation: number;
}
export class ServiceAreaNode {
  id?: number;
  areaName?: string;
  parentId?: number;
  administrativeAreaList?: ServiceAreaNode[];
}

export class EventListInfo {
  eventCategoryCode: string; // 事件分类编码
  eventCategoryName: string; // 事件分类名称
  eventCode: string; // 事件编码
  eventDescripte: string; // 事件描述
  eventName: string; // 事件警告名称
  eventSubject: string; // 事件发生地点
  id: number; // id
  occurTime: number; // 事件发生时间
  principal: string; // 时间主体责任人
  processState: number; // 处理状态
  serviceAreaId: string; // 服务区ID
}

export class EventInfoUpType {
  business = '经营类';
  compact = '合同类';
  project = '工程类';
  health = '卫生类';
  monitoring = '监控类';
  system = '系统类';
}

export class AttributeValue {
  attributeDesc: '经度';
  attributeId: 15;
  attributeName: 'longitude';
  id: 479;
  value: '106.705393';
}

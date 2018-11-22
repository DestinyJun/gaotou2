export class EventListInfo {
  eventCategoryCode: string; // 事件分类编码
  eventCategoryName: string; // 事件分类名称
  eventCode: string; // 事件编码
  eventDescripte: string; // 事件描述
  eventName: string; // 事件警告名称
  eventSubject: string; // 事件发生地点
  id: number; // id
  occurTime: number; // 事件发生时间
  principal: string; // 事件主体责任人
  processState: number; // 处理状态
  serviceAreaId: string; // 服务区ID
}

export class UploadEventInfoUp {
  administrativeAreaId?: number;
  serviceAreaId?: number;
  eventCategoryCode?: string;
  eventCategoryName?: string;
  reportUserId?: number;
  reportUserName?: string;
  eventName?: string; // 事件主题名称
  eventDescripte?: string;
  principal?: string;
  eventSubject?: string;
  occurTime?: string;
}

export class AttributeValue {
  attributeDesc: '经度';
  attributeId: 15;
  attributeName: 'longitude';
  id: 479;
  value: '106.705393';
}

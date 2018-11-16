export class EventListInfo {
  time: string;
  type: string;
  description: string;
  state: string;
  personage: string;
  plan?: string;
  solution?: string;
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

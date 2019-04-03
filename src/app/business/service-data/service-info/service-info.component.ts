import {Component, Input, OnChanges, OnInit, SimpleChanges, ViewEncapsulation} from '@angular/core';
import {IncomeManualAddIncome} from '../../../common/model/service-data.model';
import {ServiceDataService} from '../../../common/services/service-data.service';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-service-info',
  templateUrl: './service-info.component.html',
  styleUrls: ['./service-info.component.less'],
  encapsulation: ViewEncapsulation.None
})
export class ServiceInfoComponent implements OnInit, OnChanges {
  @Input() serviceId: any;
  @Input() serviceName: any;
  @Input() serviceInfo: any = null;
  @Input() esDate: any;
  // 服务区基本信息
  public alertCrosswiseShow = false;
  public alterCommonAttributeValues = [];
  public alterUpAttributeValues = [];
  public alterDownAttributeValues = [];
  public servicesPlan = false;
  public servicesMap = {};
  // 手动输入
  public incomeManualShow = false;
  public incomeManualDirectionSelect = [];
  public incomeManualStoreShow = false;
  public incomeManualIncomeShow = false;
  public incomeManualStoreSelect = [
    {name: '请选择店铺......', code: '-1'}
  ];
  public incomeManualTime: Date;
  public invalidDates = [];
  public minDate: Date;
  public maxDate: Date;
  public incomeManualAddIncome = new IncomeManualAddIncome();
  constructor(
    private serviceSrv: ServiceDataService,
    private datePipe: DatePipe
  ) { }

  ngOnInit() {
    this.timeDate();
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (this.serviceInfo) {
      this.serviceInfo.commonAttributeValues.map((val, index) => {
        this.alterCommonAttributeValues.push(this.cloneValue(val));
      });
      this.serviceInfo.upAttributeValues.attributeValues.map((val, index) => {
        this.alterUpAttributeValues.push(this.cloneValue(val));
      });
      this.serviceInfo.downAttributeValues.attributeValues.map((val, index) => {
        this.alterDownAttributeValues.push(this.cloneValue(val));
      });
    }
    // 查询服务区方向
    this.serviceSrv.searchServiceDirection(this.serviceId).subscribe(
      (val) => {
        if (val.status === '200') {
          if (val.data.length !== 0) {
            this.incomeManualDirectionSelect = [
              {name: `请选择服务区方向......`, code: '-1'},
              {name: `${val.data[0].source}——>${val.data[0].destination}`, code: val.data[0].orientaionId},
              {name: `${val.data[1].source}——>${val.data[1].destination}`, code: val.data[1].orientaionId}
            ];
          }
        }
      }
    );
  }
  // 时间格式化
  public timeDate (): void {
    const today = new Date();
    const month = today.getMonth();
    const year = today.getFullYear();
    const prevMonth = (month === 0) ? 11 : month - 1;
    const prevYear = (prevMonth === 11) ? year - 1 : year;
    const nextMonth = (month === 11) ? 0 : month + 1;
    const nextYear = (nextMonth === 0) ? year + 1 : year;
    this.minDate = new Date();
    this.minDate.setMonth(1);
    this.minDate.setFullYear(prevYear - 3);
    this.maxDate = new Date();
    this.maxDate.setMonth(month);
    this.maxDate.setFullYear(nextYear);
    const endDay = new Date(year, month + 1, 0).getDate();
    for (let i = today.getDate(); i <= endDay; i++) {
      const invalidDate = new Date();
      invalidDate.setDate(i);
      this.invalidDates.push(invalidDate);
    }
  }
  // 遍历修改后的数据，并把它赋值给car1
  public cloneValue(c: any): any {
    const car = {};
    for (const prop in c) {
      if (c) {
        car[prop] = c[prop];
      }
    }
    return car;
  }

  // 服务区信息修改
  public crosswiseClick(): void {
    this.alertCrosswiseShow = true;
    document.body.className = 'ui-overflow-hidden';
  }
  public closeCrosswiseShow(): void {
    document.body.className = '';
    this.alertCrosswiseShow = false;
  }
  public modifySerAraItemClick(): void {
    if (this.serviceInfo.commonAttributeValues.length !== 0) {}
    this.serviceSrv.modifySerAraItem(
      {
        administrativeAreaId: this.serviceInfo.administrativeAreaId,
        administrativeAreaName: this.serviceInfo.administrativeAreaName,
        chiefName: null,
        chiefPhone: null,
        chiefUserId: this.serviceInfo.chiefUserId,
        commonAttributeValues: this.alterCommonAttributeValues,
        deptId: this.serviceInfo.deptId,
        deptName:  this.serviceInfo.deptName,
        downAttributeValues: {
          attributeValues: this.alterDownAttributeValues,
          destination: this.serviceInfo.downAttributeValues.destination,
          flag: this.serviceInfo.downAttributeValues.flag,
          flagName: this.serviceInfo.downAttributeValues.flagName,
          id: this.serviceInfo.downAttributeValues.id,
          source: this.serviceInfo.downAttributeValues.source,
        },
        id: this.serviceInfo.id,
        organizationId: this.serviceInfo.organizationId,
        organizationName: this.serviceInfo.organizationName,
        serviceAreaName: this.serviceInfo.serviceAreaName,
        upAttributeValues: {
          attributeValues: this.alterUpAttributeValues,
          destination: this.serviceInfo.upAttributeValues.destination,
          flag: this.serviceInfo.upAttributeValues.flag,
          flagName: this.serviceInfo.upAttributeValues.flagName,
          id: this.serviceInfo.upAttributeValues.id,
          source: this.serviceInfo.upAttributeValues.source,
        },
      }
    ).subscribe(
      (data) => {
        if (data.status === '200') {
          this.alterCommonAttributeValues = [];
          this.alterUpAttributeValues = [];
          this.alterDownAttributeValues = [];
          window.alert(data.message);
          this.serviceSrv.searchSerAraItem(this.serviceId).subscribe(
            (value) => {
              this.serviceInfo = value.data;
              value.data.commonAttributeValues.map((val, index) => {
                this.alterCommonAttributeValues.push(this.cloneValue(val));
              });
              value.data.upAttributeValues.attributeValues.map((val, index) => {
                this.alterUpAttributeValues.push(this.cloneValue(val));
              });
              value.data.downAttributeValues.attributeValues.map((val, index) => {
                this.alterDownAttributeValues.push(this.cloneValue(val));
              });
            }
          );
        }
      }
    );
  }

  // 平面图
  public openServicesPlan() {
    document.body.className = 'ui-overflow-hidden';
    this.servicesPlan = true;
    // 百度地图
    this.servicesMap = {
      bmap: {
        center: [106.70458, 26.90214],
        zoom: 20,
        roam: true,
        mapStyle: {
          'styleJson': [
            {
              'featureType': 'background',
              'elementType': 'all',
              'stylers': {
                'color': '#273440'
              }
            }
          ]
        }
      },
    };
  }
  public closeServicesPlan() {
    document.body.className = '';
    this.servicesPlan = false;
  }

  // 业态输入
  public openIncomeManual (): void {
    this.incomeManualShow = true;
  }
  public incomeManualDirectionClick (item): void {
    if (item.code !== '-1') {
      this.incomeManualStoreSelect = [
        {name: '请选择店铺......', code: '-1'}
      ];
      this.incomeManualStoreShow = true;
      this.serviceSrv.searchServiceNoCashShop(item.code).subscribe(
        (val) => {
          if (val.status === '200') {
            val.data.map((prop) => {
              this.incomeManualStoreSelect.push(
                {name: `${prop.storeName}`, code: prop}
              );
            });
          }
        });
      return;
    }
    this.incomeManualStoreShow = false;
  }
  public incomeManualShopClick (item): void {
    if (item.code !== '-1') {
      this.incomeManualIncomeShow = true;
      this.incomeManualAddIncome.storeId = item.code.id;
      this.incomeManualAddIncome.serviceAreaId = item.code.serviceAreaId;
      this.incomeManualAddIncome.serviceAreaName = item.code.serviceAreaName;
      this.incomeManualAddIncome.orientationId = item.code.saOrientationId;
      this.incomeManualAddIncome.storeName = item.code.storeName;
      this.incomeManualAddIncome.categoryCode = item.code.categoryCode;
      this.incomeManualAddIncome.day = this.datePipe.transform(this.incomeManualTime, 'yyyy-MM-dd');
      return;
    }
    this.incomeManualIncomeShow = false;
  }
  public incomeManualUpClick (): void {
    this.serviceSrv.addNoCashShopIncome(this.incomeManualAddIncome).subscribe(
      (val) => {
        if (val.status === '200') {
          this.incomeManualShow = false;
          window.alert('上传成功');
          return;
        }
        this.incomeManualShow = false;
        window.alert('添加失败');
      }
    );
  }
  // 服务区合同下载
  public servicesPactDown(): void {
    if (this.serviceInfo.contractUrl === null) {
      window.alert('合同暂未上传');
      return;
      // console.log(this.serviceInfo.contractUrlPrefix + this.serviceInfo.contractUrl);
    }
    window.open(`${this.serviceInfo.contractUrlPrefix}${this.serviceInfo.contractUrl}`);
  }
}

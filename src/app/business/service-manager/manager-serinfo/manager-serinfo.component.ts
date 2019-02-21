import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ServiceDataService} from '../../../common/services/service-data.service';
import {LocalStorageService} from '../../../common/services/local-storage.service';

@Component({
  selector: 'app-manager-serinfo',
  templateUrl: './manager-serinfo.component.html',
  styleUrls: ['./manager-serinfo.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ManagerSerinfoComponent implements OnInit {
  public serviceInfo: any;
  public serviceZoneTitle: string;  // 服务区名称
  public serviceZoneID: string;   // 服务区ID
  public alterCommonAttributeValues = [];
  public alterUpAttributeValues = [];
  public alterDownAttributeValues = [];
  public alertCrosswiseShow = false;
  public servicesPlan = false;
  public servicesMap = {};
  constructor(
    private routerInfo: ActivatedRoute,
    private serareaService: ServiceDataService,
    private localService: LocalStorageService,
  ) { }

  ngOnInit() {
    // 路由接受参数
    this.routerInfo.params.subscribe(
      (params) => {
        this.serviceZoneTitle = params.name;
        this.serviceZoneID = params.id;
        this.localService.eventBus.next({title: this.serviceZoneTitle + '业态大数据', flagState: 'serzone', flagName: this.serviceZoneTitle});
      }
    );
    this.serareaService.searchSerAraItem(this.serviceZoneID).subscribe(
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
    this.serareaService.modifySerAraItem(
      {
        administrativeAreaId: 3,
        administrativeAreaName: '贵阳市',
        chiefName: null,
        chiefPhone: null,
        chiefUserId: 1,
        commonAttributeValues: this.alterCommonAttributeValues,
        deptId: 5,
        deptName: '久长服务区',
        downAttributeValues: {
          attributeValues: this.alterDownAttributeValues,
          destination: '遵义',
          flag: '3',
          flagName: '下行',
          id: 2,
          source: '贵阳',
        },
        id: 1,
        organizationId: 1,
        organizationName: '贵州高投服务管理有限公司',
        serviceAreaName: '久长服务区',
        upAttributeValues: {
          attributeValues: this.alterUpAttributeValues,
          destination: '贵阳',
          flag: '2',
          flagName: '上行',
          id: 1,
          source: '遵义',
        },
      }
    ).subscribe(
      (data) => {
        if (data.status === '200') {
          window.alert(data.message);
          this.alterCommonAttributeValues = [];
          this.alterUpAttributeValues = [];
          this.alterDownAttributeValues = [];
          this.serareaService.searchSerAraItem(1).subscribe(
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

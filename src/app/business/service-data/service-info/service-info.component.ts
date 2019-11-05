import {Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {IncomeManualAddIncome} from '../../../common/model/service-data.model';
import {ServiceDataService} from '../../../common/services/service-data.service';
import {DatePipe} from '@angular/common';
import {LocalStorageService} from '../../../common/services/local-storage.service';

@Component({
  selector: 'app-service-info',
  templateUrl: './service-info.component.html',
  styleUrls: ['./service-info.component.less'],
})
export class ServiceInfoComponent implements OnInit, OnChanges, OnDestroy {
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
  public alterServiceInfo = false;
  public video1: any;
  public video2: any;
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
    private datePipe: DatePipe,
    private localSrv: LocalStorageService
  ) { }

  ngOnInit() {
    this.timeDate();
    this.localSrv.windowVideoShow.subscribe((value) => {
      if (value) {
        this.openInfoVideo();
      } else {
        this.closeInfoVideo();
      }
    });
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
      this.alterCommonAttributeValues.map((val) => {
        if (val.attributeDesc === '公共监控1') {
          this.video1 = val.value;
        }
        if (val.attributeDesc === '公共监控2') {
          this.video2 = val.value;
        }
        });
      this.openInfoVideo();
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
    this.closeInfoVideo();
    document.body.className = 'ui-overflow-hidden';
  }
  public closeCrosswiseShow(): void {
    document.body.className = '';
    this.alertCrosswiseShow = false;
    this.openInfoVideo();
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
          document.body.className = '';
          this.alertCrosswiseShow = false;
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
              this.alterCommonAttributeValues.map((val) => {
                if (val.attributeDesc === '公共监控1') {
                  this.video1 = val.value;
                }
                if (val.attributeDesc === '公共监控2') {
                  this.video2 = val.value;
                }
              });
              this.openInfoVideo();
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
    this.closeInfoVideo();
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
    this.openInfoVideo();
  }

  // 业态输入
  public openIncomeManual (): void {
    this.incomeManualShow = true;
    this.closeInfoVideo();
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
  public openServiceInfo(): void {
    this.alterServiceInfo = true;
    this.closeInfoVideo();
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
  // 视频加载与清空
  public openInfoVideo(): void {
    const infoVideo1Url = `
       <object classid="clsid:9BE31822-FDAD-461B-AD51-BE1D1C159921"
            id="infoVideo1Url" codebase="" width="100%" height="100%" events="True">
        <param name="mrl" value=""/>
        <param name="src" value=""/>
        <param name="controls" value="false"/>
        <param name="ShowDisplay" value="true"/>
        <param name="AutoLoop" value="false"/>
        <param name="autoplay" value="true"/>
        <param name="Time" value="True"/>
        <param name='volume' value='0'/>
        <param value="transparent" name="wmode">
        <embed pluginspage="http://www.videolan.org"
               type="application/x-vlc-plugin"
               version="VideoLAN.VLCPlugin.2"
               width="100%"
               height="100%"
               text="Waiting for video"
               name="infoVideo1Url"
        />
    </object>
      `;
    const infoVideo2Url = `
       <object classid="clsid:9BE31822-FDAD-461B-AD51-BE1D1C159921"
            id="infoVideo1Ur2" codebase="" width="100%" height="100%" events="True">
        <param name="mrl" value=""/>
        <param name="src" value=""/>
        <param name="controls" value="false"/>
        <param name="ShowDisplay" value="true"/>
        <param name="AutoLoop" value="false"/>
        <param name="autoplay" value="true"/>
        <param name="Time" value="True"/>
        <param name='volume' value='0'/>
        <param value="transparent" name="wmode">
        <embed pluginspage="http://www.videolan.org"
               type="application/x-vlc-plugin"
               version="VideoLAN.VLCPlugin.2"
               width="100%"
               height="100%"
               text="Waiting for video"
               name="infoVideo1Ur2"
        />
    </object>
      `;
    setTimeout(() => {
      document.getElementById('infoVideo1').innerHTML = infoVideo1Url;
      document.getElementById('infoVideo2').innerHTML = infoVideo2Url;
      setTimeout(() => {
        const options = ['rtsp-tcp=true', ' network-caching=500'];
        // 视频1
        const vlc1 = window.document[`infoVideo1Url`];
        const mrl1 = this.video1;
        const itemIda = vlc1['playlist'].add(mrl1, 'asd', options);
        vlc1['playlist'].playItem(itemIda);
        // 视频2
        const vlc2 = window.document[`infoVideo1Ur2`];
        const mrl2 = this.video2;
        const itemIdb = vlc2['playlist'].add(mrl2, 'asd', options);
        vlc2['playlist'].playItem(itemIdb);
      }, 100);
    }, 100);
  }
  public closeInfoVideo(): void {
    document.getElementById('infoVideo1').innerHTML = '';
    document.getElementById('infoVideo2').innerHTML = '';
  }
  // 组件销毁时执行
  ngOnDestroy(): void {
    // document.removeEventListener('click',this.testClick,true);
  }
}

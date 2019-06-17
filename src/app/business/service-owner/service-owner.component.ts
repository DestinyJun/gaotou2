import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {DataService} from '../../common/services/data.service';
import {ServiceDataService} from '../../common/services/service-data.service';
import {LocalStorageService} from '../../common/services/local-storage.service';

@Component({
  selector: 'app-service-owner',
  templateUrl: './service-owner.component.html',
  styleUrls: ['./service-owner.component.less']
})
export class ServiceOwnerComponent implements OnInit, OnDestroy {
  /***********************基础信息************************/
  public esDate: any;  // 时间初始化
  // 组件销毁后清除时钟任务
  public personAmountCountClean: any;
  public incomeShopInfoClean: any;
  // service area
  public serviceZoneTitle: string;  // 服务区名称
  public serviceZoneID: string;   // 服务区ID
  public serviceInfo: any = null;
  public alterUpAttributeValues = [];
  public alterDownAttributeValues = [];
  /***********************中部************************/
    // 商家、视频及方向
  public incomeTopData: any;
  public incomeBottomData: any;
  public publicTopVideoGroup = [];
  public publicBottomVideoGroup = [];
  constructor(
    private fb: FormBuilder,
    private routerInfo: ActivatedRoute,
    private dataService: DataService,
    private serareaService: ServiceDataService,
    private localService: LocalStorageService,
  ) { }

  ngOnInit() {
    // 时间初始化
    this.esDate = {
      firstDayOfWeek: 0,
      dayNames: ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'],
      dayNamesShort: ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'],
      dayNamesMin: ['周日', '周一', '周二', '周三', '周四', '周五', '周六'],
      monthNames: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
      monthNamesShort: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
      today: '今天',
      clear: '清除'
    };
    // 路由接受参数
    this.routerInfo.params.subscribe(
      (params) => {
        clearInterval(this.personAmountCountClean);
        clearInterval(this.incomeShopInfoClean);
        this.serviceZoneTitle = params.name;
        this.serviceZoneID = params.id;
        this.publicBottomVideoGroup = null;
        this.alterUpAttributeValues = [];
        this.alterDownAttributeValues = [];
        // 服务区信息
        this.serareaService.searchSerAraItem(this.serviceZoneID).subscribe(
          (value) => {
            if (value.status === '200') {
              if (value.data) {
                this.serviceInfo = value.data;
                this.serviceInfo.upAttributeValues.attributeValues.map((val, index) => {
                  this.alterUpAttributeValues.push(this.cloneValue(val));
                });
                this.serviceInfo.downAttributeValues.attributeValues.map((val, index) => {
                  this.alterDownAttributeValues.push(this.cloneValue(val));
                });
              }
            }
          }
        );
        this.localService.eventBus.next({title: this.serviceZoneTitle + '业态大数据', flagState: 'serzone', flagName: this.serviceZoneTitle});
        this.getPerson();
        this.backCenterDate();
        // 数据初始化
        this.upData();
      }
    );
  }
  ngOnDestroy(): void {
    clearInterval(this.personAmountCountClean);
    clearInterval(this.incomeShopInfoClean);
  }
  /*************数据初始化****************/
  public upData() {
    // 实时客流
    this.personAmountCountClean = setInterval(() => {
      this.getPerson();
    }, 3000);
    // 实时店铺信息
    this.incomeShopInfoClean = setInterval(() => {
      this.backCenterDate();
    }, 3000);
  }
  // 客流
  public getPerson(): void {
    let total: any;
    let province: any;
    let city: any;
    this.serareaService.searchPersonTotal({id: this.serviceZoneID}).subscribe(
      (totalVal) => {
        if (totalVal.status === '200') {
          total = totalVal.data;
          if (!(total === 0)) {
            this.serareaService.searchPersonProvince({id: this.serviceZoneID}).subscribe(
              (provinceVal) => {
                if (provinceVal.status === '200') {
                  province = provinceVal.data;
                  this.serareaService.searchPersonCity({id: this.serviceZoneID}).subscribe(
                    (cityVal) => {
                      if (cityVal.status === '200') {
                        city = cityVal.data;
                        this.localService.persons.next({
                          total: total.toString().split(''),
                          province: province,
                          city: city
                        });
                      }
                    }
                  );
                }
              }
            );
          } else {
            this.localService.persons.next({
              total: [],
              province: [],
              city: []
            });
          }
        }
      }
    );
  }
  /************************中部***************************/
  // 店铺、视频及方向
  public backCenterDate() {
    this.serareaService.getServiceShopVDate({id: this.serviceZoneID}).subscribe(
      (value) => {
        if (value.status === '200') {
          this.serareaService.searchServiceShopIncome({id: this.serviceZoneID}).subscribe(
            (val) => {
              if (val.status === '200') {
                let s = [];
                let x = [];
                value.data.map((item, index) => {
                  if (item.flag === '2') {
                    item.storeInfoList.map((prop) => {
                      prop.categoryCode = parseInt(prop.categoryCode, 10);
                    });
                    this.incomeTopData = item.storeInfoList;
                    this.publicTopVideoGroup = item.cameraGroupList;
                  } else if (item.flag === '3') {
                    item.storeInfoList.map((prop) => {
                      prop.categoryCode = parseInt(prop.categoryCode, 10);
                    });
                    this.incomeBottomData = item.storeInfoList;
                    this.publicBottomVideoGroup = item.cameraGroupList;
                  }
                });
                val.data.map((item, index) => {
                  if (item.flag === '2') {
                    s = item.storeInfoList;
                  } else if (item.flag === '3') {
                    x = item.storeInfoList;
                  }
                });
                if (s.length !== 0 && this.incomeTopData.length !== 0) {
                  s.map((item, index, obj) => {
                    if (s[index]['id'] === this.incomeTopData[index].id) {
                      this.incomeTopData[index].revenue = s[index].revenue;
                    }
                  });
                }
                if (x.length !== 0 && this.incomeBottomData.length !== 0) {
                  x.map((item, index) => {
                    if (x[index]['id'] === this.incomeBottomData[index].id) {
                      this.incomeBottomData[index].revenue = x[index].revenue;
                    }
                  });
                }
              } else {
                this.incomeTopData = null;
                this.incomeBottomData = null;
                this.publicTopVideoGroup = null;
                this.publicBottomVideoGroup = null;
              }
            }
          );
        }
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

}

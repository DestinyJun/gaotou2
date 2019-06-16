import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ServiceDataService} from '../../common/services/service-data.service';
import {LocalStorageService} from '../../common/services/local-storage.service';

@Component({
  selector: 'app-service-manger',
  templateUrl: './service-manger.component.html',
  styleUrls: ['./service-manger.component.less']
})
export class ServiceMangerComponent implements OnInit, OnDestroy {
  public esDate: any;  // 时间初始化
  public serviceInfo: any = null;
  public personAmountCountClean: any;
  // service area data
  public serviceZoneTitle: string;  // 服务区名称
  public serviceZoneID: string;   // 服务区ID
  // public video list
  public videoList = [
    {url: 'rtsp://admin:Hik12345+@117.187.60.138:578/cam/realmonitor?channel=1&subtype=0', location: 1},
    {url: 'rtsp://admin:Hik12345+@117.187.60.138:558/Streaming/Channels/101?transportmode=multicast', location: 2},
    {url: 'rtsp://admin:Hik12345+@117.187.60.146:558/Streaming/Channels/101?transportmode=multicast', location: 3},
    {url: 'rtsp://admin:Hik12345+@117.187.60.146:572/Streaming/Channels/103?transportmode=multicast', location: 4},
  ];
  public publicTopVideoGroup = [];
  public publicBottomVideoGroup = [];
  constructor(
    private routerInfo: ActivatedRoute,
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
        this.serviceZoneTitle = params.name;
        this.serviceZoneID = params.id;
        this.publicBottomVideoGroup = null;
        // 服务区信息
        this.serareaService.searchSerAraItem(this.serviceZoneID).subscribe(
          (value) => {
            if (value.status === '200') {
              if (value.data) {
                this.serviceInfo = value.data;
              }
            }
          }
        );
        this.localService.eventBus.next({title: this.serviceZoneTitle, flagState: 'serzone', flagName: this.serviceZoneTitle});
        this.getPublicVideoList();
        this.getPerson();
        // 实时客流
        this.personAmountCountClean = setInterval(() => {
          this.getPerson();
        }, 3000);
      }
    );
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
  // 视频组
  public getPublicVideoList() {
    this.serareaService.getServiceShopVDate({id: this.serviceZoneID}).subscribe(
      (value) => {
        if (value.status === '200') {
          this.serareaService.searchServiceShopIncome({id: this.serviceZoneID}).subscribe(
            (val) => {
              if (val.status === '200') {
                let s = [];
                let x = [];
                value.data.map((item) => {
                  if (item.flag === '2') {
                    item.storeInfoList.map((prop) => {
                      prop.categoryCode = parseInt(prop.categoryCode, 10);
                    });
                    this.publicTopVideoGroup = item.cameraGroupList;
                  } else if (item.flag === '3') {
                    item.storeInfoList.map((prop) => {
                      prop.categoryCode = parseInt(prop.categoryCode, 10);
                    });
                    this.publicBottomVideoGroup = item.cameraGroupList.reverse();
                  }
                });
                val.data.map((item) => {
                  if (item.flag === '2') {
                    s = item.storeInfoList;
                  } else if (item.flag === '3') {
                    x = item.storeInfoList;
                  }
                });
              } else {
                this.publicTopVideoGroup = null;
                this.publicBottomVideoGroup = null;
              }
            }
          );
        }
      }
    );
  }
  // destroy
  ngOnDestroy(): void {
    clearInterval(this.personAmountCountClean);
  }
}

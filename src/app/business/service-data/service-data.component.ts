import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {LocalStorageService} from '../../common/services/local-storage.service';
import {ApiService} from '../../common/services/api.service';
@Component({
  selector: 'app-service-data',
  templateUrl: './service-data.component.html',
  styleUrls: ['./service-data.component.less'],
})
export class ServiceDataComponent implements OnInit, OnDestroy {
  public serviceName: string;  // 服务区名称
  public serviceId: string;   // 服务区ID
  public serviceInfo: any = null;
  public clearTimer: any;
  public timeData: any;
  public fixedData: any;
  public index = 0;
  public top10Type = ['vehicle', 'passenger', 'revenue'];
  public top10TypeName = null;
  public top10TypeTitle: any;
  public eleWaterType = 'electricr';
  public eleWaterTile: any;
  constructor(
    private routerInfo: ActivatedRoute,
    private localService: LocalStorageService,
    private apiSrv: ApiService
  ) {}

  ngOnInit() {
    // 路由接受参数
    this.routerInfo.params.subscribe(
      (params) => {
        this.index = 0;
        clearInterval(this.clearTimer);
        this.serviceName = params.name;
        this.serviceId = params.id;
        this.eleWaterTile = {
          electricr: `${this.serviceName}年度用电走势统计`,
          water: `${this.serviceName}年度用水电走势统计`,
        };
        this.top10TypeTitle = {
          revenue: [`${this.serviceName}年度业态收入走势统计`, '#031845'],
          vehicle: [`${this.serviceName}年度车流量排走势统计`, '#00C800'],
          passenger: [`${this.serviceName}年度客流量走势统计`, '#eb64fb']
        };
        // 发射也太数据名称
        this.localService.eventBus.next({title: this.serviceName + '业态大数据', flagState: 'serzone', flagName: this.serviceName});
        // 获取服务区固定信息
        this.apiSrv.getAreaShopData({
          companyId: this.localService.get('companyId'),
          serviceAreaId: this.serviceId}).subscribe((res) => {
          this.fixedData = res.date;
        });
        // 数据初始化及实时刷新数据
        this.serviceInit();
        this.clearTimer = setInterval(() => {
          this.serviceInit();
        }, 8000);
      }
    );
  }

  ngOnDestroy(): void {
    clearInterval(this.clearTimer);
  }
  public serviceInit() {
    this.top10TypeName = this.top10Type[this.index];
    const params = {
      companyId: this.localService.get('companyId'),
      serviceAreaId: this.serviceId,
      top10Type: this.top10TypeName,
      weType: this.eleWaterType
    };
    this.apiSrv.getAreaData(params).subscribe((res) => {
      this.timeData = res.date;
      // 发射客流
      this.localService.persons.next({
        total: res.date.totalPassenger.toString().split(''),
      });
    });
    this.index++;
    if (this.index > 2) {
      this.index = 0;
    }
  }
}

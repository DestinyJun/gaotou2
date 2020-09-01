import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {LocalStorageService} from '../../common/services/local-storage.service';
import {ApiService} from '../../common/services/api.service';

@Component({
  selector: 'app-finance-data',
  templateUrl: './province-data.component.html',
  styleUrls: ['./province-data.component.less'],
})
export class ProvinceDataComponent implements OnInit, OnDestroy {
  public clearTimer: any;
  public mapPoints: any;
  public provinceName: string;
  public provinceId: any;
  public data: any;
  public index = 0;
  public top10Type = ['vehicle', 'passenger', 'revenue'];
  public top10TypeName = null;
  public top10TypeTitle = {
    revenue: ['贵州省年度业态收入走势统计', '#031845'],
    vehicle: ['贵州省年度车流量排走势统计', '#00C800'],
    passenger: ['贵州省年度客流量走势统计', '#eb64fb']
  };
  public eleWaterType = 'electricr';
  public eleWaterTile = {
    electricr: '贵州省年度用电走势统计',
    water: '贵州省年度用水电走势统计',
  };
  constructor(
    private routerInfo: ActivatedRoute,
    private apiSrv: ApiService,
    private localService: LocalStorageService,
  ) {
  }

  ngOnInit() {
    // 路由接受参数
    this.routerInfo.params.subscribe(
      (params) => {
        this.index = 0;
        clearInterval(this.clearTimer);
        this.provinceName = params.name;
        this.provinceId = params.id;
        // 发射业态数据名称
        this.localService.eventBus.next({title: params.name + '高速业态大数据', flagState: 'finance', flagName: this.provinceName});
        // 数据初始化及实时刷新数据
        this.provinceInit();
        this.clearTimer = setInterval(() => {
          this.provinceInit();
        }, 80000000);
        // 获取服务器坐标点
        this.apiSrv.getProvinceMapPoints({provinceId: this.provinceId}).subscribe(((res) => {
          this.mapPoints = res.date;
        }));
      }
    );
  }

  ngOnDestroy(): void {
    clearInterval(this.clearTimer);
  }

  public provinceInit() {
    this.top10TypeName = this.top10Type[this.index];
    const params = {
      companyId: this.localService.get('companyId'),
      provinceId: this.provinceId,
      top10Type: this.top10TypeName,
      weType: this.eleWaterType
    };
    this.apiSrv.getProvinceData(params).subscribe((res) => {
      this.data = res.date;
      // 发射客流
      this.localService.persons.next({
        total: res.date.totalPassenger.toString().split(''),
        target: this.provinceId,
        type: 1,
      });
    });
    this.index++;
    if (this.index > 2) {
      this.index = 0;
    }
  }
}

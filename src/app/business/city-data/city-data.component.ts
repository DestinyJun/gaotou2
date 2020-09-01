import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {LocalStorageService} from '../../common/services/local-storage.service';
import {ApiService} from '../../common/services/api.service';
@Component({
  selector: 'app-city-data',
  templateUrl: './city-data.component.html',
  styleUrls: ['./city-data.component.less'],
})
export class CityDataComponent implements OnInit, OnDestroy {
  public clearTimer: any;
  public mapPoints: any; // 地图点
  public cityName: string;
  public cityId: any;
  public data: any;
  public index = 0;
  public top10Type = ['vehicle', 'passenger', 'revenue'];
  public top10TypeName = null;
  public top10TypeTitle: any;
  public eleWaterType = 'electricr';
  public eleWaterTile: any;
  constructor(
    private routerInfo: ActivatedRoute,
    private apiSrv: ApiService,
    private localService: LocalStorageService,
  ) {}

  ngOnInit() {
    // 路由接受参数
    this.routerInfo.params.subscribe(
      (params) => {
        this.index = 0;
        clearInterval(this.clearTimer);
        this.cityName = params.name;
        this.cityId = params.id;
        this.eleWaterTile = {
          electricr: `${this.cityName}年度用电走势统计`,
          water: `${this.cityName}年度用水电走势统计`,
        };
        this.top10TypeTitle = {
          revenue: [`${this.cityName}年度业态收入走势统计`, '#031845'],
          vehicle: [`${this.cityName}年度车流量排走势统计`, '#00C800'],
          passenger: [`${this.cityName}年度客流量走势统计`, '#eb64fb']
        };
        // 发射也太数据名称
        this.localService.eventBus.next({title: this.cityName + '高速业态大数据', flagState: 'city', flagName: this.cityName});
        // 数据初始化及实时刷新数据
        this.cityInit();
        this.clearTimer = setInterval(() => {
          this.cityInit();
        }, 8000);
        // 获取服务器坐标点
        this.apiSrv.getCityMapPoints({areaCode: this.cityId}).subscribe(((res) => {
          this.mapPoints = res.date;
        }));
      }
    );
  }
  ngOnDestroy(): void {
    clearInterval(this.clearTimer);
  }
  public cityInit() {
    this.top10TypeName = this.top10Type[this.index];
    const params = {
      companyId: this.localService.get('companyId'),
      areaCode: this.cityId,
      top10Type: this.top10TypeName,
      weType: this.eleWaterType
    };
    this.apiSrv.getCityData(params).subscribe((res) => {
      this.data = res.date;
      // 发射客流
      this.localService.persons.next({
        total: res.date.totalPassenger.toString().split(''),
        target: this.cityId,
        type: 2
      });
    });
    this.index++;
    if (this.index > 2) {
      this.index = 0;
    }
  }
}

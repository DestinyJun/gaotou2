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
  public top10Type = ['revenue', 'vehicle', 'passenger'];
  public top10TypeName = 'passenger';
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
  ) {}

  ngOnInit() {
    // 路由接受参数
    this.routerInfo.params.subscribe(
      (params) => {
        clearInterval(this.clearTimer);
        this.cityName = params.name;
        this.cityId = params.id;
        // 发射也太数据名称
        this.localService.eventBus.next({title: this.cityName + '高速业态大数据', flagState: 'city', flagName: this.cityName});
        // 数据初始化
        this.cityInit();
        // 获取服务器坐标点
        this.apiSrv.getCityMapPoints({provinceId: this.cityId}).subscribe(((res) => {
          this.mapPoints = res.date;
        }));
      }
    );
    // 实时刷新数据
   /* this.clearTimer = setInterval(() => {
      this.cityInit();
    }, 8000);*/
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
      console.log(res);
      this.data = res.date;
    });
    this.index++;
    if (this.index > 2) {
      this.index = 0;
    }
  }
}

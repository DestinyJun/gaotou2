import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {DataService} from '../../common/services/data.service';
import {LocalStorageService} from '../../common/services/local-storage.service';
import {ApiService} from '../../common/services/api.service';
@Component({
  selector: 'app-finance-data',
  templateUrl: './province-data.component.html',
  styleUrls: ['./province-data.component.less'],
})
export class ProvinceDataComponent implements OnInit, OnDestroy {
  /***********************基础信息************************/
  public personAmountCountClean: any;
  public mapPoints: any;
  public provinceName: string;
  public provinceId: any;
  // 3D柱状图配置
  public data: any;

  constructor(
    private dataService: DataService,
    private router: Router,
    private routerInfo: ActivatedRoute,
    private apiSrv: ApiService,
    private localService: LocalStorageService,
  ) {
  }

  ngOnInit() {
    // 路由接受参数
    this.routerInfo.params.subscribe(
      (params) => {
        clearInterval(this.personAmountCountClean);
        this.provinceName = params.name;
        this.provinceId = params.id;
        // 发射业态数据名称
        this.localService.eventBus.next({title: params.name + '高速业态大数据', flagState: 'finance', flagName: this.provinceName});
        // 图表更行
        this.provinceInit();
        // 实时刷新数据
        /* this.personAmountCountClean = setInterval(() => {
           this.getPerson();
         }, 8000);*/
      }
    );
  }

  ngOnDestroy(): void {
    clearInterval(this.personAmountCountClean);
  }

  public provinceInit() {
    const params = {
      companyId: this.localService.get('companyId'),
      provinceId: this.provinceId,
      top10Type: 'revenue',
      weType: 'electricr'
    };
    this.apiSrv.getInitData(params).subscribe((res) => {
      this.data = res.date;
      console.log(res);
    });
  }

  // 地图点击事件
  public mapCityClick(param): void {
    if (param.areaName === undefined) {
      if (param.cityName === '贵阳市') {
        this.router.navigate(['/home/city', {id: 3, name: param.cityName}]);
      } else {
        this.router.navigate(['/home/city', {id: 5, name: param.cityName}]);
        // window.alert(`很抱歉${param.cityName}暂无数据`);
      }
    } else {
      if (param.areaName === '久长服务区') {
        this.router.navigate(['/home/serzone', {id: 1, name: param.areaName}]);
      } else {
        this.router.navigate(['/home/serzone', {id: 28, name: param.areaName}]);
        // window.alert('此服务区暂无数据');
      }
    }
  }
}

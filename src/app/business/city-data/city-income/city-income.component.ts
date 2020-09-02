import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import { CountUpOptions } from 'countup.js';
import {Router} from '@angular/router';
import {DatePipe} from '@angular/common';
import {ApiService} from '../../../common/services/api.service';
import {LocalStorageService} from '../../../common/services/local-storage.service';
import {environment} from '../../../../environments/environment';

@Component({
  selector: 'app-city-income',
  templateUrl: './city-income.component.html',
  styleUrls: ['./city-income.component.less']
})
export class CityIncomeComponent implements OnInit, OnChanges {
  @Input() cityName: any;
  @Input() public cityId: any;
  @Input() data: any;
  public incomeNumber: number;
  public incomeNumberOption: CountUpOptions = {
    useGrouping: false,
    duration: 3,
    suffix: '<small style="color: white;font-size: 1rem;">元</small>'
  };
  public optionsIncomeModel: any;
  // 弹窗
  public incomeAlertShow = false;
  public incomeAlertTitle = '总收入';
  public incomeOptionsType = {};
  public incomeExcelShow = false;
  public incomeTableData: any;
  public incomeArrayPie = [];
  public incomeStartTime: Date; // 时间选择器
  public incomeEndTime: Date; // 时间选择器
  public incomeBtnList = [];
  constructor(
    private router: Router,
    private datePipe: DatePipe,
    private apiSrv: ApiService,
    private localService: LocalStorageService,
  ) { }

  ngOnInit() {
    // 初始化车辆类型
    this.apiSrv.getIncomeType().subscribe((res) => {
      this.incomeBtnList = res.date.map((item, index) => {
        let bgc = '';
        switch (index) {
          case 0:
            bgc = 'btn-danger';
            break;
          case 1:
            bgc = 'btn-primary';
            break;
          case 2:
            bgc = 'btn-success';
            break;
          case 3:
            bgc = 'btn-info';
            break;
          case 4:
            bgc = 'btn-warning';
            break;
          case 5:
            bgc = 'btn-primary';
            break;
        }
        return {...item, isHeight: false, bgc};
      });
      this.incomeBtnList.unshift({storeTypeId: 0, storeTypeName: '总收入', enabled: 1, isHeight: true, bgc: 'btn-info'});
    });
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (this.data) {
      this.incomeNumber = this.data.total;
      this.optionsIncomeModel = this.data.storeTypeIncomeList;
    }
  }
  public incomeParkClick(e): void {
    this.incomeAlertTitle = e.name;
    this.incomeAlertShow = true;
    document.body.className = 'ui-overflow-hidden';
    this.incomeArrayPie = [];
    this.incomeDistribution(null, 1);
  }
  public incomeBtnClick(list, i): void {
    list.forEach((item) => {
      item.isHeight = false;
    });
    list[i].isHeight = true;
    this.incomeDistribution(list[i], 1);
  }
  public incomeDistribution(item, page): void {
    let storeType = '';
    if (!item || item.storeTypeName === '总收入') {
      this.incomeAlertTitle = '总收入';
      storeType = 'total';
    }
    else {
      storeType = item.storeTypeId;
      this.incomeAlertTitle = item.storeTypeName;
    }
    const params = {
      storeType: storeType,
      companyId: this.localService.get('companyId'),
      type: 2,
      currentPage: page,
      pageSize: 8,
      target: this.cityId,
    };
    // 请求数据
    this.apiSrv.getIncomeDistribute(params).subscribe(
      (res) => {
        this.incomeTableData = res.date.date;
        const arrayIncomePie = [];
        res.date.serviceAreaIncomeChart.serviceAreaIncomeList.forEach((val) => {
          arrayIncomePie.push({value: val.total , name: val.regionName, id: val.regionId});
        });
        this.incomeOptionsType = {
          data: arrayIncomePie,
          title: `贵州省各市所有服务区今日${this.incomeAlertTitle}占比统计`,
          total: '',
          color: ['#CE2D79', '#BDD139', '#78E77D', '#09D4D6', '#3C75B9',
            '#6769B1', '#FF8C9D', '#2796C4', '#E57D0D']
        };
      }
    );
  }
  public incomeTableClick(e) {
    this.router.navigate(['/home/serzone', {id: e.serviceAreaId, name: e.serviceAreaName}]);
  }
  public incomeOptionsPieClick(e) {
    this.router.navigate(['/home/serzone', {id: e.data.id, name: e.name}]);
  }
  public incomeCloseShow(): void {
    document.body.className = '';
    this.incomeAlertShow = false;
  }
  public incomeDistributionPaging(e): void {
    this.incomeDistribution(null, e);
  }
  // 车流监控：表格导出
  public incomeExportClick() {
    const startTime = this.datePipe.transform(this.incomeStartTime, 'yyyyMMdd');
    const endTime = this.datePipe.transform(this.incomeEndTime, 'yyyyMMdd');
    if (this.incomeStartTime && this.incomeEndTime) {
      window.location.assign(
        `${environment.urlc}/report/province/vihicle/2/startDate/${startTime}/endDate/${endTime}`
      );
    } else {
      window.alert('请把数据选择全在提交');
    }
  }
}

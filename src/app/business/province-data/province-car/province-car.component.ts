import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import { CountUpOptions } from 'countup.js';
import {Router} from '@angular/router';
import {DatePipe} from '@angular/common';
import {environment} from '../../../../environments/environment';
import {ApiService} from '../../../common/services/api.service';
import {LocalStorageService} from '../../../common/services/local-storage.service';

@Component({
  selector: 'app-province-car',
  templateUrl: './province-car.component.html',
  styleUrls: ['./province-car.component.less']
})
export class ProvinceCarComponent implements OnInit, OnChanges {
  @Input() public provinceName: any;
  @Input() public provinceId: any;
  @Input() public data: any;
  public carNumber: number;
  public carNumberOption: CountUpOptions = {
    useGrouping: false,
    duration: 3,
    suffix: '<small style="color: white;font-size: 1rem;">辆</small>'
  };
  public optionsCarModel: any;
  // 弹窗
  public alertCarShow = false;
  public alertCarTitle = '总数';
  public optionsCarType = {};
  public carExcelShow = false;
  public carTableData: any;
  public arryCarPie = [];
  public carStartTime: Date; // 时间选择器
  public carEndTime: Date; // 时间选择器
  public carBtnList = [];

  constructor(
    private router: Router,
    private datePipe: DatePipe,
    private apiSrv: ApiService,
    private localService: LocalStorageService,
  ) { }

  ngOnInit() {
    // 初始化车辆类型
    this.apiSrv.getCarType().subscribe((res) => {
      this.carBtnList = res.date.map((item, index) => {
        let bgc = '';
        switch (index) {
          case 0:
            bgc = 'btn-info';
            break;
          case 1:
            bgc = 'btn-primary';
            break;
          case 2:
            bgc = 'btn-danger';
            break;
        }
        return {...item, isHeight: false, bgc};
      });
      this.carBtnList.unshift({vehicleTypeCode: 'x000', vehicleTypeName: '总数', isHeight: true, bgc: 'btn-warning'});
    });
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (this.data) {
      this.carNumber = this.data.totalVehicle;
      this.optionsCarModel = this.data.vehicleTypeNumList;
    }
  }
  public parkClick(e): void {
    this.alertCarTitle = e.name;
    this.alertCarShow = true;
    document.body.className = 'ui-overflow-hidden';
    this.arryCarPie = [];
    this.carDistribution(null, 1);
  }
  public carBtnClick(list, i): void {
    list.forEach((item) => {
      item.isHeight = false;
    });
    list[i].isHeight = true;
    this.carDistribution(list[i], 1);
  }
  public carDistribution(item, page): void {
    let vehicleTypeCode = '';
    if (!item || item.vehicleTypeCode === 'x000') {
      this.alertCarTitle = '总数';
      vehicleTypeCode = 'total';
    }
    else {
      vehicleTypeCode = item.vehicleTypeCode;
      this.alertCarTitle = item.vehicleTypeName;
    }
    const params = {
      vehicleTypeCode: vehicleTypeCode,
      companyId: this.localService.get('companyId'),
      type: 1,
      currentPage: page,
      pageSize: 8,
      target: this.provinceId,
    };
    // 请求数据
    this.apiSrv.getCarDistribute(params).subscribe(
      (res) => {
        this.carTableData = res.date.data;
        const arryCarPie = [];
        res.date.serviceAreaVehicleFlowChart.serviceAreaVehicleFlows.forEach((val) => {
          arryCarPie.push({value: val.total , name: val.serviceAreaName, id: val.serviceAreaId});
        });
        this.optionsCarType = {
          data: arryCarPie,
          title: `贵州省各市所有服务区今日${this.alertCarTitle}占比统计`,
          total: '',
          color: ['#CE2D79', '#BDD139', '#78E77D', '#09D4D6', '#3C75B9',
            '#6769B1', '#FF8C9D', '#2796C4', '#E57D0D']
        };
      }
    );
  }
  public carTableClick(e) {
    this.router.navigate(['/home/serzone', {id: e.serviceAreaId, name: e.serviceAreaName}]);
  }
  public optionsCarPieClick(e) {
    this.router.navigate(['/home/serzone', {id: e.data.id, name: e.name}]);
  }
  public closeCarShow(): void {
    document.body.className = '';
    this.alertCarShow = false;
  }
  public carDistributionPaging(e): void {
    this.carDistribution(null, e);
  }
  // 车流监控：表格导出
  public carExportClick() {
    const startTime = this.datePipe.transform(this.carStartTime, 'yyyyMMdd');
    const endTime = this.datePipe.transform(this.carEndTime, 'yyyyMMdd');
    if (this.carStartTime && this.carEndTime) {
      window.location.assign(
        `${environment.urlc}/report/province/vihicle/2/startDate/${startTime}/endDate/${endTime}`
      );
    } else {
      window.alert('请把数据选择全在提交');
    }
  }
}

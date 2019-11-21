import {Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {FinanceDataService} from '../../../common/services/finance-data.service';
import {Router} from '@angular/router';
import {DatePipe} from '@angular/common';
import { CountUpOptions } from 'countup.js';
import {environment} from '../../../../environments/environment';

@Component({
  selector: 'app-province-car',
  templateUrl: './province-car.component.html',
  styleUrls: ['./province-car.component.less']
})
export class ProvinceCarComponent implements OnInit, OnChanges, OnDestroy {
  @Input() public provinceId: any;
  @Input() public provinceName: any;
  @Input() public esDate: any;  // 时间初始化
  /***********************基础信息************************/
  public vehicleAmountCountClean: any;
  public carNumber: number;
  public carNumberOption: CountUpOptions = {
    useGrouping: false,
    duration: 3,
    suffix: '<small style="color: white;font-size: 1rem;">辆</small>'
  };
  // 车辆监控
  public vehicleAmount: any;
  public optionsCarModel: any; // 车辆饼状图
  public alertCarShow = false;
  public alertCarTitle = '总数';
  public optionsCarType = {};
  public arryCarPie = [];
  public carOptionType: any;
  public carTableData: any;
  public carExcelShow = false;
  public carStartTime: Date; // 时间选择器
  public carEndTime: Date; // 时间选择器
  constructor(
    private provinceSrv: FinanceDataService,
    private router: Router,
    private datePipe: DatePipe
  ) { }

  ngOnInit() {}
  ngOnChanges(changes: SimpleChanges): void {
    // 实时数据
    this.vehicleAmountCount();
    this.CarTypes();
    // 车流监控
    this.vehicleAmountCountClean = setInterval(() => {
      this.vehicleAmountCount();
      this.CarTypes();
    }, 5000);
  }
  ngOnDestroy(): void {
    clearInterval(this.vehicleAmountCountClean);
  }
// 车流监控
  public vehicleAmountCount(): void {
    this.provinceSrv.searchCarTotal({id: this.provinceId}).subscribe(
      (value) => {
        if (value.status === '200') {
          this.carNumber = value.data;
          this.vehicleAmount = {
            number: value.data,
            units: '辆'
          };
        }
      }
    );
  }
  public CarTypes() {
    this.provinceSrv.searchCarTotalPie({id: this.provinceId}).subscribe(
      (value) => {
        if (value.status === '200') {
          if (this.provinceName === '贵州省') {
            value.data.push({id: null, name: '危品车', value: 1});
            value.data.push({id: null, name: '畜牧车', value: 1});
          } else {
            value.data.push({id: null, name: '危品车', value: 0});
            value.data.push({id: null, name: '畜牧车', value: 0});
          }
          this.optionsCarModel = {
            data: value.data,
            title: '',
            total: '',
            color: ['#00CAE2', '#2307EF', '#4791D8']
          };
        }
      }
    );
  }
  public parkClick(e): void {
    this.alertCarTitle = e.name;
    this.alertCarShow = true;
    document.body.className = 'ui-overflow-hidden';
    this.arryCarPie = [];
    this.carDistribution(e);
  }
  public carDistribution(e): void {
    const carTypes = {
      '总数': 'total',
      '小车': 1,
      '客车': 2,
      '货车': 3,
    };
    this.carOptionType = e.name;
    // 表格
    this.provinceSrv.searchCarAlertTable({id: this.provinceId, type: carTypes[this.carOptionType], page: 1, nums: 10}).subscribe(
      (val) => {
        this.carTableData = val.data;
      }
    );
    // 饼状图
    this.provinceSrv.searchCarAlertPie({id: this.provinceId, type: carTypes[this.carOptionType]}).subscribe(
      (value) => {
        const arryCarPie = [];
        value.data.map((val, index) => {
          arryCarPie.push({value: val.value, name: val.name, id: val.id});
        });
        this.optionsCarType = {
          data: arryCarPie,
          title: `贵州省各市所有服务区今日${e.name}占比统计`,
          total: '',
          color: ['#CE2D79', '#BDD139', '#78E77D', '#09D4D6', '#3C75B9',
            '#6769B1', '#FF8C9D', '#2796C4', '#E57D0D']
        };
      }
    );
  }
  public carDistributionPaging(e): void {
    const carTypes = {
      '总数': 'total',
      '小车': 1,
      '客车': 2,
      '货车': 3,
    };
    this.provinceSrv.searchCarAlertTable({id: this.provinceId, type: carTypes[this.carOptionType], page: e, nums: 10}).subscribe(
      (val) => {
        this.carTableData = val.data;
      }
    );
  }
  public closeCarShow(): void {
    document.body.className = '';
    this.alertCarShow = false;
  }
  public optionsCarPieClick(e) {
    this.router.navigate(['/home/city', {id: e.data.id, name: e.name}]);
  }
  public carBtnClick(e): void {
    if (e.srcElement.innerText === '小车') {
      this.alertCarTitle = '小车';
      this.arryCarPie = [];
      this.carTableData = [];
      this.carDistribution({name: e.srcElement.innerText });
    }  else if (e.srcElement.innerText === '客车') {
      this.alertCarTitle = '客车';
      this.arryCarPie = [];
      this.carTableData = [];
      this.carDistribution({name: e.srcElement.innerText });
    } else if (e.srcElement.innerText === '货车') {
      this.alertCarTitle = '货车';
      this.arryCarPie = [];
      this.carTableData = [];
      this.carDistribution({name: e.srcElement.innerText });
    } else if (e.srcElement.innerText === '总数') {
      this.alertCarTitle = '总数';
      this.arryCarPie = [];
      this.carTableData = [];
      this.carDistribution({name: e.srcElement.innerText });
    }
  }
  public carTableClick(e) {
    this.router.navigate(['/home/serzone', {id: e.serviceAreaId, name: e.serviceName}]);
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

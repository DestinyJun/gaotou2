import {Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges} from '@angular/core';
import {Router} from '@angular/router';
import {DatePipe} from '@angular/common';
import {ServiceDataService} from '../../../common/services/service-data.service';
import {environment} from '../../../../environments/environment';
import {LocalStorageService} from '../../../common/services/local-storage.service';
import { CountUpOptions } from 'countup.js';
@Component({
  selector: 'app-service-car',
  templateUrl: './service-car.component.html',
  styleUrls: ['./service-car.component.less']
})
export class ServiceCarComponent implements OnInit, OnChanges, OnDestroy {
  @Input() public serviceId: any;
  @Input() public serviceName: any;
  @Input() public esDate: any;  // 时间初始化
  /***********************基础信息************************/
  public vehicleAmountCountClean: any;
  public carNumber: number;
  public carNumberOption: CountUpOptions = {
    useGrouping: false,
    duration: 3,
    suffix: '<small style="color: white;font-size: 1rem;">辆</small>'
  };
  public carTimeSelect = [
    {name: '时', code: 'hour'},
    {name: '天', code: 'day'},
    {name: '周', code: 'week'},
    {name: '月', code: 'month'},
    {name: '年', code: 'year'},
  ];
  // 车辆监控
  public vehicleAmount: any = null;
  public optionsCarModel: any; // 车辆饼状图
  public alertCarShow = false;
  public carTableData: any;
  public carExcelShow = false;
  public carStartTime: Date; // 时间选择器
  public carEndTime: Date; // 时间选择器
  public carTimeTypes: any;
  constructor(
    private serviceSrv: ServiceDataService,
    private localService: LocalStorageService,
    private router: Router,
    private datePipe: DatePipe
  ) { }

  ngOnInit() {}
  ngOnChanges(changes: SimpleChanges): void {
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
  // 车辆监控及表格导出
  public vehicleAmountCount(): void {
    this.serviceSrv.searchCarTotal({id: this.serviceId}).subscribe(
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
    this.serviceSrv.searchCarTotalPie({id: this.serviceId}).subscribe(
      (value) => {
        if (value.status === '200') {
          if (this.serviceName === '久长服务区') {
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
    this.alertCarShow = true;
    this.localService.windowVideoShow.next(false);
    document.body.className = 'ui-overflow-hidden';
    this.carTimeTypes = 'hour';
    this.carDistribution(1, this.carTimeTypes);
  }
  public carSelectTime(event): void {
    this.carTimeTypes = event.code;
    // 表格
    this.carDistribution(1, this.carTimeTypes);
  }
  public carDistribution(e, time): void {
    // 表格
    this.serviceSrv.searchCarAlertTable({dateType: time, id: this.serviceId, page: e, nums: 10}).subscribe(
      (val) => {
        if (val.status === '200') {
          this.carTableData = val.data;
        }
      }
    );
  }
  public closeCarShow(): void {
    document.body.className = '';
    this.alertCarShow = false;
    this.localService.windowVideoShow.next(true);
  }
  public carExportClick() {
    const startTime = this.datePipe.transform(this.carStartTime, 'yyyyMMdd');
    const endTime = this.datePipe.transform(this.carEndTime, 'yyyyMMdd');
    if (this.carStartTime && this.carEndTime) {
      window.open(
        `${environment.urlc}/report/serviceArea/vihicle/1/startDate/${startTime}/endDate/${endTime}`
      );
    } else {
      window.alert('请把数据选择全在提交');
    }
  }
}

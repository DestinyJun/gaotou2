import {Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {Router} from '@angular/router';
import {CityDataService} from '../../../common/services/city-data.service';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-city-car',
  templateUrl: './city-car.component.html',
  styleUrls: ['./city-car.component.less']
})
export class CityCarComponent implements OnInit, OnChanges, OnDestroy {
  @Input() public cityId: any;
  @Input() public cityName: any;
  @Input() public esDate: any;  // 时间初始化
  /***********************基础信息************************/
  public vehicleAmountCountClean: any;
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
    private citySrv: CityDataService,
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
    }, 3000);
  }
  ngOnDestroy(): void {
    clearInterval(this.vehicleAmountCountClean);
  }
// 车流监控
  public vehicleAmountCount(): void {
    this.citySrv.searchCarTotal({id: this.cityId}).subscribe(
      (value) => {
        if (value.status === '200') {
          this.vehicleAmount = {
            number: value.data,
            units: '辆'
          };
        }
      }
    );
  }
  public CarTypes() {
    this.citySrv.searchCarTotalPie({id: this.cityId}).subscribe(
      (value) => {
        if (value.status === '200') {
          if (this.cityName === '贵州省') {
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
    this.citySrv.searchCarAlertTable({id: this.cityId, type: carTypes[this.carOptionType], page: 1, nums: 10}).subscribe(
      (val) => {
        this.carTableData = val.data;
      }
    );
    // 饼状图
    this.citySrv.searchCarAlertPie({id: this.cityId, type: carTypes[this.carOptionType]}).subscribe(
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
    this.citySrv.searchCarAlertTable({id: this.cityId, type: carTypes[this.carOptionType], page: e, nums: 10}).subscribe(
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
  // 格导出
  public carExportClick() {
    const startTime = this.datePipe.transform(this.carStartTime, 'yyyyMMdd');
    const endTime = this.datePipe.transform(this.carEndTime, 'yyyyMMdd');
    if (this.carStartTime && this.carEndTime) {
      window.location.assign(
        `http://120.78.137.182:8888/highway-interactive/report/city/vihicle/3/startDate/${startTime}/endDate/${endTime}`
      );
    } else {
      window.alert('请把数据选择全在提交');
    }
  }
}

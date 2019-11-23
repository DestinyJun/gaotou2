import {Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {Router} from '@angular/router';
import {DatePipe} from '@angular/common';
import { CountUpOptions } from 'countup.js';
import {CityDataService} from '../../../common/services/city-data.service';
import {environment} from '../../../../environments/environment';

@Component({
  selector: 'app-city-income',
  templateUrl: './city-income.component.html',
  styleUrls: ['./city-income.component.less']
})
export class CityIncomeComponent implements OnInit, OnChanges, OnDestroy {
  @Input() cityId: any;
  @Input() cityName: any;
  @Input() esDate: any;
  public incomeAmountCountClean: any;
  public incomeNumber: number;
  public incomeNumberOption: CountUpOptions = {
    useGrouping: false,
    duration: 3,
    suffix: '<small style="color: white;font-size: 1rem;">元</small>'
  };
  // 收入监控
  public incomeAmount: any;
  public optionsIncomeModel: any;
  public alertIncomeShow = false;
  public alertIncomeTitle = '';
  public optionsIncomeTypes = {};
  public IncomeTableData: any;
  public arryIncomePie = [];
  public IncomeOptionType: any;
  public incomeExcelShow = false;
  public incomeStartTime: Date; // 时间选择器
  public incomeEndTime: Date; // 时间选择器
  constructor(
    private router: Router,
    private datePipe: DatePipe,
    private citySrv: CityDataService,
  ) { }

  ngOnInit() {
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.incomeAmountCount();
    this.IncomeTypes();
    // 收入监控
    this.incomeAmountCountClean = setInterval(() => {
      this.incomeAmountCount();
      this.IncomeTypes();
    }, 5000);
  }
  ngOnDestroy(): void {
    clearInterval(this.incomeAmountCountClean);
  }
// 收入监控
  public incomeAmountCount(): void {
    this.citySrv.searchIncomeTotal({id: this.cityId}).subscribe(
      (value) => {
        if (value.status === '200') {
          this.incomeNumber = value.data;
          this.incomeAmount = {
            number: value.data,
            units: '元'
          };
        }
      }
    );
  }
  public IncomeTypes() {
    this.citySrv.searchIncomeTotalPie({id: this.cityId}).subscribe(
      (value) => {
        if (value.status === '200') {
          this.optionsIncomeModel = {
            data: value.data,
            title: '',
            total: '',
            color: ['#00CAE2', '#2307EF', '#4791D8', '#F86110', '#0096A4', '#F0B801']
          };
        }
      }
    );
  }
  public incomeDistribution(e): void {
    const incomeType = {
      '总收入': 'total',
      '小吃': 1,
      '中式快餐': 2,
      '西式快餐': 3,
      '商超': 4,
      '住宿': 5,
      '汽修': 6,
    };
    this.IncomeOptionType = e.name;
    // 表格
    this.citySrv.searchIncomeAlertTable({id: this.cityId, type: incomeType[e.name], page: 1, nums: 10}).subscribe(
      (val) => {
        if (val.status === '200') {
          this.IncomeTableData = val.data;
        }
      }
    );
    // 饼状图
    this.citySrv.searchIncomeAlertPie({id: this.cityId, type: incomeType[e.name]}).subscribe(
      (value) => {
        if (value.status === '200') {
          this.optionsIncomeTypes = {
            data: value.data,
            title: `贵州省各市所有服务区今日${e.name}占比统计`,
            total: '',
            color: ['#CE2D79', '#BDD139', '#78E77D', '#09D4D6', '#3C75B9',
              '#6769B1', '#FF8C9D', '#2796C4', '#E57D0D']
          };
        }
      }
    );
  }
  public incomeDistributionPaging(e): void {
    const incomeType = {
      '总收入': 'total',
      '小吃': 1,
      '中式快餐': 2,
      '西式快餐': 3,
      '商超': 4,
      '住宿': 5,
      '汽修': 6,
    };
    this.citySrv.searchIncomeAlertTable({id: this.cityId, type: incomeType[this.IncomeOptionType], page: e, nums: 10}).subscribe(
      (val) => {
        this.IncomeTableData = val.data;
      }
    );
  }
  // 收入类型相关操作
  public incomeClick(e): void {
    console.log(e);
    this.alertIncomeShow = true;
    this.alertIncomeTitle = e.name;
    document.body.className = 'ui-overflow-hidden';
    this.incomeDistribution(e);
  }
  public closeIncomeShow(): void {
    document.body.className = '';
    this.alertIncomeShow = false;
  }
  // 收入类型弹窗
  public optionsIncomePieClick(e) {
    this.router.navigate(['/home/serzone', {id: e.data.id, name: e.name}]);
  }
  public IncomeBtnClick(e): void {
    if (e.srcElement.innerText === '小吃') {
      this.alertIncomeTitle = '小吃';
      this.arryIncomePie = [];
      this.incomeDistribution({name: e.srcElement.innerText });
    } else if (e.srcElement.innerText === '中式快餐') {
      this.alertIncomeTitle = '中式快餐';
      this.arryIncomePie = [];
      this.incomeDistribution({name: e.srcElement.innerText });
    } else if (e.srcElement.innerText === '西式快餐') {
      this.alertIncomeTitle = '西式快餐';
      this.arryIncomePie = [];
      this.incomeDistribution({name: e.srcElement.innerText });
    } else if (e.srcElement.innerText === '商超') {
      this.alertIncomeTitle = '商超';
      this.arryIncomePie = [];
      this.incomeDistribution({name: e.srcElement.innerText });
    } else if (e.srcElement.innerText === '住宿') {
      this.alertIncomeTitle = '住宿';
      this.arryIncomePie = [];
      this.incomeDistribution({name: e.srcElement.innerText });
    } else if (e.srcElement.innerText === '汽修') {
      this.alertIncomeTitle = '汽修';
      this.arryIncomePie = [];
      this.incomeDistribution({name: e.srcElement.innerText });
    } else if (e.srcElement.innerText === '总收入') {
      this.alertIncomeTitle = '总收入';
      this.arryIncomePie = [];
      this.incomeDistribution({name: e.srcElement.innerText });
    }
  }
  public IncomeTableClick(e): void {
    this.router.navigate(['/home/serzone', {id: e.serviceArea.serviceAreaId, name: e.serviceArea.serviceName}]);
  }
  // 表格导出
  public incomeExportClick(): void {
    const startTime = this.datePipe.transform(this.incomeStartTime, 'yyyyMMdd');
    const endTime = this.datePipe.transform(this.incomeEndTime, 'yyyyMMdd');
    if (this.incomeStartTime && this.incomeEndTime) {
      window.open(
        `${environment.urlc}/report/province/revenue/2/startDate/${startTime}/endDate/${endTime}`
      );
    } else {
      window.alert('请把数据选择全在提交');
    }
  }
}

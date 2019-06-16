import {Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {Router} from '@angular/router';
import {DatePipe} from '@angular/common';
import {ServiceDataService} from '../../../common/services/service-data.service';

@Component({
  selector: 'app-service-manger-income',
  templateUrl: './service-manger-income.component.html',
  styleUrls: ['./service-manger-income.component.less']
})
export class ServiceMangerIncomeComponent implements OnInit, OnChanges, OnDestroy {
  @Input() serviceId: any;
  @Input() serviceName: any;
  @Input() esDate: any;
  public carTimeSelect = [
    {name: '时', code: 'hour'},
    {name: '天', code: 'day'},
    {name: '周', code: 'week'},
    {name: '月', code: 'month'},
    {name: '年', code: 'year'},
  ];
  public incomeAmountCountClean: any;
  // 收入监控
  public incomeAmount: any;
  public optionsIncomeModel: any;
  public alertIncomeShow = false;
  public alertIncomeTypeShow = false;
  public alertIncomeTypeTitle: string;
  public alertIncomeTitle = '收入总数';
  public IncomeTableData: any;
  public IncomeTimeTypes: any;
  public storeList: any;
  public arryIncomePie = [];
  public IncomeOptionType: any;
  public incomeExcelShow = false;
  public incomeStartTime: Date; // 时间选择器
  public incomeEndTime: Date; // 时间选择器
  public circleData = [
    {
      name: '住宿',
      value: 80
    },
    {
      name: '汽修',
      value: 120
    },
    {
      name: '小吃',
      value: 180
    },
    {
      name: '中式快餐',
      value: 220
    },
    {
      name: '西式快餐',
      value: 25
    },
    {
      name: '商超',
      value: 255
    }];
  public barData = [
    {
      name: '商超',
      type: 'bar',
      stack: '上行',
      data: [
        {name: '上行', value: 120},
        {name: '上行', value: 132},
        {name: '上行', value: 101},
        {name: '上行', value: 134},
        {name: '上行', value: 90},
        {name: '上行', value: 230},
        {name: '上行', value: 210},
      ]
    },
    {
      name: '中式快餐',
      type: 'bar',
      stack: '上行',
      data: [
        {name: '上行', value: 220},
        {name: '上行', value: 182},
        {name: '上行', value: 191},
        {name: '上行', value: 234},
        {name: '上行', value: 290},
        {name: '上行', value: 330},
        {name: '上行', value: 310},
      ]
    },
    {
      name: '西式快餐',
      type: 'bar',
      stack: '上行',
      data: [
        {name: '上行', value: 150},
        {name: '上行', value: 232},
        {name: '上行', value: 201},
        {name: '上行', value: 154},
        {name: '上行', value: 190},
        {name: '上行', value: 330},
        {name: '上行', value: 410},
      ]
    },
    {
      name: '小吃',
      type: 'bar',
      stack: '上行',
      data: [
        {name: '上行', value: 150},
        {name: '上行', value: 232},
        {name: '上行', value: 201},
        {name: '上行', value: 154},
        {name: '上行', value: 190},
        {name: '上行', value: 330},
        {name: '上行', value: 410},
      ]
    },
    {
      name: '住宿',
      type: 'bar',
      stack: '上行',
      data: [
        {name: '上行', value: 150},
        {name: '上行', value: 232},
        {name: '上行', value: 201},
        {name: '上行', value: 154},
        {name: '上行', value: 190},
        {name: '上行', value: 330},
        {name: '上行', value: 410},
      ]
    },
    {
      name: '汽修',
      type: 'bar',
      stack: '上行',
      data: [
        {name: '上行', value: 150},
        {name: '上行', value: 232},
        {name: '上行', value: 201},
        {name: '上行', value: 154},
        {name: '上行', value: 190},
        {name: '上行', value: 330},
        {name: '上行', value: 410},
      ]
    },
    {
      name: '商超',
      type: 'bar',
      stack: '下行',
      data: [
        {name: '下行', value: 120},
        {name: '下行', value: 132},
        {name: '下行', value: 101},
        {name: '下行', value: 134},
        {name: '下行', value: 90},
        {name: '下行', value: 230},
        {name: '下行', value: 210},
      ]
    },
    {
      name: '中式快餐',
      type: 'bar',
      stack: '下行',
      data: [
        {name: '下行', value: 220},
        {name: '下行', value: 182},
        {name: '下行', value: 191},
        {name: '下行', value: 234},
        {name: '下行', value: 290},
        {name: '下行', value: 330},
        {name: '下行', value: 310},
      ]
    },
    {
      name: '西式快餐',
      type: 'bar',
      stack: '下行',
      data: [
        {name: '下行', value: 150},
        {name: '下行', value: 232},
        {name: '下行', value: 201},
        {name: '下行', value: 154},
        {name: '下行', value: 190},
        {name: '下行', value: 330},
        {name: '下行', value: 410},
      ]
    },
    {
      name: '小吃',
      type: 'bar',
      stack: '下行',
      data: [
        {name: '下行', value: 150},
        {name: '下行', value: 232},
        {name: '下行', value: 201},
        {name: '下行', value: 154},
        {name: '下行', value: 190},
        {name: '下行', value: 330},
        {name: '下行', value: 410},
      ]
    },
    {
      name: '住宿',
      type: 'bar',
      stack: '下行',
      data: [
        {name: '下行', value: 150},
        {name: '下行', value: 232},
        {name: '下行', value: 201},
        {name: '下行', value: 154},
        {name: '下行', value: 190},
        {name: '下行', value: 330},
        {name: '下行', value: 410},
      ]
    },
    {
      name: '汽修',
      type: 'bar',
      stack: '下行',
      data: [
        {name: '下行', value: 150},
        {name: '下行', value: 232},
        {name: '下行', value: 201},
        {name: '下行', value: 154},
        {name: '下行', value: 190},
        {name: '下行', value: 330},
        {name: '下行', value: 410},
      ]
    },
  ];
  constructor(
    private serviceSrv: ServiceDataService,
    private router: Router,
    private datePipe: DatePipe,
  ) { }

  ngOnInit() {
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.getIncomeTotalTypes();
    this.incomeAmountCount();
    this.IncomeTypes();
    // 收入监控
    this.incomeAmountCountClean = setInterval(() => {
      this.incomeAmountCount();
      this.IncomeTypes();
    }, 3000);
  }
  ngOnDestroy(): void {
    clearInterval(this.incomeAmountCountClean);
  }
  // 收入监控
  public incomeAmountCount(): void {
    this.serviceSrv.searchIncomeTotal({id: this.serviceId}).subscribe(
      (value) => {
        if (value.status === '200') {
          this.incomeAmount = {
            number: value.data,
            units: '元'
          };
        }
      }
    );
  }
  public IncomeTypes() {
    this.serviceSrv.searchIncomeTotalPie({id: this.serviceId}).subscribe(
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
  public incomeClick(e): void {
    this.alertIncomeTypeShow = true;
    this.alertIncomeShow = true;
    document.body.className = 'ui-overflow-hidden';
    this.alertIncomeTitle = e.name;
    this.alertIncomeTypeTitle = e.name;
    this.IncomeTimeTypes = 'hour';
    this.getIncomeTypesSingle(1, this.alertIncomeTitle, this.storeList, this.IncomeTimeTypes);
  }
  public getIncomeTotalTypes(): void {
    this.serviceSrv.searchIncomeTypes({id: this.serviceId}).subscribe(
      (value) => {
        if (value.status === '200') {
          this.storeList = value.data;
        }
      }
    );
  }
  public getIncomeTotal(time, pageNums): void {
    this.serviceSrv.searchIncomeTypesList({dateType: time, id: this.serviceId, page: pageNums, nums: 15}).subscribe(
      (incomeVal) => {
        if (incomeVal.status === '200') {
          this.IncomeTableData = incomeVal.data;
        }
      }
    );
  }
  public getIncomeTypesSingle(pageNums, item, storeList, time): void {
    const shopType = {
      '小吃': {
        'sequence': 1,
        'entryCode': '1'
      },
      '中式快餐': {
        'sequence': 2,
        'entryCode': '2',
      },
      '西式快餐': {
        'sequence': 3,
        'entryCode': '3',
      },
      '商超': {
        'sequence': 4,
        'entryCode': '4',
      },
      '住宿': {
        'sequence': 5,
        'entryCode': '5',
      },
      '汽修': {
        'sequence': 6,
        'entryCode': '6',
      },
    };
    this.IncomeOptionType = item;
    const shopList = storeList.filter((prop, index) => {
      return prop.entryCode === shopType[this.IncomeOptionType].entryCode;
    });
    if (shopList) {
      this.serviceSrv.searchIncomeTypesItem(
        {dateType: time, id: this.serviceId, entryCode: shopType[this.IncomeOptionType].entryCode, page: pageNums, nums: 10}).subscribe(
        (value) => {
          if (value.status === '200') {
            this.IncomeTableData = value.data;
          }
        }
      );
    }
  }
  public IncomeSelectTime(event): void {
    this.IncomeTimeTypes = event.code;
    if (!this.alertIncomeTypeShow) {
      this.getIncomeTotal(this.IncomeTimeTypes, 1);
      return;
    }
    this.getIncomeTypesSingle(1, this.alertIncomeTitle, this.storeList, this.IncomeTimeTypes);
  }
  public getIncomeTypesSinglePaging(page, item, storeList, time): void {
    if (!this.alertIncomeTypeShow) {
      this.getIncomeTotal(time, page);
      return;
    }
    this.getIncomeTypesSingle(page, item, storeList, time);
  }
  public closeIncomeShow(): void {
    document.body.className = '';
    this.alertIncomeShow = false;
  }
  public IncomeBtnClick(e): void {
    if (e.srcElement.innerText === '收入总数') {
      this.alertIncomeTitle = '收入总数';
      this.alertIncomeTypeShow = false;
      this.arryIncomePie = [];
      this.getIncomeTotal(this.IncomeTimeTypes, 1);
    } else if (e.srcElement.innerText === '小吃') {
      this.alertIncomeTitle = '小吃';
      this.alertIncomeTypeTitle = '小吃';
      this.alertIncomeTypeShow = true;
      this.arryIncomePie = [];
      this.getIncomeTypesSingle(1, e.srcElement.innerText, this.storeList, this.IncomeTimeTypes);
    } else if (e.srcElement.innerText === '中式快餐') {
      this.alertIncomeTitle = '中式快餐';
      this.alertIncomeTypeTitle = '中式快餐';
      this.alertIncomeTypeShow = true;
      this.arryIncomePie = [];
      this.getIncomeTypesSingle(1, e.srcElement.innerText, this.storeList, this.IncomeTimeTypes);
    } else if (e.srcElement.innerText === '西式快餐') {
      this.alertIncomeTitle = '西式快餐';
      this.alertIncomeTypeTitle = '西式快餐';
      this.alertIncomeTypeShow = true;
      this.arryIncomePie = [];
      this.getIncomeTypesSingle(1, e.srcElement.innerText, this.storeList, this.IncomeTimeTypes);
    } else if (e.srcElement.innerText === '商超') {
      this.alertIncomeTitle = '商超';
      this.alertIncomeTypeTitle = '商超';
      this.alertIncomeTypeShow = true;
      this.arryIncomePie = [];
      this.getIncomeTypesSingle(1, e.srcElement.innerText, this.storeList, this.IncomeTimeTypes);
    } else if (e.srcElement.innerText === '住宿') {
      this.alertIncomeTitle = '住宿';
      this.alertIncomeTypeTitle = '住宿';
      this.alertIncomeTypeShow = true;
      this.arryIncomePie = [];
      this.getIncomeTypesSingle(1, e.srcElement.innerText, this.storeList, this.IncomeTimeTypes);
    } else if (e.srcElement.innerText === '汽修') {
      this.alertIncomeTitle = '汽修';
      this.alertIncomeTypeTitle = '汽修';
      this.alertIncomeTypeShow = true;
      this.arryIncomePie = [];
      this.getIncomeTypesSingle(1, e.srcElement.innerText, this.storeList, this.IncomeTimeTypes);
    }
  }
  public incomeExportClick() {
    const startTime = this.datePipe.transform(this.incomeStartTime, 'yyyyMMdd');
    const endTime = this.datePipe.transform(this.incomeEndTime, 'yyyyMMdd');
    if (this.incomeStartTime && this.incomeEndTime) {
      window.open(`http://120.78.137.182:8888/highway-interactive/report/serviceArea/revenue/1/startDate/${startTime}/endDate/${endTime}`);
    } else {
      window.alert('请把数据选择全在提交');
    }
  }
}

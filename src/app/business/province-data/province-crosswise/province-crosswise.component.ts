import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {FinanceDataService} from '../../../common/services/finance-data.service';

@Component({
  selector: 'app-province-crosswise',
  templateUrl: './province-crosswise.component.html',
  styleUrls: ['./province-crosswise.component.less']
})
export class ProvinceCrosswiseComponent implements OnInit, OnChanges {
  @Input() provinceId: any;
  @Input() provinceName: any;
  // 全国业态经营数据前十排名
  public crosswiseBar = {};
  public barStatus1 = true;
  public barStatus2 = false;
  public barStatus3 = false;
  public dataStatus = '业态收入/万元';
  constructor(
    private provinceSrv: FinanceDataService,
  ) { }

  ngOnInit() {}
  ngOnChanges(changes: SimpleChanges): void {
    // 业态经营数据前十排名
    this.backCrosswiseBar('revenue');
  }
  // 业态经营数据前十排名相关操作
  public backCrosswiseBar(type): void {
    this.provinceSrv.searchTop10Bar({id: this.provinceId, type: type}).subscribe(
      (value) => {
        if (value.status === '200') {
          // 这里是排序算法
          value.data.barDatas.map((val, index, obj) => {
            if (val.titleCode === type) {
              obj.unshift(val);
              obj.splice(index + 1, 1);
            }
          });
          this.crosswiseBar = {
            data: value.data,
            color: ['#2307EF', '#3B78B1', '#04A6BB']
          };
        }
      }
    );
  }
  public clickBtn(e): void {
    const types = ['revenue', 'vehicle', 'passenger'];
    if (e.srcElement.innerText === '业态收入/万元') {
      this.dataStatus = '业态收入/万元';
      this.barStatus1 = true;
      this.barStatus2 = false;
      this.barStatus3 = false;
      this.backCrosswiseBar(types[0]);
    } else if (e.srcElement.innerText === '车流量/辆') {
      this.dataStatus = '车流量/辆';
      this.barStatus1 = false;
      this.barStatus2 = true;
      this.barStatus3 = false;
      this.backCrosswiseBar(types[1]);
    } else {
      this.dataStatus = '客流量/人次';
      this.barStatus1 = false;
      this.barStatus2 = false;
      this.barStatus3 = true;
      this.backCrosswiseBar(types[2]);
    }
  }
}

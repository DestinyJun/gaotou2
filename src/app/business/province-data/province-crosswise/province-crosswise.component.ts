import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {FinanceDataService} from '../../../common/services/finance-data.service';

@Component({
  selector: 'app-province-crosswise',
  templateUrl: './province-crosswise.component.html',
  styleUrls: ['./province-crosswise.component.less']
})
export class ProvinceCrosswiseComponent implements OnInit, OnDestroy {
  @Input() provinceId: any;
  @Input() provinceName: any;
  public provinceTimer: any;
  public provinceTypes = ['revenue', 'vehicle', 'passenger'];
  public provinceColor = ['#22C2F0', '#4AE2D5', '#CB427B'];
  public provinceTitle = ['业态收入排名', '车流量排名', '客流量排名'];
  public provinceNumber = 0;
  // 全国业态经营数据前十排名
  public crosswiseBar: any;
  public barStatus1 = true;
  public barStatus2 = false;
  public barStatus3 = false;
  public dataStatus = '业态收入/万元';
  public crosswiseTitleDialog = false;
  // scatter
  public crosswiseScatterMapColor = ['#FFC38B', '#4BA0D0', '#5CC3B4', '#FF745F', '#7A0087'];
  public crosswiseScatterTitleText: any = '省级服务区收入综合能耗关系统计';
  public crosswiseScatterYAxisName: any = '客流：单位(人/次)';
  public crosswiseScatterTooltipY: any = '客流总数';
  constructor(
    private provinceSrv: FinanceDataService,
  ) { }

  ngOnInit() {
    // 业态经营数据前十排名
    this.backCrosswiseBar('revenue');
    this.provinceNumber = 1;
    this.provinceTimer = setInterval(() => {
      this.backCrosswiseBar(this.provinceTypes[this.provinceNumber]);
      this.provinceNumber++;
      if (this.provinceNumber === 3) {
        this.provinceNumber = 0;
      }
    }, 8000);
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
          value.data.barDatas = [value.data.barDatas[0]];
          this.crosswiseBar = {
            data: value.data,
            color: [this.provinceColor[this.provinceNumber]],
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
  // title click
  public provinceDialogOpen(event): void {
    this.crosswiseTitleDialog = true;
  }
  public provinceDialogClose(event): void {
    this.crosswiseTitleDialog = false;
  }
  ngOnDestroy(): void {
    clearInterval(this.provinceTimer);
  }
}

import {Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {CityDataService} from '../../../common/services/city-data.service';

@Component({
  selector: 'app-city-crosswise',
  templateUrl: './city-crosswise.component.html',
  styleUrls: ['./city-crosswise.component.less']
})
export class CityCrosswiseComponent implements OnInit, OnChanges, OnDestroy {
  @Input() cityId: any;
  @Input() cityName: any;
  public cityTimer: any;
  public cityTypes = ['revenue', 'vehicle', 'passenger'];
  public cityColor = ['#22C2F0', '#4AE2D5', '#CB427B'];
  public cityTitle = ['业态收入排名', '车流量排名', '客流量排名'];
  public cityNumber = 0;
  // 全国业态经营数据前十排名
  public crosswiseBar: any;
  public barStatus1 = true;
  public barStatus2 = false;
  public barStatus3 = false;
  public dataStatus = '业态收入/万元';
  public cityDialogShow = false;
  // scatter
  public crosswiseScatterMapColor = ['#FFC38B', '#4BA0D0', '#5CC3B4', '#FF745F', '#7A0087'];
  public crosswiseScatterTitleText: any = '市级服务区收入综合能耗关系统计';
  public crosswiseScatterYAxisName: any = '客流：单位(人/次)';
  public crosswiseScatterTooltipY: any = '客流总数';
  constructor(
    private citySrv: CityDataService,
  ) { }

  ngOnInit() {
    // 业态经营数据前十排名
    this.backCrosswiseBar('revenue');
    this.cityNumber = 1;
    this.cityTimer = setInterval(() => {
      this.backCrosswiseBar(this.cityTypes[this.cityNumber]);
      this.cityNumber++;
      if (this.cityNumber === 3) {
        this.cityNumber = 0;
      }
    }, 8000);
  }
  ngOnChanges(changes: SimpleChanges): void {
    // 业态经营数据前十排名
    this.backCrosswiseBar('revenue');
  }
  // 业态经营数据前十排名相关操作
  public backCrosswiseBar(type): void {
    this.citySrv.searchTop10Bar({id: this.cityId, type: type}).subscribe(
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
            color: [this.cityColor[this.cityNumber]],
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
  public cityDialogOpen(event): void {
    this.cityDialogShow = true;
  }
  public cityDialogClose(event): void {
    this.cityDialogShow = false;
  }
  ngOnDestroy(): void {
    clearInterval(this.cityTimer);
  }
}

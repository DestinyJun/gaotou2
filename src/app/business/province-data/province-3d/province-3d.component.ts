import {Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {Router} from '@angular/router';
import {FinanceDataService} from '../../../common/services/finance-data.service';
import {LocalStorageService} from '../../../common/services/local-storage.service';

@Component({
  selector: 'app-province-3d',
  templateUrl: './province-3d.component.html',
  styleUrls: ['./province-3d.component.less']
})
export class Province3dComponent implements OnInit, OnChanges, OnDestroy {
  @Input() public provinceName: any;
  @Input() public personAmount: any;
  public persons: any;
  public personNumber = 1;
  public personTitle = '全国';
  constructor(
    private router: Router,
    private financeDataService: FinanceDataService,
    private localService: LocalStorageService,
  ) { }

  ngOnInit() {
    // 客流
   /* this.localService.persons.subscribe((value) => {
      if (this.personNumber === 1) {
        this.persons = value.province;
        this.personNumber = 2;
        this.personTitle = '全国';
      } else {
        this.persons = value.city;
        this.personNumber = 1;
        this.personTitle = '贵州省';
      }
    });*/
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (this.personAmount) {
      this.persons = this.personAmount;
    }
  }
  public personShow() {
    this.localService.personsShow.next(true);
  }
  ngOnDestroy(): void {}
}

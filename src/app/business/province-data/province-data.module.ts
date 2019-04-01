import { NgModule } from '@angular/core';
import {CommonModule, DatePipe} from '@angular/common';
import {SharedModule} from '../../common/shared.module';
import {ProvinceDataRoutingModule} from './province-data.routing.module';
import { ProvinceDataComponent } from './province-data.component';
import {FormsModule} from '@angular/forms';
import {EchartsLineBrokenModule, InputDropdownModule, PagingModule, WenjunAlertModule} from '../../common/wenjun';
import { FinanceDataService } from '../../common/services/finance-data.service';
import {CalendarModule, ScrollPanelModule} from 'primeng/primeng';
import {DataService} from '../../common/services/data.service';
import {InputDropdownDayModule} from '../../common/wenjun/input-dropdown-day/input-dropdown-day.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ProvinceDataRoutingModule,
    SharedModule,
    WenjunAlertModule,
    CalendarModule,
    ScrollPanelModule,
    PagingModule,
    InputDropdownModule,
    EchartsLineBrokenModule,
    InputDropdownDayModule
  ],
  declarations: [ProvinceDataComponent],
  entryComponents: [],
  providers: [FinanceDataService, DataService, DatePipe]
})
export class ProvinceDataModule { }

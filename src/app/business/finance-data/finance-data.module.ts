import { NgModule } from '@angular/core';
import {CommonModule, DatePipe} from '@angular/common';
import {SharedModule} from '../../common/shared.module';
import {FinanceDataRoutingModule} from './finance-data.routing.module';
import { FinanceDataComponent } from './finance-data.component';
import {FormsModule} from '@angular/forms';
import {PagingModule, WenjunAlertModule} from '../../common/wenjun';
import { FinanceDataService } from '../../common/services/finance-data.service';
import {CalendarModule, ScrollPanelModule} from 'primeng/primeng';
import {DataService} from '../../common/services/data.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    FinanceDataRoutingModule,
    SharedModule,
    WenjunAlertModule,
    CalendarModule,
    ScrollPanelModule,
    PagingModule
  ],
  declarations: [FinanceDataComponent],
  entryComponents: [],
  providers: [FinanceDataService, DataService, DatePipe]
})
export class FinanceDataModule { }

import { NgModule } from '@angular/core';
import {CommonModule, DatePipe} from '@angular/common';
import {SharedModule} from '../../common/shared.module';
import {ProvinceDataRoutingModule} from './province-data.routing.module';
import { ProvinceDataComponent } from './province-data.component';
import {FormsModule} from '@angular/forms';
import {EchartsLineBrokenModule, InputDropdownModule, PagingModule, WenjunAlertModule} from '../../common/wenjun';
import {CalendarModule, ScrollPanelModule} from 'primeng/primeng';
import {InputDropdownDayModule} from '../../common/wenjun/input-dropdown-day/input-dropdown-day.module';
import { Province3dComponent } from './province-3d/province-3d.component';
import { ProvinceCarComponent } from './province-car/province-car.component';
import { ProvinceIncomeComponent } from './province-income/province-income.component';
import { ProvinceCrosswiseComponent } from './province-crosswise/province-crosswise.component';
import {EchartsBarDoubleModule} from '../../common/components/echart-bar-double/echarts-bar-double.module';
import {EchartBarDoubleAModule} from '../../common/components/echart-bar-double-a/echart-bar-double-a.module';
import {EchartPieCircleAModule} from '../../common/components/echart-pie-circle-a/echart-pie-circle-a.module';
import {EchartsScatterAModule} from 'app/common/components/echarts-scatter-a/echarts-scatter-a.module';
import {GtDialogAModule} from '../../common/components/gt-dialog-a/gt-dialog-a.module';
import { CountUpModule } from 'countup.js-angular2';
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
    InputDropdownDayModule,
    EchartsBarDoubleModule,
    EchartBarDoubleAModule,
    EchartPieCircleAModule,
    EchartsScatterAModule,
    GtDialogAModule,
    CountUpModule
  ],
  declarations: [
    ProvinceDataComponent,
    Province3dComponent,
    ProvinceCarComponent,
    ProvinceIncomeComponent,
    ProvinceCrosswiseComponent,
  ],
  entryComponents: [],
  providers: [DatePipe]
})
export class ProvinceDataModule { }

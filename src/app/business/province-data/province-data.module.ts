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
import {InputDropdownDayModule} from '../../common/components/input-dropdown-day/input-dropdown-day.module';
import { Province3dComponent } from './province-3d/province-3d.component';
import { ProvinceCarComponent } from './province-car/province-car.component';
// import { ProvinceMapComponent } from './province-map/province-map.component';
import { ProvinceIncomeComponent } from './province-income/province-income.component';
// import { ProvinceEventComponent } from './province-event/province-event.component';
import { ProvinceCrosswiseComponent } from './province-crosswise/province-crosswise.component';
import { ProvinceEvnstatComponent } from './province-evnstat/province-evnstat.component';
import { ProvinceEvnofficeComponent } from './province-evnoffice/province-evnoffice.component';
import { ProvinceEvnpersonComponent } from './province-evnperson/province-evnperson.component';
import {EchartsBarDoubleModule} from '../../common/components/echarts-bar-double/echarts-bar-double.module';
import {EchartPieCircleAModule} from '../../common/components/echart-pie-circle-a/echart-pie-circle-a.module';
import {GtDialogAModule} from '../../common/components/gt-dialog-a/gt-dialog-a.module';
import {EchartsScatterAModule} from '../../common/components/echarts-scatter-a/echarts-scatter-a.module';

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
    EchartPieCircleAModule,
    GtDialogAModule,
    EchartsScatterAModule
  ],
  declarations: [
    ProvinceDataComponent,
    Province3dComponent,
    ProvinceCarComponent,
    // ProvinceMapComponent,
    ProvinceIncomeComponent,
    // ProvinceEventComponent,
    ProvinceCrosswiseComponent,
    ProvinceEvnstatComponent,
    ProvinceEvnofficeComponent,
    ProvinceEvnpersonComponent
  ],
  entryComponents: [],
  providers: [FinanceDataService, DataService, DatePipe]
})
export class ProvinceDataModule { }

import { NgModule } from '@angular/core';
import {CommonModule, DatePipe} from '@angular/common';
import {SharedModule} from '../../common/shared.module';
import { CityDataComponent } from './city-data.component';
import {CityDataRoutingModule} from './city-data.routing.module';
import {PagingModule, WenjunAlertModule} from '../../common/wenjun';
import { CityDataService } from '../../common/services/city-data.service';
import {CalendarModule, ScrollPanelModule} from 'primeng/primeng';
import {FormsModule} from '@angular/forms';
import {City3dComponent} from './city-3d/city-3d.component';
import {CityCarComponent} from './city-car/city-car.component';
import {CityCrosswiseComponent} from './city-crosswise/city-crosswise.component';
import {CityIncomeComponent} from './city-income/city-income.component';
import {EchartsBarDoubleModule} from '../../common/components/echart-bar-double/echarts-bar-double.module';
import {EchartPieCircleAModule} from '../../common/components/echart-pie-circle-a/echart-pie-circle-a.module';
import {GtDialogAModule} from '../../common/components/gt-dialog-a/gt-dialog-a.module';
import {EchartsScatterAModule} from '../../common/components/echarts-scatter-a/echarts-scatter-a.module';
import { CountUpModule } from 'countup.js-angular2';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    CityDataRoutingModule,
    SharedModule,
    WenjunAlertModule,
    CalendarModule,
    ScrollPanelModule,
    PagingModule,
    EchartsBarDoubleModule,
    EchartPieCircleAModule,
    GtDialogAModule,
    EchartsScatterAModule,
    CountUpModule
  ],
  declarations: [
    CityDataComponent,
    City3dComponent,
    CityCarComponent,
    CityCrosswiseComponent,
    CityIncomeComponent,
  ],
  providers: [CityDataService, DatePipe]
})
export class CityDataModule { }

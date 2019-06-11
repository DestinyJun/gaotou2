import { NgModule } from '@angular/core';
import {CommonModule, DatePipe} from '@angular/common';
import {SharedModule} from '../../common/shared.module';
import { ServiceDataComponent } from './service-data.component';
import {ServiceDataRoutingModule} from './service-data.routing.module';
import { ServiceDataService } from '../../common/services/service-data.service';
import {CalendarModule, ScrollPanelModule, DropdownModule} from 'primeng/primeng';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {DataService} from '../../common/services/data.service';
import {ButtonModule} from 'primeng/button';
import {EchartLineAreaModule, InputDropdownModule, PagingModule} from '../../common/wenjun';
import {ImageZoomModule} from '../../common/components/image-zoom/image-zoom.module';
import {Service3dComponent} from './service-3d/service-3d.component';
import {ServiceCarComponent} from './service-car/service-car.component';
import {ServiceIncomeComponent} from './service-income/service-income.component';
import { ServiceInfoComponent } from './service-info/service-info.component';
import { ServiceEvnReportComponent } from './service-evn-report/service-evn-report.component';
import { ServiceToiletComponent } from './service-toilet/service-toilet.component';
import { ServiceEvnDealComponent } from './service-evn-deal/service-evn-deal.component';
import { ServiceUpattrComponent } from './service-upattr/service-upattr.component';
import { ServiceDownattrComponent } from './service-downattr/service-downattr.component';
import {EchartsLineBrokenModule} from '../../common/components/echart-line-broken/echarts-line-broken.module';
import {EchartPieCircleAModule} from '../../common/components/echart-pie-circle-a/echart-pie-circle-a.module';
import {EchartsScatterAModule} from '../../common/components/echarts-scatter-a/echarts-scatter-a.module';
import {GtDialogAModule} from '../../common/components/gt-dialog-a/gt-dialog-a.module';
import {EchartsBarDoubleModule} from '../../common/components/echart-bar-double/echarts-bar-double.module';
import {EchartBarDoubleAModule} from '../../common/components/echart-bar-double-a/echart-bar-double-a.module';
@NgModule({
  imports: [
    CommonModule,
    ServiceDataRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    CalendarModule,
    ScrollPanelModule,
    ButtonModule,
    EchartsLineBrokenModule,
    EchartLineAreaModule,
    ImageZoomModule,
    PagingModule,
    InputDropdownModule,
    DropdownModule,
    EchartsBarDoubleModule,
    EchartPieCircleAModule,
    EchartsScatterAModule,
    GtDialogAModule,
    EchartBarDoubleAModule
  ],
  declarations: [
    ServiceDataComponent,
    Service3dComponent,
    ServiceCarComponent,
    ServiceIncomeComponent,
    ServiceInfoComponent,
    ServiceEvnReportComponent,
    ServiceToiletComponent,
    ServiceEvnDealComponent,
    ServiceUpattrComponent,
    ServiceDownattrComponent
  ],
  providers: [ServiceDataService, DataService, DatePipe]
})
export class ServiceDataModule { }

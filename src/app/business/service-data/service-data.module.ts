import { NgModule } from '@angular/core';
import {CommonModule, DatePipe} from '@angular/common';
import {SharedModule} from '../../common/shared.module';
import { ServiceDataComponent } from './service-data.component';
import {ServiceDataRoutingModule} from './service-data.routing.module';
import { ServiceDataService } from '../../common/services/service-data.service';
import {CalendarModule, ScrollPanelModule, DropdownModule} from 'primeng/primeng';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ButtonModule} from 'primeng/button';
import {EchartLineAreaModule, EchartsLineBrokenModule, InputDropdownModule, PagingModule} from '../../common/wenjun';
import {ImageZoomModule} from '../../common/components/image-zoom/image-zoom.module';
import {Service3dComponent} from './service-3d/service-3d.component';
import {ServiceCarComponent} from './service-car/service-car.component';
import {ServiceIncomeComponent} from './service-income/service-income.component';
import { ServiceInfoComponent } from './service-info/service-info.component';
import { ServiceUpattrComponent } from './service-upattr/service-upattr.component';
import { ServiceDownattrComponent } from './service-downattr/service-downattr.component';
import {EchartsBarDoubleModule} from '../../common/components/echart-bar-double/echarts-bar-double.module';
import {EchartPieCircleAModule} from 'app/common/components/echart-pie-circle-a/echart-pie-circle-a.module';
import {CountUpModule} from 'countup.js-angular2';

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
    CountUpModule
  ],
  declarations: [
    ServiceDataComponent,
    Service3dComponent,
    ServiceCarComponent,
    ServiceIncomeComponent,
    ServiceInfoComponent,
    ServiceUpattrComponent,
    ServiceDownattrComponent
  ],
  providers: [ServiceDataService, DatePipe]
})
export class ServiceDataModule { }

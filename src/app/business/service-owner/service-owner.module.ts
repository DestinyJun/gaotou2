import { NgModule } from '@angular/core';
import {CommonModule, DatePipe} from '@angular/common';

import { ServiceOwnerRoutingModule } from './service-owner-routing.module';
import { ServiceOwnerComponent } from './service-owner.component';
import {ServiceOwner3dComponent} from './service-owner-3d/service-owner-3d.component';
import {SharedModule} from '../../common/shared.module';
import {ServiceDataService} from '../../common/services/service-data.service';
import {DataService} from '../../common/services/data.service';
import {EchartsLineBrokenModule} from '../../common/components/echart-line-broken/echarts-line-broken.module';
import {CalendarModule, DropdownModule, ScrollPanelModule} from 'primeng/primeng';
import {FormsModule} from '@angular/forms';
import {ServiceOwnerCarComponent} from './service-owner-car/service-owner-car.component';
import {EchartBarDoubleAModule} from '../../common/components/echart-bar-double-a/echart-bar-double-a.module';
import {EchartPieCircleBModule} from '../../common/components/echart-pie-circle-b/echart-pie-circle-b.module';
import {ServiceOwnerUpattrComponent} from './service-owner-upattr/service-owner-upattr.component';
import {ImageZoomModule} from '../../common/components/image-zoom/image-zoom.module';
import {InputDropdownModule} from '../../common/components/input-dropdown/input-dropdown.module';
import {EchartLineAreaModule} from '../../common/components/echart-line-area/echart-line-area.module';
import {ServiceOwnerDownattrComponent} from './service-owner-downattr/service-owner-downattr.component';
import {EchartsBarDoubleModule} from '../../common/components/echart-bar-double/echarts-bar-double.module';
import {EchartPieCircleAModule} from '../../common/components/echart-pie-circle-a/echart-pie-circle-a.module';
import {ServiceOwnerIncomeComponent} from './service-owner-income/service-owner-income.component';
import {ServiceOwnerInfoComponent} from './service-owner-info/service-owner-info.component';

@NgModule({
  imports: [
    CommonModule,
    ServiceOwnerRoutingModule,
    SharedModule,
    FormsModule,
    EchartsLineBrokenModule,
    CalendarModule,
    DropdownModule,
    EchartBarDoubleAModule,
    EchartPieCircleBModule,
    ImageZoomModule,
    InputDropdownModule,
    EchartLineAreaModule,
    EchartsBarDoubleModule,
    EchartPieCircleAModule,
    ScrollPanelModule,
  ],
  declarations: [
    ServiceOwnerComponent,
    ServiceOwner3dComponent,
    ServiceOwnerCarComponent,
    ServiceOwnerUpattrComponent,
    ServiceOwnerDownattrComponent,
    ServiceOwnerIncomeComponent,
    ServiceOwnerInfoComponent
  ],
  providers: [
    ServiceDataService,
    DataService,
    DatePipe
  ]
})
export class ServiceOwnerModule { }

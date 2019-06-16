import { NgModule } from '@angular/core';
import {CommonModule, DatePipe} from '@angular/common';
import { ServiceMangerComponent } from './service-manger.component';
import {ServiceMangerRoutingModule} from './service-manger.routing.module';
import {WarningEventListModule} from '../../common/components/warning-event-list/warning-event-list.module';
import {ServiceMangerUpattrComponent} from './service-manger-upattr/service-manger-upattr.component';
import {ServiceDataService} from '../../common/services/service-data.service';
import {DataService} from '../../common/services/data.service';
import { ServiceMangerVideoComponent } from './service-manger-video/service-manger-video.component';
import {EchartPieCircleAModule} from '../../common/components/echart-pie-circle-a/echart-pie-circle-a.module';
import {ButtonModule} from 'primeng/button';
import {EchartGaugeAModule} from '../../common/components/echart-gauge-a/echart-gauge-a.module';
import {EchartGaugeBModule} from '../../common/components/echart-gauge-b/echart-gauge-b.module';
import {ServiceMangerIncomeComponent} from './service-manger-income/service-manger-income.component';
import {SharedModule} from '../../common/shared.module';
import {EchartBarDoubleAModule} from '../../common/components/echart-bar-double-a/echart-bar-double-a.module';
import {EchartPieCircleBModule} from '../../common/components/echart-pie-circle-b/echart-pie-circle-b.module';
import {CalendarModule} from 'primeng/primeng';
import {ServiceMangerCarComponent} from './service-manger-car/service-manger-car.component';

@NgModule({
  imports: [
    CommonModule,
    ServiceMangerRoutingModule,
    WarningEventListModule,
    EchartPieCircleAModule,
    ButtonModule,
    EchartGaugeAModule,
    EchartGaugeBModule,
    SharedModule,
    EchartBarDoubleAModule,
    EchartPieCircleBModule,
    CalendarModule,
  ],
  declarations: [
    ServiceMangerComponent,
    ServiceMangerUpattrComponent,
    ServiceMangerVideoComponent,
    ServiceMangerIncomeComponent,
    ServiceMangerCarComponent
  ],
  providers: [ServiceDataService, DataService, DatePipe]
})
export class ServiceMangerModule { }

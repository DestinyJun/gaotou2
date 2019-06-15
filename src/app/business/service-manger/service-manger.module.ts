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

@NgModule({
  imports: [
    CommonModule,
    ServiceMangerRoutingModule,
    WarningEventListModule,
    EchartPieCircleAModule,
    ButtonModule
  ],
  declarations: [
    ServiceMangerComponent,
    ServiceMangerUpattrComponent,
    ServiceMangerVideoComponent,
  ],
  providers: [ServiceDataService, DataService, DatePipe]
})
export class ServiceMangerModule { }

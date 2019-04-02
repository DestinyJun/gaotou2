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
import {EchartLineAreaModule, EchartsLineBrokenModule, InputDropdownModule, PagingModule} from '../../common/wenjun';
import {ImageZoomModule} from '../../common/components/image-zoom/image-zoom.module';
import {Service3dComponent} from './service-3d/service-3d.component';
import {ServiceCarComponent} from './service-car/service-car.component';
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
    DropdownModule
  ],
  declarations: [
    ServiceDataComponent,
    Service3dComponent,
    ServiceCarComponent
  ],
  providers: [ServiceDataService, DataService, DatePipe]
})
export class ServiceDataModule { }

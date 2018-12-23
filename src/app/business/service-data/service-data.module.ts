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
    InputDropdownModule
  ],
  declarations: [ServiceDataComponent],
  providers: [ServiceDataService, DataService, DatePipe]
})
export class ServiceDataModule { }

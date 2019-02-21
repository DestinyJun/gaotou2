import { NgModule } from '@angular/core';
import {CommonModule, DatePipe} from '@angular/common';
import { ServiceManagerComponent } from './service-manager.component';
import {ServiceManagerRoutingModule} from './service-manager.routing.module';
import {SharedModule} from '../../common/shared.module';
import {ManagerEventComponent} from './manager-event/manager-event.component';
import {ManagerOfficeComponent} from './manager-office/manager-office.component';
import {ManagerStoreComponent} from './manager-store/manager-store.component';
import {ManagerVideosComponent} from './manager-videos/manager-videos.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ButtonModule, CalendarModule, ScrollPanelModule} from 'primeng/primeng';
import {EchartLineAreaModule, EchartsLineBrokenModule, InputDropdownModule, PagingModule} from '../../common/wenjun';
import {ImageZoomModule} from '../../common/components/image-zoom/image-zoom.module';
import {ServiceDataService} from '../../common/services/service-data.service';
import {DataService} from '../../common/services/data.service';
import { ManagerSerinfoComponent } from './manager-serinfo/manager-serinfo.component';
import {GalleriaModule} from 'primeng/galleria';
@NgModule({
  imports: [
    CommonModule,
    ServiceManagerRoutingModule,
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
    GalleriaModule
  ],
  declarations: [
    ServiceManagerComponent,
    ManagerEventComponent,
    ManagerOfficeComponent,
    ManagerStoreComponent,
    ManagerVideosComponent,
    ManagerSerinfoComponent
  ],
  providers: [ServiceDataService, DataService, DatePipe]
})
export class ServiceManagerModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServiceMangerComponent } from './service-manger.component';
import {ServiceMangerRoutingModule} from './service-manger.routing.module';
import {WarningEventListModule} from '../../common/components/warning-event-list/warning-event-list.module';

@NgModule({
  imports: [
    CommonModule,
    ServiceMangerRoutingModule,
    WarningEventListModule
  ],
  declarations: [ServiceMangerComponent]
})
export class ServiceMangerModule { }

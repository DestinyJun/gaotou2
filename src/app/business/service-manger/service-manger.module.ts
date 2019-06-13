import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServiceMangerComponent } from './service-manger.component';
import {ServiceMangerRoutingModule} from './service-manger.routing.module';

@NgModule({
  imports: [
    CommonModule,
    ServiceMangerRoutingModule
  ],
  declarations: [ServiceMangerComponent]
})
export class ServiceMangerModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServiceManagerComponent } from './service-manager.component';
import {ServiceManagerRoutingModule} from './service-manager.routing.module';
import { ManagerEventComponent } from './manager-event/manager-event.component';
import { ManagerStoreComponent } from '../manager-store/manager-store.component';

@NgModule({
  imports: [
    CommonModule,
    ServiceManagerRoutingModule
  ],
  declarations: [ServiceManagerComponent, ManagerEventComponent, ManagerStoreComponent]
})
export class ServiceManagerModule { }

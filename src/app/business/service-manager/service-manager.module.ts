import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServiceManagerComponent } from './service-manager.component';
import {ServiceManagerRoutingModule} from './service-manager.routing.module';
import { ManagerEventComponent } from './manager-event/manager-event.component';
import { ManagerStoreComponent } from '../manager-store/manager-store.component';
import { ManagerVideosComponent } from './manager-videos/manager-videos.component';
import {SharedModule} from '../../common/shared.module';
import {ScrollPanelModule} from 'primeng/scrollpanel';
import {GalleriaModule} from 'primeng/galleria';
@NgModule({
  imports: [
    CommonModule,
    ServiceManagerRoutingModule,
    SharedModule,
    ScrollPanelModule,
    GalleriaModule
  ],
  declarations: [ServiceManagerComponent, ManagerEventComponent, ManagerStoreComponent, ManagerVideosComponent]
})
export class ServiceManagerModule { }

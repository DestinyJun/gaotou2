import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SharedModule} from '../../common/shared.module';

import {ScrollPanelModule} from 'primeng/primeng';
import {WholeDataComponent} from './whole-data.component';
import {WholeDataRoutingModule} from './whole-data.routing.module';
import {Data3dService} from '../../common/services/data3d.service';
import {CentermapService} from '../../common/services/centermap.service';
import {DiagramService} from '../../common/services/diagram.service';


@NgModule({
  imports: [
    CommonModule,
    WholeDataRoutingModule,
    SharedModule,
    ScrollPanelModule
  ],
  declarations: [WholeDataComponent],
  providers: [
    Data3dService,
    CentermapService,
    DiagramService
  ],
  entryComponents: []
})
export class WholeDataModule { }
